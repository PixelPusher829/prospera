import { Calendar, DollarSign, Save, Target, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import Button from "@/shared/components/Button"; // Import Button component
import { DatePicker, InputField } from "@/shared/components/forms";
import { COLOR_PALETTE } from "@/shared/data/constants";
import type { Goal } from "@/shared/types/types";

interface AddEditGoalModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSaveGoal: (goal: Goal) => void;
	goal: Goal | null; // Optional: goal to be edited
}

const AddEditGoalModal: React.FC<AddEditGoalModalProps> = ({
	isOpen,
	onClose,
	onSaveGoal,
	goal,
}) => {
	const [currentGoal, setCurrentGoal] = useState<Omit<Goal, "id" | "icon">>({
		name: "",
		targetAmount: 0,
		currentAmount: 0,
		deadline: "",
		color: "#6d28d9", // Default color
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (isOpen) {
			if (goal) {
				// Populate form with existing goal data for editing
				setCurrentGoal({
					name: goal.name,
					targetAmount: goal.targetAmount,
					currentAmount: goal.currentAmount,
					deadline: goal.deadline,
					color: goal.color,
				});
			} else {
				// Reset form for adding a new goal
				setCurrentGoal({
					name: "",
					targetAmount: 0,
					currentAmount: 0,
					deadline: "",
					color: COLOR_PALETTE[0], // Default to first color in palette
				});
			}
			setErrors({}); // Clear errors when modal opens
		}
	}, [isOpen, goal]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCurrentGoal((prev) => ({
			...prev,
			[name]:
				name === "targetAmount" || name === "currentAmount"
					? parseFloat(value) || 0
					: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (!currentGoal.name.trim()) newErrors.name = "Goal name is required.";
		if (currentGoal.targetAmount <= 0)
			newErrors.targetAmount = "Target amount must be positive.";
		if (!currentGoal.deadline) newErrors.deadline = "Deadline is required.";
		return newErrors;
	};

	const handleSaveGoal = () => {
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		const goalToSave: Goal = {
			id: goal ? goal.id : new Date().toISOString(), // Use existing ID if editing, new ID if adding
			name: currentGoal.name,
			targetAmount: currentGoal.targetAmount,
			currentAmount: currentGoal.currentAmount,
			deadline: currentGoal.deadline,
			icon: goal ? goal.icon : "target", // Keep existing icon if editing, default if adding
			color: currentGoal.color,
		};

		onSaveGoal(goalToSave);
		onClose();
		// No need to reset currentGoal here, as useEffect handles it on modal open/goal change
		setErrors({});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-md rounded-2xl bg-white shadow-xl">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-xl font-bold">
						{goal ? "Edit Goal" : "Create New Goal"}
					</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 hover:bg-slate-100"
					>
						<X size={20} />
					</button>
				</div>
				<div className="space-y-4 p-6">
					<InputField
						label="Goal Name"
						name="name"
						value={currentGoal.name}
						onChange={handleInputChange}
						placeholder="e.g. New Car Fund"
						error={errors.name}
					/>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Target Amount"
							name="targetAmount"
							type="number"
							value={currentGoal.targetAmount}
							onChange={handleInputChange}
							placeholder="20000"
							error={errors.targetAmount}
						/>
						<InputField
							label="Current Amount"
							name="currentAmount"
							type="number"
							value={currentGoal.currentAmount}
							onChange={handleInputChange}
							placeholder="5000"
						/>
					</div>
					<DatePicker
						label="Deadline"
						name="deadline"
						value={currentGoal.deadline}
						onChange={(e) =>
							handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
						}
						error={errors.deadline}
					/>
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-600">
							Color
						</label>
						<div className="flex flex-wrap gap-2">
							{COLOR_PALETTE.map((color) => (
								<div
									key={color}
									onClick={() =>
										setCurrentGoal((prev) => ({ ...prev, color: color }))
									}
									className={`h-8 w-8 cursor-pointer rounded-full border-2 ${
										currentGoal.color === color
											? "border-violet-500"
											: "border-transparent"
									}`}
									style={{ backgroundColor: color }}
								></div>
							))}
						</div>
					</div>
				</div>
				<div className="flex justify-end rounded-b-2xl bg-slate-50 p-6">
					<Button
						variant="primary"
						onClick={handleSaveGoal}
						disabled={Object.keys(validate()).length > 0}
						icon={<Save size={18} />}
					>
						Save Goal
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddEditGoalModal;
