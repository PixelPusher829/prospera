import {
	ArrowUpRight,
	ChevronDown,
	CreditCard,
	DollarSign,
	LayoutGrid,
	Plus,
	Sparkles,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	BALANCE_HISTORY,
	BUDGET_VS_EXPENSE,
	EXPENSE_STATS,
	MOCK_SUMMARY,
} from "@/data/constants";
import { getFinancialAdvice } from "@/services/geminiService";

const Analytics: React.FC = () => {
	const [insight, setInsight] = useState<string>("");
	const [loadingInsight, setLoadingInsight] = useState<boolean>(false);

	const generateInsight = async () => {
		setLoadingInsight(true);
		const advice = await getFinancialAdvice(
			MOCK_SUMMARY,
			EXPENSE_STATS,
			BALANCE_HISTORY,
		);
		setInsight(advice);
		setLoadingInsight(false);
	};

	return (
		<div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-700">Analytics</h1>
					<p className="text-slate-500 mt-1">
						Deep dive into financial trends and AI insights
					</p>
				</div>
				<div className="flex items-center gap-3">
					<button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors shadow-sm">
						<LayoutGrid size={18} />
						Export Report
					</button>
				</div>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Total Balance */}
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-64">
					<div className="flex justify-between items-start">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<div className="p-2 bg-slate-50 rounded-full">
									<DollarSign size={16} className="text-slate-700" />
								</div>
								<span className="font-semibold text-slate-700">
									Total balance
								</span>
							</div>
							<h2 className="text-4xl font-bold text-slate-700 mt-2">
								${MOCK_SUMMARY.balance.toLocaleString()}
							</h2>
						</div>
						<div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
							USD <ChevronDown size={14} />
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
								<ArrowUpRight size={12} /> {MOCK_SUMMARY.balanceGrowth}%
							</span>
							<span className="text-xs text-slate-400">vs last month</span>
						</div>

						<div className="grid grid-cols-2 gap-2 text-xs">
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-200 rounded-full"></div> 50
								transactions
							</div>
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-400 rounded-full"></div> 15
								categories
							</div>
						</div>
						<p className="text-xs text-slate-400">
							You have extra{" "}
							<span className="font-semibold text-green-600">$1,700</span>{" "}
							compared to last month
						</p>
					</div>
				</div>

				{/* Income */}
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-64">
					<div className="flex justify-between items-start">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<div className="p-2 bg-slate-50 rounded-full">
									<CreditCard size={16} className="text-slate-700" />
								</div>
								<span className="font-semibold text-slate-700">Income</span>
							</div>
							<h2 className="text-4xl font-bold text-slate-700 mt-2">
								${MOCK_SUMMARY.income.toLocaleString()}
							</h2>
						</div>
						<div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
							USD <ChevronDown size={14} />
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
								<ArrowUpRight size={12} /> {MOCK_SUMMARY.incomeGrowth}%
							</span>
						</div>
						<div className="grid grid-cols-2 gap-2 text-xs">
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-200 rounded-full"></div> 27
								transactions
							</div>
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-400 rounded-full"></div> 6
								categories
							</div>
						</div>
						<p className="text-xs text-slate-400">
							You earned extra{" "}
							<span className="font-semibold text-green-600">$500</span>{" "}
							compared to last month
						</p>
					</div>
				</div>

				{/* Expense */}
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-64">
					<div className="flex justify-between items-start">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<div className="p-2 bg-slate-50 rounded-full">
									<DollarSign size={16} className="text-slate-700" />
								</div>
								<span className="font-semibold text-slate-700">Expense</span>
							</div>
							<h2 className="text-4xl font-bold text-slate-700 mt-2">
								${MOCK_SUMMARY.expense.toLocaleString()}
							</h2>
						</div>
						<div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
							USD <ChevronDown size={14} />
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
								<ArrowUpRight size={12} /> {MOCK_SUMMARY.expenseGrowth}%
							</span>
						</div>
						<div className="grid grid-cols-2 gap-2 text-xs">
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-200 rounded-full"></div> 23
								transactions
							</div>
							<div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-600">
								<div className="w-1 h-4 bg-violet-400 rounded-full"></div> 9
								categories
							</div>
						</div>
						<p className="text-xs text-slate-400">
							You spent extra{" "}
							<span className="font-semibold text-red-600">$1,222</span>{" "}
							compared to last month
						</p>
					</div>
				</div>
			</div>

			{/* Charts Section 1 */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Balance Overview - Area Chart */}
				<div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
					<div className="flex justify-between items-center mb-6">
						<h3 className="font-bold text-lg text-slate-700">
							Total balance overview
						</h3>
						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-violet-500"></span>
								<span className="text-slate-500">This month</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full border border-slate-300"></span>
								<span className="text-slate-400">Last month</span>
							</div>
							<div className="bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600 font-medium text-xs flex items-center gap-1 cursor-pointer">
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

				{/* Statistics - Donut */}
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-bold text-lg text-slate-700">Statistics</h3>
						<button className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1">
							Details <ChevronDown size={14} />
						</button>
					</div>
					<p className="text-xs text-slate-400 mb-6">
						You have an increase of expenses in several categories this month
					</p>

					<div className="relative flex-1 flex items-center justify-center min-h-[200px]">
						{/* Center Text */}
						<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
							<span className="text-xs text-slate-400">This month expense</span>
							<span className="text-2xl font-bold text-slate-700">
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
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
											stroke="none"
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>
					{/* Custom Legend */}
					<div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center">
						{EXPENSE_STATS.map((stat, i) => (
							<div key={i} className="flex items-center gap-1.5">
								<div
									className="w-2 h-2 rounded-full"
									style={{ backgroundColor: stat.color }}
								></div>
								<span className="text-[10px] font-medium text-slate-600">
									{stat.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Charts Section 2 & AI */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Budget vs Expense - Bar Chart */}
				<div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
					<div className="flex justify-between items-center mb-6">
						<h3 className="font-bold text-lg text-slate-700">
							Comparing of budget and expense
						</h3>
						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-violet-500"></span>
								<span className="text-slate-500">Expense</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-violet-200"></span>
								<span className="text-slate-400">Budget</span>
							</div>
							<div className="bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600 font-medium text-xs flex items-center gap-1 cursor-pointer">
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

				{/* AI Insight Card */}
				<div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-3xl shadow-lg shadow-violet-200 text-white flex flex-col">
					<div className="flex items-center gap-3 mb-4">
						<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
							<Sparkles size={20} className="text-yellow-300" />
						</div>
						<h3 className="font-bold text-lg">Prospera AI Advisor</h3>
					</div>

					<div className="flex-1 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 mb-4 overflow-y-auto">
						{insight ? (
							<p className="text-sm leading-relaxed text-violet-50">
								{insight}
							</p>
						) : (
							<div className="h-full flex flex-col items-center justify-center text-center text-violet-200 text-sm">
								<p>
									Get AI-powered insights based on your current financial
									metrics.
								</p>
							</div>
						)}
					</div>

					<button
						onClick={generateInsight}
						disabled={loadingInsight}
						className="w-full py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
					>
						{loadingInsight ? (
							<>
								<span className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></span>
								Analyzing...
							</>
						) : (
							"Generate Insights"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
