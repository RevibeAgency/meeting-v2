import "./KanbanBoard.css";
import TaskCard from "../TaskCard/TaskCard";

export default function KanbanColumn({
    title,
    color,
    tasks,
    onDelete,
    onStatusChange
}) {
    return (
        <div className="kanban-column">

            <div className="kanban-column-header">

                <div className="kanban-title">

                    <div
                        className="kanban-dot"
                        style={{ background: color }}
                    />

                    <span>{title}</span>

                </div>

                <span className="task-count">
                    {tasks.length}
                </span>

            </div>

            <div className="kanban-task-list">

                {tasks.map((task,index)=>(
                    <TaskCard

                        key={task.id}

                        {...task}

                        taskNumber={`Task ${index+1}`}

                        createdDate={task.created_at}

                        dueDate={task.deadline}

                        showDelete={true}

                        onDelete={onDelete}

                        onStatusChange={onStatusChange}

                    />
                ))}

            </div>

        </div>
    );
}