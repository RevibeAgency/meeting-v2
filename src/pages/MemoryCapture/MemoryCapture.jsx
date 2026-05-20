import { useState } from "react";

import "./memorycapture.css";

import TaskGrid from "../../components/TaskCard/TaskGrid";
import API_URL from "../../lib/api";

export default function MemoryCapture() {

  const [note, setNote] = useState("");

  const [tasks, setTasks] = useState([]);

  const handleAnalyze = async () => {

    if (!note.trim()) return;
  
    try {
  
      const response = await fetch(
        `${API_URL}/analyze`,
        {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({
            notes: note,
          }),
        }
      );
  
      const data = await response.json();
  
      console.log(data);
  
      setTasks(data.tasks || []);
  
    } catch (error) {
  
      console.error(error);
  
    }
  };

  return (
    <section id="memory-capture">

      <div className="capture-wrapper">

        <div className="wrapper-header">

          <span className="text-medium">
            Memory Capture
          </span>

        </div>

        <textarea
          className="capture-textarea"
          placeholder="Paste meeting notes here..."
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
        />

        <div className="capture-btn-wrap">

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
          >
            Analyze Meeting
          </button>

        </div>

        <div className="capture-task-section">

          <TaskGrid tasks={tasks} />

        </div>

      </div>

    </section>
  );
}