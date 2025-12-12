import type React from "react";
import {
	ArrowRightLeft,
	BarChart2,
	LayoutDashboard,
	PieChart,
	Target,
	Users,
	Wallet,
} from "lucide-react";
import NavContainer from "@/shared/components/navigation/NavContainer";
import NavLink from "@/shared/components/navigation/NavLink";

interface SidebarNavProps {
	isCollapsed: boolean;
	onClick: (path: string) => void;
	activeTab: string;
}

const NAV_ITEMS = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ id: "analytics", label: "Analytics", icon: BarChart2 },
	{
		id: "transactions",
		label: "Transactions",
		icon: ArrowRightLeft,
	},
	{ id: "wallet", label: "Wallet", icon: Wallet },
	{ id: "budget", label: "Budget", icon: PieChart },
	{ id: "goals", label: "Goals", icon: Target },
	{ id: "clients", label: "Client List", icon: Users },
];

const SidebarNav: React.FC<SidebarNavProps> = ({
	isCollapsed,
	activeTab,
	onClick,
}) => {
	return (
		<NavContainer className="flex-1 space-y-1 overflow-y-auto px-3">
			{NAV_ITEMS.map((item) => (
				<NavLink
					key={item.id}
					icon={item.icon}
					label={item.label}
					path={item.id}
					isActive={activeTab === item.id} // Adjust isActive check
					isCollapsed={isCollapsed}
					onClick={() => onClick(item.id)} // NavLink now handles passing its own path.
					className="sidebar-nav-item"
					activeClassName="active"
					inactiveClassName=""
				/>
			))}
		</NavContainer>
	);
};

export default SidebarNav;
