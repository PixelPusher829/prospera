import React, { useState, useEffect } from 'react';
import { X, Save, Landmark, CreditCard, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';
import { Account, AccountType } from '../types';
import { COLOR_PALETTE } from '../data/constants';

interface AddEditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAccount: (account: Account) => void;
  accountType: AccountType | 'Investment' | 'Loan';
  account: Account | null; // Optional: account to be edited
}

const AddEditAccountModal: React.FC<AddEditAccountModalProps> = ({ isOpen, onClose, onSaveAccount, accountType, account }) => {
  const [currentAccount, setCurrentAccount] = useState({
    name: '',
    institution: '',
    balance: '',
    accountNumber: '',
    colorTheme: COLOR_PALETTE[0], // Default color
    expiry: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (account) {
        // Populate form with existing account data for editing
        setCurrentAccount({
          name: account.name,
          institution: account.institution,
          balance: String(account.balance), // Convert number to string for input
          accountNumber: account.accountNumber || '',
          colorTheme: account.colorTheme || COLOR_PALETTE[0],
          expiry: account.expiry || ''
        });
      } else {
        // Reset form for adding a new account
        setCurrentAccount({
          name: '',
          institution: '',
          balance: '',
          accountNumber: '',
          colorTheme: COLOR_PALETTE[0],
          expiry: ''
        });
      }
      setErrors({}); // Clear errors when modal opens
    }
  }, [isOpen, account]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentAccount(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentAccount.name.trim()) newErrors.name = 'Name is required.';
    if (!currentAccount.institution.trim()) newErrors.institution = 'Institution is required.';
    if (!currentAccount.balance) {
      newErrors.balance = 'Balance is required.';
    } else if (isNaN(parseFloat(currentAccount.balance))) {
      newErrors.balance = 'Balance must be a number.';
    } else if (parseFloat(currentAccount.balance) === 0 && (accountType === 'Investment' || accountType === 'Cash' || accountType === 'Debit' || accountType === 'Savings')) {
      newErrors.balance = 'Balance cannot be zero for this account type.';
    }

    return newErrors;
  };

  const handleSaveAccount = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const accountToSave: Account = {
      id: account ? account.id : new Date().toISOString(), // Use existing ID if editing, new ID if adding
      name: currentAccount.name,
      institution: currentAccount.institution,
      balance: parseFloat(currentAccount.balance),
      type: accountType === 'Investment' ? 'Investment' : accountType === 'Loan' ? 'Loan' : (accountType as AccountType), // Cast to AccountType
      accountNumber: currentAccount.accountNumber || undefined,
      colorTheme: currentAccount.colorTheme || undefined,
      expiry: currentAccount.expiry || undefined,
      currency: 'USD', // For now, hardcode USD, can be made editable later
      lastUpdated: new Date().toISOString(),
    };

    onSaveAccount(accountToSave);
    onClose();
    setErrors({});
  };

  if (!isOpen) return null;

  const renderFields = () => {
    const commonFields = (
      <>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Account Nickname</label>
          <input type="text" name="name" value={currentAccount.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Everyday Checking" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Institution</label>
          <input type="text" name="institution" value={currentAccount.institution} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.institution ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Capital One" />
          {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input type="number" name="balance" value={currentAccount.balance} onChange={handleInputChange} className={`w-full pl-7 pr-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.balance ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., 5000" />
          </div>
          {errors.balance && <p className="text-xs text-red-500 mt-1">{errors.balance}</p>}
        </div>
      </>
    );

    switch (accountType) {
      case 'Credit':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Card Nickname</label>
              <input type="text" name="name" value={currentAccount.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Chase Sapphire" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Institution</label>
              <input type="text" name="institution" value={currentAccount.institution} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.institution ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Chase" />
              {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Current Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input type="number" name="balance" value={currentAccount.balance} onChange={handleInputChange} className={`w-full pl-7 pr-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.balance ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., -500" />
              </div>
              {errors.balance && <p className="text-xs text-red-500 mt-1">{errors.balance}</p>}
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Expiry Date</label>
              <input type="text" name="expiry" value={currentAccount.expiry} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.expiry ? 'border-red-500' : 'border-slate-200'}`} placeholder="MM/YY" />
              {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
            </div>
          </>
        );
      case 'Loan':
         return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Loan Name</label>
              <input type="text" name="name" value={currentAccount.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Car Loan" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Lender</label>
              <input type="text" name="institution" value={currentAccount.institution} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.institution ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Bank of America" />
              {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Remaining Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input type="number" name="balance" value={currentAccount.balance} onChange={handleInputChange} className={`w-full pl-7 pr-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.balance ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., -15000" />
              </div>
              {errors.balance && <p className="text-xs text-red-500 mt-1">{errors.balance}</p>}
            </div>
          </>
        );
      case 'Investment':
         return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Investment Name</label>
              <input type="text" name="name" value={currentAccount.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., VTSAX Index Fund" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Brokerage</label>
              <input type="text" name="institution" value={currentAccount.institution} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.institution ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., Vanguard" />
              {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Current Value</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input type="number" name="balance" value={currentAccount.balance} onChange={handleInputChange} className={`w-full pl-7 pr-3 py-2 border rounded-lg transition-colors bg-transparent ${errors.balance ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., 25000" />
              </div>
              {errors.balance && <p className="text-xs text-red-500 mt-1">{errors.balance}</p>}
            </div>
          </>
        );
      default: // Bank accounts (Cash, Debit, Savings)
        return commonFields;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">{account ? 'Edit' : 'Add'} {accountType} Account</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {renderFields()}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Theme Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTE.map(color => (
                <div 
                  key={color}
                  onClick={() => setCurrentAccount(prev => ({ ...prev, colorTheme: color }))}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${currentAccount.colorTheme === color ? 'border-violet-500' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={handleSaveAccount} 
            disabled={Object.keys(validate()).length > 0}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            Save Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditAccountModal;