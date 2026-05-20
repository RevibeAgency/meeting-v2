import ChatBox from "../../components/Chat/ChatBox";
import "./chatgenie.css";

function ChatGenie({
  chatMessages,
  setChatMessages,
  storedTasks,
  setStoredTasks,
}) {
  return (
    <div className="chat-genie-page">
      <div className="wrapper">
        <div className="wrapper-header">
          <span className="text-medium">Cortex AI</span>
        </div>

        <ChatBox
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          storedTasks={storedTasks}
          setStoredTasks={setStoredTasks}
        />
      </div>
    </div>
  );
}

export default ChatGenie;
