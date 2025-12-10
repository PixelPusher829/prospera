import type React from "react";
import { Plus } from "lucide-react";
import InvestmentRow from "./InvestmentRow";
import type { Account, AccountType } from "@/shared/types/types";

interface WalletInvestmentsTabProps {
	investAccounts: Account[];
	openEditAccountModal: (account: Account) => void;
	openAddAccountModal: (type: AccountType | "Investment" | "Loan") => void;
}

const WalletInvestmentsTab: React.FC<WalletInvestmentsTabProps> = ({
	investAccounts,
	openEditAccountModal,
	openAddAccountModal,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{investAccounts.map((acc) => (
				<InvestmentRow
					key={acc.id}
					account={acc}
					onEdit={openEditAccountModal}
				/>
			))}
			<button
				onClick={() => openAddAccountModal("Investment")}
				className="flex h-auto min-h-[180px] w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-slate-200 font-medium text-slate-400 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-violet-900/10"
			>
				<Plus size={24} />
				Add Investment
			</button>
		</div>
	);
};

export default WalletInvestmentsTab;
