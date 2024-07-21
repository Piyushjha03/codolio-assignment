import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
("use client");

const Code = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-6 justify-center items-center">
      <Card className="min-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Source Code</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <a href="https://github.com/piyushjha03" target="_blank">
            <div className="text-2xl font-bold">Go to github</div>
          </a>
        </CardContent>
      </Card>
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="flex flex-col items-start gap-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                -React JS(FrameWork)
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                -Tailwind CSS(Styling)
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                -ShadCN(Component Library)
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                -Recharts(Charts)
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                -zustand(state management)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="min-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data used</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <a
              href="https://docs.google.com/spreadsheets/d/1_zkj5NozL7q-lOOyRUmBC86QWd_zN96_OoJ96CSvrr8/edit?usp=sharing"
              target="_blank"
            >
              Go to Spreadsheet
            </a>
          </div>
        </CardContent>
      </Card>
      <Card className="min-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contact Me</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <a href="https://piyushjha.online" target="_blank">
            <div className="text-2xl font-bold"> Go to Website </div>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default Code;
