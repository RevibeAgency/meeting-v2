import "./alltasks.css";

export default function AllTasks({
  tasks = [],
  onStatusChange,
}) {
  return (
    <div className="alltasks-page">

      {/* TOP */}
      <div className="alltasks-top">

        <div>
          <h1>AI Meeting Memory</h1>
          <p>Tasks from Meetings</p>
        </div>

        <div className="window-actions">
          <button>-</button>
          <button>×</button>
        </div>

      </div>

      {/* CONTROLS */}
      <div className="alltasks-controls">

        <input
          type="text"
          placeholder="Search all tasks..."
          className="search-input"
        />

        <div className="date-controls">

          <button>{"<"}</button>

          <div className="date-range">
            Nov 12,2025 - Dec 08,2025
          </div>

          <button>{">"}</button>

        </div>

        <button className="filter-btn">
          All Tasks
        </button>

      </div>

      {/* TIME */}
      <div className="time-label">
        TODAY, 12:45 PM
      </div>

      {/* TASK GRID */}
      <div className="alltasks-grid">

        {tasks.map((task, index) => (
          <div
            key={task.id || index}
            className={`task-card ${
              task.completed ? "completed-task" : ""
            }`}
          >

            <button className="delete-btn">
              ×
            </button>

            {/* HEADER */}
            <div className="task-header">

              <div className="checkbox-wrap">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    onStatusChange(task.id, !task.completed)
                  }
                />

                <span>
                  {task.title || `Task ${index + 1}`}
                </span>
              </div>

              <div className="task-actions">

                <button className="save-btn">
                  Save
                </button>

                <button className="edit-btn">
                  ↗
                </button>

              </div>

            </div>

            {/* DETAILS */}
            <div className="task-details">

              <div className="task-row">
                <span className="label">
                  Assignee
                </span>

                <span>
                  {task.assignee || "None"}
                </span>
              </div>

              <div className="task-row">
                <span className="label">
                  Topic
                </span>

                <span>
                  {task.topic || "General"}
                </span>
              </div>

              <div className="task-row">
                <span className="label">
                  Tags
                </span>

                <span className="tag">
                  {task.tag || "Meeting"}
                </span>
              </div>

              <div className="task-row">
                <span className="label">
                  Created date
                </span>

                <span>
                  {task.created_at?.split("T")[0]}
                </span>
              </div>

              <div className="task-row">
                <span className="label">
                  Due date
                </span>

                <span>
                  {task.deadline || "None"}
                </span>
              </div>

            </div>

            {/* DESC */}
            <div className="task-desc">
              {task.description}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}