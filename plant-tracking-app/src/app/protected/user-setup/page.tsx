"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";

export default function UserSetupPage() {
  const { data: session } = useSession();
  const [timeZone, setTimeZone] = useState("");
  const [hardinessZone, setHardinessZone] = useState("");
  const [preferredTheme, setPreferredTheme] = useState("system");
  const router = useRouter();
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
        Not sure how you got here... Please log in to complete your setup.
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
        timeZone,
        hardinessZone,
        preferredTheme,
      });
      router.push("/protected/dashboard");
    } catch (error) {
      console.error("Error saving user setup data:", error);
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>User Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="timeZone">Time Zone</Label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              required
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
              required
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
          <div className="mb-4">
            <Label htmlFor="preferredTheme">Preferred Theme</Label>
            <select
              id="preferredTheme"
              value={preferredTheme}
              onChange={(e) => setPreferredTheme(e.target.value)}
              className="mt-1 w-full border p-2"
            >
              <option value="system">System Preferred</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <CardFooter className="justify-center">
            <Button type="submit">Save Setup</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
