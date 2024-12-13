"use client";
import { useEffect } from "react";
import axios from "axios";

interface BadgeHandlerProps {
  userId: string;
  streakDays?: number;
  completedTasks?: number;
  uploadedPlants?: number;
  remindersSet?: number;
  wateredPlants?: number;
  fertilizedPlants?: number;
  repottedPlants?: number;
  growthTracked?: number;
  sharedPlants?: number;
  profileComplete?: boolean;
}

const BadgeHandler: React.FC<BadgeHandlerProps> = ({
  userId,
  streakDays,
  completedTasks,
  uploadedPlants,
  remindersSet,
  wateredPlants,
  fertilizedPlants,
  repottedPlants,
  growthTracked,
  sharedPlants,
  profileComplete,
}) => {
  useEffect(() => {
    const awardBadges = async () => {
      try {
        // Award Streak Badges
        if (streakDays) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getStreakBadgeId(streakDays),
          });
        }

        // Award Task Completion Badges
        if (completedTasks) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getTaskCompletionBadgeId(completedTasks),
          });
        }

        // Award Plant Upload Badges
        if (uploadedPlants) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getPlantUploadBadgeId(uploadedPlants),
          });
        }

        // Award Miscellaneous Badges
        if (remindersSet) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getReminderBadgeId(remindersSet),
          });
        }
        if (wateredPlants) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getWateringBadgeId(wateredPlants),
          });
        }
        if (fertilizedPlants) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getFertilizerBadgeId(fertilizedPlants),
          });
        }
        if (repottedPlants) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getRepottingBadgeId(repottedPlants),
          });
        }
        if (growthTracked) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getGrowthTrackingBadgeId(growthTracked),
          });
        }
        if (sharedPlants) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: getSharingBadgeId(sharedPlants),
          });
        }
        if (profileComplete) {
          await axios.post("/api/badges/award-badge", {
            userId,
            badgeId: "profile_complete",
          });
        }
      } catch (error) {
        console.error("Error awarding badge:", error);
      }
    };

    awardBadges();
  }, [
    userId,
    streakDays,
    completedTasks,
    uploadedPlants,
    remindersSet,
    wateredPlants,
    fertilizedPlants,
    repottedPlants,
    growthTracked,
    sharedPlants,
    profileComplete,
  ]);

  // Helper functions to get badge IDs based on criteria
  const getStreakBadgeId = (streakDays: number) => {
    if (streakDays >= 30) return "streak_30_days";
    if (streakDays >= 20) return "streak_20_days";
    if (streakDays >= 15) return "streak_15_days";
    if (streakDays >= 10) return "streak_10_days";
    if (streakDays >= 7) return "streak_7_days";
    if (streakDays >= 5) return "streak_5_days";
    if (streakDays >= 3) return "streak_3_days";
    return null;
  };

  const getTaskCompletionBadgeId = (completedTasks: number) => {
    if (completedTasks >= 50) return "task_50_completed";
    if (completedTasks >= 25) return "task_25_completed";
    if (completedTasks >= 10) return "task_10_completed";
    if (completedTasks >= 5) return "task_5_completed";
    return null;
  };

  const getPlantUploadBadgeId = (uploadedPlants: number) => {
    if (uploadedPlants >= 50) return "plant_50_uploaded";
    if (uploadedPlants >= 20) return "plant_20_uploaded";
    if (uploadedPlants >= 10) return "plant_10_uploaded";
    if (uploadedPlants >= 5) return "plant_5_uploaded";
    if (uploadedPlants >= 1) return "plant_1_uploaded";
    return null;
  };

  const getReminderBadgeId = (remindersSet: number) => {
    if (remindersSet >= 20) return "reminder_20_set";
    if (remindersSet >= 5) return "reminder_5_set";
    return null;
  };

  const getWateringBadgeId = (wateredPlants: number) => {
    if (wateredPlants >= 50) return "water_50_plants";
    if (wateredPlants >= 10) return "water_10_plants";
    return null;
  };

  const getFertilizerBadgeId = (fertilizedPlants: number) => {
    if (fertilizedPlants >= 25) return "fertilizer_25_used";
    if (fertilizedPlants >= 5) return "fertilizer_5_used";
    return null;
  };

  const getRepottingBadgeId = (repottedPlants: number) => {
    if (repottedPlants >= 10) return "repot_10_plants";
    if (repottedPlants >= 1) return "repot_1_plant";
    return null;
  };

  const getGrowthTrackingBadgeId = (growthTracked: number) => {
    if (growthTracked >= 20) return "plant_growth_20_tracked";
    if (growthTracked >= 5) return "plant_growth_5_tracked";
    return null;
  };

  const getSharingBadgeId = (sharedPlants: number) => {
    if (sharedPlants >= 10) return "shared_plant_10";
    if (sharedPlants >= 1) return "shared_plant_1";
    return null;
  };

  return null;
};

export default BadgeHandler;
