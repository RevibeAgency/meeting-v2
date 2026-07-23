import "./StatusTabs.css";

const tabs = [
  "Calendar",

  "All Tasks",

  "Pending",

  "To do",

  "On progress",

  "Done",
];

export default function StatusTabs() {
  return (
    <div className="status-tabs">
      {tabs.map((tab) => (
        <button key={tab} className="status-tab">
          <div className="icon">
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0605 4.0127V12.0397"
                stroke="black"
                stroke-width="2.00674"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32.1113 4.0127V12.0397"
                stroke="black"
                stroke-width="2.00674"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M42.1467 34.1155V12.0413C42.1467 10.9769 41.7239 9.95603 40.9712 9.20335C40.2185 8.45068 39.1977 8.02783 38.1333 8.02783H10.0389C8.97443 8.02783 7.95359 8.45068 7.20091 9.20335C6.44824 9.95603 6.02539 10.9769 6.02539 12.0413V40.1357C6.02539 41.2001 6.44824 42.221 7.20091 42.9737C7.95359 43.7263 8.97443 44.1492 10.0389 44.1492H32.113L42.1467 34.1155Z"
                stroke="black"
                stroke-width="2.00674"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.02539 20.0679H42.1467"
                stroke="black"
                stroke-width="2.00674"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.1055 44.1484V36.1214C30.1055 35.057 30.5283 34.0361 31.281 33.2834C32.0337 32.5308 33.0545 32.1079 34.119 32.1079H42.1459"
                stroke="black"
                stroke-width="2.00674"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <span>{tab}</span>
        </button>
      ))}
    </div>
  );
}
