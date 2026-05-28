import "./button.css";

export default function IconButton({ type = "left", onClick, className = "" }) {
  const icons = {
    left: (
      <svg width="100%" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    right: (
      <svg
        width="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),

    calendar: (
      <svg width="100%" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 2V6"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M16 2V6"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H16L21 17Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M3 10H21"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M15 22V18C15 17.4696 15.2107 16.9609 15.5858 16.5858C15.9609 16.2107 16.4696 16 17 16H21"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return (
    <button className={`icon-btn ${className}`} onClick={onClick}>
      <div className="icon">{icons[type]}</div>
    </button>
  );
}
