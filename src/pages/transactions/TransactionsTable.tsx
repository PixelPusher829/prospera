import {
	ArrowDownRight,
	ArrowDownUp,
	ArrowUpRight,
	MoreHorizontal,
} from "lucide-react";
import type React from "react";
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
}) => {
	return (
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
											className={`rounded-full p-2 ${
												t.type === "income"
													? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
													: "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
											}`}
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
									className={`px-6 py-4 text-right text-sm font-bold ${
										t.type === "income"
											? "text-green-600 dark:text-green-400"
											: "text-slate-700 dark:text-white"
									}`}
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
	);
};

export default TransactionsTable;
