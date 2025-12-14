import { Plus, Wallet as WalletIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import AddEditAccountModal from "@/pages/wallet/AddEditAccountModal";
import Button from "@/shared/components/Button"; // Import Button component
import { MOCK_ACCOUNTS } from "@/shared/data/constants";
import Header from "@/shared/layout/Header";
import type { Account, AccountType } from "@/shared/types/types";
import WalletAccountsTab from "./accounts/WalletAccountsTab";
import WalletCardsTab from "./cards/WalletCardsTab";
import GlobalSyncSuccessModal from "./GlobalSyncSuccessModal";
import WalletInvestmentsTab from "./investments/WalletInvestmentsTab";
import WalletLoansTab from "./loans/WalletLoansTab";
import WalletOverview from "./overview/WalletOverview";
import WalletSummaryCards from "./overview/WalletSummaryCards";

const Wallet: React.FC = () => {
	const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
	const [activeTab, setActiveTab] = useState<
		"overview" | "accounts" | "cards" | "loans" | "investments"
	>("overview");
	const [isModalOpen, setIsModalOpen] = useState(false); // Controls both add/edit modal
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null); // For editing
	const [accountTypeToAdd, setAccountTypeToAdd] = useState<
		AccountType | "Investment" | "Loan"
	>("Cash");
	const [isSyncingBank, setIsSyncingBank] = useState(false); // New state for fake bank sync
	const [showGlobalSyncSuccessModal, setShowGlobalSyncSuccessModal] =
		useState(false); // New state for global sync notification modal

	const handleDeleteAccount = (accountId: string) => {
		setAccounts((prevAccounts) =>
			prevAccounts.filter((acc) => acc.id !== accountId),
		);
		setIsModalOpen(false); // Close modal after deletion
		setSelectedAccount(null); // Clear selected account
	};

	const handleFakeBankSync = () => {
		setIsSyncingBank(true);
		setTimeout(() => {
			setIsSyncingBank(false);
			setShowGlobalSyncSuccessModal(true); // Show modal instead of simple notification
		}, 3000); // Simulate 3 seconds of syncing
	};

	const handleSaveAccount = (savedAccount: Account) => {
		if (savedAccount.id && accounts.some((a) => a.id === savedAccount.id)) {
			// Update existing account
			setAccounts((prev) =>
				prev.map((a) => (a.id === savedAccount.id ? savedAccount : a)),
			);
		} else {
			// Add new account
			setAccounts((prev) => [savedAccount, ...prev]);
		}
		setIsModalOpen(false); // Close modal after save
		setSelectedAccount(null); // Clear selected account
	};

	const openAddAccountModal = (type: AccountType | "Investment" | "Loan") => {
		setAccountTypeToAdd(type);
		setSelectedAccount(null); // Clear selected account for add mode
		setIsModalOpen(true);
	};

	const openEditAccountModal = (account: Account) => {
		setAccountTypeToAdd(
			account.type === "Investment"
				? "Investment"
				: account.type === "Loan"
					? "Loan"
					: (account.type as AccountType),
		);
		setSelectedAccount(account);
		setIsModalOpen(true);
	};

	// Group accounts logically
	const liquidAccounts = accounts.filter((a) =>
		["Cash", "Debit", "Savings"].includes(a.type),
	);
	const creditCards = accounts.filter((a) => a.type === "Credit");
	const loanAccounts = accounts.filter((a) => a.type === "Loan");
	const investAccounts = accounts.filter((a) =>
		["Investment"].includes(a.type),
	);

	const totalAssets = accounts.reduce(
		(sum, acc) => (acc.balance > 0 ? sum + acc.balance : sum),
		0,
	);
	const totalLiabilities = accounts.reduce(
		(sum, acc) => (acc.balance < 0 ? sum + Math.abs(acc.balance) : sum),
		0,
	);
	const netWorth = totalAssets - totalLiabilities;

	return (
		<div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
			<Header
				heading="My Wallet"
				subheading="Centralized overview of all your assets and debts"
			>
				<div className="flex items-center gap-4">
					<Button
						variant="secondary"
						onClick={() => openAddAccountModal("Cash")}
						icon={<Plus size={18} />}
					>
						Link Account
					</Button>
					<Button
						variant="primary"
						onClick={handleFakeBankSync}
						disabled={isSyncingBank}
						isLoading={isSyncingBank}
						icon={<WalletIcon size={18} />}
					>
						Sync All Banks
					</Button>
				</div>
			</Header>

			<AddEditAccountModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSaveAccount={handleSaveAccount}
				onDeleteAccount={handleDeleteAccount}
				defaultAccountType={accountTypeToAdd}
				account={selectedAccount}
			/>
			{showGlobalSyncSuccessModal && (
				<GlobalSyncSuccessModal
					onClose={() => setShowGlobalSyncSuccessModal(false)}
				/>
			)}

			<WalletSummaryCards
				netWorth={netWorth}
				totalAssets={totalAssets}
				totalLiabilities={totalLiabilities}
			/>

			{/* Tab Navigation */}
			<div className="flex w-fit flex-wrap gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
				{["overview", "accounts", "cards", "loans", "investments"].map(
					(tab: typeof activeTab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={`rounded-xl px-6 py-2.5 text-sm font-medium capitalize transition-all ${
								activeTab === tab
									? "bg-white text-slate-700 shadow-sm dark:bg-slate-900 dark:text-white"
									: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
							} `}
						>
							{tab}
						</button>
					),
				)}
			</div>

			{/* Tab Content */}
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
				{activeTab === "overview" && (
					<WalletOverview
						liquidAccounts={liquidAccounts}
						investAccounts={investAccounts}
						loanAccounts={loanAccounts}
						creditCards={creditCards}
						openEditAccountModal={openEditAccountModal}
						setActiveTab={setActiveTab}
					/>
				)}

				{activeTab === "accounts" && (
					<WalletAccountsTab
						liquidAccounts={liquidAccounts}
						openEditAccountModal={openEditAccountModal}
						openAddAccountModal={openAddAccountModal}
					/>
				)}

				{activeTab === "cards" && (
					<WalletCardsTab
						creditCards={creditCards}
						openEditAccountModal={openEditAccountModal}
						openAddAccountModal={openAddAccountModal}
					/>
				)}

				{activeTab === "loans" && (
					<WalletLoansTab
						loanAccounts={loanAccounts}
						openEditAccountModal={openEditAccountModal}
						openAddAccountModal={openAddAccountModal}
					/>
				)}

				{activeTab === "investments" && (
					<WalletInvestmentsTab
						investAccounts={investAccounts}
						openEditAccountModal={openEditAccountModal}
						openAddAccountModal={openAddAccountModal}
					/>
				)}
			</div>
		</div>
	);
};

export default Wallet;
