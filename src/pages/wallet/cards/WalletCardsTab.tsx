import AddPlaceholderButton from "@/pages/wallet/AddPlaceholderButton";
import type { Account, AccountType } from "@/shared/types/types";
import CreditCardVisual from "./CreditCardVisual";

interface WalletCardsTabProps {
	creditCards: Account[];
	openEditAccountModal: (account: Account) => void;
	openAddAccountModal: (type: AccountType | "Investment" | "Loan") => void;
}

const WalletCardsTab: React.FC<WalletCardsTabProps> = ({
	creditCards,
	openEditAccountModal,
	openAddAccountModal,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{creditCards.map((acc) => (
				<div key={acc.id} className="space-y-2">
					<CreditCardVisual account={acc} onEdit={openEditAccountModal} />
					<div className="flex items-center justify-between px-4">
						<span className="text-md font-medium text-slate-500 dark:text-slate-500">
							Current Balance
						</span>
						<span className="text-xl font-bold text-green-500">
							${Math.abs(acc.balance).toLocaleString()}
						</span>
					</div>
				</div>
			))}
			<div className="mb-8">
				<AddPlaceholderButton
					onClick={() => openAddAccountModal("Credit")}
					label="Add New Card"
				/>
				{/* Empty div to mimic the height of the "Current Balance" row for alignment */}
				<div className="flex items-center justify-between px-4 h-7 mb-0.5"></div>
			</div>
		</div>
	);
};

export default WalletCardsTab;
