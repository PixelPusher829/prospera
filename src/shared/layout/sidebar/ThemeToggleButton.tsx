import { Moon, Sun } from "lucide-react";
import type React from "react";

interface ThemeToggleButtonProps {
	isDarkMode: boolean;
	toggleTheme: () => void;
	isCollapsed?: boolean;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
	isDarkMode,
	toggleTheme,
	isCollapsed = false,
}) => {
	return (
		<div
			className={`flex items-center pt-4 ${
				isCollapsed ? "justify-center" : "justify-between"
			} px-1`}
		>
			<button
				type="button"
				onClick={toggleTheme}
				aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"}
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-red)]/10 text-[var(--primary-red)] transition-colors hover:bg-[var(--primary-red)]/20 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
			>
				{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
			</button>
			<div
				className={`overflow-hidden whitespace-nowrap text-xs text-slate-400 transition-all duration-300 dark:text-slate-500 ${
					isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"
				}`}
			>
				v1.2.0
			</div>
		</div>
	);
};

export default ThemeToggleButton;
