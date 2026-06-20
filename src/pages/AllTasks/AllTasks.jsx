import { useState, useEffect } from "react";
import "./alltasks.css";
import {
  CalendarGridIcon,
  FilterIcon,
  SearchIcon,
} from "../../assets/icons/Icons";
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
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
  
      if (!error) {
        setAllTasks(data || []);
      }
    };
  
    fetchTasks();
  }, []);
  const filteredTasks = allTasks.filter((task) => {
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
          {icon}
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
            icon={CalendarGridIcon}
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setDateRange("Quick Filters");
              }}
              dateFormat="MMM dd, yyyy"
              customInput={
                <button className="date-box">
                  <div className="icon">
                  {icon}
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
            icon={FilterIcon}
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
