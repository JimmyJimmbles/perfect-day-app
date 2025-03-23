import React from "react";

const StartScreen = ({ onStart }) => {
  return (
    <>
    <h2 className="text-3xl font-bold mt-8 mb-6 text-white">☀️ Your Perfect Day ☀️</h2>
    <div className="flex flex-col items-center justify-center text-white px-4 py-8 w-full max-w-md bg-gray-800 rounded-md shadow-md mx-auto">
      <p className="text-lg text-white mb-2 leading-7">
        Ready for a day without the hassle of planning?
      </p>
      <p className="text-lg text-white mb-6 leading-7">
        Simply pick your vibes, and 
        let <code className="bg-gray-900 text-green-200 px-2 py-1 rounded-lg overflow-x-auto text-sm font-mono">GHXST_TECH</code>  assemble a perfect itinerary for you!
      </p>
      <button
        onClick={onStart}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-6 py-2 transition-colors"
      >
        Get Started
      </button>
    </div>
    </>
  );
};

export default StartScreen;
