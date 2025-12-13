import type {
	ChartDataPoint,
	ExpenseCategory,
	FinancialSummary,
} from "../../types/types";

export const MOCK_SUMMARY: FinancialSummary = {
	balance: 15700.0,
	income: 8500.0,
	expense: 6222.0,
	balanceGrowth: 12.1,
	incomeGrowth: 6.3,
	expenseGrowth: 2.4,
};

export const BALANCE_HISTORY: ChartDataPoint[] = [
	{ name: "1 Jul", value: 16000 },
	{ name: "3 Jul", value: 15000 },
	{ name: "5 Jul", value: 9000 },
	{ name: "7 Jul", value: 12000 },
	{ name: "9 Jul", value: 18000 },
	{ name: "11 Jul", value: 14000 },
	{ name: "13 Jul", value: 16000 },
	{ name: "15 Jul", value: 12500 },
	{ name: "17 Jul", value: 19000 },
	{ name: "19 Jul", value: 15000 },
	{ name: "21 Jul", value: 16500 },
];

export const BUDGET_VS_EXPENSE: ChartDataPoint[] = [
	{ name: "Jan", value: 4000, value2: 2500 },
	{ name: "Feb", value: 3000, value2: 3200 },
	{ name: "Mar", value: 2000, value2: 4000 },
	{ name: "Apr", value: 2780, value2: 4800 },
	{ name: "May", value: 1890, value2: 2600 },
	{ name: "Jun", value: 2390, value2: 6000 },
	{ name: "Jul", value: 3490, value2: 4300 },
];

export const EXPENSE_STATS: ExpenseCategory[] = [
	{ name: "Money transfer", value: 30, color: "#8b5cf6" }, // violet-500
	{ name: "Rent", value: 25, color: "#a78bfa" }, // violet-400
	{ name: "Others", value: 15, color: "#e2e8f0" }, // slate-200
	{ name: "Cafe & Restaurants", value: 10, color: "#c4b5fd" }, // violet-300
	{ name: "Education", value: 20, color: "#4c1d95" }, // violet-900
];
