"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  badges: {
    label: "Badges",
    color: "#87CEEB",
  },
  plants: {
    label: "Plants",
    color: "#98FB98",
  },
  streak: {
    label: "Streak",
    color: "#FF6961",
  },
} satisfies ChartConfig;

type ChartDataItem = {
  month: string;
  badges: number;
  plants: number;
  streak: number;
};

export const ActivityTimelineCard = ({ userEmail }: { userEmail: string }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userEmail}`);
        const userData = response.data;
        console.log("userData", userData);

        // Example transformation of user data to fit the chart
        const transformedData: ChartDataItem[] = [
          // Populate with meaningful data from userData
          { month: "Jan", badges: 2, plants: 5, streak: 3 },
          { month: "Feb", badges: 3, plants: 2, streak: 6 },
          // More data here based on user data
        ];

        setChartData(transformedData);
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="badges"
                fill={chartConfig.badges.color}
                radius={4}
              />
              <Bar
                dataKey="plants"
                fill={chartConfig.plants.color}
                radius={4}
              />
              <Bar
                dataKey="streak"
                fill={chartConfig.streak.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
