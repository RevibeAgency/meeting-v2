import "./button.css";

export default function PrimaryButton({
  text,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`primary-btn ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}