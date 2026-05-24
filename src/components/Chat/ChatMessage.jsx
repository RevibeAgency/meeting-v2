import "./chat.css";
import TaskGrid from "../TaskCard/TaskGrid";
import { supabase } from "../../lib/supabase";

export default function ChatMessage({ type, text, tasks, onStatusChange }) {
  return (
    <div className={`chat-row ${type}`}>
      <div className={`message ${type}`}>
        {type === "tasks" ? (
          <>
            <div className="ai-text">{text}</div>

            <TaskGrid
              tasks={tasks}
              onStatusChange={async () => {
                const { data } = await supabase
                  .from("tasks")
                  .select("*")
                  .order("created_at", {
                    ascending: false,
                  });

                setTasks(data || []);
              }}
            />
          </>
        ) : (
          <div className="ai-text">{text}</div>
        )}
      </div>
    </div>
  );
}
