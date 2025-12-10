import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import EditBudgetModal from "@/pages/budget/EditBudgetModal";
import Header from "@/shared/components/layout/Header";
import { MOCK_BUDGET } from "@/shared/data/constants";
import type { BudgetCategory } from "@/shared/types/types";
import BudgetSummary from "./BudgetSummary";
import BudgetCategoryList from "./BudgetCategoryList";

const Budget: React.FC = () => {
	const [budget, setBudget] = useState<BudgetCategory[]>(MOCK_BUDGET);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const totalBudget = budget.reduce((acc, curr) => acc + curr.limit, 0);
	const totalSpent = budget.reduce((acc, curr) => acc + curr.spent, 0);

	const handleSaveBudget = (updatedBudget: BudgetCategory[]) => {
		setBudget(updatedBudget);
	};

	return (
		<div className="container">
			<Header
				heading="Monthly Budget"
				subheading="Keep your spending in check"
				className="mb-10"
			>
				<button
					onClick={() => setIsEditModalOpen(true)}
					className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
					type="button"
				>
					<Plus size={18} />
					Edit Budget
				</button>
			</Header>

			<BudgetSummary totalSpent={totalSpent} totalBudget={totalBudget} />

			<BudgetCategoryList budget={budget} />

			<EditBudgetModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onSave={handleSaveBudget}
				initialBudget={budget}
			/>
		</div>
	);
};

export default Budget;
