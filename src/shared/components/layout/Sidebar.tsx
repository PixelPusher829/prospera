import {
	ArrowRightLeft,
	BarChart2,
	ChevronLeft,
	ChevronRight,
	HelpCircle,
	LayoutDashboard,
	LogOut,
	Moon,
	PieChart,
	Settings,
	Sun,
	Target,
	Users,
	Wallet,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import logo from "@/shared/assets/logo.svg";
import type { NavItem, SidebarProps } from "@/shared/types/types";

const NAV_ITEMS: NavItem[] = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
	{ id: "analytics", label: "Analytics", icon: BarChart2, path: "/analytics" },
	{
		id: "transactions",
		label: "Transactions",
		icon: ArrowRightLeft,
		path: "/transactions",
	},
	{ id: "wallet", label: "Wallet", icon: Wallet, path: "/wallet" },
	{ id: "budget", label: "Budget", icon: PieChart, path: "/budget" },
	{ id: "goals", label: "Goals", icon: Target, path: "/goals" },
	{ id: "clients", label: "Client List", icon: Users, path: "/clients" },
];

const Sidebar: React.FC<SidebarProps> = ({
	activeTab,
	setActiveTab,
	isMobileOpen,
	setIsMobileOpen,
	isDarkMode,
	toggleTheme,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<>
			{/* Mobile Overlay */}
			{isMobileOpen && (
				<button
					type="button"
					aria-label="Close side menu"
					className="dark:bg-opacity-70 fixed inset-0 z-30 h-full w-full bg-black/50 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
							setIsMobileOpen(false);
						}
					}}
				/>
			)}

			<aside
				className={`fixed top-0 left-0 z-30 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} ${isCollapsed ? "w-20" : "w-64"} lg:static lg:translate-x-0`}
			>
				<div className="relative flex h-full flex-col py-6">
					{/* Collapse Toggle Button (Desktop Only) */}
					<button
						type="button"
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="absolute top-9 -right-3 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-pink-50 hover:text-slate-700 lg:flex dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
					>
						{isCollapsed ? (
							<ChevronRight size={14} />
						) : (
							<ChevronLeft size={14} />
						)}
					</button>

					{/* Logo */}
					<div
						className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "gap-4 px-6"}`}
					>
						<img src={logo} alt="" className="w-8" />
						<span
							className={`overflow-hidden text-3xl font-bold whitespace-nowrap text-slate-700 transition-all duration-300 dark:text-white ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
						>
							Prospera
						</span>
					</div>

					{/* Navigation */}
					<nav className="flex-1 space-y-1 overflow-y-auto px-3">
						{NAV_ITEMS.map((item) => {
							const isActive = activeTab === item.id;
							const Icon = item.icon;
							return (
								<button
									type="button"
									key={item.id}
									onClick={() => {
										setActiveTab(item.id);
										setIsMobileOpen(false);
									}}
									title={isCollapsed ? item.label : undefined}
									className={`sidebar-nav-item ${isActive ? "active" : ""} ${isCollapsed ? "justify-center" : ""}`}
								>
									<Icon
										size={20}
										strokeWidth={isActive ? 2.5 : 2}
										className="shrink-0"
									/>
									<span
										className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
									>
										{item.label}
									</span>
								</button>
							);
						})}
					</nav>

					{/* Bottom Actions */}
					<div className="mt-auto space-y-2 border-t border-slate-100 px-3 pt-6 dark:border-slate-800">
						<button
							type="button"
							onClick={() => {
								setActiveTab("settings");
								setIsMobileOpen(false);
							}}
							title={isCollapsed ? "Settings" : undefined}
							className={`sidebar-nav-item ${
								activeTab === "settings" ? "active" : ""
							} ${isCollapsed ? "justify-center" : ""}`}
						>
							<Settings size={20} className="shrink-0" />
							<span
								className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
							>
								Settings
							</span>
						</button>

						<button
							type="button"
							onClick={() => {
								setActiveTab("help");
								setIsMobileOpen(false);
							}}
							title={isCollapsed ? "Help" : undefined}
							className={`sidebar-nav-item ${
								activeTab === "help" ? "active" : ""
							} ${isCollapsed ? "justify-center" : ""}`}
						>
							<HelpCircle size={20} className="shrink-0" />
							<span
								className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
							>
								Help
							</span>
						</button>
						<button
							type="button"
							title={isCollapsed ? "Log out" : undefined}
							className={`flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/10 dark:hover:text-red-400 ${isCollapsed ? "justify-center" : ""}`}
						>
							<LogOut size={20} className="shrink-0" />
							<span
								className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
							>
								Log out
							</span>
						</button>

						<div
							className={`flex items-center pt-4 ${isCollapsed ? "justify-center" : "justify-between"} px-1`}
						>
							<button
								type="button"
								onClick={toggleTheme}
								aria-label={
									isDarkMode ? "Activate light mode" : "Activate dark mode"
								}
								className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-red)]/10 text-[var(--primary-red)] transition-colors hover:bg-[var(--primary-red)]/20 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
							>
								{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
							</button>
							<div
								className={`overflow-hidden text-xs whitespace-nowrap text-slate-400 transition-all duration-300 dark:text-slate-500 ${isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}
							>
								v1.2.0
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
