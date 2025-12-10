import {
	CheckCircle,
	CreditCard,
	DollarSign,
	Landmark,
	Save,
	ShieldCheck,
	Trash2,
	TrendingUp,
	X,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { COLOR_PALETTE, INVESTMENT_CATEGORIES } from "../data/constants";
import type { Account, AccountType } from "../types/types";

interface AddEditAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSaveAccount: (account: Account) => void;
	defaultAccountType: AccountType | "Investment" | "Loan"; // Changed prop name
	account: Account | null; // Optional: account to be edited
	onDeleteAccount?: (accountId: string) => void;
}

const AddEditAccountModal: React.FC<AddEditAccountModalProps> = ({
	isOpen,
	onClose,
	onSaveAccount,
	defaultAccountType,
	account,
	onDeleteAccount,
}) => {
	const [currentAccount, setCurrentAccount] = useState({
		name: "",
		balance: "",
		accountNumber: "",
		colorTheme: COLOR_PALETTE[0], // Re-add default color
	});
	const [selectedAccountType, setSelectedAccountType] = useState<
		AccountType | "Investment" | "Loan"
	>(defaultAccountType); // New state for selected type
	const [selectedBankBranch, setSelectedBankBranch] =
		useState("Bank of America"); // New state for bank branch
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isAccountSyncing, setIsAccountSyncing] = useState(false); // State for individual account sync
	const [showAccountSyncNotification, setShowAccountSyncNotification] =
		useState(false); // State for individual account sync notification
	const [selectedInvestmentCategory, setSelectedInvestmentCategory] = useState(
		account?.investmentCategory || INVESTMENT_CATEGORIES[0].value,
	);

	useEffect(() => {
		if (isOpen) {
			if (account) {
				// Populate form with existing account data for editing
				setCurrentAccount({
					name: account.name,
					balance: String(account.balance), // Convert number to string for input
					accountNumber: account.accountNumber || "",
					colorTheme: account.colorTheme || COLOR_PALETTE[0], // Re-add colorTheme
				});
				setSelectedAccountType(
					account.type === "Investment"
						? "Investment"
						: account.type === "Loan"
							? "Loan"
							: (account.type as AccountType),
				); // Set type from existing account
				if (account.type === "Investment" && account.investmentCategory) {
					setSelectedInvestmentCategory(account.investmentCategory);
				}
			} else {
				// Reset form for adding a new account
				setCurrentAccount({
					name: "",
					balance: "",
					accountNumber: "",
					colorTheme: COLOR_PALETTE[0], // Re-add default color
				});
				setSelectedAccountType(defaultAccountType); // Set type to default for new account
				setSelectedInvestmentCategory(INVESTMENT_CATEGORIES[0].value); // Reset to default investment category
			}
			setErrors({}); // Clear errors when modal opens
		}
	}, [isOpen, account, defaultAccountType]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setCurrentAccount((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (!currentAccount.name.trim()) newErrors.name = "Name is required.";
		if (!currentAccount.balance && selectedAccountType === "Cash") {
			// Only validate balance for Cash accounts if editable
			newErrors.balance = "Balance is required.";
		} else if (
			selectedAccountType === "Cash" &&
			isNaN(parseFloat(currentAccount.balance))
		) {
			newErrors.balance = "Balance must be a number.";
		} else if (
			selectedAccountType === "Cash" &&
			parseFloat(currentAccount.balance) === 0
		) {
			newErrors.balance = "Balance cannot be zero for this account type.";
		}

		return newErrors;
	};

	const handleSaveAccount = () => {
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		const generateRandomAccountNumber = () => {
			return `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`;
		};

		const generateRandomAmount = () => {
			return (Math.random() * 5000 + 500).toFixed(2); // Random amount between 500 and 5500
		};

		const accountToSave: Account = {
			id: account ? account.id : new Date().toISOString(), // Use existing ID if editing, new ID if adding
			name: currentAccount.name,
			institution:
				selectedAccountType === "Cash"
					? ""
					: account && account.institution
						? account.institution
						: selectedBankBranch, // Use selectedBankBranch for non-cash new accounts, else keep existing or empty
			balance:
				parseFloat(currentAccount.balance) ||
				parseFloat(generateRandomAmount()), // Use current balance if provided, else random
			type:
				selectedAccountType === "Investment"
					? "Investment"
					: selectedAccountType === "Loan"
						? "Loan"
						: (selectedAccountType as AccountType), // Cast to AccountType
			accountNumber:
				currentAccount.accountNumber || generateRandomAccountNumber(), // Use existing or generate random
			colorTheme:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.colorTheme
					: currentAccount.colorTheme || undefined, // Set colorTheme based on investment category if Investment, else use current
			investmentCategory:
				selectedAccountType === "Investment"
					? selectedInvestmentCategory
					: undefined, // Add investment category if Investment
			iconBgClass:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.iconBgClass
					: undefined, // Add icon background class if Investment
			iconTextColorClass:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.iconTextColorClass
					: undefined, // Add icon text color class if Investment
			currency: "USD", // For now, hardcode USD, can be made editable later
			lastUpdated: new Date().toISOString(),
		};

		onSaveAccount(accountToSave);
		onClose();
		setErrors({});
	};

	if (!isOpen) return null;

	const handleSyncIndividualAccount = () => {
		console.log("Sync initiated. Setting isAccountSyncing to true.");
		setIsAccountSyncing(true);
		setShowAccountSyncNotification(false);
		setTimeout(() => {
			console.log(
				"First setTimeout complete. Setting isAccountSyncing to false, showIndividualSyncNotification to true.",
			);
			setIsAccountSyncing(false);
			setShowAccountSyncNotification(true);
		}, 2000); // Simulate 2-second sync
	};

	const renderFields = () => {
		const renderBalanceInput = (isEditable: boolean) => (
			<div className="relative">
				<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
					$
				</span>
				<input
					type="number"
					name="balance"
					value={currentAccount.balance}
					onChange={handleInputChange}
					readOnly={!isEditable}
					className={`w-full pl-7 pr-3 py-2 rounded-lg transition-colors border ${errors.balance ? "border-red-500" : "border-slate-200"} ${!isEditable ? "bg-slate-100 text-slate-500" : "bg-transparent"}`}
					placeholder="e.g., 5000"
				/>
			</div>
		);

		const commonFields = (
			<>
				<div>
					<label className="block text-sm font-medium text-slate-600 mb-1">
						Account Nickname
					</label>
					<input
						type="text"
						name="name"
						value={currentAccount.name}
						onChange={handleInputChange}
						className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? "border-red-500" : "border-slate-200"} ${account ? "bg-slate-50 text-slate-500" : ""}`}
						placeholder="e.g., Everyday Checking"
						readOnly={
							!!account &&
							selectedAccountType !== "Cash" &&
							selectedAccountType !== "Credit" &&
							selectedAccountType !== "Loan" &&
							selectedAccountType !== "Investment"
						}
					/>
					{errors.name && (
						<p className="text-xs text-red-500 mt-1">{errors.name}</p>
					)}
				</div>
				{!account &&
					selectedAccountType === "Cash" && ( // Render label and input only if Cash and adding new account
						<div>
							<label className="block text-sm font-medium text-slate-600 mb-1">
								Balance
							</label>
							{renderBalanceInput(true)}{" "}
							{/* Always editable when shown for new Cash account */}
							{errors.balance && (
								<p className="text-xs text-red-500 mt-1">{errors.balance}</p>
							)}
						</div>
					)}
				{(!selectedAccountType || selectedAccountType !== "Cash") &&
					account && ( // Render Sync Account button only if non-Cash and editing
						<div>
							<button
								onClick={handleSyncIndividualAccount}
								disabled={isAccountSyncing}
								className="w-full px-3 py-2 flex items-center justify-center gap-2 bg-violet-600 text-white rounded-lg font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
							>
								{isAccountSyncing ? (
									<>
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Syncing...
									</>
								) : (
									"Sync Account"
								)}
							</button>
							{errors.balance && (
								<p className="text-xs text-red-500 mt-1">{errors.balance}</p>
							)}
							{showAccountSyncNotification && (
								<p className="flex items-center justify-center gap-2 text-base font-semibold text-green-600 mt-2 text-center">
									<CheckCircle size={18} />
									Bank Sync Successful!
								</p>
							)}
						</div>
					)}
			</>
		);

		if (selectedAccountType === "Credit") {
			return (
				<>
					<div>
						<label className="block text-sm font-medium text-slate-600 mb-1">
							Card Nickname
						</label>
						<input
							type="text"
							name="name"
							value={currentAccount.name}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? "border-red-500" : "border-slate-200"} ${account ? "bg-slate-50 text-slate-500" : ""}`}
							placeholder="e.g., Chase Sapphire"
						/>
						{errors.name && (
							<p className="text-xs text-red-500 mt-1">{errors.name}</p>
						)}
					</div>
					{account && ( // Display these fields only when editing an existing account
						<>
							<div>
								<label className="block text-sm font-medium text-slate-600 mb-1">
									Account Number
								</label>
								<input
									type="text"
									value={account.accountNumber || "N/A"}
									readOnly
									className="w-full px-3 py-2 rounded-lg transition-colors bg-slate-100 text-slate-500 border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-slate-600 mb-1">
									Expiry Date
								</label>
								<input
									type="text"
									value={account.expiry || "MM/YY"}
									readOnly
									className="w-full px-3 py-2 rounded-lg transition-colors bg-slate-100 text-slate-500 border-transparent"
								/>
							</div>
						</>
					)}
				</>
			);
		} else if (selectedAccountType === "Loan") {
			return (
				<>
					<div>
						<label className="block text-sm font-medium text-slate-600 mb-1">
							Loan Name
						</label>
						<input
							type="text"
							name="name"
							value={currentAccount.name}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? "border-red-500" : "border-slate-200"}`}
							placeholder="e.g., Car Loan"
						/>
						{errors.name && (
							<p className="text-xs text-red-500 mt-1">{errors.name}</p>
						)}
					</div>
					{account && (
						<div>
							<button
								onClick={handleSyncIndividualAccount}
								disabled={isAccountSyncing}
								className="w-full px-3 py-2 flex items-center justify-center gap-2 bg-violet-600 text-white rounded-lg font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
							>
								{isAccountSyncing ? (
									<>
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Syncing...
									</>
								) : (
									"Sync Account"
								)}
							</button>
							{errors.balance && (
								<p className="text-xs text-red-500 mt-1">{errors.balance}</p>
							)}
							{showAccountSyncNotification && (
								<p className="flex items-center justify-center gap-2 text-base font-semibold text-green-600 mt-2 text-center">
									<CheckCircle size={18} />
									Bank Sync Successful!
								</p>
							)}
						</div>
					)}
				</>
			);
		} else if (selectedAccountType === "Investment") {
			return (
				<>
					<div>
						<label className="block text-sm font-medium text-slate-600 mb-1">
							Investment Name
						</label>
						<input
							type="text"
							name="name"
							value={currentAccount.name}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? "border-red-500" : "border-slate-200"} ${account ? "bg-slate-50 text-slate-500" : ""}`}
							placeholder="e.g., VTSAX Index Fund"
						/>
						{errors.name && (
							<p className="text-xs text-red-500 mt-1">{errors.name}</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-600 mb-1">
							Investment Category
						</label>
						<select
							name="investmentCategory"
							value={selectedInvestmentCategory}
							onChange={(e) => setSelectedInvestmentCategory(e.target.value)}
							className={`w-full px-3 py-2 border rounded-lg transition-colors ${account ? "bg-slate-100 text-slate-500 border-transparent" : "bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"}`}
							disabled={!!account}
						>
							{INVESTMENT_CATEGORIES.map((category) => (
								<option key={category.value} value={category.value}>
									{category.label}
								</option>
							))}
						</select>
					</div>
				</>
			);
		} else {
			// Bank accounts (Cash, Debit, Savings)
			return commonFields;
		}
	};

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
				<div className="p-6 flex justify-between items-center">
					<h2 className="text-xl font-bold">
						{account ? "Edit" : "Add"} {selectedAccountType} Account
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-slate-100 rounded-full"
					>
						<X size={20} />
					</button>
				</div>
				<div className="p-6 space-y-4">
					{!account && ( // Only show account type selector when adding a new account
						<>
							<div>
								<label className="block text-sm font-medium text-slate-600 mb-1">
									Account Type
								</label>
								<select
									name="selectedAccountType"
									value={selectedAccountType}
									onChange={(e) =>
										setSelectedAccountType(
											e.target.value as AccountType | "Investment" | "Loan",
										)
									}
									className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
									disabled={defaultAccountType !== "Cash"} // Disable if a specific type is passed
								>
									<option value="Cash">Cash</option>
									<option value="Credit">Credit</option>
									<option value="Debit">Debit</option>
									<option value="Savings">Savings</option>
									<option value="Investment">Investment</option>
									<option value="Loan">Loan</option>
								</select>
							</div>
							{selectedAccountType !== "Cash" && ( // Only show bank branch for non-cash accounts
								<div>
									<label className="block text-sm font-medium text-slate-600 mb-1">
										Bank Branch
									</label>
									<select
										name="selectedBankBranch"
										onChange={(e) => setSelectedBankBranch(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
									>
										<option value="Bank of America">Bank of America</option>
										<option value="Chase">Chase</option>
										<option value="Wells Fargo">Wells Fargo</option>
										<option value="Citibank">Citibank</option>
									</select>
								</div>
							)}
						</>
					)}
					{renderFields()}
				</div>
				<div className="p-6 bg-slate-50 rounded-b-2xl flex justify-between items-center gap-4">
					{account && onDeleteAccount && (
						<button
							onClick={() => {
								if (
									window.confirm(
										`Are you sure you want to delete the account "${account.name}"? This action cannot be undone.`,
									)
								) {
									onDeleteAccount(account.id);
									onClose(); // Close modal after deletion
								}
							}}
							className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 font-medium transition-all"
						>
							<Trash2 size={18} />
							Delete
						</button>
					)}
					<button
						onClick={handleSaveAccount}
						disabled={Object.keys(validate()).length > 0}
						className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
					>
						<Save size={18} />
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddEditAccountModal;
