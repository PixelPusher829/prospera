import { X } from "lucide-react";
import type React from "react";
import type { Transaction } from "@/shared/types/types";

interface BulkActionsTransactionsBarProps {
	selectedTransactionIds: Set<string>;
	sortedAndFilteredTransactions: Transaction[];
	handleBulkCategoryAssign: (newCategory: string) => void;
	setSelectedTransactionIds: (ids: Set<string>) => void;
	transactions: Transaction[];
}

const BulkActionsTransactionsBar: React.FC<BulkActionsTransactionsBarProps> = ({
	selectedTransactionIds,
	sortedAndFilteredTransactions,
	handleBulkCategoryAssign,
	setSelectedTransactionIds,
	transactions,
}) => {
	if (selectedTransactionIds.size === 0) {
		return null;
	}

	return (
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
	);
};

export default BulkActionsTransactionsBar;
