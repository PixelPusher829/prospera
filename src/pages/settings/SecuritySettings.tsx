import { Lock, Shield } from "lucide-react";
import type React from "react";
import Button from "@/shared/components/Button"; // Import Button component

const SecuritySettings: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center gap-3">
				<Lock className="text-violet-600" size={24} />
				<h3 className="text-lg font-bold text-slate-700 dark:text-white">
					Security Settings
				</h3>
			</div>

			<div className="rounded-xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-900/20">
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
								Add an extra layer of security to your account
							</p>
						</div>
					</div>
					<button className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
						Enable
					</button>
				</div>
			</div>

			<div className="pt-4">
				<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
					Current Password
				</label>
				<input
					type="password"
					placeholder="••••••••"
					className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
				/>

				<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
					New Password
				</label>
				<input
					type="password"
					placeholder="••••••••"
					className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
				/>
			</div>
		</div>
	);
};

export default SecuritySettings;
