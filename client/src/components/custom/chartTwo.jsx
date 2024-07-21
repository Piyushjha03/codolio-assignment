import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import { ChartContainer } from "@/components//ui/chart";
import { useTransactions } from "../../utils/transactionState";
import { useMemo } from "react";

const ChartTwo = () => {
  const transactionDataForGraph = useTransactions(
    (state) => state.allTransactions
  );
  transactionDataForGraph.sort(
    (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
  );

  const thisYear = new Date().getFullYear();
  const lastYear = thisYear - 1;

  const { thisYearIncome, lastYearIncome } = useMemo(() => {
    const thisYearIncome = transactionDataForGraph.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.dateTime);
        if (date.getFullYear() === thisYear && transaction.amount > 0) {
          acc += transaction.amount;
        }
        return acc;
      },
      0
    );

    const lastYearIncome = transactionDataForGraph.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.dateTime);
        if (date.getFullYear() === lastYear && transaction.amount > 0) {
          acc += transaction.amount;
        }
        return acc;
      },
      0
    );

    return { thisYearIncome, lastYearIncome };
  }, [transactionDataForGraph, thisYear, lastYear]);

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>
          You&apos;re have made{" "}
          {(thisYearIncome - lastYearIncome).toLocaleString()} more this year
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {thisYearIncome.toLocaleString().split(".")[0]}
            <span className="text-sm font-normal text-muted-foreground">
              until now
            </span>
          </div>
          <ChartContainer
            config={{
              Income: {
                label: "Income",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: thisYear,
                  Income: thisYearIncome,
                },
              ]}
            >
              <Bar
                dataKey="Income"
                fill="var(--color-Income)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="white"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="Income" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {lastYearIncome.toLocaleString().split(".")[0]}
            <span className="text-sm font-normal text-muted-foreground">
              in total
            </span>
          </div>
          <ChartContainer
            config={{
              Income: {
                label: "Income",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: lastYear,
                  Income: lastYearIncome,
                },
              ]}
            >
              <Bar
                dataKey="Income"
                fill="var(--color-Income)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="white"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="Income" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartTwo;
