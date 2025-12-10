import type React from "react";

interface BudgetSummaryProps {
	totalSpent: number;
	totalBudget: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
	totalSpent,
	totalBudget,
}) => {
	return (
		<div className="mb-10 flex flex-col items-center justify-between gap-8 rounded-3xl bg-slate-900 p-8 text-white md:flex-row dark:bg-slate-800">
			<div className="w-full flex-1">
				<div className="mb-2 flex items-end justify-between">
					<div>
						<p className="mb-1 font-medium text-slate-400 dark:text-slate-300">
							Total Spent
						</p>
						<h2 className="text-4xl font-bold text-white">
							${totalSpent.toLocaleString()}
						</h2>
					</div>
					<div className="text-right">
						<p className="mb-1 font-medium text-slate-400 dark:text-slate-300">
							Total Budget
						</p>
						<p className="text-xl font-semibold text-white">
							${totalBudget.toLocaleString()}
						</p>
					</div>
				</div>
				{/* Master Progress */}
				<div className="h-4 w-full overflow-hidden rounded-full bg-white/10 dark:bg-white/20">
					<div
						className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
						style={{
							width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%`,
						}}
					></div>
				</div>
				<div className="mt-2 text-right text-sm text-slate-400 dark:text-slate-300">
					{Math.round((totalSpent / totalBudget) * 100)}% used
				</div>
			</div>
		</div>
	);
};

export default BudgetSummary;
