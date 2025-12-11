import type React from "react";
import type { Account } from "@/shared/types/types";
import BankAccountRow from "./BankAccountRow";
import CreditCardVisual from "./CreditCardVisual";
import InvestmentRow from "./InvestmentRow";
import LoanRow from "./LoanRow";
import Button from "@/shared/components/Button"; // Import Button component

interface WalletOverviewProps {
	liquidAccounts: Account[];
	investAccounts: Account[];
	loanAccounts: Account[];
	creditCards: Account[];
	openEditAccountModal: (account: Account) => void;
	setActiveTab: (
		tab: "overview" | "accounts" | "cards" | "loans" | "investments",
	) => void;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({
	liquidAccounts,
	investAccounts,
	loanAccounts,
	creditCards,
	openEditAccountModal,
	setActiveTab,
}) => {
	return (
		<div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
			<div className="space-y-8 xl:col-span-2">
				{/* Banking Section */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-slate-700 dark:text-white">
							Banking & Cash
						</h3>
						<button
							onClick={() => setActiveTab("accounts")}
							className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
						>
							View All
						</button>
					</div>
					<div className="flex flex-col gap-4">
						{liquidAccounts.slice(0, 3).map((acc) => (
							<BankAccountRow
								key={acc.id}
								account={acc}
								onEdit={openEditAccountModal}
							/>
						))}
					</div>
				</div>

				{/* Investments Section */}
				<div className="pt-2">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-xl font-bold text-slate-700 dark:text-white">
							Top Investments
						</h3>
						<button
							onClick={() => setActiveTab("investments")}
							className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
						>
							View All
						</button>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{investAccounts.slice(0, 2).map((acc) => (
							<InvestmentRow
								key={acc.id}
								account={acc}
								onEdit={openEditAccountModal}
							/>
						))}
					</div>
				</div>

				{/* Loans Section Moved Here */}
				<div className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-slate-700 dark:text-white">
							Loans
						</h3>
						<button
							onClick={() => setActiveTab("loans")}
							className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
						>
							View All
						</button>
					</div>
					<div className="flex flex-col gap-4">
						{loanAccounts.slice(0, 2).map((acc) => (
							<LoanRow
								key={acc.id}
								account={acc}
								onEdit={openEditAccountModal}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Right Col: Cards Only */}
			<div className="space-y-8">
				{/* Cards Section */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-slate-700 dark:text-white">
							Credit Cards
						</h3>
						<button
							onClick={() => setActiveTab("cards")}
							className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
						>
							View All
						</button>
					</div>
					<div className="flex flex-col gap-4">
						{creditCards.slice(0, 2).map((acc) => (
							<div
								key={acc.id}
								className="origin-top-left scale-90 transform sm:origin-top sm:scale-100"
							>
								<CreditCardVisual account={acc} onEdit={openEditAccountModal} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletOverview;
