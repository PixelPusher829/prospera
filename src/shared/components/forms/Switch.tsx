import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { useCallback, useState } from "react";
import { type ZodType, z } from "zod";

const switchVariants = cva(
	"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-violet-600 dark:focus-visible:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-800",
	{
		variants: {},
		defaultVariants: {},
	},
);

const thumbVariants = cva(
	"pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:shadow-none",
	{
		variants: {},
		defaultVariants: {},
	},
);

export interface SwitchProps<T>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	// External error prop
	error?: string;
	// Zod schema for validation
	schema?: ZodType<T>;
	// Callback for validated changes (value and error)
	onValidatedChange?: (value: T, error?: string) => void;
}

const Switch = <T,>({
	className,
	error: externalError,
	schema,
	onValidatedChange,
	onChange, // Capture original onChange
	...props
}: SwitchProps<T>) => {
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

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
			<label className="relative inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					className="peer sr-only"
					onChange={handleSwitchChange}
					{...props}
					role="switch"
				/>
				<div className={switchVariants({ className })}>
					<div className={thumbVariants()} />
				</div>
			</label>
			{displayError && (
				<p className="mt-1 text-sm text-red-500 dark:text-red-400">{displayError}</p>
			)}
		</div>
	);
};

export default Switch;
