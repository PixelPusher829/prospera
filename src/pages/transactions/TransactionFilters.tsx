import { Calendar, Filter, Search } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { AccountType, Transaction } from "@/shared/types/types";
import Button from "@/shared/components/Button";
import {
	InputField,
	SelectField,
	SelectItem,
	Checkbox,
} from "@/shared/components/forms";
import DateRangeFilter from "./DateRangeFilter";

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
				<InputField
					type="text"
					placeholder="Search payee or category..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-700 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
				/>
			</div>
			<div className="flex gap-3">
				<SelectField
					value={transactionTypeFilter}
					onValueChange={(value) => setTransactionTypeFilter(value as any)}
					className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 min-w-max flex-shrink-0"
				>
					<SelectItem value="all">All Transaction Types</SelectItem>
					<SelectItem value="income">Income</SelectItem>
					<SelectItem value="expense">Expense</SelectItem>
				</SelectField>
				{/* Account Type Filter */}
				<SelectField
					value={selectedAccountTypeFilter}
					onValueChange={(value) =>
						setSelectedAccountTypeFilter(value as AccountType | "all")
					}
					className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
						className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
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
									placeholder="e.g., 10"
								/>
								<InputField
									label="Max Amount"
									type="number"
									value={maxAmount}
									onChange={(e) => setMaxAmount(e.target.value)}
									placeholder="e.g., 500"
								/>
								<SelectField
									label="Status"
									value={statusFilter}
									onValueChange={(value) =>
										setStatusFilter(value as "all" | "cleared" | "pending")
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
															selectedCategories.filter((c) => c !== category),
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
		</div>
	);
};

export default TransactionFilters;
