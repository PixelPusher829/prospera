import type React from "react";
import { Switch } from "@/shared/components/forms";

interface NotificationsSettingsProps {
	formData: any;
	setFormData: (data: any) => void;
}

const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({
	formData,
	setFormData,
}) => {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-bold text-slate-700 dark:text-white">
				Email Notifications
			</h3>
			<div className="space-y-4">
				<div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
					<div>
						<p className="font-medium text-slate-700 dark:text-white">
							Weekly Report
						</p>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Receive a weekly summary of your financial activity
						</p>
					</div>
					<label className="relative inline-flex cursor-pointer items-center">
						<input
							type="checkbox"
							checked={formData.notifications}
							onChange={() =>
								setFormData({
									...formData,
									notifications: !formData.notifications,
								})
							}
							className="peer sr-only"
						/>
						<div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700 dark:peer-focus:ring-violet-800"></div>
					</label>
				</div>
				<div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
					<div>
						<p className="font-medium text-slate-700 dark:text-white">
							Marketing & Updates
						</p>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Receive news about product updates and features
						</p>
					</div>
					<label className="relative inline-flex cursor-pointer items-center">
						<input
							type="checkbox"
							checked={formData.marketing}
							onChange={() =>
								setFormData({
									...formData,
									marketing: !formData.marketing,
								})
							}
							className="peer sr-only"
						/>
						<div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700 dark:peer-focus:ring-violet-800"></div>
					</label>
				</div>
			</div>
		</div>
	);
};

export default NotificationsSettings;
