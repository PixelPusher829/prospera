import { Car, Coffee, HeartPulse, Home, ShoppingBag, Zap } from "lucide-react";
import type { BudgetCategory } from "../../types/types";

export const MOCK_BUDGET: BudgetCategory[] = [
	{
		id: "1",
		name: "Shopping",
		limit: 500,
		spent: 320,
		color: "#f43f5e",
		icon: ShoppingBag,
	},
	{
		id: "2",
		name: "Food & Dining",
		limit: 800,
		spent: 650,
		color: "#8b5cf6",
		icon: Coffee,
	},
	{
		id: "3",
		name: "Transportation",
		limit: 300,
		spent: 120,
		color: "#f59e0b",
		icon: Car,
	},
	{
		id: "4",
		name: "Housing",
		limit: 2000,
		spent: 2000,
		color: "#3b82f6",
		icon: Home,
	},
	{
		id: "5",
		name: "Utilities",
		limit: 250,
		spent: 180,
		color: "#10b981",
		icon: Zap,
	},
	{
		id: "6",
		name: "Health",
		limit: 150,
		spent: 45,
		color: "#ec4899",
		icon: HeartPulse,
	},
];
