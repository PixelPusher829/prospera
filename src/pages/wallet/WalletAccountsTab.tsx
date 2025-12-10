import type React from "react";
import { Plus } from "lucide-react";
import BankAccountRow from "./BankAccountRow";
import type { Account, AccountType } from "@/shared/types/types";

interface WalletAccountsTabProps {
	liquidAccounts: Account[];
	openEditAccountModal: (account: Account) => void;
	openAddAccountModal: (type: AccountType | "Investment" | "Loan") => void;
}

const WalletAccountsTab: React.FC<WalletAccountsTabProps> = ({
	liquidAccounts,
	openEditAccountModal,
	openAddAccountModal,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{liquidAccounts.map((acc) => (
				<BankAccountRow
					key={acc.id}
					account={acc}
					onEdit={openEditAccountModal}
				/>
			))}
			<button
				onClick={() => openAddAccountModal("Cash")}
				className="flex h-auto w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 font-medium text-slate-400 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-violet-900/10"
			>
				<Plus size={24} />
				Add Bank Account
			</button>
		</div>
	);
};

export default WalletAccountsTab;
