import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
	"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-violet-600 dark:focus-visible:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-800",
	{
		variants: {},
		defaultVariants: {},
	},
);

const thumbVariants = cva(
	"pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
	{
		variants: {},
		defaultVariants: {},
	},
);

export interface SwitchProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
	return (
		<label className="relative inline-flex cursor-pointer items-center">
			<input
				type="checkbox"
				className="peer sr-only"
				{...props}
				role="switch"
			/>
			<div className={switchVariants({ className })}>
				<div className={thumbVariants()} />
			</div>
		</label>
	);
};

export default Switch;
