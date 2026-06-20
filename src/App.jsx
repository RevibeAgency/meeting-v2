import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import MainLayout from "./layout/MainLayout";

import ChatGenie from "./pages/ChatGenie/ChatGenie";
import MemoryCapture from "./pages/MemoryCapture/MemoryCapture";
import MeetingHub from "./pages/MeetingHub/MeetingHub";
import ActionTracker from "./pages/ActionTracker/ActionTracker";
import AllTasks from "./pages/AllTasks/AllTasks";
import PitchDecks from "./pages/PitchDecks/PitchDecks";


import MeetingAnalysisLoader from "./components/MeetingAnalysisLoader"; //have to remogve it later eta shudu debug er jonno 

import "./layout/layout.css";

function App() {
  const [activePage, setActivePage] = useState("chat");

  // =========================
  // GLOBAL STATES
  // =========================

  const [chatMessages, setChatMessages] = useState([]);
  const [meetingData, setMeetingData] = useState(null);

  const [storedTasks, setStoredTasks] = useState([]);
  const [memoryTasks, setMemoryTasks] = useState([]);

  // useEffect(() => {

  //   const fetchTasks = async () => {

  //     const { data, error } = await supabase
  //       .from("tasks")
  //       .select("*")
  //       .order("created_at", {
  //         ascending: false,
  //       });

  //     if (!error) {
  //       setStoredTasks(data || []);
  //     }
  //   };

  //   fetchTasks();

  // }, []);

  const syncTaskStatusEverywhere = (taskId, newStatus) => {
    // UPDATE GLOBAL TASKS
    setStoredTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );

    // UPDATE ALL CHAT TASK CARDS
    setChatMessages((prev) =>
      prev.map((msg) => {
        if (!msg.tasks) return msg;

        return {
          ...msg,

          tasks: msg.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: newStatus,
                }
              : task,
          ),
        };
      }),
    );
  };

  const DEBUG_LOADER = true;

  const renderPage = () => {
    if (DEBUG_LOADER) {
      return <MeetingLoading />;
    }
    switch (activePage) {
      case "memory":
        return (
          <MemoryCapture
            meetingData={meetingData}
            setMeetingData={setMeetingData}
            storedTasks={memoryTasks}
            setStoredTasks={setMemoryTasks}
            syncTaskStatusEverywhere={syncTaskStatusEverywhere}
          />
        );

      case "meeting":
        return <MeetingHub />;

      case "action":
        return <ActionTracker />;

      case "tasks":
      case "tasks":
        return (
          <AllTasks
            tasks={storedTasks}
            onStatusChange={syncTaskStatusEverywhere}
          />
        );

      case "deck":
        return <PitchDecks />;

      default:
        return (
          <ChatGenie
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            storedTasks={storedTasks}
            setStoredTasks={setStoredTasks}
            syncTaskStatusEverywhere={syncTaskStatusEverywhere}
          />
        );
    }
  };

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
