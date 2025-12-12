import { Save, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/types";
import Button from "@/shared/components/Button";
import {
	InputField,
	SelectField,
	SelectItem,
	DatePicker,
} from "@/shared/components/forms";

interface AddEditTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSaveTransaction: (transaction: Transaction) => void;
	transaction: Transaction | null;
}

const AddEditTransactionModal: React.FC<AddEditTransactionModalProps> = ({
	isOpen,
	onClose,
	onSaveTransaction,
	transaction,
}) => {
	const [currentTransaction, setCurrentTransaction] = useState({
		payee: "",
		amount: "",
		date: new Date().toISOString().split("T")[0],
		category: "Uncategorized",
		type: "expense",
		status: "pending",
		accountId: "1",
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (isOpen) {
			if (transaction) {
				setCurrentTransaction({
					payee: transaction.payee,
					amount: String(transaction.amount),
					date: transaction.date,
					category: transaction.category,
					type: transaction.type,
					status: transaction.status,
					accountId: transaction.accountId,
				});
			} else {
				setCurrentTransaction({
					payee: "",
					amount: "",
					date: new Date().toISOString().split("T")[0],
					category: "Uncategorized",
					type: "expense",
					status: "pending",
					accountId: "1",
				});
			}
			setErrors({});
		}
	}, [isOpen, transaction]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setCurrentTransaction((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (!currentTransaction.payee.trim())
			newErrors.payee = "Payee is required.";
		if (!currentTransaction.amount) newErrors.amount = "Amount is required.";
		else if (parseFloat(currentTransaction.amount) <= 0)
			newErrors.amount = "Amount must be positive.";
		return newErrors;
	};

	const handleSaveTransaction = () => {
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		const transactionToSave: Transaction = {
			id: transaction ? transaction.id : new Date().toISOString(),
			payee: currentTransaction.payee,
			amount: parseFloat(currentTransaction.amount),
			date: currentTransaction.date,
			category: currentTransaction.category,
			type: currentTransaction.type as "income" | "expense",
			accountId: currentTransaction.accountId,
			status: currentTransaction.status as "cleared" | "pending",
		};

		onSaveTransaction(transactionToSave);
		onClose();
		setErrors({});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-md rounded-2xl bg-white shadow-xl">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-xl font-bold">
						{transaction ? "Edit Transaction" : "Add Transaction"}
					</h2>
					<button
						onClick={onClose}
						className="rounded-full p-2 hover:bg-slate-100"
					>
						<X size={20} />
					</button>
				</div>
				<div className="space-y-4 p-6">
					<InputField
						label="Payee"
						name="payee"
						value={currentTransaction.payee}
						onChange={handleInputChange}
						placeholder="e.g., Amazon, Salary"
						error={errors.payee}
					/>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Amount"
							name="amount"
							type="number"
							value={currentTransaction.amount}
							onChange={handleInputChange}
							placeholder="0.00"
							error={errors.amount}
						/>
						<SelectField
							label="Type"
							name="type"
							value={currentTransaction.type}
							onValueChange={(value) =>
								handleInputChange({
									target: { name: "type", value },
								} as React.ChangeEvent<HTMLSelectElement>)
							}
						>
							<SelectItem value="expense">Expense</SelectItem>
							<SelectItem value="income">Income</SelectItem>
						</SelectField>
					</div>
					<InputField
						label="Category"
						name="category"
						value={currentTransaction.category}
						onChange={handleInputChange}
					/>
					<DatePicker
						label="Date"
						name="date"
						value={currentTransaction.date}
						onChange={(e) =>
							handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
						}
					/>
					<SelectField
						label="Status"
						name="status"
						value={currentTransaction.status}
						onValueChange={(value) =>
							handleInputChange({
								target: { name: "status", value },
							} as React.ChangeEvent<HTMLSelectElement>)
						}
					>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="cleared">Cleared</SelectItem>
					</SelectField>
				</div>
				<div className="flex justify-end rounded-b-2xl bg-slate-50 p-6">
					<Button
						variant="primary"
						onClick={handleSaveTransaction}
						disabled={Object.keys(validate()).length > 0}
						icon={<Save size={18} />}
					>
						Save Transaction
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddEditTransactionModal;
