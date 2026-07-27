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

  const handleDragEnd = async (event) => {
    const { active, over } = event;
  
    setActiveTask(null);
  
    if (!over) return;
  
    // Task being dragged
    const draggedTask = tasks.find((task) => task.id === active.id);
  
    if (!draggedTask) return;
  
    // Task being hovered
    const targetTask = tasks.find((task) => task.id === over.id);

    const sourceIndex = tasks.findIndex(
      (task) => task.id === draggedTask.id
    );
    
    const targetIndex = targetTask
      ? tasks.findIndex((task) => task.id === targetTask.id)
      : -1;
  
    // Determine destination column
    let destinationStatus;
  
    if (
      over.id === "pending" ||
      over.id === "todo" ||
      over.id === "progress" ||
      over.id === "completed"
    ) {
      destinationStatus = over.id;
    } else if (targetTask) {
      destinationStatus = targetTask.status;
    } else {
      return;
    }
  
    await onStatusChange({
      activeId: draggedTask.id,
      activeTask: draggedTask,
    
      activeStatus: draggedTask.status,
    
      sourceIndex,
    
      targetTask,
      targetTaskId: targetTask?.id ?? null,
      targetIndex,
    
      destinationStatus,
    
      droppedOnColumn:
        over.id === "pending" ||
        over.id === "todo" ||
        over.id === "progress" ||
        over.id === "completed",
    });
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
          status="pending"
          color="#ffffff"
          tasks={pending}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />

        <KanbanColumn
          title="To Do"
          status="todo"
          color="#5DA9FF"
          tasks={todo}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />

        <KanbanColumn
          title="On Progress"
          status="progress"
          color="#FFB454"
          tasks={progress}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />

        <KanbanColumn
          title="Done"
          status="completed"
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
