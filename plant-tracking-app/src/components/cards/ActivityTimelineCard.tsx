"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartData = [
  { month: "January", badges: 186, plants: 13, streak: 22 },
  { month: "February", badges: 305, plants: 20, streak: 30 },
  { month: "March", badges: 237, plants: 12, streak: 25 },
  { month: "April", badges: 73, plants: 19, streak: 18 },
  { month: "May", badges: 209, plants: 13, streak: 20 },
  { month: "June", badges: 214, plants: 14, streak: 21 },
  { month: "July", badges: 214, plants: 14, streak: 21 },
  { month: "August", badges: 214, plants: 14, streak: 21 },
  { month: "September", badges: 214, plants: 14, streak: 21 },
  { month: "October", badges: 214, plants: 14, streak: 21 },
  { month: "November", badges: 214, plants: 14, streak: 21 },
  { month: "December", badges: 214, plants: 14, streak: 21 },
];

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

export const ActivityTimelineCard = () => {
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
              <Bar dataKey="badges" fill="var(--color-badges)" radius={4} />
              <Bar dataKey="plants" fill="var(--color-plants)" radius={4} />
              <Bar dataKey="streak" fill="var(--color-streak)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
