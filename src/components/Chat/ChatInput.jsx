import "./chat.css";

import { useRef, useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const handleInput = (e) => {
    setText(e.target.value);

    e.target.style.height = "24px";

    e.target.style.height = Math.min(e.target.scrollHeight, 180) + "px";
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
  
    setText("");
  
    textareaRef.current.style.height = "24px";
  };
  return (
    <div className="thread-wrap">
      <div className="thread pointer">
        <div className="icon">
          <svg
            width="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="#989898"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 15L15 9"
              stroke="#989898"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <textarea
          ref={textareaRef}
          id="chat"
          value={text}
          placeholder="Ask about today’s task"
          onChange={handleInput}
        />

        <div className="icon send-btn pointer" onClick={handleSubmit}>
          <svg
            width="100%"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
              fill="#171717"
            />
            <path d="M12 18L18 12L24 18" fill="#171717" />
            <path
              d="M12 18L18 12M18 12L24 18M18 12V24M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
