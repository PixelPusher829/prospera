import { DollarSign, Plus, Save, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import Button from "@/shared/components/Button"; // Import Button component
import { InputField } from "@/shared/components/forms";
import { COLOR_PALETTE } from "@/shared/data/constants";
import type { BudgetCategory } from "@/shared/types/types";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm dark:bg-black/70">
      <div className="m-4 w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-slate-900 dark:shadow-2xl dark:shadow-slate-900/70">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold dark:text-white">Edit Budget</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                  <InputField
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      handleCategoryChange(category.id, "name", e.target.value)
                    }
                    placeholder="Category Name"
                    error={categoryErrors.name}
                  />
                </div>
                <div className="col-span-5">
                  <InputField
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
                    error={categoryErrors.limit}
                  />
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
                          className={`h-6 w-6 cursor-pointer rounded-full border-2 ${
                            category.color === color
                              ? "border-violet-500"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-2 pt-1 text-right">
                  <button
                    onClick={() => handleRemoveCategory(category.id)}
                    className="rounded-full p-2 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={handleAddCategory}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-3 text-slate-400 transition-all hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50 dark:border-slate-700 dark:text-violet-500 dark:hover:border-violet-600 dark:hover:bg-violet-800"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>
        <div className="flex justify-end rounded-b-2xl bg-slate-50 p-6 dark:bg-slate-800">
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
