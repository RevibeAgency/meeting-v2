import "./MeetingLoading.css";

const funnyLines = [
  "Convincing AI that this meeting wasn't an email... 😉",
  "Searching for action items humans forgot... 😉",
  "Turning chaos into productivity... 😉",
  "Decoding corporate language... 😉",
  "Finding who said 'I'll do it later'... 😉",
  "Making sense of everyone's brilliant ideas... 😉",
];

const randomLine =
  funnyLines[Math.floor(Math.random() * funnyLines.length)];

export default function MeetingLoading() {
  return (
    <div className="loading-overlay">
      <div className="loading-modal">

        <h3>Please wait while we analyze the meeting</h3>

        <div className="analysis-flow">

          <div className="loading-doc">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>

          <div className="dotted-line"></div>

          <div className="loader-circle"></div>

          <div className="dotted-line"></div>

          <div className="loading-task">
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
          </div>

        </div>

        <div className="loading-message">
          {randomLine}
        </div>

      </div>
    </div>
  );
}