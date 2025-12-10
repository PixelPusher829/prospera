import { Plus } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import AddEditTransactionModal from "@/pages/transactions/AddEditTransactionModal";
import Header from "@/shared/components/layout/Header";
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from "@/shared/data/constants";
import type { Transaction, AccountType } from "@/shared/types/types";
import TransactionFilters from "./TransactionFilters";
import BulkActionsTransactionsBar from "./BulkActionsTransactionsBar";
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
		<div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
			<Header
				heading="Transactions"
				subheading="Record and categorize your spending"
				className="mb-8"
			>
				<div className="flex w-full items-center gap-3 md:w-auto">
					<button
						onClick={openAddModal}
						className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
					>
						<Plus size={18} />
						Add Transaction
					</button>
				</div>
			</Header>

			{/* Filters */}
			<TransactionFilters
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				transactionTypeFilter={transactionTypeFilter}
				setTransactionTypeFilter={setTransactionTypeFilter}
				selectedAccountTypeFilter={selectedAccountTypeFilter}
				setSelectedAccountTypeFilter={setSelectedAccountTypeFilter}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				minAmount={minAmount}
				setMinAmount={setMinAmount}
				maxAmount={maxAmount}
				setMaxAmount={setMaxAmount}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
				transactions={transactions}
			/>

			{/* Bulk Actions Floating Bar */}
			<BulkActionsTransactionsBar
				selectedTransactionIds={selectedTransactionIds}
				sortedAndFilteredTransactions={sortedAndFilteredTransactions}
				handleBulkCategoryAssign={handleBulkCategoryAssign}
				setSelectedTransactionIds={setSelectedTransactionIds}
				transactions={transactions}
			/>

			{/* Table */}
			<TransactionsTable
				sortedAndFilteredTransactions={sortedAndFilteredTransactions}
				selectedTransactionIds={selectedTransactionIds}
				toggleSelectAll={toggleSelectAll}
				toggleSelection={toggleSelection}
				handleSort={handleSort}
				sortField={sortField}
				sortDirection={sortDirection}
				openEditModal={openEditModal}
			/>
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
