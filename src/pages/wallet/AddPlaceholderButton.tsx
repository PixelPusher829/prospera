import { Plus } from "lucide-react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface AddPlaceholderButtonProps {
	onClick: () => void;
	label: string;
	className?: string; // Only keep the generic className prop for overrides
}

const AddPlaceholderButton: React.FC<AddPlaceholderButtonProps> = ({
	onClick,
	label,
	className, // Use the new className prop
}) => {
	const baseStyles =
		"flex w-full h-full min-h-20 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 transition-all hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:hover:bg-violet-900/10 group";
	const mergedClassName = twMerge(baseStyles, className); // Merge base styles with external className

	return (
		<button type="button" onClick={onClick} className={mergedClassName}>
			<div className="flex items-center justify-center rounded-full transition-transform group-hover:scale-120 dark:bg-slate-800">
				<Plus
					size={24}
					className="text-slate-400 dark:text-slate-400 group-hover:text-violet-500"
				/>
			</div>
			<span className="font-medium text-slate-400 dark:text-slate-500 group-hover:text-violet-500">
				{label}
			</span>
		</button>
	);
};

export default AddPlaceholderButton;
