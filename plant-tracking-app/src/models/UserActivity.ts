import { ObjectId } from "mongodb";

export interface UserActivity {
  _id?: ObjectId;
  email: string;
  week: Date;
  badges: Array<string>;
  plants: number;
  streak: number;
}

export interface UserTotal {
  _id?: ObjectId;
  email: string;
  totalBadges: number;
  totalPlants: number;
  maxStreak: number;
}
