import { useState, useEffect } from "react";
import "./memorycapture.css";

import TaskGrid from "../../components/TaskCard/TaskGrid";
import API_URL from "../../lib/api";
import { supabase } from "../../lib/supabase";

function MemoryCapture({
  meetingData,
  setMeetingData,
  storedTasks,
  setStoredTasks,
  syncTaskStatusEverywhere,
}) {
  const [note, setNote] = useState("");


  const handleAnalyze = async () => {
    if (!note.trim()) return;

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          notes: note,
        }),
      });

      const data = await response.json();

      const { data: latestTasks } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      setStoredTasks(latestTasks || []);


      setMeetingData({
        ...data,
        tasks: latestTasks || [],
      });

      console.log(latestTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="memory-capture">
      <div className="capture-wrapper">
        <div className="wrapper-header">
          <span className="text-medium">Memory Capture</span>
        </div>

        <textarea
          className="capture-textarea"
          placeholder="Paste meeting notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="capture-btn-wrap">
          <button className="analyze-btn" onClick={handleAnalyze}>
            Analyze Meeting
          </button>
        </div>

        <div className="capture-task-section">
          <TaskGrid
            tasks={storedTasks}
            onStatusChange={syncTaskStatusEverywhere}
          />
        </div>
      </div>
    </section>
  );
}

export default MemoryCapture;
