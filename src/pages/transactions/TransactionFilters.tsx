import { Calendar, Filter, Search } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { AccountType, Transaction } from "@/shared/types/types";
import Button from "@/shared/components/Button"; // Import Button component

interface TransactionFiltersProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	transactionTypeFilter: "all" | "income" | "expense";
	setTransactionTypeFilter: (type: "all" | "income" | "expense") => void;
	selectedAccountTypeFilter: AccountType | "all";
	setSelectedAccountTypeFilter: (type: AccountType | "all") => void;
	startDate: string | null;
	setStartDate: (date: string | null) => void;
	endDate: string | null;
	setEndDate: (date: string | null) => void;
	minAmount: string;
	setMinAmount: (amount: string) => void;
	maxAmount: string;
	setMaxAmount: (amount: string) => void;
	statusFilter: "all" | "cleared" | "pending";
	setStatusFilter: (status: "all" | "cleared" | "pending") => void;
	selectedCategories: string[];
	setSelectedCategories: (categories: string[]) => void;
	transactions: Transaction[]; // Pass transactions to derive categories
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
	searchTerm,
	setSearchTerm,
	transactionTypeFilter,
	setTransactionTypeFilter,
	selectedAccountTypeFilter,
	setSelectedAccountTypeFilter,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	minAmount,
	setMinAmount,
	maxAmount,
	setMaxAmount,
	statusFilter,
	setStatusFilter,
	selectedCategories,
	setSelectedCategories,
	transactions,
}) => {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [isCustomFilterOpen, setIsCustomFilterOpen] = useState(false);

	const allCategories = useMemo(() => {
		const categories = new Set(transactions.map((t) => t.category));
		return Array.from(categories);
	}, [transactions]);

	return (
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
						setSelectedAccountTypeFilter(e.target.value as AccountType | "all")
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
								<Button
									variant="secondary"
									onClick={() => {
										setStartDate(null);
										setEndDate(null);
									}}
								>
									Clear
								</Button>
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
		</div>
	);
};

export default TransactionFilters;
