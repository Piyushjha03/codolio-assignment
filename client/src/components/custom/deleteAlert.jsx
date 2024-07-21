import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransactions } from "../../utils/transactionState";

const DeleteAlert = ({ onConfirm, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const deleteTransaction = useTransactions((state) => state.deleteTransaction);

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const handleConfirm = () => {
    deleteTransaction(id);
    onConfirm();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex-1 text-red-600 cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
