import { CheckCircle, Save, Trash2, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";
import { COLOR_PALETTE, INVESTMENT_CATEGORIES } from "@/shared/data/constants";
import type { Account, AccountType } from "@/shared/types/types";
import {
	formatAccountNumber,
	formatCreditCard,
} from "@/shared/utils/formatters";

// Define Zod schema for account validation
const accountSchema = z.object({
	name: z.string().min(1, "Account name is required."),
	balance: z.preprocess(
		(val) => Number(String(val).replace(/[^0-9.]/g, "")),
		z.number().min(0, "Balance cannot be negative.").or(z.literal(NaN)),
	),
	accountNumber: z.string().optional(),
	colorTheme: z.string().optional(),
	expiry: z
		.string()
		.optional()
		.refine(
			(val) => {
				if (!val) return true; // Optional field, no validation if empty
				const [month, year] = val.split("/");
				if (!month || !year || month.length !== 2 || year.length !== 2)
					return false;
				const currentYear = new Date().getFullYear() % 100;
				const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

				const expMonth = parseInt(month, 10);
				const expYear = parseInt(year, 10);

				if (expMonth < 1 || expMonth > 12) return false;
				if (expYear < currentYear) return false;
				if (expYear === currentYear && expMonth < currentMonth) return false;

				return true;
			},
			{
				message: "Invalid expiry date (MM/YY)",
			},
		),
});

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
	const [currentAccount, setCurrentAccount] = useState<
		Partial<Omit<Account, "balance" | "accountNumber">> & {
			balance: string;
			accountNumber: string;
			expiry: string;
		}
	>({
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
	const [errors, setErrors] = useState<Record<string, string | undefined>>({});
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
					accountNumber:
						account.type === "Credit"
							? formatCreditCard(account.accountNumber || "")
							: formatAccountNumber(account.accountNumber || ""),
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
			setErrors({}); // Clear errors when modal opens
		}
	}, [isOpen, account, defaultAccountType]);

	const handleValidatedChange = useCallback(
		(fieldName: keyof typeof currentAccount, value: any, error?: string) => {
			setCurrentAccount((prev) => ({ ...prev, [fieldName]: value }));
			setErrors((prev) => ({ ...prev, [fieldName]: error }));
		},
		[],
	);

	const handleSaveAccount = () => {
		// Create a temporary schema for the current account type to handle conditional validation
		const currentTypeSchema = accountSchema.superRefine((data, ctx) => {
			if (selectedAccountType === "Cash" && Number(data.balance) <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Balance must be greater than zero for Cash accounts.",
					path: ["balance"],
				});
			}
			if (selectedAccountType === "Credit" && !data.accountNumber) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Account number is required for Credit accounts.",
					path: ["accountNumber"],
				});
			}
			if (selectedAccountType === "Credit" && !data.expiry) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Expiry date is required for Credit accounts.",
					path: ["expiry"],
				});
			}
		});

		const validationResult = currentTypeSchema.safeParse(currentAccount);

		if (!validationResult.success) {
			const newErrors: Record<string, string> = {};
			validationResult.error.errors.forEach((err) => {
				if (err.path.length > 0) {
					newErrors[err.path[0]] = err.message;
				}
			});
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
			name: currentAccount.name as string,
			institution:
				selectedAccountType === "Cash"
					? ""
					: account?.institution
						? account.institution
						: selectedBankBranch,
			balance: parseFloat(currentAccount.balance),
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
					onValidatedChange={(value, error) =>
						handleValidatedChange("name", value, error)
					}
					schema={accountSchema
						.pick({ name: true })
						.transform((val) => val.name)}
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

				{selectedAccountType === "Cash" && (
					<InputField
						label="Balance"
						id="balance"
						name="balance"
						value={currentAccount.balance}
						onValidatedChange={(value, error) =>
							handleValidatedChange("balance", value, error)
						}
						schema={accountSchema
							.pick({ balance: true })
							.transform((val) => val.balance)}
						format="currency"
						placeholder="e.g. 5000"
						error={errors.balance}
					/>
				)}

				{selectedAccountType !== "Cash" && (
					<>
						{selectedAccountType !== "Investment" &&
							selectedAccountType !== "Credit" &&
							selectedAccountType !== "Loan" && (
								<InputField
									label="Account Number"
									id="account-number"
									name="accountNumber"
									placeholder="e.g. 1234567890123456"
									value={currentAccount.accountNumber}
									onValidatedChange={(value, error) =>
										handleValidatedChange("accountNumber", value, error)
									}
									schema={accountSchema
										.pick({ accountNumber: true })
										.transform((val) => val.accountNumber)}
									format="creditCard" // Changed from "number" to "creditCard"
									readOnly={isEditing}
									className={`${
										isEditing ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" : ""
									}`}
									error={errors.accountNumber}
								/>
							)}

						{selectedAccountType === "Credit" && (
							<>
								<InputField
									label="Account Number"
									id="account-number"
									name="accountNumber"
									placeholder="e.g. 1234 5678 9012 3456"
									value={currentAccount.accountNumber}
									onValidatedChange={(value, error) =>
										handleValidatedChange("accountNumber", value, error)
									}
									schema={accountSchema
										.pick({ accountNumber: true })
										.transform((val) => val.accountNumber)}
									format="creditCard"
									readOnly={isEditing}
									className={`${
										isEditing ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" : ""
									}`}
									error={errors.accountNumber}
								/>
								<InputField
									label="Expiry Date"
									id="expiry-date"
									name="expiry"
									value={currentAccount.expiry}
									onValidatedChange={(value, error) =>
										handleValidatedChange("expiry", value, error)
									}
									schema={accountSchema
										.pick({ expiry: true })
										.transform((val) => val.expiry)}
									placeholder="MM/YY"
									readOnly={isEditing}
									className={`${
										isEditing ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" : ""
									}`}
									error={errors.expiry}
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
								// No direct validation needed for SelectField for Investment category as it's pre-defined
								// schema={accountSchema.pick({ investmentCategory: true })} // Removed as per previous changes
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
										<p className="mt-2 flex items-center justify-center gap-2 text-center text-base font-semibold text-green-600 dark:text-green-400">
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
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm dark:bg-black/70">
			<div className="m-4 w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-slate-900 dark:shadow-2xl dark:shadow-slate-900/70">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-xl font-bold dark:text-white">
						{account ? "Edit" : "Add"} {selectedAccountType} Account
					</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
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
									value={selectedBankBranch}
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
				<div className="flex items-center justify-between gap-4 rounded-b-2xl bg-slate-50 p-6 dark:bg-slate-800">
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
						disabled={Object.values(errors).some((error) => error)}
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
