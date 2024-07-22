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
import { format } from "date-fns"; // Import format from date-fns
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

const EditTransaction = (props) => {
  const [type, setType] = useState(props.transaction.type);
  const [currency, setCurrency] = useState(props.transaction.currency);
  const [amount, setAmount] = useState(props.transaction.amount);
  const [title, setTitle] = useState(props.transaction.title);
  const [category, setCategory] = useState(props.transaction.category);
  const [dateTime, setDateTime] = useState(
    new Date(props.transaction.dateTime)
  );
  const [note, setNote] = useState(props.transaction.note);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateTransactionFunc = useTransactions(
    (state) => state.updateTransaction
  );

  const { toast } = useToast();

  const handleSaveChanges = () => {
    if (
      type === "" ||
      !currency ||
      !amount ||
      title === "" ||
      category === "" ||
      !dateTime ||
      note === ""
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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
    console.log("Transaction Data: ", transactionData, props.transaction.id);
    updateTransactionFunc(props.transaction.id, transactionData); // Pass the ID and updated data
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-green-600 px-3 cursor-pointer">Edit</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
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
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Object.keys(categories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat} {"  "} {categories[cat]}
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
                placeholder="Enter note"
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

export default EditTransaction;
