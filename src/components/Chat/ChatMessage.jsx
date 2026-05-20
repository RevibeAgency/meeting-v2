import "./chat.css";

export default function ChatMessage({ type, text, tasks }) {
  return (
    <div className={`chat-row ${type}`}>
      <div className={`message ${type}`}>
        {type === "tasks" ? (
          <>
            <div className="ai-text">{text}</div>

            <div className="chat-task-list">
              {tasks.map((task, index) => (
                <div className="chat-task-card" key={index}>
                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <span>{task.deadline}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="ai-text">{text}</div>
        )}
      </div>
    </div>
  );
}
