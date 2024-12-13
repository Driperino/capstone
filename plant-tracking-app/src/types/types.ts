// User data for gamification
export type GamificationData = {
  badges: number;
  plants: number;
  streak: number;
  earnedBadges: Array<string>;
};

// Badge details fetched for display
export type BadgeDetail = {
  id: string;
  name: string;
  description: string;
};

// Extended session user type
export interface ExtendedSessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  setupCompleted?: boolean;
  earnedBadges?: string[];
  uploadedPlants?: number;
  streakDays?: number;
}
