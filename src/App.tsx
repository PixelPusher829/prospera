import React, { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import ClientList from "./components/ClientList";
import Transactions from "./components/Transactions";
import Wallet from "./components/Wallet";
import Goals from "./components/Goals";
import Budget from "./components/Budget";
import Settings from "./components/Settings";
import Help from "./components/Help";
import { Bell, Search, Menu } from "lucide-react";

const Header: React.FC<{ onMenuClick: () => void; isDarkMode: boolean }> = ({
	onMenuClick,
	isDarkMode,
}) => {
	return (
		<header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between lg:justify-end transition-colors">
			<div className="flex items-center gap-4 lg:hidden">
				<button
					onClick={onMenuClick}
					className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
				>
					<Menu size={24} />
				</button>
				<span className="font-bold text-xl text-slate-900 dark:text-white">
					Prospera
				</span>
			</div>

			<div className="flex items-center gap-6">
				{/* Search Bar - Desktop */}
				<div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-full w-64 border border-transparent focus-within:border-violet-200 dark:focus-within:border-violet-800 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
					<Search size={18} className="text-slate-400" />
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full placeholder:text-slate-400"
					/>
				</div>

				<div className="flex items-center gap-4">
					<button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
						<Bell size={20} />
						<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
					</button>
					<div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
						<div className="text-right hidden sm:block">
							<div className="text-sm font-bold text-slate-900 dark:text-white">
								James Barnes
							</div>
							<div className="text-xs text-slate-500 dark:text-slate-400">
								james@prospera.com
							</div>
						</div>
						<img
							src="https://picsum.photos/100/100"
							alt="Profile"
							className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Toggle Dark Mode
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	// Apply Dark Mode Class
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return <Dashboard setActiveTab={setActiveTab} />;
			case "analytics":
				return <Analytics />;
			case "transactions":
				return <Transactions />;
			case "wallet":
				return <Wallet />;
			case "goals":
				return <Goals />;
			case "budget":
				return <Budget />;
			case "clients":
				return <ClientList />;
			case "settings":
				return <Settings />;
			case "help":
				return <Help />;
			default:
				return <Dashboard setActiveTab={setActiveTab} />;
		}
	};

	return (
		<Router>
			<div className="flex h-screen overflow-hidden bg-[#f8f9fc] dark:bg-slate-950 transition-colors duration-300">
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					isMobileOpen={isMobileOpen}
					setIsMobileOpen={setIsMobileOpen}
					isDarkMode={isDarkMode}
					toggleTheme={toggleTheme}
				/>

				<main className="flex-1 flex flex-col min-w-0 overflow-hidden">
					<Header
						onMenuClick={() => setIsMobileOpen(true)}
						isDarkMode={isDarkMode}
					/>
					<div className="flex-1 overflow-auto">
						{renderContent()}
					</div>
				</main>
			</div>
		</Router>
	);
};

export default App;
