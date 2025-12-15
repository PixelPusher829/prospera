import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback, useState } from "react";
import { type ZodType, z } from "zod";
import { formatCreditCard, formatCurrency } from "@/shared/utils/formatters";

const inputVariants = cva(
	"flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-md dark:bg-white/5 text-slate-900 dark:text-slate-50 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-900 dark:placeholder:text-slate-400 dark:focus-visible:ring-violet-600",
	{
		variants: {
			variant: {
				default: "",
				error:
					"border-red-500 text-red-500 placeholder:text-red-400 focus-visible:ring-red-500 dark:border-red-600 dark:text-red-400 dark:placeholder:text-red-500 dark:focus-visible:ring-red-600",
				inline:
					"border-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

// Define common format types for reusability
type InputFormat = "creditCard" | "currency" | "number" | "text" | "none";

export interface InputProps<T>
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	label?: string;
	// External error prop, can be used for server-side errors or parent component validation
	error?: string;
	icon?: React.ReactNode;
	hideCalendarIcon?: boolean;
	onIconClick?: () => void;
	iconPosition?: "left" | "right";
	// Zod schema for validation
	schema?: ZodType<T>;
	// Callback for validated changes (value and error)
	onValidatedChange?: (value: T | string, error?: string) => void;
	// Formatting type
	format?: InputFormat;
}

const InputField = <T,>({
	className,
	variant,
	label,
	error: externalError, // Renamed to avoid collision with internal error state
	icon,
	hideCalendarIcon,
	type,
	onIconClick,
	iconPosition = "right",
	schema,
	onValidatedChange,
	format = "none",
	value, // Capture value prop for controlled component behavior
	onChange, // Capture onChange prop
	onBlur, // Capture onBlur prop
	...props
}: InputProps<T>) => {
	const hideCalendarIconClass =
		hideCalendarIcon && type === "date"
			? "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
			: "";

	const applyFormatting = useCallback(
		(inputValue: string): string => {
			switch (format) {
				case "creditCard":
					return formatCreditCard(inputValue);
				case "currency":
					return formatCurrency(inputValue);
				case "number":
					// Allow only numbers and a single decimal point
					return inputValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
				case "text":
				case "none":
				default:
					return inputValue;
			}
		},
		[format],
	);

	const [internalError, setInternalError] = useState<string | undefined>(
		undefined,
	);
	const [displayValue, setDisplayValue] = useState<string>(() =>
		applyFormatting((value as string) || ""),
	);

	React.useEffect(() => {
		setDisplayValue(applyFormatting((value as string) || ""));
	}, [value, applyFormatting]);

	const inputVariant = externalError || internalError ? "error" : variant;
	const iconClasses = `absolute ${iconPosition === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400`;

	const validate = useCallback(
		(inputValue: string) => {
			if (schema) {
				const result = schema.safeParse(inputValue);
				if (!result.success) {
					setInternalError(result.error.errors[0].message);
					return result.error.errors[0].message;
				} else {
					setInternalError(undefined);
				}
			}
			return undefined;
		},
		[schema],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const formattedValue = applyFormatting(rawValue);
		setDisplayValue(formattedValue);

		// Call original onChange
		if (onChange) {
			onChange(e);
		}

		// Perform validation and notify parent
		const validationError = validate(formattedValue);
		if (onValidatedChange) {
			onValidatedChange(formattedValue as T, validationError);
		}
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const formattedValue = applyFormatting(rawValue); // Re-apply formatting on blur as well
		setDisplayValue(formattedValue);

		// Call original onBlur
		if (onBlur) {
			onBlur(e);
		}

		// Perform validation and notify parent
		const validationError = validate(formattedValue);
		if (onValidatedChange) {
			onValidatedChange(formattedValue as T, validationError);
		}
	};

	const displayError = externalError || internalError;

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
					value={displayValue} // Ensure value is controlled
					onChange={handleInputChange}
					onBlur={handleInputBlur}
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
			{displayError && (
				<p className="mt-1 text-sm text-red-500 dark:text-red-400">{displayError}</p>
			)}
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
