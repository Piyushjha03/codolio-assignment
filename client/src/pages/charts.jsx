import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";
import { Separator } from "@/components//ui/separator";

import ChartOne from "../components/custom/chartOne";
import BigChart from "../components/custom/bigChart";
import ChartTwo from "../components/custom/chartTwo";
import ChartThree from "../components/custom/chartThree";
import ChartFour from "../components/custom/chartFour";
import ChartFive from "../components/custom/chartFive";
import ChartSix from "../components/custom/chartSix";

export function Charts() {
  return (
    <>
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
        <div className="grid w-full grid-cols-1 ">
          <BigChart />
        </div>
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
          <ChartOne />
          <ChartSix />
        </div>
        <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
          <ChartTwo />

          <ChartThree />
        </div>
        <div className="grid w-full flex-1 gap-6">
          <ChartFour />
          <ChartFive />
        </div>
      </div>
    </>
  );
}
