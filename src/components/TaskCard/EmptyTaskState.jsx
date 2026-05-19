import "./taskcard.css";

export default function EmptyTaskState() {
  return (
    <div className="taskcard-list default">

      <div className="task-card">

        <span className="text-small">
          This cup is still empty
          <br />
          Add notes above to brew some tasks.
        </span>

        <div className="default-icon">

          <svg
            width="100%"
            viewBox="0 -6 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              className="steam steam1"
              d="M11 2 C9 4 13 5 11 7"
            />

            <path
              className="steam steam2"
              d="M15 2 C13 4 17 5 15 7"
            />

            <path
              className="steam steam3"
              d="M19 2 C17 4 21 5 19 7"
            />

            <defs>
              <clipPath id="cupClip">

                <path d="M24.7499 14.1563L23.9061 22.2188H6.74988L5.81238 14.1563H24.7499Z" />

              </clipPath>
            </defs>

            <rect
              className="coffee"
              x="5.8"
              y="14.2"
              width="18.8"
              height="8"
              fill="#6f4e37"
              clipPath="url(#cupClip)"
            />

            <g className="cup">

              <path
                d="M24.7499 14.1563L23.9061 22.2188H6.74988L5.81238 14.1563H7.21863L6.93739 8.71875H23.4374L23.1561 14.1563H24.7499Z"
                stroke="white"
                strokeWidth="1.57895"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </g>

          </svg>

        </div>
      </div>

      <div className="task-card">

        <span className="text-small">
          AI is waiting...
          <br />
          Add notes to wake it up.
        </span>

        <div className="default-icon">

          <svg
            width="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M21 2H3V18H8V22L12 18H17L21 14V2Z"
              stroke="white"
              strokeWidth="1.57895"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g className="blink">

              <path
                className="eye"
                d="M10 11V7"
                stroke="white"
                strokeWidth="1.57895"
                strokeLinecap="round"
              />

              <path
                className="eye eye2"
                d="M14 11V7"
                stroke="white"
                strokeWidth="1.57895"
                strokeLinecap="round"
              />

            </g>

          </svg>

        </div>

      </div>

    </div>
  );
}