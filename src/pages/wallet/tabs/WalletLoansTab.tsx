import { Plus } from "lucide-react";
import type React from "react";
import type { Account, AccountType } from "@/shared/types/types";
import LoanRow from "../LoanRow";
import Button from "@/shared/components/Button"; // Import Button component

interface WalletLoansTabProps {
	loanAccounts: Account[];
	openEditAccountModal: (account: Account) => void;
	openAddAccountModal: (type: AccountType | "Investment" | "Loan") => void;
}

const WalletLoansTab: React.FC<WalletLoansTabProps> = ({
	loanAccounts,
	openEditAccountModal,
	openAddAccountModal,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{loanAccounts.map((acc) => (
				<LoanRow key={acc.id} account={acc} onEdit={openEditAccountModal} />
			))}
			<Button
				variant="secondary"
				onClick={() => openAddAccountModal("Loan")}
				icon={<Plus size={24} />}
				className="flex h-auto min-h-[180px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 font-medium text-slate-400 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-violet-900/10"
			>
				Add Loan
			</Button>
		</div>
	);
};

export default WalletLoansTab;
