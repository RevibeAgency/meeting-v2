import "./KanbanBoard.css";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "../TaskCard/TaskCard";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";

import { useState } from "react";

export default function KanbanBoard({ tasks, onDelete, onStatusChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const [activeTask, setActiveTask] = useState(null);
  const pending = tasks.filter((task) => task.status === "pending");

  const todo = tasks.filter((task) => task.status === "todo");

  const progress = tasks.filter((task) => task.status === "progress");

  const done = tasks.filter((task) => task.status === "completed");

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);

    setActiveTask(task || null);
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
