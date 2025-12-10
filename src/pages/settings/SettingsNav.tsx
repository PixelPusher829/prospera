import { Bell, CreditCard, Shield, User } from "lucide-react";
import type React from "react";

interface SettingsNavProps {
	activeSection: string;
	setActiveSection: (section: string) => void;
}

const SettingsNav: React.FC<SettingsNavProps> = ({
	activeSection,
	setActiveSection,
}) => {
	return (
		<div className="flex w-full flex-col gap-2 lg:w-64">
			{[
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
			].map((item) => (
				<button
					key={item.id}
					onClick={() => setActiveSection(item.id)}
					className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
						activeSection === item.id
							? "bg-primary-gradient text-white shadow-lg shadow-violet-200/50"
							: "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
					} `}
				>
					<item.icon size={18} />
					{item.label}
				</button>
			))}
		</div>
	);
};

export default SettingsNav;
