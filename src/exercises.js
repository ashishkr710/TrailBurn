/**
 * TrailBurn Exercise Database
 * 
 * MET (Metabolic Equivalent of Task) values sourced from the 
 * 2011 Compendium of Physical Activities by Ainsworth et al.
 * 
 * Calorie Calculation Formula:
 * Calories = MET x weight(kg) x duration(hours)
 * 
 * Each exercise has MET values for different intensity levels.
 */

export const exercises = [
  // ===== TRAIL / HIKING =====
  {
    id: "hiking_easy",
    name: "Easy Trail Walk",
    emoji: "🥾",
    category: "Trail",
    environment: "trail",
    met: { beginner: 3.5, intermediate: 3.5, advanced: 3.5 },
    intensity: 1,
    description: "A gentle walk on flat to mildly inclined trails. Great for beginners and recovery days.",
    tip: "Start with well-marked trails. Bring water and wear comfortable shoes with good grip.",
    benefits: ["Stress reduction", "Joint-friendly", "Mental clarity"]
  },
  {
    id: "hiking_moderate",
    name: "Moderate Hiking",
    emoji: "⛰️",
    category: "Trail",
    environment: "trail",
    met: { beginner: 5.3, intermediate: 6.0, advanced: 6.5 },
    intensity: 2,
    description: "Hiking on varied terrain with moderate elevation gain. A solid workout in nature.",
    tip: "Use trekking poles to reduce knee strain on descents. Pack a snack for hikes over 90 minutes.",
    benefits: ["Leg strength", "Cardiovascular fitness", "Endurance"]
  },
  {
    id: "hiking_steep",
    name: "Steep Hill Hiking",
    emoji: "🏔️",
    category: "Trail",
    environment: "trail",
    met: { beginner: 7.0, intermediate: 7.8, advanced: 8.5 },
    intensity: 3,
    description: "Challenging ascents with significant elevation. A powerful full-body workout.",
    tip: "Take it slow on steep ascents - pacing is everything. Breathe rhythmically and use short steps.",
    benefits: ["Glute activation", "Core stability", "Mental toughness"]
  },
  {
    id: "trail_running",
    name: "Trail Running",
    emoji: "🏃‍♂️",
    category: "Trail",
    environment: "trail",
    met: { beginner: 8.0, intermediate: 9.5, advanced: 11.0 },
    intensity: 4,
    description: "Running on natural terrain with roots, rocks, and elevation changes.",
    tip: "Watch your footing! Trail running demands more focus than road running. Start with easier trails.",
    benefits: ["Agility", "Ankle strength", "Full-body coordination"]
  },

  // ===== PARK =====
  {
    id: "walking_brisk",
    name: "Brisk Park Walk",
    emoji: "🚶",
    category: "Park",
    environment: "park",
    met: { beginner: 3.8, intermediate: 4.3, advanced: 5.0 },
    intensity: 1,
    description: "A purposeful walk at a pace that gets your heart rate up slightly.",
    tip: "Swing your arms naturally and maintain an upright posture. Walk like you are late for something pleasant!",
    benefits: ["Heart health", "Mood boost", "Low impact"]
  },
  {
    id: "jogging",
    name: "Park Jogging",
    emoji: "🏃",
    category: "Park",
    environment: "park",
    met: { beginner: 7.0, intermediate: 8.3, advanced: 9.8 },
    intensity: 3,
    description: "Steady-paced jogging through park paths. A classic outdoor cardio workout.",
    tip: "Run at a pace where you can still hold a conversation. The talk test is your best guide.",
    benefits: ["Cardiovascular endurance", "Weight management", "Bone density"]
  },
  {
    id: "outdoor_yoga",
    name: "Outdoor Yoga",
    emoji: "🧘",
    category: "Park",
    environment: "park",
    met: { beginner: 2.5, intermediate: 3.0, advanced: 4.0 },
    intensity: 1,
    description: "Yoga practice in a park or garden. Fresh air amplifies the mind-body connection.",
    tip: "Bring a mat and find a level, shaded spot. Morning sessions in the park are especially calming.",
    benefits: ["Flexibility", "Balance", "Stress relief"]
  },
  {
    id: "outdoor_calisthenics",
    name: "Park Calisthenics",
    emoji: "💪",
    category: "Park",
    environment: "park",
    met: { beginner: 5.0, intermediate: 6.5, advanced: 8.0 },
    intensity: 3,
    description: "Bodyweight exercises using park benches, bars, and open space.",
    tip: "Use park benches for step-ups, incline push-ups, and tricep dips. Monkey bars are amazing for pull-ups!",
    benefits: ["Functional strength", "No equipment needed", "Full-body workout"]
  },
  {
    id: "frisbee",
    name: "Frisbee / Disc Golf",
    emoji: "🥏",
    category: "Park",
    environment: "park",
    met: { beginner: 3.0, intermediate: 3.5, advanced: 4.0 },
    intensity: 1,
    description: "Throwing and chasing a frisbee in the park. Social, fun, and deceptively active.",
    tip: "Disc golf courses are often free and scattered across parks. A walking workout in disguise!",
    benefits: ["Hand-eye coordination", "Social activity", "Light cardio"]
  },
  {
    id: "soccer",
    name: "Outdoor Soccer",
    emoji: "⚽",
    category: "Park",
    environment: "park",
    met: { beginner: 7.0, intermediate: 8.5, advanced: 10.0 },
    intensity: 4,
    description: "Playing soccer outdoors - casual kickabout or pickup game.",
    tip: "Warm up your legs before playing. Even a casual kickabout burns serious calories with all the running and direction changes.",
    benefits: ["Agility", "Teamwork", "Sprint intervals"]
  },
  {
    id: "badminton",
    name: "Outdoor Badminton",
    emoji: "🏸",
    category: "Park",
    environment: "park",
    met: { beginner: 4.5, intermediate: 5.5, advanced: 7.0 },
    intensity: 2,
    description: "Playing badminton outdoors. Easy to set up and great fun.",
    tip: "Pick a calm day with little wind. Even casual rallies give you a surprisingly good workout!",
    benefits: ["Reflexes", "Arm and leg workout", "Social fun"]
  },

  // ===== WATER =====
  {
    id: "swimming_leisure",
    name: "Leisure Swimming",
    emoji: "🏊",
    category: "Water",
    environment: "water",
    met: { beginner: 4.8, intermediate: 5.8, advanced: 6.8 },
    intensity: 2,
    description: "Relaxed swimming in a lake, pool, or ocean. Full-body and zero-impact.",
    tip: "Outdoor swimming in natural bodies of water is invigorating. Always swim where it is safe and allowed.",
    benefits: ["Full-body workout", "Zero impact", "Cooling"]
  },
  {
    id: "swimming_laps",
    name: "Lap Swimming",
    emoji: "🏊‍♂️",
    category: "Water",
    environment: "water",
    met: { beginner: 7.0, intermediate: 8.3, advanced: 9.8 },
    intensity: 3,
    description: "Structured lap swimming with continuous strokes. An excellent cardio workout.",
    tip: "Mix up your strokes - freestyle, backstroke, breaststroke - to work different muscle groups.",
    benefits: ["Cardiovascular fitness", "Muscle toning", "Lung capacity"]
  },
  {
    id: "kayaking",
    name: "Kayaking",
    emoji: "🛶",
    category: "Water",
    environment: "water",
    met: { beginner: 3.5, intermediate: 5.0, advanced: 7.0 },
    intensity: 2,
    description: "Paddling a kayak on rivers, lakes, or the ocean. Upper body heaven.",
    tip: "Engage your core with each stroke, not just your arms. Rotate your torso for efficient paddling.",
    benefits: ["Upper body strength", "Core stability", "Nature immersion"]
  },
  {
    id: "paddleboarding",
    name: "Stand-Up Paddleboarding",
    emoji: "🏄",
    category: "Water",
    environment: "water",
    met: { beginner: 3.8, intermediate: 5.0, advanced: 6.5 },
    intensity: 2,
    description: "Balancing and paddling on a stand-up paddleboard. Amazing for core strength.",
    tip: "Keep your gaze on the horizon, not your feet. Your core does most of the balancing work.",
    benefits: ["Balance", "Core strength", "Full-body engagement"]
  },
  {
    id: "surfing",
    name: "Surfing",
    emoji: "🏄‍♂️",
    category: "Water",
    environment: "water",
    met: { beginner: 5.0, intermediate: 6.0, advanced: 7.5 },
    intensity: 3,
    description: "Catching and riding waves. Paddling out is the real workout.",
    tip: "The paddle-out burns as many calories as the riding. Do not underestimate the arm workout!",
    benefits: ["Upper body power", "Balance", "Ocean connection"]
  },

  // ===== URBAN =====
  {
    id: "cycling_casual",
    name: "Casual Cycling",
    emoji: "🚲",
    category: "Urban",
    environment: "urban",
    met: { beginner: 4.0, intermediate: 5.5, advanced: 6.8 },
    intensity: 2,
    description: "Easy-paced cycling through city streets, bike paths, or along waterways.",
    tip: "Plan a route with bike lanes. Urban cycling is great for errands - replace one car trip with a bike ride!",
    benefits: ["Low impact", "Eco-friendly transport", "Leg strength"]
  },
  {
    id: "cycling_vigorous",
    name: "Vigorous Cycling",
    emoji: "🚴",
    category: "Urban",
    environment: "urban",
    met: { beginner: 8.0, intermediate: 10.0, advanced: 12.0 },
    intensity: 4,
    description: "Fast-paced cycling or hill climbs. One of the best calorie-burning activities.",
    tip: "Alternate between high-intensity sprints and recovery cruising for maximum calorie burn.",
    benefits: ["Massive calorie burn", "Leg power", "Cardiovascular peak"]
  },
  {
    id: "roller_skating",
    name: "Roller Skating",
    emoji: "⛸️",
    category: "Urban",
    environment: "urban",
    met: { beginner: 5.5, intermediate: 7.0, advanced: 9.0 },
    intensity: 3,
    description: "Skating through smooth urban paths. A retro workout that is making a comeback.",
    tip: "Wear protective gear! Waterfront paths and smooth park loops are ideal for skating.",
    benefits: ["Balance", "Glute workout", "Pure fun"]
  },
  {
    id: "jump_rope_outdoor",
    name: "Outdoor Jump Rope",
    emoji: "🪢",
    category: "Urban",
    environment: "urban",
    met: { beginner: 8.8, intermediate: 10.0, advanced: 12.3 },
    intensity: 5,
    description: "Jumping rope in a park, driveway, or outdoor space. Maximum calorie burn per minute.",
    tip: "Start with 30-second intervals with 15-second rest. Even 10 minutes is a killer workout.",
    benefits: ["Extreme calorie burn", "Coordination", "Portable workout"]
  },
  {
    id: "stair_climbing",
    name: "Outdoor Stair Climbing",
    emoji: "🪜",
    category: "Urban",
    environment: "urban",
    met: { beginner: 6.0, intermediate: 8.8, advanced: 10.5 },
    intensity: 4,
    description: "Climbing outdoor stairs - stadium steps, park stairs, or building steps.",
    tip: "Find public stairs or stadium seating. Do repeats - up fast, walk down slow for recovery.",
    benefits: ["Leg power", "Cardiovascular blast", "Glute builder"]
  },
  {
    id: "power_walking",
    name: "Power Walking",
    emoji: "🚶‍♀️",
    category: "Urban",
    environment: "urban",
    met: { beginner: 4.5, intermediate: 5.0, advanced: 6.3 },
    intensity: 2,
    description: "Walking at a fast, purposeful pace through city streets or boardwalks.",
    tip: "Pump your arms and take quick, shorter strides. Listen to upbeat music to keep the pace up!",
    benefits: ["Low impact", "Heart health", "Accessible anywhere"]
  },

  // ===== GARDEN =====
  {
    id: "gardening_light",
    name: "Light Gardening",
    emoji: "🌻",
    category: "Garden",
    environment: "garden",
    met: { beginner: 2.3, intermediate: 3.0, advanced: 3.5 },
    intensity: 1,
    description: "Planting flowers, watering, light weeding. Therapeutic and physically active.",
    tip: "Use proper posture when bending - squat instead of hunching. Gardening is a stealth workout!",
    benefits: ["Mental health", "Vitamin D", "Functional movement"]
  },
  {
    id: "gardening_heavy",
    name: "Heavy Garden Work",
    emoji: "🪴",
    category: "Garden",
    environment: "garden",
    met: { beginner: 4.0, intermediate: 5.0, advanced: 6.0 },
    intensity: 2,
    description: "Digging, hauling soil, raking, and heavy-duty garden maintenance.",
    tip: "Alternate between tasks to avoid overworking one muscle group. Digging is a phenomenal core workout.",
    benefits: ["Functional strength", "Productivity", "Food growing"]
  },
  {
    id: "lawn_mowing",
    name: "Push Mowing",
    emoji: "🌱",
    category: "Garden",
    environment: "garden",
    met: { beginner: 4.5, intermediate: 5.5, advanced: 6.0 },
    intensity: 2,
    description: "Mowing the lawn with a push mower. A classic yard workout.",
    tip: "A push mower (non-motorized) burns significantly more calories. Walk briskly behind the mower.",
    benefits: ["Arm and leg workout", "Yard maintenance", "Fresh air"]
  },
  {
    id: "wood_chopping",
    name: "Wood Chopping",
    emoji: "🪓",
    category: "Garden",
    environment: "garden",
    met: { beginner: 5.0, intermediate: 6.3, advanced: 7.5 },
    intensity: 3,
    description: "Splitting and chopping firewood. A primal, powerful full-body exercise.",
    tip: "Focus on hip drive, not arm strength. Keep your core tight and let gravity help on the downswing.",
    benefits: ["Core power", "Grip strength", "Stress relief"]
  },
  {
    id: "raking",
    name: "Raking Leaves",
    emoji: "🍂",
    category: "Garden",
    environment: "garden",
    met: { beginner: 3.5, intermediate: 4.0, advanced: 4.5 },
    intensity: 1,
    description: "Raking fall leaves. A seasonal workout that doubles as satisfying yard work.",
    tip: "Switch sides regularly to balance the workout. Bag the leaves for extra lifting reps!",
    benefits: ["Upper body", "Autumn vibes", "Yard cleanup"]
  }
];

/**
 * Calculate calories burned for an exercise
 * @param {Object} exercise - Exercise object from the database
 * @param {number} weightKg - User weight in kilograms
 * @param {string} level - Fitness level: beginner, intermediate, or advanced
 * @param {number} durationMinutes - Duration in minutes
 * @returns {number} Estimated calories burned
 */
export function calculateCalories(exercise, weightKg, level, durationMinutes) {
  const met = exercise.met[level] || exercise.met.intermediate;
  const durationHours = durationMinutes / 60;
  return Math.round(met * weightKg * durationHours);
}

/**
 * Calculate duration needed to burn target calories
 * @param {Object} exercise - Exercise object from the database
 * @param {number} weightKg - User weight in kilograms
 * @param {string} level - Fitness level
 * @param {number} targetCalories - Target calories to burn
 * @returns {number} Duration in minutes
 */
export function calculateDuration(exercise, weightKg, level, targetCalories) {
  const met = exercise.met[level] || exercise.met.intermediate;
  if (met === 0 || weightKg === 0) return 0;
  const durationHours = targetCalories / (met * weightKg);
  return Math.round(durationHours * 60);
}

/**
 * Get filtered and sorted exercise recommendations
 * @param {Object} params - Filter parameters
 * @param {number} params.weightKg - User weight in kg
 * @param {number} params.targetCalories - Target calories to burn
 * @param {string} params.level - Fitness level
 * @param {string} params.environment - Preferred environment (all for any)
 * @param {number|null} params.maxMinutes - Maximum available time in minutes
 * @returns {Array} Sorted array of exercise recommendations
 */
export function getRecommendations({ weightKg, targetCalories, level, environment, maxMinutes }) {
  let filtered = exercises;

  // Filter by environment
  if (environment && environment !== "all") {
    filtered = filtered.filter(ex => ex.environment === environment);
  }

  // Calculate duration for each exercise
  const results = filtered.map(exercise => {
    const duration = calculateDuration(exercise, weightKg, level, targetCalories);
    const metValue = exercise.met[level] || exercise.met.intermediate;
    const caloriesPerMinute = (metValue * weightKg) / 60;

    return {
      ...exercise,
      duration,
      met: metValue,
      caloriesPerMinute: Math.round(caloriesPerMinute * 10) / 10,
      fitsInTime: maxMinutes ? duration <= maxMinutes : true
    };
  });

  // Sort: exercises that fit in available time first, then by duration (shortest first)
  results.sort((a, b) => {
    if (maxMinutes) {
      if (a.fitsInTime && !b.fitsInTime) return -1;
      if (!a.fitsInTime && b.fitsInTime) return 1;
    }
    return a.duration - b.duration;
  });

  return results;
}
