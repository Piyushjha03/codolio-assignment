import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import { categories } from "../../../dummydata";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

("use client");

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditTransaction from "./editTransaction";

import DeleteAlert from "./deleteAlert";

export function ComboboxDropdownMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    console.log("Transaction deleted:", props.transaction.id);
    // You might want to add any additional logic here if needed
  };

  return (
    <div className="flex absolute top-1 right-1 flex-col items-start justify-between rounded-full border sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <EditTransaction transaction={props.transaction} />
            <DropdownMenuSeparator />
            <DeleteAlert onConfirm={handleDelete} id={props.transaction.id} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const TransactionCard = (props) => {
  const transaction = props.transaction;
  const emoji = categories[transaction.category];

  return (
    <>
      <Card className="font-mont flex relative">
        <div className="emoji flex justify-center items-center mx-6">
          <Button variant="outline" size="icon">
            {emoji}
          </Button>
        </div>
        <div>
          <CardHeader className="p-4 pb-0">
            <CardTitle>{transaction.title}</CardTitle>
            <CardDescription>{transaction.note}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <span className="text-sm font-normal text-muted-foreground">
              {transaction.currency}
            </span>
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              <span
                className={`${
                  transaction.type === "Expense"
                    ? "text-red-400"
                    : " text-lime-400"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
            <ComboboxDropdownMenu transaction={transaction} />
          </CardContent>

          <CardFooter className="text-xs text-muted-foreground pl-4 ">
            {transaction.dateTime.split(" ")[0]} at{"\n"}
            {transaction.dateTime.split(" ")[1]}
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default TransactionCard;
