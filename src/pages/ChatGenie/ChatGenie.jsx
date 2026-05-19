import ChatBox from "../../components/Chat/ChatBox";
import "./chatgenie.css";

export default function ChatGenie() {
  return (
    <div className="chat-genie-page">

      <div className="wrapper">

        <div className="wrapper-header">
          <span className="text-medium">
            AI Meeting Memory
          </span>
        </div>

        <ChatBox />

      </div>

    </div>
  );
}