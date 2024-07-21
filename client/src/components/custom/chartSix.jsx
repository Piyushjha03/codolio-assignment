"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "../../utils/transactionState";

const ChartSix = () => {
  const transactionDataForGraph = useTransactions(
    (state) => state.allTransactions
  );

  // Aggregate data by category for income and expenditure
  const aggregatedData = transactionDataForGraph.reduce((acc, transaction) => {
    const category = transaction.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = { income: 0, expenditure: 0 };
    }
    if (transaction.type === "Income") {
      acc[category].income += transaction.amount;
    } else if (transaction.type === "Expense") {
      acc[category].expenditure += transaction.amount;
    }
    return acc;
  }, {});

  // Transform aggregatedData to fit RadarChart format
  const chartData = Object.entries(aggregatedData).map(([category, data]) => ({
    category,
    income: data.income,
    expenditure: data.expenditure,
  }));

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    expenditure: {
      label: "Expenditure",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Income vs Expenditure by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              name="Income"
              dataKey="income"
              stroke={chartConfig.income.color}
              fill={chartConfig.income.color}
              fillOpacity={0.6}
            />
            <Radar
              name="Expenditure"
              dataKey="expenditure"
              stroke={chartConfig.expenditure.color}
              fill={chartConfig.expenditure.color}
              fillOpacity={0.6}
            />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartSix;
