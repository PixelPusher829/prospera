import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, ArrowDownUp, ChevronLeft, ChevronRight, X } from 'lucide-react'; // Import X for bulk actions
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from '../data/constants';
import { Transaction } from "../types/types";
import AddEditTransactionModal from './AddEditTransactionModal';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedAccountTypeFilter, setSelectedAccountTypeFilter] = useState<AccountType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [sortField, setSortField] = useState<keyof Transaction | null>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'cleared' | 'pending'>('all');
  const [isCustomFilterOpen, setIsCustomFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const categories = new Set(MOCK_TRANSACTIONS.map(t => t.category));
    return Array.from(categories);
  }, [transactions]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<Set<string>>(new Set()); // New state for bulk actions

  const handleSaveTransaction = (savedTransaction: Transaction) => {
    if (savedTransaction.id && transactions.some(t => t.id === savedTransaction.id)) {
      setTransactions(prev => prev.map(t => t.id === savedTransaction.id ? savedTransaction : t));
    } else {
      setTransactions(prev => [savedTransaction, ...prev]);
    }
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const openAddModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAndFilteredTransactions = useMemo(() => {
    let currentTransactions = transactions.filter(t => {
      const matchesSearch = t.payee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = transactionTypeFilter === 'all' || t.type === transactionTypeFilter;
      const account = MOCK_ACCOUNTS.find(a => a.id === t.accountId);
      const matchesAccountType = selectedAccountTypeFilter === 'all' || account?.type === selectedAccountTypeFilter;
      const matchesDate = (!startDate || new Date(t.date) >= new Date(startDate)) && (!endDate || new Date(t.date) <= new Date(endDate));
      const matchesAmount = (!minAmount || t.amount >= parseFloat(minAmount)) && (!maxAmount || t.amount <= parseFloat(maxAmount));
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(t.category);
      return matchesSearch && matchesType && matchesAccountType && matchesDate && matchesAmount && matchesStatus && matchesCategory;
    });

    if (sortField) {
      currentTransactions.sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Special handling for date strings to ensure correct sorting
          if (sortField === 'date') {
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
          }
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        if (sortField === 'accountType') {
          aValue = MOCK_ACCOUNTS.find(acc => acc.id === a.accountId)?.type || '';
          bValue = MOCK_ACCOUNTS.find(acc => acc.id === b.accountId)?.type || '';
          return sortDirection === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
        }
        return 0;
      });
    }

    return currentTransactions;
  }, [transactions, searchTerm, transactionTypeFilter, selectedAccountTypeFilter, sortField, sortDirection, startDate, endDate, minAmount, maxAmount, statusFilter, selectedCategories]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAndFilteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Bulk actions logic
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedTransactionIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransactionIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedTransactionIds.size === currentItems.length && currentItems.length > 0) {
      setSelectedTransactionIds(new Set());
    } else {
      setSelectedTransactionIds(new Set(currentItems.map(t => t.id)));
    }
  };

  const handleBulkCategoryAssign = (newCategory: string) => {
    setTransactions(prev => prev.map(t => 
      selectedTransactionIds.has(t.id) ? { ...t, category: newCategory } : t
    ));
    setSelectedTransactionIds(new Set()); // Clear selection after action
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Record and categorize your spending</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search payee or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm text-slate-700 dark:text-white"
            />
         </div>
         <div className="flex gap-2">
            <select 
              value={transactionTypeFilter}
              onChange={(e) => setTransactionTypeFilter(e.target.value as any)}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm text-slate-600 dark:text-slate-300"
            >
              <option value="all">All Transaction Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {/* Account Type Filter */}
            <select
              value={selectedAccountTypeFilter}
              onChange={(e) => setSelectedAccountTypeFilter(e.target.value as AccountType | 'all')}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm text-slate-600 dark:text-slate-300"
            >
              <option value="all">All Account Types</option>
              <option value="Cash">Cash</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
              <option value="Savings">Savings</option>
              <option value="Loan">Loan</option>
              <option value="Investment">Investment</option>
            </select>
            <div className="relative">
              <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
                 <Calendar size={18} />
              </button>
              {isDatePickerOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 z-10 w-60">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Start Date</label>
                      <input type="date" value={startDate || ''} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">End Date</label>
                      <input type="date" value={endDate || ''} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm" />
                    </div>
                    <button
                      onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                      }}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setIsCustomFilterOpen(!isCustomFilterOpen)} className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
                 <Filter size={18} />
              </button>
              {isCustomFilterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 z-10 w-60">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Min Amount</label>
                      <input type="number" value={minAmount} onChange={e => setMinAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm" placeholder="e.g., 10" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Max Amount</label>
                      <input type="number" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm" placeholder="e.g., 500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Status</label>
                      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as 'all' | 'cleared' | 'pending')} className="w-full px-3 py-2 border rounded-lg bg-white border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm">
                        <option value="all">All Statuses</option>
                        <option value="cleared">Cleared</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Categories</label>
                      <div className="max-h-32 overflow-y-auto border border-slate-200 dark:border-slate-600 rounded-lg p-2">
                        {allCategories.map(category => (
                          <div key={category} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`category-${category}`}
                              value={category}
                              checked={selectedCategories.includes(category)}
                              onChange={e => {
                                if (e.target.checked) {
                                  setSelectedCategories([...selectedCategories, category]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                            />
                            <label htmlFor={`category-${category}`} className="text-sm text-slate-600 dark:text-slate-300">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMinAmount('');
                        setMaxAmount('');
                        setStatusFilter('all');
                        setSelectedCategories([]);
                      }}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
         </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedTransactionIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6 z-10 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{selectedTransactionIds.size} selected</span>
          <div className="h-4 w-px bg-slate-700 dark:bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => handleBulkCategoryAssign(e.target.value)}
              value="" // Controlled component, reset after selection
              className="bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Bulk Assign Category</option>
              {/* This should be a list of available categories */}
              {Array.from(new Set(transactions.map(t => t.category))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setSelectedTransactionIds(new Set())} className="ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                <th className="py-4 px-6 w-12">
                   <input 
                    type="checkbox" 
                    checked={selectedTransactionIds.size === currentItems.length && currentItems.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500"
                   />
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">
                    Date {sortField === 'date' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('payee')}>
                  <div className="flex items-center gap-1">
                    Payee {sortField === 'payee' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1">
                    Category {sortField === 'category' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('accountType')}>
                  <div className="flex items-center gap-1">
                    Account Type {sortField === 'accountType' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right cursor-pointer hover:text-slate-700" onClick={() => handleSort('amount')}>
                  <div className="flex items-center justify-end gap-1">
                    Amount {sortField === 'amount' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center cursor-pointer hover:text-slate-700" onClick={() => handleSort('status')}>
                  <div className="flex items-center justify-center gap-1">
                    Status {sortField === 'status' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {currentItems.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="py-4 px-6">
                    <input 
                      type="checkbox" 
                      checked={selectedTransactionIds.has(t.id)}
                      onChange={() => toggleSelection(t.id)}
                      onClick={(e) => e.stopPropagation()} // Prevent row click from opening edit modal
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500"
                    />
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 font-medium tabular-nums">{t.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                          {t.type === 'income' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                       </div>
                       <span className="text-slate-700 dark:text-white font-medium text-sm">{t.payee}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-600">
                       {t.category}
                     </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{MOCK_ACCOUNTS.find(a => a.id === t.accountId)?.type}</td>
                  <td className={`py-4 px-6 text-right font-bold text-sm ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {t.status === 'cleared' ? (
                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" title="Cleared">
                         <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span> Cleared
                       </span>
                    ) : (
                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium" title="Pending">
                         <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span> Pending
                       </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                     <button 
                        onClick={() => openEditModal(t)}
                        className="text-slate-300 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <MoreHorizontal size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="p-4 flex justify-between items-center bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <AddEditTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveTransaction={handleSaveTransaction}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;