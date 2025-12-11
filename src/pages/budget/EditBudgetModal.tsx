import { DollarSign, Plus, Save, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { COLOR_PALETTE } from "@/shared/data/constants";
import type { BudgetCategory } from "@/shared/types/types";
import Button from "@/shared/components/Button"; // Import Button component

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
	}, [initialBudget]);

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
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-xl font-bold">Edit Budget</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 hover:bg-slate-100"
					>
						<X size={20} />
					</button>
				</div>
				<div className="max-h-[60vh] space-y-4 overflow-y-auto p-6">
					{budget.map((category) => {
						const categoryErrors = errors[category.id] || {};
						return (
							<div
								key={category.id}
								className="grid grid-cols-14 items-start gap-4"
							>
								<div className="col-span-6">
									<input
										type="text"
										value={category.name}
										onChange={(e) =>
											handleCategoryChange(category.id, "name", e.target.value)
										}
										placeholder="Category Name"
										className={`w-full rounded-lg border px-3 py-2 transition-colors ${categoryErrors.name ? "border-red-500" : "border-slate-200"}`}
									/>
									{categoryErrors.name && (
										<p className="mt-1 text-xs text-red-500">
											{categoryErrors.name}
										</p>
									)}
								</div>
								<div className="col-span-5">
									<div className="relative">
										<span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
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
											className={`w-full rounded-lg border py-2 pr-3 pl-7 transition-colors ${categoryErrors.limit ? "border-red-500" : "border-slate-200"}`}
										/>
									</div>
									{categoryErrors.limit && (
										<p className="mt-1 text-xs text-red-500">
											{categoryErrors.limit}
										</p>
									)}
								</div>
								<div className="items-top relative col-span-1 mt-2 flex h-full justify-center">
									<div
										onClick={() =>
											setOpenColorPickerId(
												openColorPickerId === category.id ? null : category.id,
											)
										}
										className="h-7 w-7 cursor-pointer rounded-full border-2 border-white shadow-sm dark:border-slate-800"
										style={{ backgroundColor: category.color }}
									></div>
									{openColorPickerId === category.id && (
										<div className="absolute top-8 z-10 mt-2 grid w-max grid-cols-5 gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-lg dark:border-slate-600 dark:bg-slate-700">
											{COLOR_PALETTE.map((color) => (
												<div
													key={color}
													onClick={() => {
														handleCategoryChange(category.id, "color", color);
														setOpenColorPickerId(null);
													}}
													className={`h-6 w-6 cursor-pointer rounded-full border-2 ${category.color === color ? "border-violet-500" : "border-transparent"}`}
													style={{ backgroundColor: color }}
												></div>
											))}
										</div>
									)}
								</div>
								<div className="col-span-2 pt-1 text-right">
									<button
										onClick={() => handleRemoveCategory(category.id)}
										className="rounded-full p-2 text-red-500 hover:bg-red-100"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						);
					})}
					<button
						onClick={handleAddCategory}
						className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-3 text-slate-400 transition-all hover:border-slate-400 hover:bg-slate-50"
					>
						<Plus size={18} /> Add Category
					</button>
				</div>
				<div className="flex justify-end rounded-b-2xl bg-slate-50 p-6">
					<Button
						variant="primary"
						onClick={handleSave}
						disabled={Object.values(errors).some(
							(fieldErrors) => Object.keys(fieldErrors).length > 0,
						)}
						icon={<Save size={18} />}
					>
						Save Budget
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EditBudgetModal;
