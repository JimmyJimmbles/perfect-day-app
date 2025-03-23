import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use"; // <-- Import from react-use
import { generateItinerary } from "../utils";

const FinalResult = ({ answers, existingItinerary, onRestart }) => {
  // "phase" can be: "loading", "confetti", or "final"
  const [phase, setPhase] = useState("loading");

  // Capture window width/height for full-screen confetti
  const { width, height } = useWindowSize();

  const itinerary = existingItinerary || generateItinerary(answers);

  // On mount, store itinerary (if newly generated)
  useEffect(() => {
    if (!existingItinerary) {
      localStorage.setItem("finalItinerary", JSON.stringify(itinerary));
    }
  }, [itinerary, existingItinerary]);

  // Timeline:
  // 1) loading (2s)
  // 2) confetti (2s)
  // 3) final
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      // After 2s of loading, show confetti
      setPhase("confetti");

      const confettiTimer = setTimeout(() => {
        // Then after 2s of confetti, show final
        setPhase("final");
      }, 3000);

      return () => clearTimeout(confettiTimer);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin mb-4" />
          <p className="text-white text-xl font-semibold">
            Compiling your perfect day...
          </p>
        </motion.div>
      )}

      {phase === "confetti" && (
        <motion.div
          key="confetti"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen flex flex-col items-center justify-center"
        >
          {/* Full-screen confetti explosion */}
          <ReactConfetti
            // Force full screen
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={600}  // Increase for a bigger explosion
            gravity={0.6}         // Adjust how fast confetti falls
            tweenDuration={3000}  // How long confetti animates in/out
            // Optional: If you want it on top or behind other stuff
            style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
          />

          <p className="text-white text-2xl font-semibold mt-20 z-[10000]">
            Get Ready!
          </p>
        </motion.div>
      )}

      {phase === "final" && (
        <motion.div
          key="final"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto relative"
        >
          {/* -- ACTUAL FINAL RESULTS UI -- */}
          <div className="bg-white shadow rounded-md p-6 mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your Perfect Day!
            </h1>
            <p className="text-gray-600">
              Here’s a quick overview of your customized itinerary. Each card
              highlights a key stop or activity for your day.
            </p>
          </div>

          {/* Itinerary Items */}
          <div className="space-y-3">
            <ItineraryItem label="Hunger Level" value={itinerary.hunder} icon="🍽" />
            <ItineraryItem label="Food Stop" value={itinerary.food} icon="🥡" />
            <ItineraryItem label="Main Activity" value={itinerary.activity} icon="🏆" />
            <ItineraryItem label="Shopping Plan" value={itinerary.shopping} icon="🛍" />
            <ItineraryItem label="Cultural Stop" value={itinerary.culture} icon="🏛" />
            <ItineraryItem label="Bar Scene" value={itinerary.bar} icon="🍸" />
          </div>

          {/* Restart Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onRestart}
              className="inline-block w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-6 py-2"
            >
              Restart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ItineraryItem = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow rounded-md p-8 text-center">
      <h3 className="font-semibold text-gray-700 text-lg mb-2">
        {icon} {label}
      </h3>
      <p className="text-gray-600 text-md text-center">{value}</p>
    </div>
  );
};

export default FinalResult;
