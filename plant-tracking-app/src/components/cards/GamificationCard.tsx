"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";
import axios from "axios";

type GamificationData = {
  badges: number;
  plants: number;
  streak: number;
  recentBadges: string[];
};

export const GamificationCard = ({ userEmail }: { userEmail: string }) => {
  const [userData, setUserData] = useState<GamificationData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userEmail}`);
        const user = response.data;

        // Process user data as required for badges, plants, and streak
        setUserData({
          badges: user.earnedBadges?.length || 0,
          plants: user.uploadedPlants || 0,
          streak: user.streakDays || 0,
          recentBadges: user.earnedBadges?.slice(-10) || [],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  return (
    <MotionGrowAndFloat>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Gamification Station</CardTitle>
        </CardHeader>
        <CardContent>
          {userData ? (
            <div>
              <hr />
              <h3>Most Recent Badges</h3>
              <hr />
              <ol>
                {userData.recentBadges.map((badge, index) => (
                  <li key={index}>{badge}</li>
                ))}
              </ol>
              <hr />
              <h3>Total Stats</h3>
              <ul>
                <li>Badges: {userData.badges}</li>
                <li>Plants: {userData.plants}</li>
                <li>Streak: {userData.streak}</li>
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
