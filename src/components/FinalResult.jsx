import React, { useEffect } from "react";
import { generateItinerary } from "../utils";

const FinalResult = ({ answers, existingItinerary, onRestart }) => {
  // If we have an existingItinerary, use that; otherwise generate from answers
  const itinerary = existingItinerary || generateItinerary(answers);

  useEffect(() => {
    if (!existingItinerary) {
      localStorage.setItem("finalItinerary", JSON.stringify(itinerary));
    }
  }, [itinerary, existingItinerary]);

  return (
    <div className="max-w-md mx-auto p-2">
      {/* Header Section */}
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
        <ItineraryItem
          label="Hunger Level"
          value={itinerary.hunder}
          icon="🍽"
        />
        <ItineraryItem
          label="Food Stop"
          value={itinerary.food}
          icon="🥡"
        />
        <ItineraryItem
          label="Main Activity"
          value={itinerary.activity}
          icon="🏆"
        />
        <ItineraryItem
          label="Shopping Plan"
          value={itinerary.shopping}
          icon="🛍"
        />
        <ItineraryItem
          label="Cultural Stop"
          value={itinerary.culture}
          icon="🏛"
        />
        <ItineraryItem
          label="Bar Scene"
          value={itinerary.bar}
          icon="🍸"
        />
      </div>

      {/* Restart Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onRestart}
          className="inline-block w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-6 py-2 block w-full"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

/**
 * A small, reusable component to display a single
 * itinerary item in a card-like UI.
 */
const ItineraryItem = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow rounded-md p-8 text-center">
        <h3 className="font-semibold text-gray-700 text-lg mb-2">{icon} {label}</h3>
        <p className="text-gray-600 text-md text-center">{value}</p>
    </div>
  );
};

export default FinalResult;
