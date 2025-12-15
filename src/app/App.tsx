import type React from "react";
import { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import {
	Analytics,
	Budget,
	ClientList,
	Dashboard,
	Goals,
	Help,
	Settings,
	Transactions,
	Wallet,
} from "@/pages";
import Sidebar from "@/shared/layout/sidebar";
import Topbar from "../shared/layout/Topbar"; // Renamed Header to Topbar to avoid conflict

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isMobileOpen, setIsMobileOpen] = useState(false);

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
			<div className="flex h-screen overflow-hidden bg-[#f8f9fc] transition-colors duration-300 dark:bg-slate-950">
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					isMobileOpen={isMobileOpen}
					setIsMobileOpen={setIsMobileOpen}
				/>

				<main className="flex min-w-0 flex-1 flex-col overflow-hidden">
					<Topbar onMenuClick={() => setIsMobileOpen(true)} />
					<div className="flex-1 overflow-auto">{renderContent()}</div>
				</main>
			</div>
		</Router>
	);
};

export default App;
