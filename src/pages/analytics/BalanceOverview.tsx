import { ChevronDown } from "lucide-react";
import type React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { BALANCE_HISTORY } from "@/shared/data/constants";
import { useTheme } from "@/shared/contexts/ThemeContext";

const BalanceOverview: React.FC = () => {
	const { isDarkMode } = useTheme();

	// Define dynamic colors for Recharts based on theme
	const axisTickFill = isDarkMode ? "#94a3b8" : "#94a3b8"; // slate-400
	const cartesianGridStroke = isDarkMode ? "#334155" : "#f1f5f9"; // slate-700 vs slate-100
	const tooltipContentBg = isDarkMode ? "rgb(30 41 59 / 1)" : "white"; // slate-800
	const tooltipItemColor = isDarkMode ? "#c4b5fd" : "#7c3aed"; // violet-300 vs violet-600

	return (
		<div className="rounded-3xl border  border-slate-100 bg-white p-6 shadow-sm @lg:col-span-2 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700 dark:text-white">
					Total balance overview
				</h3>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-500"></span>
						<span className="text-slate-500 dark:text-slate-400">This month</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full border border-slate-300 dark:border-slate-600"></span>
						<span className="text-slate-400 dark:text-slate-500">Last month</span>
					</div>
					<div className="flex cursor-pointer items-center gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
						Total balance <ChevronDown size={14} />
					</div>
				</div>
			</div>
			<div className="h-[250px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={BALANCE_HISTORY}>
						<defs>
							<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
							</linearGradient>
						</defs>
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
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: isDarkMode ? "0 4px 6px -1px rgb(0 0 0 / 0.4)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
								backgroundColor: tooltipContentBg,
							}}
							itemStyle={{ color: tooltipItemColor, fontWeight: 600 }}
						/>
						<Area
							type="monotone"
							dataKey="value"
							stroke="#8b5cf6"
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorValue)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default BalanceOverview;
