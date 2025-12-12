import { Bell, CreditCard, Shield, User } from "lucide-react";
import type React from "react";
import NavContainer from "@/shared/components/navigation/NavContainer";
import NavLink from "@/shared/components/navigation/NavLink";

interface SettingsNavProps {
	activeSection: string;
	setActiveSection: (section: string) => void;
}

const SettingsNav: React.FC<SettingsNavProps> = ({
	activeSection,
	setActiveSection,
}) => {
	const SETTINGS_ITEMS = [
		{ id: "profile", label: "My Profile", icon: User },
		{
			id: "notifications",
			label: "Notifications",
			icon: Bell,
		},
		{ id: "security", label: "Security", icon: Shield },
		{
			id: "billing",
			label: "Billing & Plan",
			icon: CreditCard,
		},
	];

	return (
		<NavContainer className="w-full lg:w-64">
			{SETTINGS_ITEMS.map((item) => (
				<NavLink
					key={item.id}
					icon={item.icon}
					label={item.label}
					path={item.id}
					isActive={activeSection === item.id}
					onClick={() => setActiveSection(item.id)}
					className="sidebar-nav-item"
					activeClassName="active"
					inactiveClassName=""
				/>
			))}
		</NavContainer>
	);
};

export default SettingsNav;
