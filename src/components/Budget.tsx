import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { MOCK_BUDGET } from '../data/constants';
import { BudgetCategory } from '../types/types';
import EditBudgetModal from './EditBudgetModal';

const Budget: React.FC = () => {
  const [budget, setBudget] = useState<BudgetCategory[]>(MOCK_BUDGET);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const totalBudget = budget.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budget.reduce((acc, curr) => acc + curr.spent, 0);

  const handleSaveBudget = (updatedBudget: BudgetCategory[]) => {
    setBudget(updatedBudget);
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">Monthly Budget</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Keep your spending in check</p>
        </div>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200"
        >
          <Plus size={18} />
          Edit Budget
        </button>
      </div>

      {/* Summary Header */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white p-8 rounded-3xl mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <p className="text-slate-400 dark:text-slate-300 font-medium mb-1">Total Spent</p>
                  <h2 className="text-4xl font-bold text-white">${totalSpent.toLocaleString()}</h2>
               </div>
               <div className="text-right">
                  <p className="text-slate-400 dark:text-slate-300 font-medium mb-1">Total Budget</p>
                  <p className="text-xl font-semibold text-white">${totalBudget.toLocaleString()}</p>
               </div>
            </div>
            {/* Master Progress */}
            <div className="w-full bg-white/10 dark:bg-white/20 h-4 rounded-full overflow-hidden">
               <div 
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" 
                  style={{ width: `${Math.min(100, (totalSpent/totalBudget)*100)}%` }}
               ></div>
            </div>
            <div className="mt-2 text-right text-sm text-slate-400 dark:text-slate-300">
               {Math.round((totalSpent/totalBudget)*100)}% used
            </div>
         </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {budget.map(item => {
            const Icon = item.icon;
            const percentage = Math.round((item.spent / item.limit) * 100);
            const isOver = percentage > 100;

            return (
               <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <div 
                          className="p-3 rounded-2xl"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                           <Icon size={24} />
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-700 dark:text-white">{item.name}</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Limit: ${item.limit}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className={`text-xl font-bold ${isOver ? 'text-red-500' : 'text-slate-700 dark:text-white'}`}>
                           ${item.spent}
                        </span>
                     </div>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                     <div 
                        className={`h-full rounded-full ${isOver ? 'bg-red-500' : ''}`}
                        style={{ 
                           width: `${Math.min(100, percentage)}%`,
                           backgroundColor: isOver ? undefined : item.color
                        }}
                     ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-medium">
                     <span style={{ color: isOver ? '#ef4444' : item.color }}>{percentage}%</span>
                     <span className="text-slate-400 dark:text-slate-500">
                        {isOver ? (
                           <span className="flex items-center gap-1 text-red-500">
                              <AlertCircle size={12} /> Over budget
                           </span>
                        ) : (
                           `$${item.limit - item.spent} left`
                        )}
                     </span>
                  </div>
               </div>
            );
         })}
      </div>
      <EditBudgetModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveBudget}
        initialBudget={budget}
      />
    </div>
  );
};

export default Budget;