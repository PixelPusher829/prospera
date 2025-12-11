import {
	Calendar,
	Car,
	Laptop,
	MoreVertical,
	Plane,
	Target,
} from "lucide-react";
import type React from "react";
import type { Goal } from "@/shared/types/types";

interface GoalCardProps {
	goal: Goal;
	onEdit: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit }) => {
	const percentage = Math.min(
		100,
		Math.round((goal.currentAmount / goal.targetAmount) * 100),
	);
	const remaining = goal.targetAmount - goal.currentAmount;

	// Simple estimation logic: assume saving $500/month if not specified (mock)
	const monthlyContribution = 500;
	const monthsLeft = Math.ceil(remaining / monthlyContribution);

	const getIcon = () => {
		switch (goal.icon) {
			case "car":
				return <Car size={24} />;
			case "plane":
			case "travel": // Assuming 'travel' also uses a plane icon
				return <Plane size={24} />;
			case "laptop":
			return <Laptop size={24} />;
			default:
				return <Target size={24} />;
		}
	};

	return (
		<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
			<div className="mb-6 flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div
						className="rounded-2xl p-4"
						style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
					>
						{getIcon()}
					</div>
					<div>
						<h3 className="text-lg font-bold text-slate-700 dark:text-white">
							{goal.name}
						</h3>
						<div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
							<Calendar size={12} />
							Target: {goal.deadline}
						</div>
					</div>
				</div>
				<button
					onClick={() => onEdit(goal)}
					className="text-slate-300 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white"
				>
					<MoreVertical size={20} />
				</button>
			</div>

			<div className="mb-2 flex items-end justify-between">
				<span className="text-3xl font-bold text-slate-700 dark:text-white">
					${goal.currentAmount.toLocaleString()}
				</span>
				<span className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
					of ${goal.targetAmount.toLocaleString()}
				</span>
			</div>

			{/* Progress Bar */}
			<div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
				<div
					className="h-full rounded-full transition-all duration-1000 ease-out"
					style={{ width: `${percentage}%`, backgroundColor: goal.color }}
				></div>
			</div>

			<div className="flex items-center justify-between text-sm">
				<span className="font-bold" style={{ color: goal.color }}>
					{percentage}%
				</span>
				{remaining > 0 ? (
					<span className="text-slate-400 dark:text-slate-500">
						~{monthsLeft} months to go
					</span>
				) : (
					<span className="font-bold text-green-600">Goal Reached!</span>
				)}
			</div>
		</div>
	);
};

export default GoalCard;
