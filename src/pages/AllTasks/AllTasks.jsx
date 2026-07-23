import { useState, useEffect, useRef } from "react";
import "./alltasks.css";
import {
  CalendarGridIcon,
  FilterIcon,
  SearchIcon,
  QuickFilter,
} from "../../assets/icons/Icons";
import Toolbar from "../../components/Kanban/Toolbar";
import StatusTabs from "../../components/Kanban/StatusTabs";
import KanbanBoard from "../../components/Kanban/KanbanBoard";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../../lib/supabase";

export default function AllTasks({ tasks = [], onStatusChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All Tasks");
  const [dateRange, setDateRange] = useState("Quick Filters");
  const datePickerRef = useRef(null);
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

    // Pending
    if (selectedFilter === "Pending") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status === "pending"
      );
    }

    // To Do
    if (selectedFilter === "To Do") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status === "todo"
      );
    }

    // On Progress
    if (selectedFilter === "On Progress") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status === "progress"
      );
    }

    // Done
    if (selectedFilter === "Done") {
      return (
        matchesSearch &&
        matchesDate &&
        matchesQuickFilter &&
        task.status === "completed"
      );
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
    <div className="alltasks-page">
      <Toolbar />

      <StatusTabs />

      <KanbanBoard
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
