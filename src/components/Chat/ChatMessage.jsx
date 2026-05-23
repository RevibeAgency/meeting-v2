import "./chat.css";
import TaskGrid from "../TaskCard/TaskGrid";

export default function ChatMessage({ type, text, tasks }) {
  return (
    <div className={`chat-row ${type}`}>
      <div className={`message ${type}`}>
        {type === "tasks" ? (
          <>
            <div className="ai-text">{text}</div>

            <TaskGrid
              tasks={tasks}
            />
          </>
        ) : (
          <div className="ai-text">{text}</div>
        )}
      </div>
    </div>
  );
}
