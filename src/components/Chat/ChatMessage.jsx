import "./chat.css";

export default function ChatMessage({ type, text }) {
  return (
    <div className={`chat-row ${type}`}>

      <div className={`message ${type}`}>

        <div className="ai-text">
          {text}
        </div>

      </div>

    </div>
  );
}