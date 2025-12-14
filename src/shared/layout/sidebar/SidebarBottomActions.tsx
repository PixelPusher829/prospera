import { HelpCircle, LogOut, Settings } from "lucide-react";
import type React from "react";
import NavLink from "@/shared/components/navigation/NavLink";
import ThemeToggleButton from "./ThemeToggleButton";

interface SidebarBottomActionsProps {
	isCollapsed: boolean;
	onClick: (path: string) => void; // Updated signature
	isDarkMode: boolean;
	toggleTheme: () => void;
	activeTab: string; // Added activeTab prop
}

const SidebarBottomActions: React.FC<SidebarBottomActionsProps> = ({
	isCollapsed,
	onClick,
	isDarkMode,
	toggleTheme,
	activeTab,
}) => {
	return (
		<div className="mt-auto space-y-2 border-t border-slate-100 px-3 pt-6 dark:border-slate-800">
			<NavLink
				icon={Settings}
				label="Settings"
				path="settings"
				isActive={activeTab === "settings"}
				isCollapsed={isCollapsed}
				onClick={() => onClick("settings")}
				className="sidebar-nav-item"
				activeClassName="active"
				inactiveClassName=""
			/>
			<NavLink
				icon={HelpCircle}
				label="Help"
				path="help"
				isActive={activeTab === "help"}
				isCollapsed={isCollapsed}
				onClick={() => onClick("help")}
				className="sidebar-nav-item"
				activeClassName="active"
				inactiveClassName=""
			/>
			<NavLink
				icon={LogOut}
				label="Log out"
				path="logout"
				isActive={false}
				isCollapsed={isCollapsed}
				onClick={onClick}
				className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/10 dark:hover:text-red-400"
				inactiveClassName=""
			/>
			<ThemeToggleButton
				isDarkMode={isDarkMode}
				toggleTheme={toggleTheme}
				isCollapsed={isCollapsed}
			/>
		</div>
	);
};

export default SidebarBottomActions;
