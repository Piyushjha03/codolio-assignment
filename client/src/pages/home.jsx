import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LineChartComponent } from "../components/custom/lineChart";
import { useTransactions } from "../utils/transactionState";
import TransactionCard from "../components/custom/transactionCard";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  const transactionData = useTransactions((state) => state.allTransactions);

  const totalIncome = Number(
    transactionData
      .filter((transaction) => transaction.type === "Income")
      .reduce((acc, transaction) => acc + transaction.amount, 0)
  );

  const totalExpenditure = Number(
    transactionData
      .filter((transaction) => transaction.type === "Expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0)
  );

  const ResetTransactionFunc = useTransactions(
    (state) => state.resetTransactions
  );

  const handleResetData = () => {
    ResetTransactionFunc();
  };

  return (
    <>
      <div className="home-wrapper flex flex-col gap-10 justify-center items-center">
        <div className="flex gap-2 sm:gap-8 justify-between">
          <Card className="flex-1 w-40 sm:w-56 bg-lime-300 text-black font-mont">
            <CardHeader className="p-4 py-4 sm:py-2">
              <CardTitle className="text-sm sm:text-lg whitespace-nowrap">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:py-4 py-2">
              <h1 className="text-2xl sm:text-4xl font-mont font-semibold">
                {totalIncome.toFixed(2)}
              </h1>
            </CardContent>
          </Card>

          <Card className="flex-1 w-40 sm:w-56 bg-red-300 text-black font-mont">
            <CardHeader className="p-4 py-4 sm:py-2">
              <CardTitle className="text-sm sm:text-lg whitespace-nowrap">
                Total Expenditure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:py-4 py-2">
              <h1 className="text-2xl sm:text-4xl font-mont font-semibold">
                {totalExpenditure.toFixed(2)}
              </h1>
            </CardContent>
          </Card>
        </div>
        <Button
          variant="outline"
          className="bg-teal-200"
          onClick={handleResetData}
        >
          Reset Default Data
        </Button>
        <Link to="/charts">
          <div className="chart">
            <LineChartComponent />
          </div>
        </Link>

        <div className="transaction-history px-2">
          <div className="heading flex  my-4 justify-between">
            <span className="text-sm font-mont font-light">
              Transaction History
            </span>
            <Link to="/transaction">
              <span className="text-sm font-mont font-semibold">
                View All {"("} {Object.keys(transactionData).length} {")"}
              </span>
            </Link>
          </div>
          <div className="trasactionlist p-2 sm:p-10 flex flex-col gap-10 h-80 overflow-scroll rounded-xl border bg-card text-card-foreground shadow">
            {transactionData
              .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
              .slice(0, 5)
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            <div className="dummy-pappding min-h-32 min-w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
