import TaskCard from "../TaskCard/TaskCard";
import "./KanbanColumn.css";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function KanbanColumn({
  title,
  status,
  color,
  tasks,
  onDelete,
  onStatusChange,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  return (
    <div
      ref={setNodeRef}
      className={`kanban-column ${isOver ? "column-over" : ""}`}
    >
      <div className="column-header">
        <div className="column-title">
          <span className="column-dot" style={{ background: color }} />

          <span>{title}</span>
        </div>

        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-cards">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              taskNumber={task.id}
              assignee={task.assignee}
              topic={task.topic}
              tag={task.tag}
              createdDate={task.created_at}
              dueDate={task.deadline}
              description={task.description}
              status={task.status}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              showDelete
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
