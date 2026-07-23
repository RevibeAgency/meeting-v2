import "./KanbanBoard.css";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({ tasks, onDelete, onStatusChange }) {
  const pending = tasks.filter((task) => task.status === "pending");

  const todo = tasks.filter((task) => task.status === "todo");

  const progress = tasks.filter((task) => task.status === "progress");

  const done = tasks.filter((task) => task.status === "completed");

  return (
    <div className="kanban-board">
      <KanbanColumn
        title="Pending"
        color="#ffffff"
        tasks={pending}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />

      <KanbanColumn
        title="To Do"
        color="#5DA9FF"
        tasks={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />

      <KanbanColumn
        title="On Progress"
        color="#FFB454"
        tasks={progress}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />

      <KanbanColumn
        title="Done"
        color="#6FE3B3"
        tasks={done}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
