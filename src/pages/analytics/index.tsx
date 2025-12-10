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
} from "@/shared/data/constants";
import { getFinancialAdvice } from "@/shared/services/geminiService";
import Header from "@/shared/components/layout/Header";

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
    <div className="container">
      {/* Header Section */}
      <Header
        heading="Analytics"
        subheading="Deep dive into financial trends and AI insights"
      >
        {" "}
        <button
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          type="button"
        >
          <LayoutGrid size={18} />
          Export Report
        </button>
      </Header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Balance */}
        <div className="flex h-64 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-slate-50 p-2">
                  <DollarSign size={16} className="text-slate-700" />
                </div>
                <span className="font-semibold text-slate-700">
                  Total balance
                </span>
              </div>
              <h2 className="mt-2 text-4xl font-bold text-slate-700">
                ${MOCK_SUMMARY.balance.toLocaleString()}
              </h2>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              USD <ChevronDown size={14} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-lg bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                <ArrowUpRight size={12} /> {MOCK_SUMMARY.balanceGrowth}%
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-200"></div> 50
                transactions
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-400"></div> 15
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
        <div className="flex h-64 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-slate-50 p-2">
                  <CreditCard size={16} className="text-slate-700" />
                </div>
                <span className="font-semibold text-slate-700">Income</span>
              </div>
              <h2 className="mt-2 text-4xl font-bold text-slate-700">
                ${MOCK_SUMMARY.income.toLocaleString()}
              </h2>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              USD <ChevronDown size={14} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-lg bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                <ArrowUpRight size={12} /> {MOCK_SUMMARY.incomeGrowth}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-200"></div> 27
                transactions
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-400"></div> 6
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
        <div className="flex h-64 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-slate-50 p-2">
                  <DollarSign size={16} className="text-slate-700" />
                </div>
                <span className="font-semibold text-slate-700">Expense</span>
              </div>
              <h2 className="mt-2 text-4xl font-bold text-slate-700">
                ${MOCK_SUMMARY.expense.toLocaleString()}
              </h2>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              USD <ChevronDown size={14} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                <ArrowUpRight size={12} /> {MOCK_SUMMARY.expenseGrowth}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-200"></div> 23
                transactions
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-slate-600">
                <div className="h-4 w-1 rounded-full bg-violet-400"></div> 9
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Balance Overview - Area Chart */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
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

        {/* Statistics - Donut */}
        <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-700">Statistics</h3>
            <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600">
              Details <ChevronDown size={14} />
            </button>
          </div>
          <p className="mb-6 text-xs text-slate-400">
            You have an increase of expenses in several categories this month
          </p>

          <div className="relative flex min-h-[200px] flex-1 items-center justify-center">
            {/* Center Text */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
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
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {EXPENSE_STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-full"
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Budget vs Expense - Bar Chart */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
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

        {/* AI Insight Card */}
        <div className="flex flex-col rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-violet-200">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
              <Sparkles size={20} className="text-yellow-300" />
            </div>
            <h3 className="text-lg font-bold">Prospera AI Advisor</h3>
          </div>

          <div className="mb-4 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            {insight ? (
              <p className="text-sm leading-relaxed text-violet-50">
                {insight}
              </p>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-violet-200">
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-violet-700 transition-colors hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingInsight ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"></span>
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
