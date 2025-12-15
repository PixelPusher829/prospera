import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-xl text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-w-fit",
	{
		variants: {
			variant: {
				primary: "bg-violet-600 text-white hover:bg-violet-700 shadow-lg",
				secondary:
					"bg-transparent border border-slate-200 hover:bg-slate-100 text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
				danger:
					"bg-transparent border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
				sync: "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
				link: "bg-transparent text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-11 px-5 rounded-md",
				sm: "h-9 px-3 rounded-md",
			},
			fullWidth: {
				true: "w-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	className,
	variant,
	size,
	fullWidth,
	children,
	icon,
	iconPosition = "left",
	isLoading = false,
	...props
}) => {
	return (
		<button
			className={buttonVariants({ variant, size, fullWidth, className })}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<Loader2 className="h-4 w-4 animate-spin" />
			) : (
				<>
					{icon && iconPosition === "left" && (
						<span className="mr-2">{icon}</span>
					)}
					{children}
					{icon && iconPosition === "right" && (
						<span className="ml-2">{icon}</span>
					)}
				</>
			)}
		</button>
	);
};

export default Button;
