import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

import { useTransactions } from "../../utils/transactionState";
import { format, parseISO, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";

const ChartOne = () => {
  const transactionDataForGraph = useTransactions(
    (state) => state.allTransactions
  );
  transactionDataForGraph.sort(
    (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
  );

  const chartConfig = {
    Income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    Expense: {
      label: "Expense",
      color: "hsl(var(--chart-2))",
    },
  };

  const formattedChartData = useMemo(() => {
    const chartOneData = [];
    const now = new Date();

    // Initialize the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(startOfMonth(now), i);
      chartOneData.push({
        month: format(date, "MMMM"),
        year: format(date, "yyyy"),
        Income: 0,
        Expense: 0,
      });
    }

    // Aggregate the transactions
    transactionDataForGraph.forEach((transaction) => {
      const date = parseISO(transaction.dateTime);
      const month = format(date, "MMMM");
      const year = format(date, "yyyy");

      // Find the corresponding month in chartOneData
      const monthData = chartOneData.find(
        (data) => data.month === month && data.year === year
      );
      if (monthData) {
        monthData[transaction.type] += transaction.amount;
      }
    });

    return chartOneData.map((data) => ({
      month: data.month,
      Income: data.Income,
      Expense: data.Expense,
    }));
  }, [transactionDataForGraph]);

  console.log("Formatted Chart Data:", formattedChartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Vs Expense </CardTitle>
        <CardDescription>Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formattedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Income" fill="var(--color-Income)" radius={4} />
            <Bar dataKey="Expense" fill="var(--color-Expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartOne;
