import "./sidebar.css";

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="line vertical"></div>

      <div className="header">
        <div className="logo pointer">
          <img src="/Assets/logo.svg" alt="" />
        </div>

        <div className="collaspe-icon pointer">
          <svg
            width="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="#BDBDBD"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 3V21"
              stroke="#BDBDBD"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 15L13 12L16 9"
              stroke="#BDBDBD"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="navigation">
        <li
          className={`nav-item ${activePage === "chat" ? "active" : ""}`}
          onClick={() => setActivePage("chat")}
        >
          <div className="icon">
            <svg
              width="100%"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.164 9.7646L22.1182 9.50153L21.164 9.23845C17.5222 8.23451 14.6767 5.38902 13.6727 1.74715L13.4097 0.792969L13.1466 1.74715C12.1427 5.38902 9.29716 8.23451 5.65529 9.23845L4.70111 9.50153L5.65529 9.76461C9.29716 10.7685 12.1427 13.614 13.1466 17.2559L13.4097 18.2101L13.6727 17.2559C14.6767 13.614 17.5222 10.7685 21.164 9.7646Z"
                fill="url(#paint0_linear)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="13.5725"
                  y1="2.83789"
                  x2="13.5725"
                  y2="16.8379"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.00349998" stopColor="#F8046A" />
                  <stop offset="1" stopColor="#F89EE8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="nav-span">Chat Genie</span>
        </li>

        <ul className="navigation_list">
          <li
            className={`nav-item ${activePage === "memory" ? "active" : ""}`}
            onClick={() => setActivePage("memory")}
          >
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.9166 12.4997V18.7497C22.9166 21.0509 21.0511 22.9163 18.7499 22.9163H6.24992C3.94873 22.9163 2.08325 21.0509 2.08325 18.7497V6.24967C2.08325 3.94849 3.94873 2.08301 6.24992 2.08301H12.4999M16.3399 4.19004C16.3399 4.19004 16.3399 5.67993 17.8298 7.16982C19.3197 8.65972 20.8096 8.65972 20.8096 8.65972M9.53604 16.6555L12.6648 16.2085C13.1161 16.144 13.5344 15.9349 13.8567 15.6125L22.2995 7.16982C23.1223 6.34698 23.1223 5.01288 22.2995 4.19003L20.8096 2.70014C19.9867 1.8773 18.6526 1.8773 17.8298 2.70014L9.38705 11.1429C9.06468 11.4652 8.85556 11.8835 8.79109 12.3348L8.34412 15.4636C8.2448 16.1588 8.84075 16.7548 9.53604 16.6555Z"
                  stroke="#171717"
                  strokeWidth="1.5625"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="nav-span">Memory Capture</span>
          </li>

          <li
            className={`nav-item ${activePage === "meeting" ? "active" : ""}`}
            onClick={() => setActivePage("meeting")}
          >
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33325 14.583L9.4606 12.7041C10.1257 11.5956 11.6923 11.4902 12.4999 12.4997C13.3075 13.5092 14.8741 13.4038 15.5392 12.2952L16.6666 10.4163M12.4999 18.7497V22.9163M4.16659 6.24967H20.8333C21.9838 6.24967 22.9166 5.31693 22.9166 4.16634C22.9166 3.01575 21.9838 2.08301 20.8333 2.08301H4.16659C3.01599 2.08301 2.08325 3.01575 2.08325 4.16634C2.08325 5.31693 3.01599 6.24967 4.16659 6.24967ZM3.12492 6.24967H21.8749V16.6663C21.8749 17.8169 20.9422 18.7497 19.7916 18.7497H5.20825C4.05766 18.7497 3.12492 17.8169 3.12492 16.6663V6.24967Z"
                  stroke="#171717"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="nav-span">Meeting Hub</span>
          </li>

          <li
            className={`nav-item ${
              activePage === "action" ? "active" : ""
            }`}
            onClick={() => setActivePage("action")}
          >
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7499 12.3955V18.7497C18.7499 21.0509 16.8844 22.9163 14.5833 22.9163H6.24992C3.94873 22.9163 2.08325 21.0509 2.08325 18.7497V10.4163C2.08325 8.11516 3.94873 6.24967 6.24992 6.24967H12.6041M18.7499 12.3955C21.1273 11.9129 22.9166 9.81109 22.9166 7.29134C22.9166 4.41486 20.5847 2.08301 17.7083 2.08301C15.1885 2.08301 13.0867 3.87234 12.6041 6.24967M18.7499 12.3955C18.4133 12.4638 18.065 12.4997 17.7083 12.4997C14.8318 12.4997 12.4999 10.1678 12.4999 7.29134C12.4999 6.93461 12.5358 6.58625 12.6041 6.24967"
                  stroke="#28303F"
                  strokeWidth="1.5625"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="nav-span">Action Tracker</span>
          </li>

          <li
              className={`nav-item ${
                activePage === "tasks" ? "active" : ""
              }`}
              onClick={() => setActivePage("tasks")}
          >
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3V21"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 3V21"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="nav-span">All Tasks</span>
          </li>

          <li
             className={`nav-item ${
              activePage === "deck" ? "active" : ""
            }`}
            onClick={() => setActivePage("deck")}
          >
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 2H17"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 6H19"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10H5C3.89543 10 3 10.8954 3 12V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V12C21 10.8954 20.1046 10 19 10Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="nav-span">Pitch Decks</span>
          </li>
        </ul>
      </div>

      <div className="upgrade-card">
        <div className="card-bg">
          <img src="/Assets/Background.png" alt="" />
        </div>

        <div className="center-content">
          <div className="icon">✦</div>

          <span className="text-small">
            Upgrade to AI version and unlock more premium features
          </span>

          <button className="upgrade-btn pointer">
            <span className="text-small">Upgrade</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
