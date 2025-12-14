import { CheckCircle, Save, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";
import { COLOR_PALETTE, INVESTMENT_CATEGORIES } from "@/shared/data/constants";
import type { Account, AccountType } from "@/shared/types/types";

interface AddEditAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSaveAccount: (account: Account) => void;
	defaultAccountType: AccountType | "Investment" | "Loan";
	account: Account | null;
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
		colorTheme: COLOR_PALETTE[0],
		expiry: "",
	});
	const [selectedAccountType, setSelectedAccountType] = useState<
		AccountType | "Investment" | "Loan"
	>(defaultAccountType);
	const [selectedBankBranch, setSelectedBankBranch] =
		useState("Bank of America");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isAccountSyncing, setIsAccountSyncing] = useState(false);
	const [showAccountSyncNotification, setShowAccountSyncNotification] =
		useState(false);
	const [selectedInvestmentCategory, setSelectedInvestmentCategory] = useState(
		account?.investmentCategory || INVESTMENT_CATEGORIES[0].value,
	);

	useEffect(() => {
		if (isOpen) {
			if (account) {
				setCurrentAccount({
					name: account.name,
					balance: String(account.balance),
					accountNumber: account.accountNumber || "",
					colorTheme: account.colorTheme || COLOR_PALETTE[0],
					expiry: account.expiry || "",
				});
				setSelectedAccountType(
					account.type === "Investment"
						? "Investment"
						: account.type === "Loan"
							? "Loan"
							: (account.type as AccountType),
				);
				if (account.type === "Investment" && account.investmentCategory) {
					setSelectedInvestmentCategory(account.investmentCategory);
				}
			} else {
				setCurrentAccount({
					name: "",
					balance: "",
					accountNumber: "",
					colorTheme: COLOR_PALETTE[0],
					expiry: "",
				});
				setSelectedAccountType(defaultAccountType);
				setSelectedInvestmentCategory(INVESTMENT_CATEGORIES[0].value);
			}
			setErrors({});
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
			newErrors.balance = "Balance is required.";
		} else if (
			selectedAccountType === "Cash" &&
			Number.isNaN(parseFloat(currentAccount.balance))
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
			let number = "";
			for (let i = 0; i < 16; i++) {
				number += Math.floor(Math.random() * 10);
			}
			return number;
		};

		const generateRandomAmount = () => {
			return (Math.random() * 5000 + 500).toFixed(2);
		};

		const accountToSave: Account = {
			id: account ? account.id : new Date().toISOString(),
			name: currentAccount.name,
			institution:
				selectedAccountType === "Cash"
					? ""
					: account?.institution
						? account.institution
						: selectedBankBranch,
			balance:
				parseFloat(currentAccount.balance) ||
				parseFloat(generateRandomAmount()),
			type:
				selectedAccountType === "Investment"
					? "Investment"
					: selectedAccountType === "Loan"
						? "Loan"
						: (selectedAccountType as AccountType),
			accountNumber:
				currentAccount.accountNumber || generateRandomAccountNumber(),
			colorTheme:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.colorTheme
					: currentAccount.colorTheme || undefined,
			investmentCategory:
				selectedAccountType === "Investment"
					? selectedInvestmentCategory
					: undefined,
			expiry:
				selectedAccountType === "Credit" ? currentAccount.expiry : undefined,
			iconBgClass:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.iconBgClass
					: undefined,
			iconTextColorClass:
				selectedAccountType === "Investment"
					? INVESTMENT_CATEGORIES.find(
							(cat) => cat.value === selectedInvestmentCategory,
						)?.iconTextColorClass
					: undefined,
			currency: "USD",
			lastUpdated: new Date().toISOString(),
		};

		onSaveAccount(accountToSave);
		onClose();
		setErrors({});
	};

	if (!isOpen) return null;

	const handleSyncIndividualAccount = () => {
		setIsAccountSyncing(true);
		setShowAccountSyncNotification(false);
		setTimeout(() => {
			setIsAccountSyncing(false);
			setShowAccountSyncNotification(true);
		}, 2000);
	};

	const renderFields = () => {
		const isEditing = !!account;

		const renderBalanceInput = (
			label: string,
			name: string,
			isEditable: boolean,
		) => (
			<div>
				<label
					className="mb-1 block text-sm font-medium text-slate-600"
					htmlFor={name}
				>
					{label}
				</label>
				<div className="relative">
					<span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
						$
					</span>
					<InputField
						type="number"
						name={name}
						value={currentAccount.balance}
						onChange={handleInputChange}
						readOnly={!isEditable}
						className={`pl-7 ${!isEditable ? "bg-slate-100 text-slate-500" : ""}`}
						placeholder="e.g. 5000"
						error={errors.balance}
					/>
				</div>
				{errors.balance && (
					<p className="mt-1 text-xs text-red-500">{errors.balance}</p>
				)}
			</div>
		);

		return (
			<>
				<InputField
					label={
						selectedAccountType === "Credit"
							? "Card Nickname"
							: selectedAccountType === "Loan"
								? "Loan Name"
								: selectedAccountType === "Investment"
									? "Investment Name"
									: "Account Nickname"
					}
					id="account-nickname"
					name="name"
					value={currentAccount.name}
					onChange={handleInputChange}
					placeholder={
						selectedAccountType === "Credit"
							? "e.g. Chase Sapphire"
							: selectedAccountType === "Loan"
								? "e.g. Car Loan"
								: selectedAccountType === "Investment"
									? "e.g. VTSAX Index Fund"
									: "e.g. Everyday Checking"
					}
					error={errors.name}
				/>

				{selectedAccountType === "Cash" &&
					(isEditing
						? renderBalanceInput("Starting Amount", "balance", true)
						: renderBalanceInput("Balance", "balance", true))}

				{selectedAccountType !== "Cash" && (
					<>
						{selectedAccountType !== "Investment" &&
							selectedAccountType !== "Credit" &&
							selectedAccountType !== "Loan" && (
								<InputField
									label="Account Number"
									id="account-number"
									placeholder="e.g. 1234567890123456"
									value={account?.accountNumber || "N/A"}
									readOnly={isEditing}
									className={`${
										isEditing ? "bg-slate-100 text-slate-500" : ""
									}`}
								/>
							)}

						{selectedAccountType === "Credit" && (
							<>
								<InputField
									label="Account Number"
									id="account-number"
									name="accountNumber"
									placeholder="e.g. 1234567890123456"
									value={currentAccount.accountNumber}
									onChange={handleInputChange}
									readOnly={!isEditing}
									className={`${
										!isEditing ? "bg-slate-100 text-slate-500" : ""
									}`}
								/>
								<InputField
									label="Expiry Date"
									id="expiry-date"
									name="expiry"
									value={currentAccount.expiry}
									onChange={handleInputChange}
									readOnly={!isEditing}
									className={`${
										!isEditing ? "bg-slate-100 text-slate-500" : ""
									}`}
									placeholder="MM/YY"
								/>
							</>
						)}

						{selectedAccountType === "Investment" ? (
							<SelectField
								label="Investment Category"
								name="investmentCategory"
								placeholder="Select category..."
								value={selectedInvestmentCategory}
								onValueChange={(value) => setSelectedInvestmentCategory(value)}
								disabled={isEditing}
							>
								{INVESTMENT_CATEGORIES.map((category) => (
									<SelectItem key={category.value} value={category.value}>
										{category.label}
									</SelectItem>
								))}
							</SelectField>
						) : (
							isEditing && (
								<div className="pt-4">
									<Button
										variant="sync"
										onClick={handleSyncIndividualAccount}
										isLoading={isAccountSyncing}
										type="button"
										fullWidth={true}
									>
										Sync Account
									</Button>
									{showAccountSyncNotification && (
										<p className="mt-2 flex items-center justify-center gap-2 text-center text-base font-semibold text-green-600">
											<CheckCircle size={18} />
											Bank Sync Successful!
										</p>
									)}
								</div>
							)
						)}
					</>
				)}
			</>
		);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-md rounded-2xl bg-white shadow-xl">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-xl font-bold">
						{account ? "Edit" : "Add"} {selectedAccountType} Account
					</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 hover:bg-slate-100"
						type="button"
					>
						<X size={20} />
					</button>
				</div>
				<div className="space-y-4 p-6">
					{!account && (
						<>
							{defaultAccountType === "Cash" && (
								<SelectField
									label="Account Type"
									name="selectedAccountType"
									value={selectedAccountType}
									placeholder="Select account type..."
									onValueChange={(value) =>
										setSelectedAccountType(
											value as AccountType | "Investment" | "Loan",
										)
									}
								>
									<SelectItem value="Cash">Cash</SelectItem>
									<SelectItem value="Credit">Credit</SelectItem>
									<SelectItem value="Debit">Debit</SelectItem>
									<SelectItem value="Savings">Savings</SelectItem>
									<SelectItem value="Investment">Investment</SelectItem>
									<SelectItem value="Loan">Loan</SelectItem>
								</SelectField>
							)}
							{selectedAccountType !== "Cash" && (
								<SelectField
									label="Bank Branch"
									name="selectedBankBranch"
									placeholder="Select a bank..."
									onValueChange={(value) => setSelectedBankBranch(value)}
								>
									<SelectItem value="Bank of America">
										Bank of America
									</SelectItem>
									<SelectItem value="Chase">Chase</SelectItem>
									<SelectItem value="Wells Fargo">Wells Fargo</SelectItem>
									<SelectItem value="Citibank">Citibank</SelectItem>
								</SelectField>
							)}
						</>
					)}
					{renderFields()}
				</div>
				<div className="flex items-center justify-between gap-4 rounded-b-2xl bg-slate-50 p-6">
					{account && onDeleteAccount && (
						<Button
							variant="danger"
							onClick={() => {
								if (
									window.confirm(
										`Are you sure you want to delete the account "${account.name}"? This action cannot be undone.`,
									)
								) {
									onDeleteAccount(account.id);
									onClose();
								}
							}}
							icon={<Trash2 size={18} />}
						>
							Delete
						</Button>
					)}
					<Button
						variant="primary"
						onClick={handleSaveAccount}
						disabled={Object.keys(validate()).length > 0}
						icon={<Save size={18} />}
					>
						Save Account
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddEditAccountModal;
