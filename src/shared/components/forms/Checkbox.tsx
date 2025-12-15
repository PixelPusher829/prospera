import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { useCallback, useState } from "react";
import { type ZodType, z } from "zod";

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

export interface CheckboxProps<T>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string; // Made label optional
	// External error prop
	error?: string;
	// Zod schema for validation
	schema?: ZodType<T>;
	// Callback for validated changes (value and error)
	onValidatedChange?: (value: T, error?: string) => void;
}

const Checkbox = <T,>({
	className,
	label,
	error: externalError,
	schema,
	onValidatedChange,
	onChange, // Capture original onChange
	...props
}: CheckboxProps<T>) => {
	const [internalError, setInternalError] = useState<string | undefined>(
		undefined,
	);

	const validate = useCallback(
		(checkedValue: boolean) => {
			if (schema) {
				const result = schema.safeParse(checkedValue);
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

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;

		// Call original onChange
		if (onChange) {
			onChange(e);
		}

		// Perform validation and notify parent
		const validationError = validate(checked);
		if (onValidatedChange) {
			onValidatedChange(checked as T, validationError);
		}
	};

	const displayError = externalError || internalError;

	return (
		<div className="flex flex-col">
			<div className="flex items-center space-x-2">
				<input
					type="checkbox"
					className={` h-7 w-5 shrink-0 rounded-sm border border-slate-200 text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-pink-500 dark:focus-visible:ring-violet-500 dark:focus-visible:ring-offset-slate-900 ${className}`}
					onChange={handleCheckboxChange}
					{...props}
				/>
				{label && (
					<label
						htmlFor={props.id}
						className="text-sm leading-none font-medium text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-200"
					>
						{label}
					</label>
				)}
			</div>
			{displayError && (
				<p className="mt-1 text-sm text-red-500 dark:text-red-400">{displayError}</p>
			)}
		</div>
	);
};

export default Checkbox;
