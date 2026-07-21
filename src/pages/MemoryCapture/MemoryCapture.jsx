import { useState, useEffect } from "react";
import "./memorycapture.css";
import MeetingLoading from "../../components/MeetingLoading/MeetingAnalysisLoader";
import API_URL from "../../lib/api";
import { supabase } from "../../lib/supabase";

function MemoryCapture({ meetingData, setMeetingData, setStoredTasks }) {
  const [note, setNote] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!note.trim()) return;

    setIsAnalyzing(true);

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

      setIsAnalyzing(false);

      console.log(latestTasks);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="memory-capture">
      {isAnalyzing && <MeetingLoading />}
      <div className="capture-wrapper">
        <div className="capture-header">
          <span>Capture Meeting Conversation</span>

          <button className="extract-btn" onClick={handleAnalyze}>
            Extract Action Items
          </button>
        </div>

        <textarea
          className="capture-textarea"
          placeholder="Paste meeting notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </section>
  );
}

export default MemoryCapture;
