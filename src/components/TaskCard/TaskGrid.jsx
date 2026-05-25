import TaskCard from "./TaskCard";
import EmptyTaskState from "./EmptyTaskState";

export default function TaskGrid({
  tasks = [],
  onStatusChange,
}) {
  if (tasks.length === 0) {
    return <EmptyTaskState />;
  }

  return (
    <div className="taskcard-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          id={task.id}
          taskNumber={`Task ${index + 1}`}
          assignee={task.assignee}
          topic={task.topic}
          tag={task.tag}
          createdDate={
            task.created_at
              ? new Date(task.created_at).toLocaleDateString("en-GB")
              : task.createdAt
                ? new Date(task.createdAt).toLocaleDateString("en-GB")
                : new Date().toLocaleDateString("en-GB")
          }
          dueDate={
            task.dueDate
              ? task.dueDate
              : task.deadline &&
                  task.deadline.trim() !== "" &&
                  task.deadline !== "null" &&
                  task.deadline !== "undefined"
                ? task.deadline
                : "Not mentioned"
          }
          description={task.description}
          status={task.status}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
