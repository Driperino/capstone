"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";
import axios from "axios";
import badgeData from "@/lib/data/badges"; // Import the badge metadata

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

  // Helper function to get badge names by ID
  const getBadgeName = (badgeId: string) => {
    const badge = badgeData.find((b) => b.id === badgeId);
    return badge ? badge.name : badgeId; // Fallback to ID if name is not found
  };

  return (
    <MotionGrowAndFloat>
      <Card className="flex flex-col px-2 h-full">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {userData ? (
            <div>
              <hr />
              <h3>Most Recent Badges</h3>
              <hr />
              <ol>
                {userData.recentBadges.map((badgeId, index) => (
                  <div key={index}>
                    <li>{getBadgeName(badgeId)}</li>
                    {index < userData.recentBadges.length - 1 && (
                      <hr className="mx-6" />
                    )}{" "}
                    {/* Add <hr /> except for the last item */}
                  </div>
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
