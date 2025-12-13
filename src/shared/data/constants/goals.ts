import type { Goal } from "../../types/types";

export const MOCK_GOALS: Goal[] = [
	{
		id: "1",
		name: "New Car",
		targetAmount: 25000,
		currentAmount: 8500,
		deadline: "2024-12-31",
		icon: "car",
		color: "#8b5cf6",
	},
	{
		id: "2",
		name: "Europe Trip",
		targetAmount: 5000,
		currentAmount: 3200,
		deadline: "2024-06-15",
		icon: "plane",
		color: "#ec4899",
	},
	{
		id: "3",
		name: "MacBook Pro",
		targetAmount: 2500,
		currentAmount: 2500,
		deadline: "2023-11-01",
		icon: "laptop",
		color: "#10b981",
	},
];
