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
              tasks={tasks.map((task) => ({
                assignee: task.assignee,
                topic: task.topic,
                tag: task.tag,
                dueDate: task.deadline,
                description: task.description,
                createdDate: new Date(task.created_at).toLocaleDateString(),
              }))}
            />
          </>
        ) : (
          <div className="ai-text">{text}</div>
        )}
      </div>
    </div>
  );
}
