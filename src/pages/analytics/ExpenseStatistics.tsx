import { ChevronDown } from "lucide-react";
import type React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { EXPENSE_STATS, MOCK_SUMMARY } from "@/shared/data/constants";

const ExpenseStatistics: React.FC = () => {
	return (
		<div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700 dark:text-white">Statistics</h3>
				<button className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
					Details <ChevronDown size={14} />
				</button>
			</div>
			<p className="mb-6 text-xs text-slate-400 dark:text-slate-500">
				You have an increase of expenses in several categories this month
			</p>

			<div className="relative flex min-h-[200px] flex-1 items-center justify-center">
				{/* Center Text */}
				<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-xs text-slate-400 dark:text-slate-500">This month expense</span>
					<span className="text-2xl font-bold text-slate-700 dark:text-white">
						${MOCK_SUMMARY.expense.toLocaleString()}
					</span>
				</div>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={EXPENSE_STATS}
							innerRadius={60}
							outerRadius={85}
							paddingAngle={5}
							dataKey="value"
							startAngle={90}
							endAngle={450}
							cornerRadius={10}
						>
							{EXPENSE_STATS.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
			{/* Custom Legend */}
			<div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
				{EXPENSE_STATS.map((stat, i) => (
					<div key={i} className="flex items-center gap-1.5">
						<div
							className="h-2 w-2 rounded-full"
							style={{ backgroundColor: stat.color }}
						></div>
						<span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
							{stat.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExpenseStatistics;
