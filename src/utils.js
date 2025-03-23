import {
    foodSpots,
    foodTypeOverlays,
    vibeActivities,
    shoppingMap,
    cultureMap,
    barSceneMap,
    fancyMap,
  } from "./data/mappings";

  
  function pickRandom(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  /**
   * Generate an itinerary object with all the final picks.
   * @param {Object} answers - The user's answers from the wizard
   * @returns {Object} itinerary
   */
  export function generateItinerary(answers) {
    const {
      vibe,
      hunger,
      foodType,
      shopping,
      culture,
      barScene,
    } = answers;
  
    // ----- 1) Decide the food spot -----
    const hungerLvl = foodSpots[hunger];
    let possibleFood = foodSpots[hunger];
    if (!possibleFood) {
      // If user picked something outside the map (e.g. "flow") or doesn't exist
      // Grab all possible from the entire foodSpots object
      const allFood = Object.values(foodSpots).flat();
      possibleFood = allFood;
    }
    let chosenFood = pickRandom(possibleFood);
  
    // Apply overlay from foodType (if not "random")
    if (foodType !== "random" && foodTypeOverlays[foodType]) {
      const overlayList = foodTypeOverlays[foodType];
      // We can override or append. For now, let's override:
      chosenFood = pickRandom(overlayList);
    }
  
    // ----- 2) Main activity based on vibe -----
    let possibleActivities = vibeActivities[vibe];
    if (!possibleActivities) {
      // random from all vibe arrays if vibe is "flow"
      possibleActivities = Object.values(vibeActivities)
        .filter(Boolean)
        .flat();
    }
    const chosenActivity = pickRandom(possibleActivities);
  
    // ----- 3) Shopping -----
    let chosenShopping = shoppingMap[shopping];
    if (!chosenShopping) {
      const allShops = Object.values(shoppingMap).filter(Boolean);
      chosenShopping = pickRandom(allShops);
    }
  
    // ----- 4) Culture -----
    let chosenCulture = cultureMap[culture];
    if (!chosenCulture) {
      const allCultures = Object.values(cultureMap).filter(Boolean);
      chosenCulture = pickRandom(allCultures);
    }
  
    // ----- 5) Bar Scene -----
    let barRec = barSceneMap[barScene];
    let chosenBar = "";
    if (Array.isArray(barRec)) {
      // If it's an array (like "crawl" or "oneortwo"), pick random from that array
      chosenBar = pickRandom(barRec);
    } else if (!barRec) {
      // If user chose "random" or "seehow"
      chosenBar = barSceneMap.seehow;
      if (!chosenBar) {
        chosenBar = "Grab a drink wherever your heart leads you!";
      }
    } else {
      // It's a string (for "seehow")
      chosenBar = barRec;
    }
  
    return {
      hunder: hungerLvl,
      food: chosenFood,
      activity: chosenActivity,
      shopping: chosenShopping,
      culture: chosenCulture,
      bar: chosenBar,
    };
  }
  