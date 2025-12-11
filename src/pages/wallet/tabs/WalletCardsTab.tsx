import type React from "react";
import type { Account } from "@/shared/types/types";
import CreditCardVisual from "../CreditCardVisual";

interface WalletCardsTabProps {
	creditCards: Account[];
	openEditAccountModal: (account: Account) => void;
}

const WalletCardsTab: React.FC<WalletCardsTabProps> = ({
	creditCards,
	openEditAccountModal,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{creditCards.map((acc) => (
				<div key={acc.id} className="space-y-2">
					<CreditCardVisual account={acc} onEdit={openEditAccountModal} />
					<div className="flex items-center justify-between px-4">
						<span className="text-xs text-slate-400 dark:text-slate-500">
							Current Balance
						</span>
						<span className="text-lg font-bold text-red-500">
							${Math.abs(acc.balance).toLocaleString()}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default WalletCardsTab;
