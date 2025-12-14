import AddPlaceholderButton from "@/pages/wallet/AddPlaceholderButton";
import type { Account, AccountType } from "@/shared/types/types";
import BankAccountRow from "./BankAccountRow";

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
			<AddPlaceholderButton
				onClick={() => openAddAccountModal("Cash")}
				label="Add Bank Account"
			/>
		</div>
	);
};

export default WalletAccountsTab;
