import type React from "react";
import { Plus } from "lucide-react";

interface AddGoalPlaceholderCardProps {
	openAddModal: () => void;
}

const AddGoalPlaceholderCard: React.FC<AddGoalPlaceholderCardProps> = ({
	openAddModal,
}) => {
	return (
		<div
			onClick={openAddModal}
			className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-6 text-slate-400 transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-violet-900/10"
		>
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
				<Plus size={32} />
			</div>
			<span className="font-medium">Add another goal</span>
		</div>
	);
};

export default AddGoalPlaceholderCard;
