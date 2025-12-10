import { Globe } from "lucide-react";
import type React from "react";
import profile from "@/shared/assets/profile.jpg";


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
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-6 border-b border-slate-100 pb-6 dark:border-slate-700">
				<img
					src={profile}
					alt="Profile"
					className="h-20 w-20 rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-700"
				/>
				<div>
					<button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
						Change Photo
					</button>
					<p className="mt-2 text-xs text-slate-400">
						JPG, GIF or PNG. Max size 800K
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
						Full Name
					</label>
					<input
						type="text"
						value={formData.name}
						onChange={(e) => {
							setFormData({
								...formData,
								name: e.target.value,
							});
							setErrors((prev: any) => ({ ...prev, name: "" }));
						}}
						className={`w-full rounded-xl border px-4 py-2.5 ${
							errors.name
								? "border-red-500"
								: "border-slate-200 dark:border-slate-600"
						} bg-slate-50 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 dark:text-white`}
					/>
					{errors.name && (
						<p className="mt-1 text-xs text-red-500">{errors.name}</p>
					)}
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
						Email Address
					</label>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => {
							setFormData({
								...formData,
								email: e.target.value,
							});
							setErrors((prev: any) => ({ ...prev, email: "" }));
						}}
						className={`w-full rounded-xl border px-4 py-2.5 ${
							errors.email
								? "border-red-500"
								: "border-slate-200 dark:border-slate-600"
						} bg-slate-50 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 dark:text-white`}
					/>
					{errors.email && (
						<p className="mt-1 text-xs text-red-500">{errors.email}</p>
					)}
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
						Language
					</label>
					<div className="relative">
						<Globe
							size={18}
							className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
						/>
						<select
							value={formData.language}
							onChange={(e) =>
								setFormData({
									...formData,
									language: e.target.value,
								})
							}
							className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						>
							<option>English</option>
							<option>Spanish</option>
							<option>French</option>
						</select>
					</div>
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
						Currency
					</label>
					<select
						value={formData.currency}
						onChange={(e) =>
							setFormData({
								...formData,
								currency: e.target.value,
							})
						}
						className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
					>
						<option>USD ($)</option>
						<option>EUR (€)</option>
						<option>GBP (£)</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProfileSettings;
