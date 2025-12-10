import { DollarSign, Plus, Save, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { COLOR_PALETTE } from "@/data/constants";
import type { BudgetCategory } from "@/types/types";

interface EditBudgetModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedBudget: BudgetCategory[]) => void;
	initialBudget: BudgetCategory[];
}

const EditBudgetModal: React.FC<EditBudgetModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialBudget,
}) => {
	const [budget, setBudget] = useState<BudgetCategory[]>([]);
	const [openColorPickerId, setOpenColorPickerId] = useState<string | null>(
		null,
	);
	const [errors, setErrors] = useState<{
		[id: string]: { [field: string]: string };
	}>({});

	useEffect(() => {
		// Deep copy and reset errors when modal opens
		setBudget(initialBudget.map((cat) => ({ ...cat })));
		setErrors({});
	}, [initialBudget, isOpen]);

	useEffect(() => {
		// Validate on every budget change
		validate(budget);
	}, [budget]);

	const handleCategoryChange = (
		id: string,
		field: keyof BudgetCategory,
		value: string | number,
	) => {
		setBudget((prev) =>
			prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)),
		);
	};

	const validate = (currentBudget: BudgetCategory[]) => {
		const newErrors: { [id: string]: { [field: string]: string } } = {};
		let hasError = false;

		for (const category of currentBudget) {
			newErrors[category.id] = {};
			if (!category.name.trim()) {
				newErrors[category.id].name = "Name cannot be empty.";
				hasError = true;
			}
			if (category.limit < 0) {
				newErrors[category.id].limit = "Limit must be non-negative.";
				hasError = true;
			}
		}
		setErrors(newErrors);
		return hasError;
	};

	const handleAddCategory = () => {
		const newCategory: BudgetCategory = {
			id: `new-${new Date().toISOString()}`,
			name: "",
			limit: 0,
			spent: 0,
			icon: DollarSign,
			color: COLOR_PALETTE[0], // Default to first color in palette
		};
		setBudget((prev) => [...prev, newCategory]);
	};

	const handleRemoveCategory = (id: string) => {
		setBudget((prev) => prev.filter((cat) => cat.id !== id));
	};

	const handleSave = () => {
		if (validate(budget)) return; // Don't save if there are errors
		onSave(budget);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4">
				<div className="p-6 flex justify-between items-center">
					<h2 className="text-xl font-bold">Edit Budget</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-slate-100 rounded-full"
					>
						<X size={20} />
					</button>
				</div>
				<div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
					{budget.map((category) => {
						const categoryErrors = errors[category.id] || {};
						return (
							<div
								key={category.id}
								className="grid grid-cols-14 gap-4 items-start"
							>
								<div className="col-span-6">
									<input
										type="text"
										value={category.name}
										onChange={(e) =>
											handleCategoryChange(category.id, "name", e.target.value)
										}
										placeholder="Category Name"
										className={`w-full px-3 py-2 border rounded-lg transition-colors ${categoryErrors.name ? "border-red-500" : "border-slate-200"}`}
									/>
									{categoryErrors.name && (
										<p className="text-xs text-red-500 mt-1">
											{categoryErrors.name}
										</p>
									)}
								</div>
								<div className="col-span-5">
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
											$
										</span>
										<input
											type="number"
											value={category.limit}
											onChange={(e) =>
												handleCategoryChange(
													category.id,
													"limit",
													parseFloat(e.target.value) || 0,
												)
											}
											placeholder="Limit"
											className={`w-full pl-7 pr-3 py-2 border rounded-lg transition-colors ${categoryErrors.limit ? "border-red-500" : "border-slate-200"}`}
										/>
									</div>
									{categoryErrors.limit && (
										<p className="text-xs text-red-500 mt-1">
											{categoryErrors.limit}
										</p>
									)}
								</div>
								<div className="col-span-1 relative flex h-full items-top mt-2 justify-center">
									<div
										onClick={() =>
											setOpenColorPickerId(
												openColorPickerId === category.id ? null : category.id,
											)
										}
										className="w-7 h-7 rounded-full cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm"
										style={{ backgroundColor: category.color }}
									></div>
									{openColorPickerId === category.id && (
										<div className="absolute top-8 mt-2 bg-white dark:bg-slate-700 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-600 z-10 grid grid-cols-5 gap-2 w-max">
											{COLOR_PALETTE.map((color) => (
												<div
													key={color}
													onClick={() => {
														handleCategoryChange(category.id, "color", color);
														setOpenColorPickerId(null);
													}}
													className={`w-6 h-6 rounded-full cursor-pointer border-2 ${category.color === color ? "border-violet-500" : "border-transparent"}`}
													style={{ backgroundColor: color }}
												></div>
											))}
										</div>
									)}
								</div>
								<div className="col-span-2 text-right pt-1">
									<button
										onClick={() => handleRemoveCategory(category.id)}
										className="p-2 text-red-500 hover:bg-red-100 rounded-full"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						);
					})}
					<button
						onClick={handleAddCategory}
						className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-dashed rounded-lg border-slate-200 text-slate-400 hover:bg-slate-50 hover:border-slate-400 transition-all"
					>
						<Plus size={18} /> Add Category
					</button>
				</div>
				<div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end">
					<button
						onClick={handleSave}
						disabled={Object.values(errors).some(
							(fieldErrors) => Object.keys(fieldErrors).length > 0,
						)}
						className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
					>
						<Save size={18} />
						Save Budget
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditBudgetModal;
