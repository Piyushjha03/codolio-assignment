import { transactionData } from "../../../dummydata";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { TrendingUp } from "lucide-react";
import { useTransactions } from "../../utils/transactionState";

export function LineChartComponent() {
  const transaction = useTransactions((state) => state.allTransactions);

  let totalIncome = 0;
  let totalExpense = 0;

  const Balance = transaction.reduce((acc, curr) => {
    if (curr.type === "Income") {
      totalIncome += curr.amount;
    } else {
      totalExpense += curr.amount;
    }
    return totalIncome - totalExpense;
  }, 0);

  const dataForChart = [
    {
      Expense: totalExpense,
      Income: totalIncome,
    },
  ];

  const chartConfig = {
    Expense: {
      label: "Expense",
      color: "hsl(var(--chart-1))",
    },
    Income: {
      label: "Income",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="flex flex-col cursor-pointer hover:text-green-500">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex gap-2 ">
          Visualize Your Transactions
          <TrendingUp className="h-4 w-4" />
        </CardTitle>
        <CardDescription>With Graphs</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={dataForChart}
            endAngle={360}
            innerRadius={90}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy || 0}
                          className="fill-foreground text-lg font-bold"
                        >
                          {Balance.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground"
                        >
                          All Time Balance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Income"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Income)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Expense"
              fill="var(--color-Expense)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Click to See All Graphs <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
