import React, { useState } from "react";
import {
	User,
	Bell,
	Lock,
	Globe,
	Shield,
	CreditCard,
	Save,
} from "lucide-react";

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
    if (activeSection === 'profile') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name cannot be empty.';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email cannot be empty.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid.';
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

	return (
		<div className="p-6 lg:p-10 max-w-[1200px] mx-auto min-h-full">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-700 dark:text-white">
						Settings
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mt-1">
						Manage your account preferences
					</p>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Settings Navigation */}
				<div className="w-full lg:w-64 flex flex-col gap-2">
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
							className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${
					activeSection === item.id
						? "bg-violet-600 text-white shadow-lg shadow-violet-200/50"
						: "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
				}
              `}
						>
							<item.icon size={18} />
							{item.label}
						</button>
					))}
				</div>

				{/* Content Area */}
				<div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
					{activeSection === "profile" && (
						<div className="space-y-6">
							<div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-700">
								<img
									src="https://picsum.photos/100/100"
									alt="Profile"
									className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-700"
								/>
								<div>
									<button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
										Change Photo
									</button>
									<p className="text-xs text-slate-400 mt-2">
										JPG, GIF or PNG. Max size 800K
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                                            setErrors(prev => ({...prev, name: ''}));
                                        }}
										className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all`}
									/>
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                                            setErrors(prev => ({...prev, email: ''}));
                                        }}
										className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'} bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all`}
									/>
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Language
									</label>
									<div className="relative">
										<Globe
											size={18}
											className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
										/>
										<select
											value={formData.language}
											onChange={(e) =>
												setFormData({
													...formData,
													language: e.target.value,
												})
											}
											className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none appearance-none transition-all"
										>
											<option>English</option>
											<option>Spanish</option>
											<option>French</option>
										</select>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
										className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none appearance-none transition-all"
									>
										<option>USD ($)</option>
										<option>EUR (€)</option>
										<option>GBP (£)</option>
									</select>
								</div>
							</div>
						</div>
					)}

					{activeSection === "notifications" && (
						<div className="space-y-6">
							<h3 className="font-bold text-lg text-slate-700 dark:text-white">
								Email Notifications
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
									<div>
										<p className="font-medium text-slate-700 dark:text-white">
											Weekly Report
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											Receive a weekly summary of your
											financial activity
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={formData.notifications}
											onChange={() =>
												setFormData({
													...formData,
													notifications:
														!formData.notifications,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
									</label>
								</div>
								<div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
									<div>
										<p className="font-medium text-slate-700 dark:text-white">
											Marketing & Updates
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											Receive news about product updates
											and features
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={formData.marketing}
											onChange={() =>
												setFormData({
													...formData,
													marketing:
														!formData.marketing,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
									</label>
								</div>
							</div>
						</div>
					)}

					{activeSection === "security" && (
						<div className="space-y-6">
							<div className="flex items-center gap-3 mb-4">
								<Lock className="text-violet-600" size={24} />
								<h3 className="font-bold text-lg text-slate-700 dark:text-white">
									Security Settings
								</h3>
							</div>

							<div className="p-4 border border-violet-100 dark:border-violet-900 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Shield
											className="text-violet-600 dark:text-violet-400"
											size={20}
										/>
										<div>
											<p className="font-medium text-slate-700 dark:text-white">
												Two-Factor Authentication
											</p>
											<p className="text-sm text-slate-600 dark:text-slate-400">
												Add an extra layer of security
												to your account
											</p>
										</div>
									</div>
									<button className="text-violet-600 dark:text-violet-400 font-medium text-sm hover:underline">
										Enable
									</button>
								</div>
							</div>

							<div className="pt-4">
								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Current Password
								</label>
								<input
									type="password"
									placeholder="••••••••"
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white outline-none mb-4"
								/>

								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									New Password
								</label>
								<input
									type="password"
									placeholder="••••••••"
									className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white outline-none"
								/>
							</div>
						</div>
					)}

					{activeSection === "billing" && (
						<div className="text-center py-10">
							<CreditCard
								size={48}
								className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
							/>
							<h3 className="text-lg font-bold text-slate-700 dark:text-white">
								Payment Method
							</h3>
							<p className="text-slate-500 dark:text-slate-400 mb-6">
								Manage your subscription and billing details
							</p>
							<button className="px-6 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700">
								Add Payment Method
							</button>
						</div>
					)}

					{/* Save Button */}
					<div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
						<button
							onClick={handleSave}
                            disabled={Object.keys(errors).some(key => errors[key]) || !formData.name.trim() || !formData.email.trim()}
							className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-violet-600 text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
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
