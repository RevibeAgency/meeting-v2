import { useState } from "react";
import "./alltasks.css";
import TaskGrid from "../../components/TaskCard/TaskGrid";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../../lib/supabase";

export default function AllTasks({ tasks = [], onStatusChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All Tasks");
  const [dateRange, setDateRange] = useState("Quick Filters");
  const filteredTasks = tasks.filter((task) => {
    const searchText = `
      ${task.assignee || ""}
      ${task.topic || ""}
      ${task.tag || ""}
      ${task.description || ""}
    `.toLowerCase();

    const matchesSearch = searchText.includes(searchQuery.toLowerCase());

    const today = new Date();

    const isOverdue =
      task.due_date &&
      new Date(task.due_date) < today &&
      task.status !== "completed";

    // DATE FILTER
    const selectedDateString = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1,
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : null;

    let matchesDate = true;

    if (selectedDate) {
      matchesDate = task.created_at.slice(0, 10) === selectedDateString;
    }

    const taskDate = new Date(task.created_at);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let matchesQuickFilter = true;

    if (dateRange === "Quick Filters") {
      matchesQuickFilter = true;
    }

    if (dateRange === "Today") {
      matchesQuickFilter = taskDate.toDateString() === today.toDateString();
    }

    if (dateRange === "This Week") {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      matchesQuickFilter = taskDate >= startOfWeek && taskDate < endOfWeek;
    }

    if (dateRange === "This Month") {
      matchesQuickFilter =
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear();
    }

    if (selectedFilter === "Pending") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status !== "completed"
      );
    }

    if (selectedFilter === "Completed") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status === "completed"
      );
    }

    if (selectedFilter === "Overdue") {
      return matchesSearch && matchesDate && matchesQuickFilter && isOverdue;
    }

    return matchesSearch && matchesDate && matchesQuickFilter;
  });

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const date = new Date(task.created_at);

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    let label;

    if (date.toDateString() === today.toDateString()) {
      label = `TODAY, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = `YESTERDAY, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      label = date.toLocaleString([], {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (!groups[label]) {
      groups[label] = [];
    }

    groups[label].push(task);

    return groups;
  }, {});

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task permanently?");

    if (!confirmed) return;

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error(error);
      return;
    }

    window.location.reload();
  };
  return (
    <div className="central-taskpage">
      <div className="wrapper-central">
        <div className="search-wrapper">
          <div className="search-icon" onClick={() => setSearchQuery("")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9999 21.0002L16.6599 16.6602"
                stroke="#BDBDBD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#BDBDBD"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <input
            type="text"
            className="search-bar"
            placeholder="Search all tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* TOP BAR */}
        <div className="utility-bar">
          {/* SEARCH */}
          <h1 className="header">Tasks</h1>

          <div className="utility-wrap">
            {/* DATE */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setDateRange("Quick Filters");
              }}
              dateFormat="MMM dd, yyyy"
              customInput={
                <button className="date-box">
                  <div className="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 2V6"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M16 2V6"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H16L21 17Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M3 10H21"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M15 22V18C15 17.4696 15.2107 16.9609 15.5858 16.5858C15.9609 16.2107 16.4696 16 17 16H21"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span>{(selectedDate || new Date()).toDateString()}</span>
                </button>
              }
            />
            <PrimaryButton
              selected={dateRange}
              setSelected={(value) => {
                setDateRange(value);
                setSelectedDate(null);
              }}
              options={["Quick Filters", "Today", "This Week", "This Month"]}
            />
            {/* FILTER BUTTON */}
            <PrimaryButton
              selected={selectedFilter}
              setSelected={setSelectedFilter}
              options={["All Tasks", "Pending", "Completed", "Overdue"]}
            />
          </div>
        </div>

        {/* TASK GRID */}
        {/* TASK GRID */}
        <div className="task-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-task-state">
              {selectedDate
                ? "No tasks found for this date"
                : dateRange !== "Quick Filters"
                  ? `No tasks found for ${dateRange}`
                  : "No tasks analyzed yet..."}
            </div>
          ) : (
            <>
              {Object.entries(groupedTasks).map(([label, taskGroup]) => (
                <div key={label}>
                  <div className="display-date">{label}</div>

                  <TaskGrid
                    tasks={taskGroup}
                    onStatusChange={onStatusChange}
                    showDelete={true}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
