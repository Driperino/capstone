"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Add Select for consistency
import moment from "moment-timezone";

const UserSettingsPage = () => {
  const { data: session } = useSession();
  const [timeZone, setTimeZone] = useState("");
  const [hardinessZone, setHardinessZone] = useState("");
  const [name, setName] = useState("");
  const [availableTimeZones, setAvailableTimeZones] = useState<
    { name: string; label: string }[]
  >([]);

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
      <div className="text-center p-10">
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
    <div className="p-6 max-w-xl rounded-md shadow-lg mx-auto mt-10 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-2">User Settings</h1>
      <p className="text-sm text-gray-400 mb-6">
        Configure your personal settings below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label htmlFor="name" className="font-semibold">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="timeZone" className="font-semibold">
            Time Zone
          </Label>
          <Select
            value={timeZone}
            onValueChange={(value) => setTimeZone(value)}
          >
            <SelectTrigger className="mt-1 w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder="Select Time Zone" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeZones.map((tz) => (
                <SelectItem key={tz.name} value={tz.name}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Label htmlFor="hardinessZone" className="font-semibold">
            Hardiness Zone
          </Label>
          <Select
            value={hardinessZone}
            onValueChange={(value) => setHardinessZone(value)}
          >
            <SelectTrigger className="mt-1 w-full bg-gray-800 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder="Select Hardiness Zone" />
            </SelectTrigger>
            <SelectContent>
              {hardinessZones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  Zone {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full mt-4">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default UserSettingsPage;
