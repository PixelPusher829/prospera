// src/pages/transactions/index.tsx
import { Filter, Plus, Search } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import AddEditTransactionModal from "@/pages/transactions/AddEditTransactionModal";
import Button from "@/shared/components/Button";
import FilterBar from "@/shared/components/FilterBar";
import {
	Checkbox,
	InputField,
	SelectField,
	SelectItem,
} from "@/shared/components/forms";
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from "@/shared/data/constants";
import ListPageLayout from "@/shared/layout/ListPageLayout";
import type { AccountType, Transaction } from "@/shared/types/types";
import BulkActionsTransactionsBar from "./BulkActionsTransactionsBar";
import DateRangeFilter from "./DateRangeFilter";
import TransactionsTable from "./TransactionsTable";

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
	const [minAmount, setMinAmount] = useState("");
	const [maxAmount, setMaxAmount] = useState("");
	const [statusFilter, setStatusFilter] = useState<
		"all" | "cleared" | "pending"
	>("all");
	const [isCustomFilterOpen, setIsCustomFilterOpen] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const [selectedTransactionIds, setSelectedTransactionIds] = useState<
		Set<string>
	>(new Set());

	const allCategories = useMemo(() => {
		const categories = new Set(transactions.map((t) => t.category));
		return Array.from(categories);
	}, [transactions]);

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
		setSelectedTransactionIds(new Set());
	};

	const handleCategoryChange = (transactionId: string, newCategory: string) => {
		setTransactions((prev) =>
			prev.map((t) =>
				t.id === transactionId ? { ...t, category: newCategory } : t,
			),
		);
	};

	return (
		<>
			<ListPageLayout
				heading="Transactions"
				subheading="Record and categorize your spending"
				actionButton={
					<Button
						variant="primary"
						onClick={openAddModal}
						icon={<Plus size={18} />}
					>
						Add Transaction
					</Button>
				}
				filterBar={
					<FilterBar>
						<div className="relative flex-1">
							<InputField
								type="text"
								placeholder="Search payee or category..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								icon={<Search size={18} />}
								iconPosition="left"
								className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 text-sm text-slate-700 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
							/>
						</div>
						<div className="flex gap-3">
							<SelectField
								value={transactionTypeFilter}
								onValueChange={(value) =>
									setTransactionTypeFilter(value as any)
								}
								className="min-w-max flex-shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
							>
								<SelectItem value="all">All Transaction Types</SelectItem>
								<SelectItem value="income">Income</SelectItem>
								<SelectItem value="expense">Expense</SelectItem>
							</SelectField>
							<SelectField
								value={selectedAccountTypeFilter}
								onValueChange={(value) =>
									setSelectedAccountTypeFilter(value as AccountType | "all")
								}
								className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
							>
								<SelectItem value="all">All Account Types</SelectItem>
								<SelectItem value="Cash">Cash</SelectItem>
								<SelectItem value="Debit">Debit</SelectItem>
								<SelectItem value="Credit">Credit</SelectItem>
								<SelectItem value="Savings">Savings</SelectItem>
								<SelectItem value="Loan">Loan</SelectItem>
								<SelectItem value="Investment">Investment</SelectItem>
							</SelectField>
							<DateRangeFilter
								startDate={startDate}
								setStartDate={setStartDate}
								endDate={endDate}
								setEndDate={setEndDate}
							/>
							<div className="relative">
								<button
									onClick={() => setIsCustomFilterOpen(!isCustomFilterOpen)}
									className="rounded-xl border border-slate-200 bg-white p-3 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
								>
									<Filter size={18} />
								</button>
								{isCustomFilterOpen && (
									<div className="absolute top-full right-0 z-10 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
										<div className="flex flex-col gap-4">
											<InputField
												label="Min Amount"
												type="number"
												value={minAmount}
												onChange={(e) => setMinAmount(e.target.value)}
												placeholder="e.g. 10"
											/>
											<InputField
												label="Max Amount"
												type="number"
												value={maxAmount}
												onChange={(e) => setMaxAmount(e.target.value)}
												placeholder="e.g. 500"
											/>
											<SelectField
												label="Status"
												value={statusFilter}
												onValueChange={(value) =>
													setStatusFilter(
														value as "all" | "cleared" | "pending",
													)
												}
											>
												<SelectItem value="all">All Statuses</SelectItem>
												<SelectItem value="cleared">Cleared</SelectItem>
												<SelectItem value="pending">Pending</SelectItem>
											</SelectField>
											<div>
												<label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
													Categories
												</label>
												<div className="max-h-32 overflow-y-auto rounded-lg border border-slate-200 p-2 dark:border-slate-600">
													{allCategories.map((category) => (
														<Checkbox
															key={category}
															id={`category-${category}`}
															label={category}
															value={category}
															className="py-4"
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
														/>
													))}
												</div>
											</div>
											<Button
												variant="secondary"
												onClick={() => {
													setMinAmount("");
													setMaxAmount("");
													setStatusFilter("all");
													setSelectedCategories([]);
												}}
											>
												Clear Filters
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</FilterBar>
				}
			>
				<BulkActionsTransactionsBar
					selectedTransactionIds={selectedTransactionIds}
					sortedAndFilteredTransactions={sortedAndFilteredTransactions}
					handleBulkCategoryAssign={handleBulkCategoryAssign}
					setSelectedTransactionIds={setSelectedTransactionIds}
					transactions={transactions}
				/>
				<TransactionsTable
					sortedAndFilteredTransactions={sortedAndFilteredTransactions}
					selectedTransactionIds={selectedTransactionIds}
					toggleSelectAll={toggleSelectAll}
					toggleSelection={toggleSelection}
					handleSort={handleSort}
					sortField={sortField}
					sortDirection={sortDirection}
					openEditModal={openEditModal}
					onCategoryChange={handleCategoryChange}
				/>
			</ListPageLayout>

			<AddEditTransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSaveTransaction={handleSaveTransaction}
				transaction={selectedTransaction}
			/>
		</>
	);
};

export default Transactions;
