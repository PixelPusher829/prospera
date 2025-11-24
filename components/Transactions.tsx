import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

  // Simple add handler (mock)
  const handleAdd = () => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      payee: 'New Transaction',
      category: 'Uncategorized',
      amount: 0,
      type: 'expense',
      accountId: '1',
      status: 'pending'
    };
    setTransactions([newTx, ...transactions]);
  };

  const filtered = transactions.filter(t => {
    const matchesSearch = t.payee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500 mt-1">Record and categorize your spending</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium text-sm transition-all shadow-lg shadow-violet-200"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search payee or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm"
            />
         </div>
         <div className="flex gap-2">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm text-slate-600"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800">
               <Calendar size={18} />
            </button>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800">
               <Filter size={18} />
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payee</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-500 font-medium tabular-nums">{t.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                          {t.type === 'income' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                       </div>
                       <span className="text-slate-900 font-medium text-sm">{t.payee}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                       {t.category}
                     </span>
                  </td>
                  <td className={`py-4 px-6 text-right font-bold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {t.status === 'cleared' ? (
                       <span className="inline-block w-2 h-2 rounded-full bg-green-500" title="Cleared"></span>
                    ) : (
                       <span className="inline-block w-2 h-2 rounded-full bg-amber-400" title="Pending"></span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                     <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;