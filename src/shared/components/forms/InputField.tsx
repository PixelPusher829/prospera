import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const inputVariants = cva(
	"flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-md ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-900 dark:placeholder:text-slate-400 dark:focus-visible:ring-violet-600",
	{
		variants: {
			variant: {
				default: "",
				error:
					"border-red-500 text-red-500 placeholder:text-red-400 focus-visible:ring-red-500",
				inline:
					"border-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	label?: string;
	error?: string;
	icon?: React.ReactNode;
	hideCalendarIcon?: boolean;
	onIconClick?: () => void;
	iconPosition?: "left" | "right";
}

const InputField: React.FC<InputProps> = ({
	className,
	variant,
	label,
	error,
	icon,
	hideCalendarIcon,
	type,
	onIconClick,
	iconPosition = "right",
	...props
}) => {
	const inputVariant = error ? "error" : variant;
	const iconClasses = `absolute ${iconPosition === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-slate-400`;

	const hideCalendarIconClass =
		hideCalendarIcon && type === "date"
			? "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
			: "";

	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={props.id}
					className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					type={type}
					className={inputVariants({
						variant: inputVariant,
						className: `${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""} ${className} ${hideCalendarIconClass}`,
					})}
					{...props}
				/>
				{icon && (
					<div
						className={`${iconClasses} ${onIconClick ? "cursor-pointer" : ""}`}
						onClick={onIconClick}
					>
						{icon}
					</div>
				)}
			</div>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export const CalendarIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5"
	>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
	</svg>
);

export default InputField;
