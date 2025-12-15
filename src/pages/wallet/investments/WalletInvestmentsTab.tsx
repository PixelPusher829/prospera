import AddPlaceholderButton from "@/pages/wallet/AddPlaceholderButton";
import type { Account, AccountType } from "@/shared/types/types";
import InvestmentRow from "./InvestmentRow";

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
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
			{investAccounts.map((acc) => (
				<InvestmentRow
					key={acc.id}
					account={acc}
					onEdit={openEditAccountModal}
				/>
			))}
			<AddPlaceholderButton
				onClick={() => openAddAccountModal("Investment")}
				label="Add Investment"
			/>
		</div>
	);
};

export default WalletInvestmentsTab;
