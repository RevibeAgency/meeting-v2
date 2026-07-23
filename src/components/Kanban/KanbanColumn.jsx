import TaskCard from "../TaskCard/TaskCard";

export default function KanbanColumn({
  title,
  color,
  tasks,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="kanban-column">

      <div className="column-header">

        <div className="column-title">

          <span
            className="column-dot"
            style={{ background: color }}
          />

          <span>{title}</span>

        </div>

        <span className="column-count">

          {tasks.length}

        </span>

      </div>

      <div className="column-cards">

        {tasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />

        ))}

      </div>

    </div>
  );
}