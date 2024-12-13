"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";

type GamificationData = {
  badges: number;
  plants: number;
  streak: number;
};

type BadgeDetail = {
  id: string;
  name: string;
  description: string;
};

export const GamificationCard = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState<GamificationData | null>(null);
  console.log("userData in card state", userData);
  console.log("userId in card state", userId);
  const [badgeDetails, setBadgeDetails] = useState<BadgeDetail[]>([]);
  console.log("badgeDetails in card state", badgeDetails);

  return (
    <MotionGrowAndFloat>
      <Card className="flex flex-col px-2 h-full">
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
                {badgeDetails.map((badge, index) => (
                  <li key={index}>{badge.name}</li>
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
