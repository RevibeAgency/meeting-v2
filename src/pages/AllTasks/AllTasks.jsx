import { useState } from "react";

import "./alltasks.css";

import TaskGrid from "../../components/TaskCard/TaskGrid";

import IconButton from "../../components/Buttons/IconButton";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

export default function AllTasks({
  tasks = [],
  onStatusChange,
}) {

  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredTasks = tasks.filter((task) => {

    const searchText = `
      ${task.assignee || ""}
      ${task.topic || ""}
      ${task.tag || ""}
      ${task.description || ""}
    `.toLowerCase();

    return searchText.includes(
      searchQuery.toLowerCase()
    );
  });

  return (
    <div className="central-taskpage">

      <div className="wrapper-central">

        <h1 className="header">
          Tasks from Meetings
        </h1>

        {/* TOP BAR */}
        <div className="utility-bar">

          {/* SEARCH */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search all tasks..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          {/* LEFT ARROW */}
          <IconButton icon="←" />

          {/* DATE */}
          <div className="date-box">
            Nov 12,2025 - Dec 08,2025
          </div>

          {/* RIGHT ARROW */}
          <IconButton icon="→" />

          {/* FILTER BUTTON */}
          <PrimaryButton text="All Tasks" />

        </div>

        {/* TASK GRID */}
        <div className="task-section">

          <TaskGrid
            tasks={filteredTasks}
            onStatusChange={onStatusChange}
          />

        </div>

      </div>

    </div>
  );
}