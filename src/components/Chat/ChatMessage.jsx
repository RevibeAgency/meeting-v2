import "./chat.css";

export default function ChatMessage({ type, text, tasks }) {
  return (
    <div className={`chat-row ${type}`}>
      <div className={`message ${type}`}>
        {type === "tasks" ? (
          <>
            <div className="ai-text">{text}</div>

            <TaskGrid
              tasks={tasks.map((task) => ({
                topic: task.topic,
                tag: task.tag,
                dueDate: task.deadline,
                description: task.description,
                createdDate: "Today",
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
