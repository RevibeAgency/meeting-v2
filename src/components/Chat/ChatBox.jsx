import { useState } from "react";
import "./chat.css";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import API_URL from "../../lib/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      type: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        type: data.tasks?.length ? "tasks" : "ai",
        text: data.reply,
        tasks: data.tasks || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    } catch (error) {
      console.log(error);
      setIsTyping(false);
    }
  };
  return (
    <div className="ai-chatbox">
      <div className="chatbox-header">
        <div className="left-text">
          <div className="icon">
            <svg
              width="100%"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.164 9.7646L22.1182 9.50153L21.164 9.23845C17.5222 8.23451 14.6767 5.38902 13.6727 1.74715L13.4097 0.792969L13.1466 1.74715C12.1427 5.38902 9.29716 8.23451 5.65529 9.23845L4.70111 9.50153L5.65529 9.76461C9.29716 10.7685 12.1427 13.614 13.1466 17.2559L13.4097 18.2101L13.6727 17.2559C14.6767 13.614 17.5222 10.7685 21.164 9.7646Z"
                fill="url(#paint0_linear_2307_58)"
              />
              <path
                d="M9.72718 18.5665L10.291 18.4111L9.72718 18.2556C7.57538 17.6625 5.89412 15.9812 5.30095 13.8294L5.14551 13.2656L4.99007 13.8294C4.39689 15.9812 2.71564 17.6625 0.563837 18.2556L6.11507e-05 18.4111L0.563836 18.5665C2.71564 19.1597 4.39689 20.8409 4.99007 22.9927L5.14551 23.5565L5.30095 22.9927C5.89412 20.8409 7.57538 19.1597 9.72718 18.5665Z"
                fill="url(#paint1_linear_2307_58)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2307_58"
                  x1="13.5725"
                  y1="2.83789"
                  x2="13.5725"
                  y2="16.8379"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.00349998" stopColor="#F8046A" />
                  <stop offset="1" stopColor="#F89EE8" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2307_58"
                  x1="5.24172"
                  y1="14.4739"
                  x2="5.24172"
                  y2="22.7458"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.00349998" stopColor="#F8046A" />
                  <stop offset="1" stopColor="#F89EE8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="text-small">Ask AI</span>
        </div>

        <div className="shortcut">
          <div className="key">
            <span className="text-small">Open chat</span>

            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 13.75V16.5C8.25 18.0188 7.01878 19.25 5.5 19.25C3.98122 19.25 2.75 18.0188 2.75 16.5C2.75 14.9812 3.98122 13.75 5.5 13.75H8.25ZM8.25 13.75H13.75M8.25 13.75V8.25M13.75 13.75V16.5C13.75 18.0188 14.9812 19.25 16.5 19.25C18.0188 19.25 19.25 18.0188 19.25 16.5C19.25 14.9812 18.0188 13.75 16.5 13.75H13.75ZM13.75 13.75V8.25M13.75 8.25H8.25M13.75 8.25V5.5C13.75 3.98122 14.9812 2.75 16.5 2.75C18.0188 2.75 19.25 3.98122 19.25 5.5C19.25 7.01878 18.0188 8.25 16.5 8.25H13.75ZM8.25 8.25V5.5C8.25 3.98122 7.01878 2.75 5.5 2.75C3.98122 2.75 2.75 3.98122 2.75 5.5C2.75 7.01878 3.98122 8.25 5.5 8.25H8.25Z"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <span className="text-small">Ctrl + F</span>
        </div>
      </div>

      <div className="chat-board">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              type={message.type}
              text={message.text}
              tasks={message.tasks}
            />
          ))}
          {isTyping && (
            <div className="typing-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
