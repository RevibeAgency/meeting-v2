import "./Toolbar.css";

export default function Toolbar() {
  return (

    <div className="toolbar">

      <div className="toolbar-search">

        <div className="icon"></div>

        <input
          placeholder="Search all tasks..."
        />

      </div>

      <button className="add-task-btn">

        <div className="icon"></div>

        <span>Add task</span>

      </button>

    </div>

  );
}