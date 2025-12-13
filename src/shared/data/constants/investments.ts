import {
	Bitcoin,
	Briefcase,
	Building2,
	Globe,
	LineChart,
	PiggyBank,
} from "lucide-react";

export const INVESTMENT_CATEGORIES = [
	{
		value: "crypto",
		label: "Cryptocurrency",
		icon: Bitcoin,
		colorTheme: "from-orange-500 to-orange-600",
		iconBgClass: "bg-orange-50",
		iconTextColorClass: "text-orange-500",
	},
	{
		value: "stocks",
		label: "Stocks & ETFs",
		icon: LineChart,
		colorTheme: "from-green-500 to-green-600",
		iconBgClass: "bg-green-50",
		iconTextColorClass: "text-green-500",
	},
	{
		value: "real_estate",
		label: "Real Estate",
		icon: Building2,
		colorTheme: "from-amber-600 to-amber-700",
		iconBgClass: "bg-amber-50",
		iconTextColorClass: "text-amber-600",
	},
	{
		value: "retirement",
		label: "Retirement Accounts",
		icon: Briefcase,
		colorTheme: "from-blue-600 to-blue-700",
		iconBgClass: "bg-blue-50",
		iconTextColorClass: "text-blue-600",
	},
	{
		value: "savings",
		label: "High-Yield Savings",
		icon: PiggyBank,
		colorTheme: "from-teal-500 to-teal-600",
		iconBgClass: "bg-teal-50",
		iconTextColorClass: "text-teal-600",
	},
	{
		value: "commodities",
		label: "Commodities",
		icon: Globe,
		colorTheme: "from-yellow-700 to-yellow-800",
		iconBgClass: "bg-yellow-50",
		iconTextColorClass: "text-yellow-700",
	},
];
