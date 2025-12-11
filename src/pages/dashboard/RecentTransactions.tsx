import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type React from "react";
import { MOCK_TRANSACTIONS } from "@/shared/data/constants";
import Button from "@/shared/components/Button"; // Import Button component

const RecentTransactions: React.FC<{
	setActiveTab: (tab: string) => void;
}> = ({ setActiveTab }) => {
	return (
		<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700 dark:text-white">
					Recent Transactions
				</h3>
				<button
					onClick={() => setActiveTab("transactions")}
					className="text-sm font-medium text-pink-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
				>
					View All
				</button>
			</div>

			<div className="space-y-4">
				{MOCK_TRANSACTIONS.slice(0, 5).map((t) => (
					<div
						key={t.id}
						className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
					>
						<div className="flex items-center gap-4">
							<div
								className={`rounded-full p-3 ${
									t.type === "income"
										? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
										: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
								}`}
							>
								{t.type === "income" ? (
									<ArrowDownRight size={20} />
								) : (
									<ArrowUpRight size={20} />
								)}
							</div>
							<div>
								<h4 className="text-sm font-bold text-slate-700 dark:text-white">
									{t.payee}
								</h4>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									{t.date} • {t.category}
								</p>
							</div>
						</div>
						<span
							className={`font-bold ${
								t.type === "income"
									? "text-green-600 dark:text-green-400"
									: "text-slate-700 dark:text-white"
							}`}
						>
							{t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentTransactions;
