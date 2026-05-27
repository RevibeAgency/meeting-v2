import "./button.css";

export default function IconButton({
  icon,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`icon-btn ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}