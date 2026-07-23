import "./KanbanBoard.css";

import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({

    tasks,

    onDelete,

    onStatusChange

}) {

    const pending =
        tasks.filter(t=>t.status==="pending");

    const todo =
        tasks.filter(t=>t.status==="todo");

    const progress =
        tasks.filter(t=>t.status==="progress");

    const done =
        tasks.filter(t=>t.status==="completed");

    return (

        <div className="kanban-board">

            <KanbanColumn
                title="Pending"
                color="#EAEAEA"
                tasks={pending}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />

            <KanbanColumn
                title="To do"
                color="#53A5FF"
                tasks={todo}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />

            <KanbanColumn
                title="On progress"
                color="#F59F45"
                tasks={progress}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />

            <KanbanColumn
                title="Done"
                color="#65C29A"
                tasks={done}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />

        </div>

    );

}