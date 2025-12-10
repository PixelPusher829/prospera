import { Bell } from "lucide-react";
import type React from "react";

const Notifications: React.FC = () => {
	return (
		<div className="flex h-48 flex-col overflow-y-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
			<div className="mb-4 flex items-center gap-2">
				<div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
					<Bell size={18} />
				</div>
				<span className="font-semibold text-slate-700 dark:text-white">
					Notifications
				</span>
			</div>
			<div className="flex flex-grow flex-col justify-end">
				<div className="space-y-3">
					<div className="flex items-start gap-3 text-sm">
						<div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500"></div>
						<p className="text-slate-600 dark:text-slate-300">
							Bill due tomorrow:{" "}
							<span className="font-semibold text-slate-700 dark:text-white">
								Internet ($80)
							</span>
						</p>
					</div>
					<div className="flex items-start gap-3 text-sm">
						<div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"></div>
						<p className="text-slate-600 dark:text-slate-300">
							Salary of{" "}
							<span className="font-semibold text-slate-700 dark:text-white">
								$4,200
							</span>{" "}
							received.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
