import { Banknote, Landmark } from "lucide-react";
import type React from "react";
import type { Account } from "@/shared/types/types";
import { formatAccountNumber } from "@/shared/utils/formatters";

interface BankAccountRowProps {
	account: Account;
	onEdit: (account: Account) => void;
}

const BankAccountRow: React.FC<BankAccountRowProps> = ({ account, onEdit }) => {
	const Icon = account.type === "Cash" ? Banknote : Landmark;

	return (
		<div
			onClick={() => onEdit(account)}
			className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-violet-200 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none dark:hover:border-violet-800"
		>
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all dark:bg-slate-700 dark:text-slate-300">
					<Icon size={20} />
				</div>
				<div>
					<h4 className="font-bold text-slate-700 dark:text-white">{account.name}</h4>
					<p className="text-xs text-slate-500 dark:text-slate-400">
						{account.type === "Cash"
							? ""
							: `**** ${account.accountNumber.slice(-4)} • `}
						{account.institution}
					</p>
				</div>
			</div>
			<div className="text-right">
				<h4 className="text-lg font-bold text-slate-700 dark:text-white">
					${account.balance.toLocaleString()}
				</h4>
				<p className="text-xs text-slate-400 dark:text-slate-500">Available</p>
			</div>
		</div>
	);
};

export default BankAccountRow;
