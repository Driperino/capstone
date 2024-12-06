type Badge = {
  id: string;
  name: string;
  description: string;
  criteria: string;
};

const badges: Badge[] = [
  // Visit Streak Badges
  {
    id: "streak_3_days",
    name: "Three-Day Streak",
    description: "Logged activity for 3 consecutive days!",
    criteria: "3 consecutive days of activity",
  },
  {
    id: "streak_5_days",
    name: "Five-Day Streak",
    description: "Logged activity for 5 consecutive days!",
    criteria: "5 consecutive days of activity",
  },
  {
    id: "streak_7_days",
    name: "One-Week Streak",
    description: "Logged activity for 7 consecutive days!",
    criteria: "7 consecutive days of activity",
  },
  {
    id: "streak_10_days",
    name: "Ten-Day Streak",
    description: "Logged activity for 10 consecutive days!",
    criteria: "10 consecutive days of activity",
  },
  {
    id: "streak_15_days",
    name: "Half-Month Streak",
    description: "Logged activity for 15 consecutive days!",
    criteria: "15 consecutive days of activity",
  },
  {
    id: "streak_20_days",
    name: "Twenty-Day Streak",
    description: "Logged activity for 20 consecutive days!",
    criteria: "20 consecutive days of activity",
  },
  {
    id: "streak_30_days",
    name: "Month-Long Streak",
    description: "Logged activity for 30 consecutive days!",
    criteria: "30 consecutive days of activity",
  },

  // Task Completion Badges
  {
    id: "task_5_completed",
    name: "Task Tinkerer",
    description: "Completed 5 tasks within the app!",
    criteria: "Complete 5 tasks",
  },
  {
    id: "task_10_completed",
    name: "Task Master",
    description: "Completed 10 tasks within the app!",
    criteria: "Complete 10 tasks",
  },
  {
    id: "task_25_completed",
    name: "Task Guru",
    description: "Completed 25 tasks within the app!",
    criteria: "Complete 25 tasks",
  },
  {
    id: "task_50_completed",
    name: "Task Overlord",
    description: "Completed 50 tasks within the app!",
    criteria: "Complete 50 tasks",
  },

  // Plant Upload Badges
  {
    id: "plant_1_uploaded",
    name: "First Plant",
    description: "Uploaded your first plant!",
    criteria: "Upload 1 plant",
  },
  {
    id: "plant_5_uploaded",
    name: "Budding Botanist",
    description: "Uploaded 5 plants!",
    criteria: "Upload 5 plants",
  },
  {
    id: "plant_10_uploaded",
    name: "Green Thumb",
    description: "Uploaded 10 plants!",
    criteria: "Upload 10 plants",
  },
  {
    id: "plant_20_uploaded",
    name: "Garden Enthusiast",
    description: "Uploaded 20 plants!",
    criteria: "Upload 20 plants",
  },
  {
    id: "plant_50_uploaded",
    name: "Plant Collector",
    description: "Uploaded 50 plants!",
    criteria: "Upload 50 plants",
  },

  // Miscellaneous Badges
  {
    id: "reminder_5_set",
    name: "Reminder Setter",
    description: "Set 5 reminders for your plant care routine!",
    criteria: "Set 5 reminders",
  },
  {
    id: "reminder_20_set",
    name: "Diligent Gardener",
    description: "Set 20 reminders for your plant care routine!",
    criteria: "Set 20 reminders",
  },
  {
    id: "water_10_plants",
    name: "Watering Novice",
    description: "Watered 10 different plants!",
    criteria: "Water 10 plants",
  },
  {
    id: "water_50_plants",
    name: "Irrigation Expert",
    description: "Watered 50 different plants!",
    criteria: "Water 50 plants",
  },
  {
    id: "fertilizer_5_used",
    name: "Fertilizer Beginner",
    description: "Used fertilizer on 5 plants!",
    criteria: "Fertilize 5 plants",
  },
  {
    id: "fertilizer_25_used",
    name: "Soil Enricher",
    description: "Used fertilizer on 25 plants!",
    criteria: "Fertilize 25 plants",
  },
  {
    id: "repot_1_plant",
    name: "Repotting Rookie",
    description: "Repotted your first plant!",
    criteria: "Repot 1 plant",
  },
  {
    id: "repot_10_plants",
    name: "Repotting Pro",
    description: "Repotted 10 plants!",
    criteria: "Repot 10 plants",
  },
  {
    id: "plant_growth_5_tracked",
    name: "Growth Observer",
    description: "Tracked the growth of 5 plants!",
    criteria: "Track growth for 5 plants",
  },
  {
    id: "plant_growth_20_tracked",
    name: "Growth Specialist",
    description: "Tracked the growth of 20 plants!",
    criteria: "Track growth for 20 plants",
  },
  {
    id: "profile_complete",
    name: "Profile Perfectionist",
    description: "Completed your profile setup!",
    criteria: "Complete profile setup",
  },
  {
    id: "shared_plant_1",
    name: "Sharing is Caring",
    description: "Shared your first plant with the community!",
    criteria: "Share 1 plant",
  },
  {
    id: "shared_plant_10",
    name: "Community Contributor",
    description: "Shared 10 plants with the community!",
    criteria: "Share 10 plants",
  },
];

export default badges;
