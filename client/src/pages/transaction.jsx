import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Input } from "@/components/ui/input";
import { Filter } from "../components/custom/filter";
import { categories } from "../../dummydata";
import TransactionCard from "../components/custom/transactionCard";
import { Label } from "@/components/ui/label";
import { useTransactions } from "../utils/transactionState";

const Transaction = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const transactionData = useTransactions((state) => state.allTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(
    transactionData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const GUTTER_SIZE = 70;
  const ROW_HEIGHT = 100;

  const renderRow = ({ index, style }) => {
    const transaction = filteredTransactions[index];
    return (
      <div
        style={{
          ...style,
          bottom: style.bottom + GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
        key={transaction.id}
      >
        <TransactionCard transaction={transaction} />
      </div>
    );
  };

  // Data for the filter component
  const typeData = [
    { id: 1, name: "Income" },
    { id: 2, name: "Expense" },
  ];

  const categoryData = Object.keys(categories).map((category) => ({
    id: category,
    name: category,
  }));

  const currencyData = [
    { id: 1, name: "USD" },
    { id: 2, name: "INR" },
    { id: 3, name: "EUR" },
    { id: 4, name: "JPY" },
    { id: 5, name: "GBP" },
  ];

  const timelineData = [
    { id: 1, name: "Today" },
    { id: 2, name: "Yesterday" },
    { id: 3, name: "Last 7 days" },
    { id: 4, name: "Last 30 days" },
    { id: 5, name: "This month" },
    { id: 6, name: "Last month" },
    { id: 7, name: "This year" },
    { id: 8, name: "Last year" },
  ];

  // States for filter selections
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [timeRange, setTimeRange] = useState(null);

  useEffect(() => {
    let temp = transactionData;

    // Filter transactions based on selected filters
    if (selectedType) {
      temp = temp.filter(
        (transaction) => transaction.type === selectedType.name
      );
    }
    if (selectedCategory) {
      temp = temp.filter(
        (transaction) => transaction.category === selectedCategory.name
      );
    }
    if (selectedCurrency) {
      temp = temp.filter(
        (transaction) => transaction.currency === selectedCurrency.name
      );
    }
    if (timeRange) {
      const today = new Date();
      let startDate = new Date();
      let endDate = new Date(today);

      switch (timeRange.name) {
        case "Today":
          startDate.setDate(today.getDate());
          startDate.setHours(0, 0, 0, 0); // Start of today
          break;
        case "Yesterday":
          startDate.setDate(today.getDate() - 1);
          startDate.setHours(0, 0, 0, 0); // Start of yesterday
          endDate.setDate(today.getDate() - 1);
          break;
        case "Last 7 days":
          startDate.setDate(today.getDate() - 7);
          startDate.setHours(0, 0, 0, 0); // Start of the 7 days ago
          break;
        case "Last 30 days":
          startDate.setDate(today.getDate() - 30);
          startDate.setHours(0, 0, 0, 0); // Start of the 30 days ago
          break;
        case "This month":
          startDate.setMonth(today.getMonth());
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0); // Start of this month
          break;
        case "Last month":
          startDate.setMonth(today.getMonth() - 1);
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0); // Start of last month
          endDate.setMonth(today.getMonth() - 1);
          break;
        case "This year":
          startDate.setMonth(0);
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0); // Start of this year
          break;
        case "Last year":
          startDate.setFullYear(today.getFullYear() - 1);
          startDate.setMonth(0);
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0); // Start of last year
          endDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          break;
      }

      temp = temp.filter((transaction) => {
        const date = new Date(transaction.dateTime);
        return date >= startDate && date <= endDate;
      });
    }

    // Further filter based on search query
    if (searchQuery) {
      temp = temp.filter((transaction) => {
        const titleMatch =
          transaction.title.toLowerCase() + transaction.note.toLowerCase();
        return titleMatch.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredTransactions(temp);
  }, [
    selectedType,
    selectedCategory,
    selectedCurrency,
    timeRange,
    searchQuery,
    transactionData,
  ]);

  return (
    <>
      <div className="transaction-page-wrapper w-full p-4">
        <div className="search relative pt-8 w-full flex justify-center items-center flex-col md:flex-row gap-2 flex-wrap">
          <Label htmlFor="searchInput" className="absolute top-0">
            You can search for a title or note...
          </Label>
          <Input
            id="searchInput"
            type="text"
            placeholder="Try searching Delhi to Shimla bus fare..."
            className="max-w-[465px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="filter flex gap-2 flex-wrap">
            <Filter
              filterType="type"
              data={typeData}
              selectedStatus={selectedType}
              setSelectedStatus={setSelectedType}
            />
            <Filter
              filterType="category"
              data={categoryData}
              selectedStatus={selectedCategory}
              setSelectedStatus={setSelectedCategory}
            />
            <Filter
              filterType="currency"
              data={currencyData}
              selectedStatus={selectedCurrency}
              setSelectedStatus={setSelectedCurrency}
            />
            <Filter
              filterType="timeline"
              data={timelineData}
              selectedStatus={timeRange}
              setSelectedStatus={setTimeRange}
            />
          </div>
        </div>
        <div className=" w-full mt-9 flex justify-start px-6 text-base ">
          {filteredTransactions.length} Results
        </div>
        <div className="results flex justify-center items-center mt-8">
          <List
            height={700} // Set the height of the list
            itemCount={filteredTransactions.length}
            itemSize={ROW_HEIGHT + GUTTER_SIZE} // Adjusted to account for margin
            width="100%"
          >
            {renderRow}
          </List>
        </div>
      </div>
    </>
  );
};

export default Transaction;
