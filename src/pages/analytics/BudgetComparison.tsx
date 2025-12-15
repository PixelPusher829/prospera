import { ChevronDown } from "lucide-react";
import type React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { BUDGET_VS_EXPENSE } from "@/shared/data/constants";
import { useTheme } from "@/shared/contexts/ThemeContext";

const BudgetComparison: React.FC = () => {
	const { isDarkMode } = useTheme();

	// Define dynamic colors for Recharts based on theme
	const axisTickFill = isDarkMode ? "#94a3b8" : "#94a3b8"; // slate-400
	const cartesianGridStroke = isDarkMode ? "#334155" : "#f1f5f9"; // slate-700 vs slate-100
	const tooltipCursorFill = isDarkMode ? "#1e293b" : "#f8fafc"; // slate-800 vs white
	const tooltipContentBg = isDarkMode ? "rgb(30 41 59 / 1)" : "white"; // slate-800
	const barFillValue = isDarkMode ? "#8b5cf6" : "#8b5cf6"; // violet-600
	const barFillValue2 = isDarkMode ? "#a78bfa" : "#ddd6fe"; // violet-400 vs violet-100


	return (
		<div className="rounded-3xl border col-span-2 border-slate-100 bg-white p-6 shadow-sm @3xl:col-span-1 dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-slate-900/70">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700 dark:text-white">
					Comparing of budget and expense
				</h3>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-500"></span>
						<span className="text-slate-500 dark:text-slate-400">Expense</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-200 dark:bg-violet-800"></span>
						<span className="text-slate-400 dark:text-slate-500">Budget</span>
					</div>
					<div className="flex cursor-pointer items-center gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
						This year <ChevronDown size={14} />
					</div>
				</div>
			</div>
			<div className="h-[250px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={BUDGET_VS_EXPENSE} barGap={8}>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke={cartesianGridStroke}
						/>
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{ fill: axisTickFill, fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: axisTickFill, fontSize: 12 }}
							tickFormatter={(value) => `$${value}`}
						/>
						<Tooltip
							cursor={{ fill: tooltipCursorFill }}
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: isDarkMode ? "0 4px 6px -1px rgb(0 0 0 / 0.4)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
								backgroundColor: tooltipContentBg,
							}}
						/>
						<Bar
							dataKey="value"
							fill={barFillValue}
							radius={[6, 6, 6, 6]}
							barSize={24}
						/>
						<Bar
							dataKey="value2"
							fill={barFillValue2}
							radius={[6, 6, 6, 6]}
							barSize={24}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default BudgetComparison;
