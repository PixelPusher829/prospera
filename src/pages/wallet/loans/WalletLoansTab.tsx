import AddPlaceholderButton from "@/pages/wallet/AddPlaceholderButton";
import type { Account, AccountType } from "@/shared/types/types";
import LoanRow from "./LoanRow";

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
			<AddPlaceholderButton
				onClick={() => openAddAccountModal("Loan")}
				label="Add Loan"
			/>
		</div>
	);
};

export default WalletLoansTab;
