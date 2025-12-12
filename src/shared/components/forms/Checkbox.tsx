import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// const checkboxContainerVariants = cva("flex items-center space-x-2", {
//   variants: {},
//   defaultVariants: {},
// });

// const checkboxVariants = cva(
//   "peer h-5 w-5 shrink-0 rounded-sm border border-slate-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white dark:border-slate-700 dark:ring-offset-slate-950 dark:focus-visible:ring-violet-600 dark:data-[state=checked]:bg-violet-600",
//   {
//     variants: {},
//     defaultVariants: {},
//   },
// );

export interface CheckboxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, label, ...props }) => {
	return (
		<div className="flex items-center space-x-2">
			<input
				type="checkbox"
				className={` h-7 w-5 shrink-0 rounded-sm border  ${className}`}
				{...props}
			/>
			<label
				htmlFor={props.id}
				className="text-sm leading-none font-medium text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-200"
			>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
