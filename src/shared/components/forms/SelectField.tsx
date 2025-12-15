import * as Select from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useState } from "react";
import { type ZodType, z } from "zod";

const selectTriggerVariants = cva(
  "flex h-11 w-full items-center justify-between dark:bg-white/5 rounded-md border border-slate-200 bg-transparent px-3 py-2 text-md text-slate-900 dark:text-slate-50 ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-violet-600",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-red-500 text-red-500 placeholder:text-red-400 focus:ring-red-500 dark:border-red-600 dark:text-red-400 dark:placeholder:text-red-500 dark:focus:ring-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const selectContentVariants = cva(
	"relative z-50 max-h-96 min-w-[var(--radix-select-trigger-width)]  overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
);

const selectViewportVariants = cva("p-1");

const selectItemVariants = cva(
	"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
);

export interface SelectFieldProps<T>
	extends React.ComponentPropsWithoutRef<typeof Select.Root>,
		VariantProps<typeof selectTriggerVariants> {
	label?: string;
	error?: string;
	placeholder?: string;
	children: React.ReactNode;
	// Zod schema for validation
	schema?: ZodType<T>;
	// Callback for validated changes (value and error)
	onValidatedChange?: (value: T, error?: string) => void;
}

const SelectField = React.forwardRef<
	HTMLButtonElement,
	SelectFieldProps<any> // Using any for now, will refine once usage is clearer
>(
	(
		{
			className,
			variant,
			label,
			error: externalError,
			placeholder,
			children,
			schema,
			onValidatedChange,
			onValueChange, // Capture original onValueChange
			...props
		},
		forwardedRef,
	) => {
		const [internalError, setInternalError] = useState<string | undefined>(
			undefined,
		);

		const validate = useCallback(
			(value: any) => {
				if (schema) {
					const result = schema.safeParse(value);
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

		const handleValueChange = (value: any) => {
			// Call original onValueChange
			if (onValueChange) {
				onValueChange(value);
			}

			// Perform validation and notify parent
			const validationError = validate(value);
			if (onValidatedChange) {
				onValidatedChange(value as T, validationError);
			}
		};

		const displayError = externalError || internalError;
		const selectVariant = displayError ? "error" : variant;

		return (
			<div className="w-full">
				{label && (
					<label className="mb-2 block text-sm font-medium  text-slate-700 dark:text-slate-200">
						{label}
					</label>
				)}
				<Select.Root onValueChange={handleValueChange} {...props}>
					<Select.Trigger
						ref={forwardedRef}
						className={selectTriggerVariants({
							variant: selectVariant,
							className,
						})}
					>
						<Select.Value placeholder={placeholder} />
						<Select.Icon asChild>
							<ChevronDown className="h-4 w-4 opacity-50 dark:text-slate-300" />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							position="popper"
							className={selectContentVariants()}
						>
							<Select.Viewport className={selectViewportVariants()}>
								{children}
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
				{displayError && (
					<p className="mt-1 text-sm text-red-500 dark:text-red-400">{displayError}</p>
				)}
			</div>
		);
	},
);

SelectField.displayName = "SelectField";

export const SelectItem = React.forwardRef<
	HTMLDivElement,
	Select.SelectItemProps
>(({ className, children, ...props }, forwardedRef) => (
	<Select.Item
		ref={forwardedRef}
		className={selectItemVariants({ className })}
		{...props}
	>
		<Select.ItemText>{children}</Select.ItemText>
	</Select.Item>
));
SelectItem.displayName = "SelectItem";

export default SelectField;
