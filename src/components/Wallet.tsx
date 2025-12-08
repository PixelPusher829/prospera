import React, { useState } from "react";
import {
	Plus,
	CreditCard,
	Landmark,
	Banknote,
	TrendingUp,
	ShieldCheck,
	ArrowUpRight,
	ArrowDownRight,
	Wallet as WalletIcon,
	MoreHorizontal,
	Bitcoin,
	CalendarClock,
} from "lucide-react";
import { MOCK_ACCOUNTS, INVESTMENT_CATEGORIES } from "../data/constants";
import { Account, AccountType } from "../types/types";
import AddEditAccountModal from "./AddEditAccountModal";

// Visual Component for Credit Cards (Physical look)
const CreditCardVisual: React.FC<{ account: Account, onEdit: (account: Account) => void }> = ({ account, onEdit }) => {
	return (
		<div
            onClick={() => onEdit(account)}
			className={`relative p-6 rounded-2xl shadow-lg bg-gradient-to-r ${
				account.colorTheme || "from-slate-700 to-slate-900"
			} text-white overflow-hidden aspect-[1.58/1] flex flex-col justify-between group transition-transform hover:-translate-y-1 cursor-pointer`}
		>
			{/* Background decoration */}
			<div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
			<div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-black opacity-10 rounded-full blur-xl"></div>

			<div className="flex justify-between items-start z-10">
				<span className="text-xs font-medium tracking-wider uppercase opacity-80">
					{account.institution}
				</span>
				{account.institution.toLowerCase().includes("visa") ? (
					<span className="font-bold italic text-lg opacity-90">
						VISA
					</span>
				) : (
					<div className="flex -space-x-3">
						<div className="w-6 h-6 rounded-full bg-red-500/80"></div>
						<div className="w-6 h-6 rounded-full bg-yellow-500/80"></div>
					</div>
				)}
			</div>

			<div className="z-10">
				<div className="flex gap-4 items-center mb-2">
					<div className="w-10 h-7 bg-yellow-200/20 rounded border border-white/20 backdrop-blur-sm"></div>
					<div className="text-lg tracking-widest font-mono opacity-90">
						{account.accountNumber || "**** **** **** 0000"}
					</div>
				</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="text-[10px] uppercase opacity-60 mb-0.5">
							Card Holder
						</p>
						<p className="text-sm font-medium tracking-wide">
							James Barnes
						</p>
					</div>

				</div>
			</div>
		</div>
	);
};

// Loan Card Row
const LoanRow: React.FC<{ account: Account, onEdit: (account: Account) => void }> = ({ account, onEdit }) => {
	return (
		<div 
            onClick={() => onEdit(account)}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-violet-200 transition-colors cursor-pointer">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-4">
					<div className="p-3 bg-red-50 text-red-500 rounded-xl">
						<ShieldCheck size={24} />
					</div>
					<div>
						<h4 className="font-bold text-lg text-slate-700">
							{account.name}
						</h4>
						<p className="text-sm text-slate-500">
							{account.institution}
						</p>
					</div>
				</div>
				<div className="text-right">
					<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
						Remaining
					</span>
					<span className="text-xl font-bold text-slate-700">
						${Math.abs(account.balance).toLocaleString()}
					</span>
				</div>
			</div>

			<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
				{/* Mock progress for loan payoff */}
				<div
					className="h-full bg-slate-800 rounded-full"
					style={{ width: "45%" }}
				></div>
			</div>

			<div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
				<div className="flex items-center gap-2 text-slate-500">
					<CalendarClock size={16} />
					<span>Next payment: Oct 28</span>
				</div>
				<button className="text-violet-600 font-medium hover:text-violet-700">
					View Details
				</button>
			</div>
		</div>
	);
};

// Simple List Row for Liquid Accounts
const BankAccountRow: React.FC<{ account: Account, onEdit: (account: Account) => void }> = ({ account, onEdit }) => {
	const Icon = account.type === "Cash" ? Banknote : Landmark;

	return (
		<div 
            onClick={() => onEdit(account)}
            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-violet-200 transition-colors group cursor-pointer">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition-all">
					<Icon size={20} />
				</div>
				<div>
					<h4 className="font-bold text-slate-700">{account.name}</h4>
					<p className="text-xs text-slate-500">
						{account.accountNumber} • {account.institution}
					</p>
				</div>
			</div>
			<div className="text-right">
				<h4 className="font-bold text-slate-700 text-lg">
					${account.balance.toLocaleString()}
				</h4>
				<p className="text-xs text-slate-400">Available</p>
			</div>
		</div>
	);
};

// Investment Card Row
	const InvestmentRow: React.FC<{ account: Account, onEdit: (account: Account) => void }> = ({ account, onEdit }) => {
	console.log("InvestmentRow - account:", account);
	const category = account.investmentCategory
		? INVESTMENT_CATEGORIES.find(cat => cat.value === account.investmentCategory)
		: null;
	console.log("InvestmentRow - category:", category);

	const IconComponent = category?.icon || TrendingUp; // Default to TrendingUp if no category or icon
	console.log("InvestmentRow - IconComponent:", IconComponent);

	let iconBgClass = category?.iconBgClass || "bg-slate-100"; // Default light background
	let iconTextColorClass = category?.iconTextColorClass || "text-slate-600"; // Default icon color
	console.log("InvestmentRow - iconBgClass:", iconBgClass, "iconTextColorClass:", iconTextColorClass);

	return (
		<div
            onClick={() => onEdit(account)}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-violet-200 transition-colors cursor-pointer">
			<div className="flex justify-between items-start mb-4">
				<div
					className={`p-3 rounded-2xl ${iconBgClass} ${iconTextColorClass}`}
				>
					<IconComponent size={24} />
				</div>
				<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg">
					+12.5%
				</span>
			</div>
			<h4 className="font-bold text-lg text-slate-700">{account.name}</h4>
			<p className="text-sm text-slate-500 mb-4">{account.institution}</p>
			<div className="pt-4 border-t border-slate-100">
				<p className="text-xs text-slate-400 mb-1">Total Value</p>
				<p className="text-2xl font-bold text-slate-700">
					{account.currency === "BTC" ? "₿" : "$"}
					{account.balance.toLocaleString()}
				</p>
			</div>
		</div>
	);
};
const Wallet: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
	const [activeTab, setActiveTab] = useState<
		"overview" | "accounts" | "cards" | "loans" | "investments"
	>("overview");
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls both add/edit modal
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null); // For editing
  const [accountTypeToAdd, setAccountTypeToAdd] = useState<AccountType | 'Investment' | 'Loan'>('Cash');
  const [isSyncingBank, setIsSyncingBank] = useState(false); // New state for fake bank sync
  const [showGlobalSyncSuccessModal, setShowGlobalSyncSuccessModal] = useState(false); // New state for global sync notification modal

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== accountId));
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
    if (savedAccount.id && accounts.some(a => a.id === savedAccount.id)) {
      // Update existing account
      setAccounts(prev => prev.map(a => a.id === savedAccount.id ? savedAccount : a));
    } else {
      // Add new account
      setAccounts(prev => [savedAccount, ...prev]);
    }
    setIsModalOpen(false); // Close modal after save
    setSelectedAccount(null); // Clear selected account
  };

  const openAddAccountModal = (type: AccountType | 'Investment' | 'Loan') => {
    setAccountTypeToAdd(type);
    setSelectedAccount(null); // Clear selected account for add mode
    setIsModalOpen(true);
  };

  const openEditAccountModal = (account: Account) => {
    setAccountTypeToAdd(account.type === 'Investment' ? 'Investment' : account.type === 'Loan' ? 'Loan' : account.type as AccountType);
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

	// Group accounts logically
	const liquidAccounts = accounts.filter((a) =>
		["Cash", "Debit", "Savings"].includes(a.type)
	);
	const creditCards = accounts.filter((a) => a.type === "Credit");
	const loanAccounts = accounts.filter((a) => a.type === "Loan");
	const investAccounts = accounts.filter((a) =>
		["Investment"].includes(a.type)
	);

	const totalAssets = accounts.reduce(
		(sum, acc) => (acc.balance > 0 ? sum + acc.balance : sum),
		0
	);
	const totalLiabilities = accounts.reduce(
		(sum, acc) => (acc.balance < 0 ? sum + Math.abs(acc.balance) : sum),
		0
	);
	const netWorth = totalAssets - totalLiabilities;

	return (
		    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full space-y-8">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
						<div>
							<h1 className="text-3xl font-bold text-slate-700 dark:text-white">
								My Wallet
							</h1>
							<p className="text-slate-500 dark:text-slate-400 mt-1">
								Centralized overview of all your assets and debts
							</p>
						</div>
						<div className="flex items-center gap-4">
							<button 
								onClick={() => openAddAccountModal('Cash')}
								className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl hover:bg-slate-100 font-medium transition-all shadow-lg shadow-slate-100 border border-slate-200"
							>
								<Plus size={18} />
								Link Account
							</button>
							<button 
								onClick={handleFakeBankSync}
								disabled={isSyncingBank}
								className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200 disabled:bg-violet-400 disabled:cursor-not-allowed"
							>
								{isSyncingBank ? (
									<>
										<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Syncing...
									</>
								) : (
									<>
										<WalletIcon size={18} />
										Sync All Banks
									</>
								)}
							</button>
						</div>
					</div>

            <AddEditAccountModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSaveAccount={handleSaveAccount}
              onDeleteAccount={handleDeleteAccount}
              defaultAccountType={accountTypeToAdd}
              account={selectedAccount}
            />
      {showGlobalSyncSuccessModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm m-4 p-6 text-center">
            <h3 className="text-xl font-bold text-slate-700 mb-4">Bank Sync Complete!</h3>
            <p className="text-slate-600 mb-6">Your financial data has been successfully updated.</p>
            <button
              onClick={() => setShowGlobalSyncSuccessModal(false)}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Net Worth */}
						<div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
							<div className="absolute top-0 right-0 p-8 opacity-10">
								<WalletIcon size={80} />
							</div>
							<div>
								<p className="text-slate-400 dark:text-violet-200 font-medium mb-1">
									Net Worth
								</p>
								<h2 className="text-3xl font-bold text-white">
									${netWorth.toLocaleString()}
								</h2>
							</div>
							<div className="flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md">
								<ArrowUpRight size={16} className="text-green-400" />
								<span>+2.4% vs last month</span>
							</div>
						</div>
		
						{/* Total Assets */}
						<div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between min-h-[160px]">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400">
									<TrendingUp size={20} />
								</div>
								<span className="font-semibold text-slate-700 dark:text-white">
									Total Assets
								</span>
							</div>
							<div>
								<h2 className="text-2xl font-bold text-emerald-600">
									${totalAssets.toLocaleString()}
								</h2>
								<p className="text-xs text-slate-400 dark:text-slate-300 mt-1">
									Cash, Savings, Investments
								</p>
							</div>
						</div>
		
						{/* Total Liabilities */}
						<div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between min-h-[160px]">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-red-100 text-red-600 rounded-lg dark:bg-red-900/30 dark:text-red-400">
									<ShieldCheck size={20} />
								</div>
								<span className="font-semibold text-slate-700 dark:text-white">
									Total Debts
								</span>
							</div>
							<div>
								<h2 className="text-2xl font-bold text-red-600">
									${totalLiabilities.toLocaleString()}
								</h2>
								<p className="text-xs text-slate-400 dark:text-slate-300 mt-1">
									Credit Cards, Loans
								</p>
							</div>
						</div>
					</div>
			{/* Tab Navigation */}
			<div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit flex-wrap">
				{["overview", "accounts", "cards", "loans", "investments"].map(
					(tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as any)}
							className={`
                  px-6 py-2.5 rounded-xl text-sm font-medium capitalize transition-all
                  ${
										activeTab === tab
											? "bg-white dark:bg-slate-900 text-slate-700 dark:text-white shadow-sm"
											: "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
									}
               `}
						>
							{tab}
						</button>
					)
				)}
			</div>

			{/* Tab Content */}
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
				{/* OVERVIEW TAB */}
				{activeTab === "overview" && (
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
						<div className="xl:col-span-2 space-y-8">
							{/* Banking Section */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-bold text-xl text-slate-700 dark:text-white">
										Banking & Cash
									</h3>
									<button
										onClick={() => setActiveTab("accounts")}
										className="text-sm text-violet-600 font-medium hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
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
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-bold text-xl text-slate-700 dark:text-white">
										Top Investments
									</h3>
									<button
										onClick={() =>
											setActiveTab("investments")
										}
										className="text-sm text-violet-600 font-medium hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
									>
										View All
									</button>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
							<div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-700">
								<div className="flex items-center justify-between">
									<h3 className="font-bold text-xl text-slate-700 dark:text-white">
										Loans
									</h3>
									<button
										onClick={() => setActiveTab("loans")}
										className="text-sm text-violet-600 font-medium hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
									>
										View All
									</button>
								</div>
								<div className="flex flex-col gap-4">
									{loanAccounts.slice(0, 2).map((acc) => (
										<LoanRow key={acc.id} account={acc} onEdit={openEditAccountModal} />
									))}
								</div>
							</div>
						</div>

						{/* Right Col: Cards Only */}
						<div className="space-y-8">
							{/* Cards Section */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-bold text-xl text-slate-700 dark:text-white">
										Credit Cards
									</h3>
									<button
										onClick={() => setActiveTab("cards")}
										className="text-sm text-violet-600 font-medium hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
									>
										View All
									</button>
								</div>
								<div className="flex flex-col gap-4">
									{creditCards.slice(0, 2).map((acc) => (
										<div
											key={acc.id}
											className="transform scale-90 origin-top-left sm:scale-100 sm:origin-top"
										>
											<CreditCardVisual account={acc} onEdit={openEditAccountModal} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* ACCOUNTS TAB */}
				{activeTab === "accounts" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{liquidAccounts.map((acc) => (
							<BankAccountRow key={acc.id} account={acc} onEdit={openEditAccountModal} />
						))}
						<button 
              onClick={() => openAddAccountModal('Cash')}
              className="w-full h-auto border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 dark:text-slate-500 font-medium hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all flex flex-col items-center justify-center gap-2">
							<Plus size={24} />
							Add Bank Account
						</button>
					</div>
				)}

				{/* CARDS TAB */}
				{activeTab === "cards" && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{creditCards.map((acc) => (
							<div key={acc.id} className="space-y-2">
								<CreditCardVisual account={acc} onEdit={openEditAccountModal} />
								<div className="flex justify-between items-center px-4">
									<span className="text-xs text-slate-400 dark:text-slate-500">
										Current Balance
									</span>
									<span className="text-lg font-bold text-red-500">
										$
										{Math.abs(acc.balance).toLocaleString()}
									</span>
								</div>
							</div>
						))}

					</div>
				)}

				{/* LOANS TAB */}
				{activeTab === "loans" && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{loanAccounts.map((acc) => (
							<LoanRow key={acc.id} account={acc} onEdit={openEditAccountModal} />
						))}
						<button 
              onClick={() => openAddAccountModal('Loan')}
              className="w-full h-auto min-h-[180px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 dark:text-slate-500 font-medium hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all flex flex-col items-center justify-center gap-2">
							<Plus size={24} />
							Add Loan
						</button>
					</div>
				)}

				{/* INVESTMENTS TAB */}
				{activeTab === "investments" && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{investAccounts.map((acc) => (
							<InvestmentRow key={acc.id} account={acc} onEdit={openEditAccountModal} />
						))}
						<button 
              onClick={() => openAddAccountModal('Investment')}
              className="w-full h-auto min-h-[180px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-slate-400 dark:text-slate-500 font-medium hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all flex flex-col items-center justify-center gap-2">
							<Plus size={24} />
							Add Investment
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wallet;

