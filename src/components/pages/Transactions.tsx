import {
  ArrowDownRight,
  ArrowDownUp,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react"; // Import X for bulk actions
import type React from "react";
import { useMemo, useState } from "react";
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from "@/data/constants";
import type { Transaction } from "@/types/types";
import AddEditTransactionModal from "@/components/utils/AddEditTransactionModal";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    "all" | "income" | "expense"
  >("all");
  const [selectedAccountTypeFilter, setSelectedAccountTypeFilter] = useState<
    AccountType | "all"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [sortField, setSortField] = useState<keyof Transaction | null>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "cleared" | "pending"
  >("all");
  const [isCustomFilterOpen, setIsCustomFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const categories = new Set(MOCK_TRANSACTIONS.map((t) => t.category));
    return Array.from(categories);
  }, [transactions]);

  const [selectedTransactionIds, setSelectedTransactionIds] = useState<
    Set<string>
  >(new Set()); // New state for bulk actions

  const handleSaveTransaction = (savedTransaction: Transaction) => {
    if (
      savedTransaction.id &&
      transactions.some((t) => t.id === savedTransaction.id)
    ) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === savedTransaction.id ? savedTransaction : t)),
      );
    } else {
      setTransactions((prev) => [savedTransaction, ...prev]);
    }
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const openAddModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedAndFilteredTransactions = useMemo(() => {
    const currentTransactions = transactions.filter((t) => {
      const matchesSearch =
        t.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        transactionTypeFilter === "all" || t.type === transactionTypeFilter;
      const account = MOCK_ACCOUNTS.find((a) => a.id === t.accountId);
      const matchesAccountType =
        selectedAccountTypeFilter === "all" ||
        account?.type === selectedAccountTypeFilter;
      const matchesDate =
        (!startDate || new Date(t.date) >= new Date(startDate)) &&
        (!endDate || new Date(t.date) <= new Date(endDate));
      const matchesAmount =
        (!minAmount || t.amount >= parseFloat(minAmount)) &&
        (!maxAmount || t.amount <= parseFloat(maxAmount));
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(t.category);
      return (
        matchesSearch &&
        matchesType &&
        matchesAccountType &&
        matchesDate &&
        matchesAmount &&
        matchesStatus &&
        matchesCategory
      );
    });

    if (sortField) {
      currentTransactions.sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          // Special handling for date strings to ensure correct sorting
          if (sortField === "date") {
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            return sortDirection === "asc"
              ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime();
          }
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (sortField === "accountType") {
          aValue =
            MOCK_ACCOUNTS.find((acc) => acc.id === a.accountId)?.type || "";
          bValue =
            MOCK_ACCOUNTS.find((acc) => acc.id === b.accountId)?.type || "";
          return sortDirection === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
        return 0;
      });
    }

    return currentTransactions;
  }, [
    transactions,
    searchTerm,
    transactionTypeFilter,
    selectedAccountTypeFilter,
    sortField,
    sortDirection,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    statusFilter,
    selectedCategories,
  ]);

  // Bulk actions logic
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedTransactionIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransactionIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (
      selectedTransactionIds.size === sortedAndFilteredTransactions.length &&
      sortedAndFilteredTransactions.length > 0
    ) {
      setSelectedTransactionIds(new Set());
    } else {
      setSelectedTransactionIds(
        new Set(sortedAndFilteredTransactions.map((t) => t.id)),
      );
    }
  };

  const handleBulkCategoryAssign = (newCategory: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        selectedTransactionIds.has(t.id) ? { ...t, category: newCategory } : t,
      ),
    );
    setSelectedTransactionIds(new Set()); // Clear selection after action
  };

  return (
    <div className="mx-auto min-h-full max-w-[1600px] p-6 lg:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">
            Transactions
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Record and categorize your spending
          </p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <button
            onClick={openAddModal}
            className="bg-violet-600 flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row dark:border-slate-700 dark:bg-slate-800">
        <div className="relative flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search payee or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={transactionTypeFilter}
            onChange={(e) => setTransactionTypeFilter(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">All Transaction Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {/* Account Type Filter */}
          <select
            value={selectedAccountTypeFilter}
            onChange={(e) =>
              setSelectedAccountTypeFilter(
                e.target.value as AccountType | "all",
              )
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">All Account Types</option>
            <option value="Cash">Cash</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
            <option value="Savings">Savings</option>
            <option value="Loan">Loan</option>
            <option value="Investment">Investment</option>
          </select>
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Calendar size={18} />
            </button>
            {isDatePickerOpen && (
              <div className="absolute top-full right-0 z-10 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate || ""}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate || ""}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setStartDate(null);
                      setEndDate(null);
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsCustomFilterOpen(!isCustomFilterOpen)}
              className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Filter size={18} />
            </button>
            {isCustomFilterOpen && (
              <div className="absolute top-full right-0 z-10 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      placeholder="e.g., 500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as "all" | "cleared" | "pending",
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="cleared">Cleared</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                      Categories
                    </label>
                    <div className="max-h-32 overflow-y-auto rounded-lg border border-slate-200 p-2 dark:border-slate-600">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (c) => c !== category,
                                  ),
                                );
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-200 text-pink-600 focus:ring-pink-500"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm text-slate-600 dark:text-slate-300"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMinAmount("");
                      setMaxAmount("");
                      setStatusFilter("all");
                      setSelectedCategories([]);
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedTransactionIds.size > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-2xl bg-slate-900 px-6 py-3 text-white shadow-xl dark:bg-slate-700">
          <span className="text-sm font-medium">
            {selectedTransactionIds.size} selected
          </span>
          <div className="h-4 w-px bg-slate-700 dark:bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => handleBulkCategoryAssign(e.target.value)}
              value="" // Controlled component, reset after selection
              className="cursor-pointer rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white focus:outline-none"
            >
              <option value="" disabled>
                Bulk Assign Category
              </option>
              {/* This should be a list of available categories */}
              {Array.from(new Set(transactions.map((t) => t.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ),
              )}
            </select>
          </div>
          <button
            onClick={() => setSelectedTransactionIds(new Set())}
            className="ml-2"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedTransactionIds.size ===
                        sortedAndFilteredTransactions.length &&
                      sortedAndFilteredTransactions.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-slate-200 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
                  />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-1">
                    Date{" "}
                    {sortField === "date" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("payee")}
                >
                  <div className="flex items-center gap-1">
                    Payee{" "}
                    {sortField === "payee" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center gap-1">
                    Category{" "}
                    {sortField === "category" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("accountType")}
                >
                  <div className="flex items-center gap-1">
                    Account Type{" "}
                    {sortField === "accountType" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Amount{" "}
                    {sortField === "amount" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 dark:text-slate-400"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Status{" "}
                    {sortField === "status" && (
                      <ArrowDownUp
                        size={14}
                        className={sortDirection === "desc" ? "rotate-180" : ""}
                      />
                    )}
                  </div>
                </th>
                <th className="w-10 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="">
              {sortedAndFilteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50 focus:outline-none dark:border-slate-700 dark:hover:bg-slate-700/50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTransactionIds.has(t.id)}
                      onChange={() => toggleSelection(t.id)}
                      onClick={(e) => e.stopPropagation()} // Prevent row click from opening edit modal
                      className="h-4 w-4 rounded border-slate-200 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 tabular-nums dark:text-slate-400">
                    {t.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full p-2 ${t.type === "income" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"}`}
                      >
                        {t.type === "income" ? (
                          <ArrowDownRight size={14} />
                        ) : (
                          <ArrowUpRight size={14} />
                        )}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-white">
                        {t.payee}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {MOCK_ACCOUNTS.find((a) => a.id === t.accountId)?.type}
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-bold ${t.type === "income" ? "text-green-600 dark:text-green-400" : "text-slate-700 dark:text-white"}`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {t.status === "cleared" ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                        title="Cleared"
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>{" "}
                        Cleared
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800"
                        title="Pending"
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>{" "}
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openEditModal(t)}
                      className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
      </div>
      <AddEditTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveTransaction={handleSaveTransaction}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
