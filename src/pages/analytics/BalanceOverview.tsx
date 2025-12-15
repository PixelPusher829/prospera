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

const BalanceOverview: React.FC = () => {
	return (
		<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm @lg:col-span-2">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-slate-700">
					Total balance overview
				</h3>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-violet-500"></span>
						<span className="text-slate-500">This month</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full border border-slate-300"></span>
						<span className="text-slate-400">Last month</span>
					</div>
					<div className="flex cursor-pointer items-center gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
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
							contentStyle={{
								borderRadius: "12px",
								border: "none",
								boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
							}}
							itemStyle={{ color: "#7c3aed", fontWeight: 600 }}
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
