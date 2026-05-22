import TaskCard from "./TaskCard";
import EmptyTaskState from "./EmptyTaskState";

export default function TaskGrid({ tasks = [] }) {
  if (tasks.length === 0) {
    return <EmptyTaskState />;
  }

  return (
    <div className="taskcard-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          taskNumber={`Task ${index + 1}`}
          topic={task.topic}
          tag={task.tag}
          createdDate={
            task.created_at
              ? new Date(task.created_at).toLocaleDateString("en-GB")
              : "Not available"
          }
          dueDate={
            task.deadline &&
            task.deadline !== "null" &&
            task.deadline !== "undefined"
              ? task.deadline
              : "Not mentioned"
          }
          description={task.description}
        />
      ))}
    </div>
  );
}
