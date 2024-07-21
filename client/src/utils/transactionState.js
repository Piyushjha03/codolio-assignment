import { create } from "zustand";
import { transactionData } from "../../dummydata";

export const useTransactions = create((set) => ({
  allTransactions: transactionData,
  addTransaction: (transaction) => {
    set((state) => ({
      allTransactions: [transaction, ...state.allTransactions],
    }));
  },
  updateTransaction: (id, updatedTransaction) => {
    set((state) => ({
      allTransactions: state.allTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      ),
    }));
  },
  deleteTransaction: (id) => {
    set((state) => ({
      allTransactions: state.allTransactions.filter(
        (transaction) => transaction.id !== id
      ),
    }));
  },
  resetTransactions: () => {
    set({ allTransactions: [] });
  },
}));
