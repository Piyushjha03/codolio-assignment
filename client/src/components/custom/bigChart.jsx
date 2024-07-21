import React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";

import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactions } from "../../utils/transactionState";
import { differenceInDays, format, parseISO } from "date-fns";

export function Component() {
  const BigChartData = useTransactions((state) => state.allTransactions);
  BigChartData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  const chartConfig = {
    Amount: {
      label: "Amount",
    },
    Income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    Expense: {
      label: "Expense",
      color: "hsl(var(--chart-2))",
    },
  };

  const [timeRange, setTimeRange] = React.useState("90d");

  // Memoize the aggregated data calculation
  const formattedChartData = React.useMemo(() => {
    // Initialize an object to store aggregated data
    const aggregatedData = {};
    BigChartData.forEach((transaction) => {
      const date = format(parseISO(transaction.dateTime), "yyyy-MM-dd");

      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          date: date,
          Income: 0,
          Expense: 0,
        };
      }

      if (transaction.type === "Expense") {
        aggregatedData[date].Expense += transaction.amount;
      } else {
        aggregatedData[date].Income += transaction.amount;
      }
    });

    // Convert the aggregated data object to an array
    return Object.values(aggregatedData).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [BigChartData]);

  console.log("Formatted Chart Data:", formattedChartData.slice(0, 5));

  // Memoize the filtered data calculation based on the time range
  const filteredData = React.useMemo(() => {
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    return formattedChartData.filter((item) => {
      const date = new Date(item.date);
      return differenceInDays(now, date) <= daysToSubtract;
    });
  }, [formattedChartData, timeRange]);

  console.log("Filtered Data:", filteredData.slice(0, 5));

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing the Income and Expense over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
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
                  labelFormatter={(value) => {
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
              dataKey="Expense"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-Expense)"
              stackId="a"
            />
            <Area
              dataKey="Income"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-Income)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
const BigChart = () => {
  return <Component />;
};

export default BigChart;
