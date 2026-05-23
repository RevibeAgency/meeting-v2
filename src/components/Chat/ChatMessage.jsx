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
                id: task.id,
              
                assignee: task.assignee,
              
                topic: task.topic,
              
                tag: task.tag,
              
                deadline: task.deadline,
              
                dueDate: task.deadline,
              
                description: task.description,
              
                created_at: task.created_at,
              
                status: task.status
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
