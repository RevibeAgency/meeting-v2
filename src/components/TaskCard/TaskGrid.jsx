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
          createdDate={task.createdDate}
          dueDate={task.dueDate}
          description={task.description}
        />

      ))}

    </div>
  );
}