"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  badges: {
    label: "Badges",
    color: "hsl(var(--chart-1))",
  },
  plants: {
    label: "Plants",
    color: "hsl(var(--chart-2))",
  },
  streak: {
    label: "Streak",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type ChartDataItem = {
  week: string;
  badges: number;
  plants: number;
  streak: number;
};

type TotalDataItem = {
  totalBadges: number;
  totalPlants: number;
  maxStreak: number;
};

export const ActivityTimelineCard = ({ userId }: { userId: string }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalData, setTotalData] = useState<TotalDataItem | null>(null);
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("badges");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 42); // 6 weeks ago

        const response = await axios.get("/api/user-activity", {
          params: {
            userId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });

        const transformedData: ChartDataItem[] = response.data.activities.map(
          (item: any) => ({
            week: new Date(item.week).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            badges: item.badges,
            plants: item.plants,
            streak: item.streak,
          })
        );

        setChartData(transformedData);
        setTotalData(response.data.totals);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const weeklyTotal = useMemo(
    () => ({
      badges: chartData.reduce((acc, curr) => acc + curr.badges, 0),
      plants: chartData.reduce((acc, curr) => acc + curr.plants, 0),
      streak: Math.max(...chartData.map((item) => item.streak), 0),
    }),
    [chartData]
  );

  return (
    <MotionGrowAndFloat>
      <Card className="w-full">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>
              Showing activity for the last 6 weeks
            </CardDescription>
          </div>
          <div className="flex">
            {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map(
              (key) => (
                <button
                  key={key}
                  data-active={activeChart === key}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(key)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[key].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {weeklyTotal[key].toLocaleString()}
                  </span>
                  {totalData && (
                    <span className="text-xs text-muted-foreground mt-1">
                      Total:{" "}
                      {totalData[
                        `total${
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }` as keyof TotalDataItem
                      ].toLocaleString()}
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey={activeChart}
                  />
                }
              />
              <Bar
                dataKey={activeChart}
                fill={`var(--color-${activeChart})`}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
