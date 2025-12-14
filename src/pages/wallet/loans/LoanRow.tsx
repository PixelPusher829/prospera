import { CalendarClock, ShieldCheck } from "lucide-react";
import type React from "react";
import Button from "@/shared/components/Button"; // Import Button component
import type { Account } from "@/shared/types/types";

interface LoanRowProps {
	account: Account;
	onEdit: (account: Account) => void;
}

const LoanRow: React.FC<LoanRowProps> = ({ account, onEdit }) => {
	return (
		<div
			onClick={() => onEdit(account)}
			className="flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-violet-200"
		>
			<div className="mb-4 flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="rounded-xl bg-violet-50 p-3 text-violet-500">
						<ShieldCheck size={24} />
					</div>
					<div>
						<h4 className="text-slate-00 text-lg font-bold">{account.name}</h4>
						<p className="text-sm text-slate-500">{account.institution}</p>
					</div>
				</div>
				<div className="text-right">
					<span className="mb-1 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
						Remaining
					</span>
					<span className="text-xl font-bold text-slate-700">
						${Math.abs(account.balance).toLocaleString()}
					</span>
				</div>
			</div>

			<div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-violet-100">
				{/* Mock progress for loan payoff */}
				<div
					className="h-full rounded-full bg-violet-500"
					style={{ width: "45%" }}
				></div>
			</div>

			<div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
				<div className="flex items-center gap-2 text-slate-500">
					<CalendarClock size={16} />
					<span>Next payment: Oct 28</span>
				</div>
				<button className="font-medium text-violet-600 hover:text-violet-700">
					View Details
				</button>
			</div>
		</div>
	);
};

export default LoanRow;
