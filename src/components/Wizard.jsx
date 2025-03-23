import React, { useState, useEffect } from "react";
import FinalResult from "./FinalResult";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "../data/questions";

function getSavedItinerary() {
  const saved = localStorage.getItem("finalItinerary");
  return saved ? JSON.parse(saved) : null;
}

const Wizard = ({ onRestartApp }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finalItinerary, setFinalItinerary] = useState(null);

  useEffect(() => {
    const saved = getSavedItinerary();
    if (saved) {
      // If we have a saved itinerary, skip the wizard
      setFinalItinerary(saved);
    }
  }, []);

  const totalSteps = QUESTIONS.length;

  const handleAnswerSelect = (questionId, answerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
  };

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);

  const restartWizard = () => {
    // Wipe everything
    setCurrentStep(0);
    setAnswers({});
    setFinalItinerary(null);
    localStorage.removeItem("finalItinerary");

    // Also tell the App to show the Start Screen
    onRestartApp();
  };

  if (finalItinerary) {
    return <FinalResult existingItinerary={finalItinerary} onRestart={restartWizard} />;
  }

  if (currentStep >= totalSteps) {
    // All questions answered; show final result
    return <FinalResult answers={answers} onRestart={restartWizard} />;
  }

  // ... Wizard UI ...
  const { id, questionText, options } = QUESTIONS[currentStep];
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-md w-full">
      <div className="bg-gray-800 shadow-md rounded-md p-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
          <div
            className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {questionText}
            </h2>

            <div className="space-y-3">
              {options.map((opt) => {
                const isSelected = answers[id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      handleAnswerSelect(id, opt.value);
                      goNext();
                    }}
                    className={`
                      w-full p-3 rounded-md text-left transition-colors 
                      border focus:outline-none focus:ring-2 focus:ring-indigo-400
                      ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              {currentStep > 0 ? (
                <button
                  onClick={goBack}
                  className="w-full sm:w-auto inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-6 py-2"
                >
                  Back
                </button>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-6 py-2 opacity-75 cursor-not-allowed"
                >
                  Let’s Plan Your Day!
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wizard;
