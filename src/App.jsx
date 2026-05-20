import { useState, useEffect } from "react";

import MainLayout from "./layout/MainLayout";

import ChatGenie from "./pages/ChatGenie/ChatGenie";
import MemoryCapture from "./pages/MemoryCapture/MemoryCapture";
import MeetingHub from "./pages/MeetingHub/MeetingHub";
import ActionTracker from "./pages/ActionTracker/ActionTracker";
import AllTasks from "./pages/AllTasks/AllTasks";
import PitchDecks from "./pages/PitchDecks/PitchDecks";

import "./layout/layout.css";

function App() {
  const [activePage, setActivePage] = useState("chat");

  // =========================
  // GLOBAL STATES
  // =========================

  const [chatMessages, setChatMessages] = useState([]);
  const [meetingData, setMeetingData] = useState(null);

  const [storedTasks, setStoredTasks] = useState([]);


  const renderPage = () => {
    switch (activePage) {
      case "memory":
        return (
          <MemoryCapture
            meetingData={meetingData}
            setMeetingData={setMeetingData}
            storedTasks={storedTasks}
            setStoredTasks={setStoredTasks}
          />
        );

      case "meeting":
        return <MeetingHub />;

      case "action":
        return <ActionTracker />;

      case "tasks":
        return <AllTasks storedTasks={storedTasks} />;

      case "deck":
        return <PitchDecks />;

      default:
        return (
          <ChatGenie
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            storedTasks={storedTasks}
            setStoredTasks={setStoredTasks}
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
