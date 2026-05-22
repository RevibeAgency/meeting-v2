import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios";

const supabaseModule =
  await import("./src/lib/supabase.js");

const supabase =
  supabaseModule.supabase;

const app = express();

app.use(cors());
app.use(express.json());

async function createEmbedding(text) {

  const response = await axios.post(

    "https://api.jina.ai/v1/embeddings",

    {

      model: "jina-embeddings-v2-base-en",

      input: [text]

    },

    {

      headers: {

        "Content-Type":
          "application/json",

        "Authorization":
          `Bearer ${process.env.JINA_API_KEY}`

      }

    }

  );

  return response
    .data
    .data[0]
    .embedding;

}


async function searchMemories(query) {

  const queryEmbedding =
    await createEmbedding(query);

  const { data } =
    await supabase.rpc(
      "match_memories",
      {
        query_embedding:
          queryEmbedding,

        match_threshold: 0.75,

        match_count: 5
      }
    );

  return data;

}

async function searchTasks(query) {

  const lower =
    query.toLowerCase();

  // SHOW ALL TASKS
  if (
    lower.includes("all tasks") ||
    lower.includes("show all tasks") ||
    lower.includes("show me all tasks") ||
    lower.includes("list all tasks")
  ) {

    const { data } =
      await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
          ascending: false
        });

    return data || [];
  }

  // SEMANTIC SEARCH
  const queryEmbedding =
    await createEmbedding(query);

  const { data } =
    await supabase.rpc(
      "match_tasks",
      {
        query_embedding:
          queryEmbedding,

        match_threshold: 0.65,

        match_count: 10
      }
    );

  return data?.filter(
    task => task.similarity > 0.65
  );

}


// =========================
// MEMORY STORAGE
// =========================


// =========================
// CHAT MEMORY
// =========================

let conversationHistory = [
  {
    role: "system",
    content: `
You are AI Meeting Memory.

You help users:
- summarize meetings
- recall previous discussions
- extract tasks
- remember deadlines
- answer follow-up questions
- analyze meeting conversations

If user asks for tasks, meetings, deadlines, or summaries: respond naturally and conversationally. Examples: "Here’s what I found from your meeting." "These were the main action items discussed." "I found a few important tasks from the meeting." DO NOT always start with: "Sure, here are..." Avoid repetitive robotic responses."
`
  }
];

// =========================
// AI CHAT
// =========================

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const relevantTasks =
      await searchTasks(message);

    const filteredTasks =
      relevantTasks || [];

    // FETCH ALL TASKS

    let assistantNote = "";

    if (filteredTasks.length) {

      assistantNote =
        "I found some relevant tasks from memory.";

    } else {

      assistantNote =
        "I couldn't find relevant stored tasks.";

    }

    const { data: storedMeetings } =
      await supabase
        .from("meetings")
        .select("*")
        .order("created_at", {
          ascending: false
        })
        .limit(3);

    const meetingContext =
      storedMeetings
        ?.map(meeting => {

          return `
Meeting Summary:
${meeting.summary}

Meeting Notes:
${meeting.notes}
`;

        })
        .join("\n");



    const taskContext =
      filteredTasks
        ?.map(task => {

          return `
      Task Title:
      ${task.title}
      
      Description:
      ${task.description}
      
      Topic:
      ${task.topic}
      
      Tag:
      ${task.tag}
      
      Deadline:
      ${task.deadline}
      
      Status:
      ${task.status}
      
      Version:
      ${task.version}
      `;

        })
        .join("\n");

    const relevantMemories =
      await searchMemories(message);

    const memoryContext =
      relevantMemories
        ?.map(m => m.content)
        .join("\n");

    conversationHistory.push({
      role: "user",
      content: `
Stored Meetings:
${meetingContext || "No meetings"}

Relevant Retrieved Tasks:
${taskContext || "No tasks"}

Relevant Memories:
${memoryContext || "No memories"}

User Question:
${message}
`
    });

    const groqResponse =
      await axios.post(

        "https://api.groq.com/openai/v1/chat/completions",

        {

          model: "llama-3.3-70b-versatile",

          messages: conversationHistory,

          temperature: 0.7,

          max_tokens: 1024

        },

        {

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${process.env.GROQ_API_KEY}`

          }

        }

      );

    const data =
      groqResponse.data;

    console.log("GROQ CHAT RAW:", data);

    console.log("CHAT RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No AI response received";

    conversationHistory.push({
      role: "assistant",
      content: reply
    });

    if (conversationHistory.length > 20) {

      conversationHistory =
        [
          conversationHistory[0],
          ...conversationHistory.slice(-19)
        ];

    }

    res.json({
      reply:
        assistantNote + "\n\n" + reply,

      tasks:
        (filteredTasks || []).map(task => ({
          ...task,

          dueDate:
            task.deadline || "Not mentioned"
        })),

      hasStrongMatch:
        filteredTasks.length > 0
    });

  } catch (error) {

    console.log("CHAT ERROR:");

    console.log(error.response?.data);

    console.log(error.message);

    console.log(error);

    res.status(500).json({

      error:
        error.message,

      full:
        JSON.stringify(error, null, 2)

    });

  }

});

// =========================
// ANALYZE MEETING
// =========================

app.post("/analyze", async (req, res) => {

  try {

    const { notes } = req.body;

    const groqResponse =
      await axios.post(

        "https://api.groq.com/openai/v1/chat/completions",

        {

          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content: `
                        You are an AI meeting analyzer.

                        Your job is to deeply understand meeting conversations.

                        You MUST:

                        - identify tasks
                        - identify who is responsible
                        - understand indirect references
                        - resolve natural language references
                        - rewrite vague descriptions clearly

                        IMPORTANT:

                        If meeting notes say:
                        - "he"
                        - "she"
                        - "they"
                        - "frontend guy"
                        - "designer"
                        - "developer"
                        - "backend person"

                        You should infer the actual person's name from conversation context whenever possible.

                        Task descriptions should ALWAYS be rewritten clearly with explicit names.

                        GOOD:
                        "Rahul should redesign dashboard before Monday"

                        BAD:
                        "He should redesign dashboard"

                        GOOD:
                        "Sarah is preparing the investor deck"

                        BAD:
                        "She is preparing the investor deck"

                        If no person is identifiable,
                        keep the original sentence naturally.

                        Task descriptions should ALWAYS contain the assignee name when identifiable.

                          You MUST extract:
                          - assignee
                          - task
                          - deadline
                          - responsibility

                          If no assignee is found:
                          assignee should be "Unassigned"

                        Return ONLY VALID JSON.

                        Format:

                        {
                          "summary":"...",
                          "topics":["..."],
                          "tasks":[
                            {
                              "title":"...",
                              "assignee":"...",
                              "topic":"...",
                              "tag":"...",
                              "deadline":"...",
                              "description":"..."
                            }
                          ]
                        }
                        `
            },

            {
              role: "user",
              content: notes
            }
          ],

          temperature: 0.4,

          max_tokens: 1500

        },

        {

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${process.env.GROQ_API_KEY}`

          }

        }

      );

    const data =
      groqResponse.data;

    console.log("ANALYZE RESPONSE:", data);

    const aiText =
      data?.choices?.[0]?.message?.content;

    if (!aiText) {

      console.log(
        "NO AI RESPONSE:",
        data
      );

      return res.status(500).json({
        error: "No AI response received"
      });

    }

    const cleanText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



    let parsed;

    try {

      parsed = JSON.parse(cleanText);

    } catch (err) {

      console.log("BROKEN AI JSON:");
      console.log(cleanText);

      return res.status(500).json({
        error: "AI returned invalid JSON"
      });

    }




    // =========================
    // STORE MEETING
    // =========================

    const {
      data: meetingData,
      error: meetingError
    } = await supabase
      .from("meetings")
      .insert([
        {
          notes,
          summary: parsed.summary
        }
      ])
      .select()
      .single();

    if (meetingError) {

      console.log(
        "SUPABASE INSERT ERROR:"
      );

      console.log(meetingError);

      return res.status(500).json({
        error: meetingError.message
      });

    }



    // =========================
    // STORE TASKS
    // =========================

    const taskRows =
      parsed.tasks.map(task => ({

        meeting_id:
          meetingData.id,

        title:
          task.title,

        assignee:
          task.assignee || "Unassigned",

        topic:
          task.topic,

        tag:
          task.tag,

        deadline:
          task.deadline,

        description:
          task.description,

        search_text: `
          ${task.title}
          ${task.topic}
          ${task.assignee}
        `.toLowerCase().trim(),
        status:
          "pending",

        version:
          1,

        last_updated:
          new Date()

      }));
    for (const newTask of taskRows) {

      const newEmbedding =
        await createEmbedding(
          newTask.search_text
        );

      // FIND SIMILAR TASK
      const matchedTasks =
        await supabase.rpc(
          "match_tasks",
          {
            query_embedding:
              newEmbedding,

            match_threshold: 0.95,

            match_count: 1
          }
        );

      const matchedTask =
        matchedTasks.data?.[0];
      // =========================
      // IF MATCH FOUND
      // =========================

      if (matchedTask) {

        const isExactDuplicate =
          matchedTask.search_text
            ?.trim()
            .toLowerCase()

          ===

          newTask.search_text
            ?.trim()
            .toLowerCase();

        const created =
          new Date(
            matchedTask.created_at
          );

        const now =
          new Date();

        const diffHours =
          (
            now - created
          ) / (1000 * 60 * 60);

        // =========================
        // SAME TASK WITHIN 24 HOURS
        // =========================

        if (
          isExactDuplicate &&
          diffHours < 24 &&
          matchedTask.status !== "completed"
        ) {

          console.log(
            "Skipping duplicate task"
          );

          continue;

        }

        // =========================
        // REOPEN / NEW VERSION
        // =========================

        await supabase
          .from("tasks")
          .update({

            version:
              (matchedTask.version || 1) + 1,

            status:
              "reopened",

            last_updated:
              new Date(),

            deadline:
              newTask.deadline,

            description:
              newTask.description,

            topic:
              newTask.topic,

            tag:
              newTask.tag,

            search_text:
              newTask.search_text,

            embedding:
              newEmbedding

          })
          .eq(
            "id",
            matchedTask.id
          );

        console.log(
          "Task reopened"
        );

      }

      // =========================
      // BRAND NEW TASK
      // =========================

      else {

        await supabase
          .from("tasks")
          .insert({
            ...newTask,
            embedding: newEmbedding
          });

        console.log(
          "New task inserted"
        );

      }

    }

    // =========================
    // CREATE EMBEDDING
    // =========================

    const embedding =
      await createEmbedding(notes);

    console.log("MEMORY INSERT STARTED");

    const { error: memoryError } =
      await supabase
        .from("memories")
        .insert([
          {
            content: notes,
            embedding
          }
        ]);

    if (memoryError) {
      console.log(
        "MEMORY INSERT ERROR:"
      );

      console.log(memoryError);
    }



    const responseData = {

      id: Date.now(),

      createdAt: new Date(),

      notes,

      summary: parsed.summary,

      topics: parsed.topics,

      tasks: parsed.tasks

    };

    res.json(responseData);

  } catch (error) {


    console.log("ANALYZE ERROR:");
    console.log(error.response?.data);

    console.log(error.message);

    console.log(error);

    res.status(500).json({

      error:
        error.message,

      full:
        JSON.stringify(error, null, 2)

    });



  }

});

app.delete("/cleanup", async (req, res) => {

  const thirtyDaysAgo =
    new Date();

  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30
  );

  await supabase
    .from("meetings")
    .delete()
    .lt(
      "created_at",
      thirtyDaysAgo.toISOString()
    );

  await supabase
    .from("tasks")
    .delete()
    .lt(
      "created_at",
      thirtyDaysAgo.toISOString()
    );

  await supabase
    .from("memories")
    .delete()
    .lt(
      "created_at",
      thirtyDaysAgo.toISOString()
    );

  res.json({
    success: true
  });

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

