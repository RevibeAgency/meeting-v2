import { useEffect, useState } from "react";
import "./MeetingAnalysisLoader.css";

const loadingMessages = [
  "Convincing AI this meeting wasn't an email... (>ᴗ•)",
  "Trying to identify who actually volunteered... (^_~)",
  "Finding action items hidden in small talk... (≧◡≦)",
  "Translating corporate jargon into human language... (⌐■_■)",
  "Checking how many times 'let's circle back' was said... (｡•̀ᴗ-)✧",
  "Turning chaos into organized tasks... (＾▽＾)",
  "Decoding manager speak... (¬‿¬)",
  "Separating decisions from discussions... (•‿•)",
  "Figuring out who owns what now... (ﾉ◕ヮ◕)ﾉ",
  "Phewww... finally the meeting is over (￣▽￣) !",
];

function DocumentIcon() {
  return (
    <div className="file-icon">
      <svg
        width="100%"
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H34L60 26V72C60 76.4183 56.4183 80 52 80H8C3.58172 80 0 76.4183 0 72V8Z"
            fill="#F8046A"
          />
          <path
            d="M40 26H60L34 0V20C34 23.3137 36.6863 26 40 26Z"
            fill="white"
            fillOpacity="0.5"
          />
        </g>

        <path
          d="M22 55H31M22 43H38M22 49H38M17.6471 37H42.3529C43.2626 37 44 37.6716 44 38.5V65.5C44 66.3284 43.2626 67 42.3529 67H17.6471C16.7374 67 16 66.3284 16 65.5V38.5C16 37.6716 16.7374 37 17.6471 37Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <defs>
          <clipPath id="clip0">
            <rect width="60" height="80" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function MeetingAnalysisLoader() {
  const [messageIndex] = useState(
    Math.floor(Math.random() * loadingMessages.length),
  );

  return (
    <div className="analysis-loader-overlay">
      <div className="analysis-loader-modal">
        <h2 className="loader-title">
          Please wait until we analyze the meeting
        </h2>

        <div className="loader-flow">
          <div className="loading-doc-card">
            <DocumentIcon />
          </div>

          <div className="connector" />

          <div className="loading-node">
            <div className="loader-ring"></div>
          </div>

          <div className="connector" />

          <div className="loading-result-card">
            <div className="tiny-square"></div>

            <div className="skeleton-columns">
              <div className="left-col">
                <div className="skline md"></div>
                <div className="skline md"></div>
                <div className="skline md"></div>
                <div className="skline md"></div>
                <div className="skline md"></div>
                <div className="skline md"></div>
              </div>

              <div className="right-col">
                <div className="skline sm"></div>
                <div className="skline sm"></div>
                <div className="skline sm"></div>
                <div className="skline sm"></div>
                <div className="skline sm"></div>
              </div>
            </div>

            <div className="bottom-block"></div>
          </div>
        </div>

        <div className="loading-bubble">{loadingMessages[messageIndex]}</div>
      </div>
    </div>
  );
}
