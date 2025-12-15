import type { LucideIcon } from "lucide-react";
import type React from "react";

interface NavLinkProps {
	icon: LucideIcon;
	label: string;
	path: string; // Add path prop
	isActive?: boolean;
	isCollapsed?: boolean;
	onClick?: (path: string) => void; // Update onClick signature
	className?: string;
	activeClassName?: string;
	inactiveClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
	icon: Icon,
	label,
	isActive = false,
	isCollapsed = false,
	onClick,
	className = "",
	activeClassName = "bg-primary-gradient text-white shadow-lg shadow-violet-200/50",
	inactiveClassName = "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
}) => {
	const commonClasses = `flex max-w-xs items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
    isCollapsed ? "justify-center" : ""
  } ${className}`;

	const finalClassName = `${commonClasses} w-full ${isActive ? activeClassName : inactiveClassName}`;

	return (
		<button
			type="button"
			onClick={onClick}
			className={finalClassName}
			title={isCollapsed ? label : undefined}
		>
			<Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
			<span
				className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
					isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"
				}`}
			>
				{label}
			</span>
		</button>
	);
};

export default NavLink;
