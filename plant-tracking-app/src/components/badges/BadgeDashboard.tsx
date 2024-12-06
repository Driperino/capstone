"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import badges from "@/lib/data/badges";

interface BadgeType {
  id: string;
  name: string;
  description: string;
}

export function BadgeDashboard({ userId }: { userId: string }) {
  const [allBadges, setAllBadges] = useState<BadgeType[]>([]);
  const [userBadges, setUserBadges] = useState<BadgeType[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [manualUserId, setManualUserId] = useState<string>("");

  useEffect(() => {
    fetchAllBadges();
    if (userId) {
      fetchUserBadges(userId);
    }
  }, [userId]);

  const fetchAllBadges = async () => {
    try {
      const response = await axios.get("/api/badges/get-all-badges");
      setAllBadges(response.data.badges);
    } catch (error) {
      console.error("Error fetching all badges:", error);
    }
  };

  const fetchUserBadges = async (id: string) => {
    try {
      const response = await axios.get(
        `/api/badges/get-user-badges?userId=${id}`
      );
      setUserBadges(response.data.earnedBadges);
    } catch (error) {
      console.error("Error fetching user badges:", error);
    }
  };

  const awardBadge = async () => {
    if (!selectedBadge || (!userId && !manualUserId)) return;

    try {
      await axios.post("/api/badges/award-badge", {
        userId: userId || manualUserId,
        badgeId: selectedBadge,
      });
      fetchUserBadges(userId || manualUserId);
    } catch (error) {
      console.error("Error awarding badge:", error);
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Badge Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Award Badge</h3>
            <div className="flex space-x-2">
              <Select onValueChange={setSelectedBadge}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select badge" />
                </SelectTrigger>
                <SelectContent>
                  {allBadges.map((badge) => (
                    <SelectItem key={badge.id} value={badge.id}>
                      {badge.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!userId && (
                <Input
                  placeholder="Enter user ID"
                  value={manualUserId}
                  onChange={(e) => setManualUserId(e.target.value)}
                />
              )}
              <Button onClick={awardBadge}>Award Badge</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">User Badges</h3>
            <div className="flex flex-wrap gap-2">
              {userBadges.map((badge) => (
                <Badge key={badge.id} variant="secondary">
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
