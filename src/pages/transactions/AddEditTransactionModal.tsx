import { Calendar, DollarSign, Save, Type, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/types";

interface AddEditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTransaction: (transaction: Transaction) => void;
  transaction: Transaction | null; // Optional: transaction to be edited
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
    status: "pending", // Default status for new transactions
    accountId: "1", // Mock accountId
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        // Populate form with existing transaction data for editing
        setCurrentTransaction({
          payee: transaction.payee,
          amount: String(transaction.amount), // Convert number to string for input
          date: transaction.date,
          category: transaction.category,
          type: transaction.type,
          status: transaction.status,
          accountId: transaction.accountId,
        });
      } else {
        // Reset form for adding a new transaction
        setCurrentTransaction({
          payee: "",
          amount: "",
          date: new Date().toISOString().split("T")[0],
          category: "Uncategorized",
          type: "expense",
          status: "pending",
          accountId: "1", // Mock accountId
        });
      }
      setErrors({}); // Clear errors when modal opens
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
      id: transaction ? transaction.id : new Date().toISOString(), // Use existing ID if editing, new ID if adding
      payee: currentTransaction.payee,
      amount: parseFloat(currentTransaction.amount),
      date: currentTransaction.date,
      category: currentTransaction.category,
      type: currentTransaction.type as "income" | "expense",
      accountId: currentTransaction.accountId, // Mock accountId
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
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Payee
            </label>
            <input
              type="text"
              name="payee"
              value={currentTransaction.payee}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-3 py-2 transition-colors dark:bg-slate-900 dark:text-white ${errors.payee ? "border-red-500" : "border-slate-200 dark:border-slate-600"}`}
              placeholder="e.g., Amazon, Salary"
            />
            {errors.payee && (
              <p className="mt-1 text-xs text-red-500">{errors.payee}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Amount
              </label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  name="amount"
                  value={currentTransaction.amount}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border py-2 pr-3 pl-7 transition-colors dark:bg-slate-900 dark:text-white ${errors.amount ? "border-red-500" : "border-slate-200 dark:border-slate-600"}`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                Type
              </label>
              <select
                name="type"
                value={currentTransaction.type}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={currentTransaction.category}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={currentTransaction.date}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Status
            </label>
            <select
              name="status"
              value={currentTransaction.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="cleared">Cleared</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end rounded-b-2xl bg-slate-50 p-6">
          <button
            onClick={handleSaveTransaction}
            disabled={Object.keys(validate()).length > 0}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all disabled:cursor-not-allowed disabled:bg-violet-400"
          >
            <Save size={18} />
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTransactionModal;
