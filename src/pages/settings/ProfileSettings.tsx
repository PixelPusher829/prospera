import { Globe } from "lucide-react";
import type React from "react";
import profile from "@/shared/assets/profile.jpg";
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";

interface ProfileSettingsProps {
	formData: any;
	setFormData: (data: any) => void;
	errors: any;
	setErrors: (errors: any) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
	formData,
	setFormData,
	errors,
	setErrors,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors((prev: any) => ({ ...prev, [name]: "" }));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-6 border-b border-slate-100 pb-6 dark:border-slate-700">
				<img
					src={profile}
					alt="Profile"
					className="h-20 w-20 rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-700"
				/>
				<div>
					<Button
						variant="secondary"
						className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
					>
						Change Photo
					</Button>
					<p className="mt-2 text-xs text-slate-400">
						JPG, GIF or PNG. Max size 800K
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<InputField
					label="Full Name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					error={errors.name}
				/>
				<InputField
					label="Email Address"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleInputChange}
					error={errors.email}
				/>
				<div className="relative">
					<Globe
						size={18}
						className="absolute bottom-1 left-3 -translate-y-1/2 text-slate-400"
					/>
					<SelectField
						label="Language"
						name="language"
						value={formData.language}
						onValueChange={(value) =>
							handleSelectChange({
								target: { name: "language", value },
							} as React.ChangeEvent<HTMLSelectElement>)
						}
						className="pl-10"
					>
						<SelectItem value="English">English</SelectItem>
						<SelectItem value="Spanish">Spanish</SelectItem>
						<SelectItem value="French">French</SelectItem>
					</SelectField>
				</div>
				<SelectField
					label="Currency"
					name="currency"
					value={formData.currency}
					onValueChange={(value) =>
						handleSelectChange({
							target: { name: "currency", value },
						} as React.ChangeEvent<HTMLSelectElement>)
					}
				>
					<SelectItem value="USD ($)">USD ($)</SelectItem>
					<SelectItem value="EUR (€)">EUR (€)</SelectItem>
					<SelectItem value="GBP (£)">GBP (£)</SelectItem>
				</SelectField>
			</div>
		</div>
	);
};

export default ProfileSettings;
