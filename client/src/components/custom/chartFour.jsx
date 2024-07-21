"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "../../utils/transactionState";

const ChartFour = () => {
  const transactionDataForGraph = useTransactions(
    (state) => state.allTransactions
  );
  transactionDataForGraph.sort(
    (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
  );

  // Aggregate expense distribution by currency
  const aggregatedData = transactionDataForGraph.reduce((acc, transaction) => {
    if (transaction.type === "Expense") {
      if (acc[transaction.currency]) {
        acc[transaction.currency] += transaction.amount;
      } else {
        acc[transaction.currency] = transaction.amount;
      }
    }
    return acc;
  }, {});

  // Define an array of fill colors
  const fillColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF",
  ];

  // Transform aggregatedData to fit RadialBarChart format and add fill property
  const chartData = Object.entries(aggregatedData).map(
    ([currency, amount], index) => ({
      name: currency,
      value: amount,
      fill: fillColors[index % fillColors.length], // Assign a color from the array
    })
  );

  // Create a chartConfig for dynamic color styling
  const chartConfig = Object.keys(aggregatedData).reduce(
    (acc, currency, index) => {
      acc[currency] = {
        label: currency.charAt(0).toUpperCase() + currency.slice(1),
        color: fillColors[index % fillColors.length],
      };
      return acc;
    },
    {}
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Distribution by Currency</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={360}
            innerRadius={30}
            outerRadius={110}
          >
            <RadialBar dataKey="value" background>
              <LabelList
                position="insideStart"
                dataKey="name"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartFour;
