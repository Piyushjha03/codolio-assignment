import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScanQrCode } from "lucide-react";
import { categories } from "../../../dummydata";
import { DateTimePickerForm } from "./timePicker";
import { useTransactions } from "../../utils/transactionState"; // Ensure this is the correct path
import { format } from "date-fns"; // Import format from date-fns // Import toast for notifications

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
const NewTransaction = () => {
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState(null);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [note, setNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addTransaction = useTransactions((state) => state.addTransaction);

  const { toast } = useToast();
  const handleSaveChanges = () => {
    if (
      type === "" ||
      !currency ||
      amount === "" ||
      title === "" ||
      category === "" ||
      !dateTime ||
      note === ""
    ) {
      console.log("====================================");
      console.log("Uh oh! Something went wrong.");
      console.log("====================================");
      () => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      };
      return;
    }

    const transactionData = {
      type,
      currency,
      amount,
      title,
      category,
      dateTime: formatDate(dateTime), // Format the date before saving
      note,
    };
    console.log("Transaction Data: ", transactionData);
    addTransaction({
      id: Date.now(), // Or any unique id generation logic
      ...transactionData,
    });
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div
          className="bg-green-500 flex justify-center items-center rounded-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <ScanQrCode className="text-black" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Transaction Type</Label>
              <Select onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Enter the Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="ex : Rent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Object.keys(categories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category} {"  "} {categories[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <DateTimePickerForm setDate={setDateTime} date={dateTime} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note">Note</Label>
              <Input
                type="text"
                id="note"
                placeholder="Additional details"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransaction;
