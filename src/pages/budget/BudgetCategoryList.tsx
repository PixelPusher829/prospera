import { AlertCircle } from "lucide-react";
import type React from "react";
import type { BudgetCategory } from "@/shared/types/types";

interface BudgetCategoryListProps {
	budget: BudgetCategory[];
}

const BudgetCategoryList: React.FC<BudgetCategoryListProps> = ({ budget }) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{budget.map((item) => {
				const Icon = item.icon;
				const percentage = Math.round((item.spent / item.limit) * 100);
				const isOver = percentage > 100;

				return (
					<div
						key={item.id}
						className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
					>
						<div className="mb-4 flex items-start justify-between">
							<div className="flex items-center gap-4">
								<div
									className="rounded-2xl p-3"
									style={{
										backgroundColor: `${item.color}20`,
										color: item.color,
									}}
								>
									<Icon size={24} />
								</div>
								<div>
									<h3 className="font-bold text-slate-700 dark:text-white">
										{item.name}
									</h3>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Limit: ${item.limit}
									</p>
								</div>
							</div>
							<div className="text-right">
								<span
									className={`text-xl font-bold ${isOver ? "text-red-500" : "text-slate-700 dark:text-white"}`}
								>
									${item.spent}
								</span>
							</div>
						</div>

						<div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
							<div
								className={`h-full rounded-full ${isOver ? "bg-red-500" : ""}`}
								style={{
									width: `${Math.min(100, percentage)}%`,
									backgroundColor: isOver ? undefined : item.color,
								}}
							></div>
						</div>

						<div className="flex items-center justify-between text-xs font-medium">
							<span style={{ color: isOver ? "#ef4444" : item.color }}>
								{percentage}%
							</span>
							<span className="text-slate-400 dark:text-slate-500">
								{isOver ? (
									<span className="flex items-center gap-1 text-red-500">
										<AlertCircle size={12} /> Over budget
									</span>
								) : (
									`$${item.limit - item.spent} left`
								)}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default BudgetCategoryList;
