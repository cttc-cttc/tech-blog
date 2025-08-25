"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", visitor: 222, member: 150 },
  { date: "2024-04-02", visitor: 97, member: 180 },
  { date: "2024-04-03", visitor: 167, member: 120 },
  { date: "2024-04-04", visitor: 242, member: 260 },
  { date: "2024-04-05", visitor: 373, member: 290 },
  { date: "2024-04-06", visitor: 301, member: 340 },
  { date: "2024-04-07", visitor: 245, member: 180 },
  { date: "2024-04-08", visitor: 409, member: 320 },
  { date: "2024-04-09", visitor: 59, member: 110 },
  { date: "2024-04-10", visitor: 261, member: 190 },
  { date: "2024-04-11", visitor: 327, member: 350 },
  { date: "2024-04-12", visitor: 292, member: 210 },
  { date: "2024-04-13", visitor: 342, member: 380 },
  { date: "2024-04-14", visitor: 137, member: 220 },
  { date: "2024-04-15", visitor: 120, member: 170 },
  { date: "2024-04-16", visitor: 138, member: 190 },
  { date: "2024-04-17", visitor: 446, member: 360 },
  { date: "2024-04-18", visitor: 364, member: 410 },
  { date: "2024-04-19", visitor: 243, member: 180 },
  { date: "2024-04-20", visitor: 89, member: 150 },
  { date: "2024-04-21", visitor: 137, member: 200 },
  { date: "2024-04-22", visitor: 224, member: 170 },
  { date: "2024-04-23", visitor: 138, member: 230 },
  { date: "2024-04-24", visitor: 387, member: 290 },
  { date: "2024-04-25", visitor: 215, member: 250 },
  { date: "2024-04-26", visitor: 75, member: 130 },
  { date: "2024-04-27", visitor: 383, member: 420 },
  { date: "2024-04-28", visitor: 122, member: 180 },
  { date: "2024-04-29", visitor: 315, member: 240 },
  { date: "2024-04-30", visitor: 454, member: 380 },
  { date: "2024-05-01", visitor: 165, member: 220 },
  { date: "2024-05-02", visitor: 293, member: 310 },
  { date: "2024-05-03", visitor: 247, member: 190 },
  { date: "2024-05-04", visitor: 385, member: 420 },
  { date: "2024-05-05", visitor: 481, member: 390 },
  { date: "2024-05-06", visitor: 498, member: 520 },
  { date: "2024-05-07", visitor: 388, member: 300 },
  { date: "2024-05-08", visitor: 149, member: 210 },
  { date: "2024-05-09", visitor: 227, member: 180 },
  { date: "2024-05-10", visitor: 293, member: 330 },
  { date: "2024-05-11", visitor: 335, member: 270 },
  { date: "2024-05-12", visitor: 197, member: 240 },
  { date: "2024-05-13", visitor: 197, member: 160 },
  { date: "2024-05-14", visitor: 448, member: 490 },
  { date: "2024-05-15", visitor: 473, member: 380 },
  { date: "2024-05-16", visitor: 338, member: 400 },
  { date: "2024-05-17", visitor: 499, member: 420 },
  { date: "2024-05-18", visitor: 315, member: 350 },
  { date: "2024-05-19", visitor: 235, member: 180 },
  { date: "2024-05-20", visitor: 177, member: 230 },
  { date: "2024-05-21", visitor: 82, member: 140 },
  { date: "2024-05-22", visitor: 81, member: 120 },
  { date: "2024-05-23", visitor: 252, member: 290 },
  { date: "2024-05-24", visitor: 294, member: 220 },
  { date: "2024-05-25", visitor: 201, member: 250 },
  { date: "2024-05-26", visitor: 213, member: 170 },
  { date: "2024-05-27", visitor: 420, member: 460 },
  { date: "2024-05-28", visitor: 233, member: 190 },
  { date: "2024-05-29", visitor: 78, member: 130 },
  { date: "2024-05-30", visitor: 340, member: 280 },
  { date: "2024-05-31", visitor: 178, member: 230 },
  { date: "2024-06-01", visitor: 178, member: 200 },
  { date: "2024-06-02", visitor: 470, member: 410 },
  { date: "2024-06-03", visitor: 103, member: 160 },
  { date: "2024-06-04", visitor: 439, member: 380 },
  { date: "2024-06-05", visitor: 88, member: 140 },
  { date: "2024-06-06", visitor: 294, member: 250 },
  { date: "2024-06-07", visitor: 323, member: 370 },
  { date: "2024-06-08", visitor: 385, member: 320 },
  { date: "2024-06-09", visitor: 438, member: 480 },
  { date: "2024-06-10", visitor: 155, member: 200 },
  { date: "2024-06-11", visitor: 92, member: 150 },
  { date: "2024-06-12", visitor: 492, member: 420 },
  { date: "2024-06-13", visitor: 81, member: 130 },
  { date: "2024-06-14", visitor: 426, member: 380 },
  { date: "2024-06-15", visitor: 307, member: 350 },
  { date: "2024-06-16", visitor: 371, member: 310 },
  { date: "2024-06-17", visitor: 475, member: 520 },
  { date: "2024-06-18", visitor: 107, member: 170 },
  { date: "2024-06-19", visitor: 341, member: 290 },
  { date: "2024-06-20", visitor: 408, member: 450 },
  { date: "2024-06-21", visitor: 169, member: 210 },
  { date: "2024-06-22", visitor: 317, member: 270 },
  { date: "2024-06-23", visitor: 480, member: 530 },
  { date: "2024-06-24", visitor: 132, member: 180 },
  { date: "2024-06-25", visitor: 141, member: 190 },
  { date: "2024-06-26", visitor: 434, member: 380 },
  { date: "2024-06-27", visitor: 448, member: 490 },
  { date: "2024-06-28", visitor: 149, member: 200 },
  { date: "2024-06-29", visitor: 103, member: 160 },
  { date: "2024-06-30", visitor: 446, member: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  visitor: {
    label: "방문자",
    color: "var(--chart-1)",
  },
  member: {
    label: "가입자",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="mb-2">블로그 이용자 현황</CardTitle>
          <CardDescription>최근 3개월 간의 가입자와 방문자 현황을 표시합니다</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              최근 3개월
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              최근 30일
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              최근 7일
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisitor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-visitor)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-visitor)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMember" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-member)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-member)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="member"
              type="natural"
              fill="url(#fillMember)"
              stroke="var(--color-member)"
              stackId="a"
            />
            <Area
              dataKey="visitor"
              type="natural"
              fill="url(#fillVisitor)"
              stroke="var(--color-visitor)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
