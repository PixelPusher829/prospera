import { Save } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Header from "@/shared/components/layout/Header";
import BillingSettings from "./BillingSettings";
import NotificationsSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import SettingsNav from "./SettingsNav";

const Settings: React.FC = () => {
	const [activeSection, setActiveSection] = useState("profile");
	const [formData, setFormData] = useState({
		name: "James Barnes",
		email: "james@prospera.com",
		notifications: true,
		marketing: false,
		currency: "USD",
		language: "English",
		twoFactor: true,
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (activeSection === "profile") {
			if (!formData.name.trim()) {
				newErrors.name = "Name cannot be empty.";
			}
			if (!formData.email.trim()) {
				newErrors.email = "Email cannot be empty.";
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				newErrors.email = "Email is invalid.";
			}
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length > 0;
	};

	const handleSave = () => {
		if (validate()) {
			return;
		}
		// Mock save
		alert("Settings saved successfully!");
	};

	const renderSection = () => {
		switch (activeSection) {
			case "profile":
				return (
					<ProfileSettings
						formData={formData}
						setFormData={setFormData}
						errors={errors}
						setErrors={setErrors}
					/>
				);
			case "notifications":
				return (
					<NotificationsSettings
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case "security":
				return <SecuritySettings />;
			case "billing":
				return <BillingSettings />;
			default:
				return null;
		}
	};

	return (
		<div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
			<Header
				heading="Settings"
				subheading="Manage your account preferences"
				className="mb-8"
			>
				<></>
			</Header>

			<div className="flex flex-col gap-8 lg:flex-row">
				<SettingsNav
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				<div className="flex-1 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
					{renderSection()}
					<div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-700">
						<button
							onClick={handleSave}
							disabled={
								Object.keys(errors).some((key) => errors[key]) ||
								!formData.name.trim() ||
								!formData.email.trim()
							}
							className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-violet-600"
						>
							<Save size={18} />
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
