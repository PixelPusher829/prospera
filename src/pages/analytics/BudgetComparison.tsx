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

const BudgetComparison: React.FC = () => {
	return (
		<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm @lg:col-span-2">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700">
					Comparing of budget and expense
				</h3>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-500"></span>
						<span className="text-slate-500">Expense</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-200"></span>
						<span className="text-slate-400">Budget</span>
					</div>
					<div className="flex cursor-pointer items-center gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
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
							stroke="#f1f5f9"
						/>
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#94a3b8", fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#94a3b8", fontSize: 12 }}
							tickFormatter={(value) => `$${value}`}
						/>
						<Tooltip
							cursor={{ fill: "#f8fafc" }}
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
							}}
						/>
						<Bar
							dataKey="value"
							fill="#8b5cf6"
							radius={[6, 6, 6, 6]}
							barSize={24}
						/>
						<Bar
							dataKey="value2"
							fill="#ddd6fe"
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
