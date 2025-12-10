import {
	ArrowUpRight,
	ChevronDown,
	CreditCard,
	DollarSign,
} from "lucide-react";
import type React from "react";

interface StatCardProps {
	title: string;
	amount: number;
	growth: number;
	transactions: number;
	categories: number;
	comparisonText: string;
	isExpense?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	amount,
	growth,
	transactions,
	categories,
	comparisonText,
	isExpense = false,
}) => {
	const Icon = title === "Income" ? CreditCard : DollarSign;
	const growthColor = isExpense ? "red" : "green";

	return (
		<div className="flex h-64 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between">
				<div>
					<div className="mb-2 flex items-center gap-2">
						<div className="rounded-full bg-slate-50 p-2">
							<Icon size={16} className="text-slate-700" />
						</div>
						<span className="font-semibold text-slate-700">{title}</span>
					</div>
					<h2 className="mt-2 text-4xl font-bold text-slate-700">
						${amount.toLocaleString()}
					</h2>
				</div>
				<div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
					USD <ChevronDown size={14} />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<span
						className={`flex items-center gap-1 rounded-lg bg-${growthColor}-100 px-2 py-0.5 text-xs font-bold text-${growthColor}-700`}
					>
						<ArrowUpRight size={12} /> {growth}%
					</span>
					{!isExpense && (
						<span className="text-xs text-slate-400">vs last month</span>
					)}
				</div>
				<div className="grid grid-cols-2 gap-2 text-xs">
					<div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
						<div className="h-4 w-1 rounded-full bg-violet-200"></div>{" "}
						{transactions} transactions
					</div>
					<div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
						<div className="h-4 w-1 rounded-full bg-violet-400"></div>{" "}
						{categories} categories
					</div>
				</div>
				<p className="text-xs text-slate-400">{comparisonText}</p>
			</div>
		</div>
	);
};

export default StatCard;
