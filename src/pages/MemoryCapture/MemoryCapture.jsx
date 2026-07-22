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
            <div className="icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2291 2.73058L15.2691 1.77058C15.1847 1.68532 15.0843 1.61764 14.9736 1.57144C14.8629 1.52525 14.7441 1.50146 14.6241 1.50146C14.5042 1.50146 14.3854 1.52525 14.2747 1.57144C14.164 1.61764 14.0635 1.68532 13.9791 1.77058L1.76912 13.9806C1.68386 14.065 1.61617 14.1654 1.56998 14.2761C1.52378 14.3869 1.5 14.5056 1.5 14.6256C1.5 14.7455 1.52378 14.8643 1.56998 14.975C1.61617 15.0857 1.68386 15.1862 1.76912 15.2706L2.72912 16.2306C2.81298 16.3168 2.91327 16.3853 3.02405 16.432C3.13483 16.4788 3.25387 16.5029 3.37412 16.5029C3.49437 16.5029 3.6134 16.4788 3.72418 16.432C3.83497 16.3853 3.93525 16.3168 4.01912 16.2306L16.2291 4.02058C16.3153 3.93672 16.3838 3.83643 16.4306 3.72565C16.4773 3.61487 16.5014 3.49583 16.5014 3.37558C16.5014 3.25533 16.4773 3.1363 16.4306 3.02552C16.3838 2.91473 16.3153 2.81445 16.2291 2.73058Z"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 5.25L12.75 7.5"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 4.5V7.5"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.25 10.5V13.5"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 1.5V3"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.25 6H2.25"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 12H12.75"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 2.25H6.75"
                  stroke="white"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
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
