import React, { useEffect, useState } from "react";
import './App.css';
import Wizard from "./components/Wizard";
import StartScreen from "./components/StartScreen";

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  useEffect(() => {
    // On mount, check if a final itinerary is already saved.
    // If so, skip the StartScreen and go straight to the Wizard/FinalResult.
    const saved = localStorage.getItem("finalItinerary");
    if (saved) {
      setShowStartScreen(false);
    }
  }, []);

  const handleStart = () => {
    // User clicked "Get Started" on the StartScreen
    setShowStartScreen(false);
  };

  const handleRestart = () => {
    // This is called when the user restarts from the FinalResult
    // or wants to reset everything.
    localStorage.removeItem("finalItinerary");
    setShowStartScreen(true);
  };

  return (
    <div className="App min-h-screen bg-gray-900 p-2 flex items-center justify-center flex-col">
      {showStartScreen ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <Wizard onRestartApp={handleRestart} />
      )}
    </div>
  );
}

export default App;
