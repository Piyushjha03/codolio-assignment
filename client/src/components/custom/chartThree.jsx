import React, { useMemo } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components//ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useTransactions } from "../../utils/transactionState";

const ChartThree = () => {
  const transactionDataForGraph = useTransactions(
    (state) => state.allTransactions
  );
  transactionDataForGraph.sort(
    (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
  );

  const topThreeExpenses = useMemo(() => {
    const expensesByCategory = transactionDataForGraph.reduce(
      (acc, transaction) => {
        if (transaction.type === "Expense") {
          if (acc[transaction.category]) {
            acc[transaction.category] += transaction.amount;
          } else {
            acc[transaction.category] = transaction.amount;
          }
        }
        return acc;
      },
      {}
    );

    const sortedExpenses = Object.entries(expensesByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sortedExpenses.map(([category, amount]) => ({ category, amount }));
  }, [transactionDataForGraph]);

  const chartData = topThreeExpenses.map((expense, index) => ({
    category: expense.category,
    value: expense.amount,
    label: `  ${expense.amount.toFixed(2)} `,
    fill: `var(--color-${expense.category})`,
  }));

  const chartConfig = topThreeExpenses.reduce((acc, expense, index) => {
    acc[expense.category] = {
      label: expense.category,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {});

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
      <CardHeader>
        <CardTitle>Your Top 3 Expenses</CardTitle>
        <CardDescription>By category</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer config={chartConfig} className="h-[140px] w-full">
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={chartData}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar
              dataKey="value"
              radius={5}
              fill={chartData.map((data) => data.fill)}
            >
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          {topThreeExpenses.map((expense, index) => (
            <React.Fragment key={expense.category}>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">
                  {expense.category}
                </div>
                <div className="flex items-baseline gap-1 text-xs font-bold tabular-nums leading-none">
                  {expense.amount.toFixed(2)}
                </div>
              </div>
              {index < topThreeExpenses.length - 1 && (
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartThree;
