// src/pages/transactions/TransactionsTable.tsx

import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import StatusBadge from "@/shared/components/StatusBadge";
import Table, { type Column } from "@/shared/components/Table";
import { MOCK_ACCOUNTS } from "@/shared/data/constants";
import type { Transaction } from "@/shared/types/types";

interface TransactionsTableProps {
	sortedAndFilteredTransactions: Transaction[];
	selectedTransactionIds: Set<string>;
	toggleSelectAll: () => void;
	toggleSelection: (id: string) => void;
	handleSort: (field: keyof Transaction) => void;
	sortField: keyof Transaction | null;
	sortDirection: "asc" | "desc";
	openEditModal: (transaction: Transaction) => void;
	onCategoryChange: (transactionId: string, newCategory: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
	sortedAndFilteredTransactions,
	selectedTransactionIds,
	toggleSelectAll,
	toggleSelection,
	handleSort,
	sortField,
	sortDirection,
	openEditModal,
	onCategoryChange,
}) => {
	const allCategories = useMemo(() => {
		const categories = new Set(
			sortedAndFilteredTransactions.map((t) => t.category),
		);
		return Array.from(categories);
	}, [sortedAndFilteredTransactions]);

	const columns: Column<Transaction>[] = [
		{
			header: "Date",
			accessor: "date",
			className:
				"text-sm font-medium text-slate-500 tabular-nums dark:text-slate-400",
			cell: (transaction) => transaction.date,
		},
		{
			header: "Payee",
			accessor: "payee",
			cell: (transaction) => (
				<div className="flex items-center gap-3 min-w-0">
					<div
						className={`rounded-full p-2 flex-shrink-0 ${
							transaction.type === "income"
								? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
								: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
						}`}
					>
						{transaction.type === "income" ? (
							<ArrowDownRight size={14} />
						) : (
							<ArrowUpRight size={14} />
						)}
					</div>
					<div className="flex-1 min-w-0">
						<h4 className="text-sm font-medium text-slate-700 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
							{transaction.payee}
						</h4>
						<p className="text-xs text-slate-500 dark:text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
							{transaction.date} • {transaction.category}
						</p>
					</div>
				</div>
			),
		},
		{
			header: "Category",
			accessor: "category",
			cell: (transaction) => (
				<div className="relative inline-block">
					<span className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
						{transaction.category}
					</span>
					<select
						value={transaction.category}
						onChange={(e) => onCategoryChange(transaction.id, e.target.value)}
						className="absolute inset-0 w-full h-full opacity-0 top-1 cursor-pointer text-sm"
					>
						{allCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
						{!allCategories.includes(transaction.category) && (
							<option key={transaction.category} value={transaction.category}>
								{transaction.category}
							</option>
						)}
					</select>
				</div>
			),
		},
		{
			header: "Account",
			accessor: "accountId",
			className: "text-sm text-slate-500 dark:text-slate-400",
			cell: (transaction) =>
				MOCK_ACCOUNTS.find((a) => a.id === transaction.accountId)?.name,
		},
		{
			header: "Amount",
			accessor: "amount",
			cell: (transaction) => (
				<span
					className={`text-sm font-bold ${
						transaction.type === "income"
							? "text-green-600 dark:text-green-400"
							: "text-slate-700 dark:text-white"
					}`}
				>
					{transaction.type === "income" ? "+" : "-"}$
					{transaction.amount.toFixed(2)}
				</span>
			),
		},
		{
			header: "Status",
			accessor: "status",
			cell: (transaction) => <StatusBadge status={transaction.status} />,
		},
	];

	return (
		<Table
			data={sortedAndFilteredTransactions}
			columns={columns}
			selectedIds={selectedTransactionIds}
			toggleSelection={toggleSelection}
			toggleSelectAll={toggleSelectAll}
			handleSort={handleSort}
			sortField={sortField}
			sortDirection={sortDirection}
			getRowId={(transaction) => transaction.id}
			renderRowActions={(transaction) => (
				<button
					onClick={(e) => {
						e.stopPropagation();
						openEditModal(transaction);
					}}
					className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white"
				>
					<MoreHorizontal size={18} />
				</button>
			)}
			actionsColumnClassName="w-16"
			noItemsMessage="No transactions found matching your filters."
		/>
	);
};

export default TransactionsTable;
