"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function UserSettingsPage() {
  const { data: session } = useSession();
  const [timeZone, setTimeZone] = useState("");
  const [hardinessZone, setHardinessZone] = useState("");
  const [name, setName] = useState("");
  const [availableTimeZones, setAvailableTimeZones] = useState<
    { name: string; label: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    // Load the time zone names dynamically from moment-timezone
    const zones = moment.tz.names().map((zoneName) => {
      const offset = moment.tz(zoneName).format("Z");
      return {
        name: zoneName,
        label: `(UTC${offset}) ${zoneName}`,
      };
    });
    setAvailableTimeZones(zones);
  }, []);

  useEffect(() => {
    // Load the user's current settings from the database
    async function loadUserSettings() {
      if (session && session.user) {
        try {
          const response = await axios.get(`/api/users/${session.user.email}`);
          const userData = response.data;
          if (userData) {
            setName(userData.name || "");
            setTimeZone(userData.timeZone || "");
            setHardinessZone(userData.hardinessZone || "");
          }
        } catch (error) {
          console.error("Error loading user settings:", error);
        }
      }
    }
    loadUserSettings();
  }, [session]);

  const hardinessZones = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  if (!session) {
    return (
      <div>
        Not sure how you got here... Please log in to view your settings.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!session || !session.user) {
      console.error("User is not logged in.");
      return;
    }

    try {
      await axios.put("/api/users/setup", {
        email: session.user.email,
        name,
        timeZone,
        hardinessZone,
      });
    } catch (error) {
      console.error("Error saving user settings:", error);
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="timeZone">Time Zone</Label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="mt-1 w-full border p-2"
            >
              <option value="">Select Time Zone</option>
              {availableTimeZones.map((tz) => (
                <option key={tz.name} value={tz.name}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <Label htmlFor="hardinessZone">Hardiness Zone</Label>
            <select
              id="hardinessZone"
              value={hardinessZone}
              onChange={(e) => setHardinessZone(e.target.value)}
              className="mt-1 w-full border p-2"
            >
              <option value="">Select Hardiness Zone</option>
              {hardinessZones.map((zone) => (
                <option key={zone} value={zone}>
                  Zone {zone}
                </option>
              ))}
            </select>
          </div>
          <CardFooter className="justify-center">
            <Button type="submit">Save Settings</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
