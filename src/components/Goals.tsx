import React, { useState } from 'react';
import { Plus, Target, Calendar, Car, Plane, Laptop, MoreVertical } from 'lucide-react';
import { MOCK_GOALS } from '../data/constants';
import { Goal } from '../types';
import AddEditGoalModal from './AddEditGoalModal';

const GoalCard: React.FC<{ goal: Goal, onEdit: (goal: Goal) => void }> = ({ goal, onEdit }) => {
  const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remaining = goal.targetAmount - goal.currentAmount;
  
  // Simple estimation logic: assume saving $500/month if not specified (mock)
  const monthlyContribution = 500;
  const monthsLeft = Math.ceil(remaining / monthlyContribution);

  const getIcon = () => {
     switch(goal.icon) {
        case 'car': return <Car size={24} />;
        case 'plane': return <Plane size={24} />;
        case 'laptop': return <Laptop size={24} />;
        default: return <Target size={24} />;
     }
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
       <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
             <div className="p-4 rounded-2xl" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                {getIcon()}
             </div>
             <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{goal.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                   <Calendar size={12} />
                   Target: {goal.deadline}
                </div>
             </div>
          </div>
          <button 
            onClick={() => onEdit(goal)}
            className="text-slate-300 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white"
          >
             <MoreVertical size={20} />
          </button>
       </div>

       <div className="mb-2 flex justify-between items-end">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">${goal.currentAmount.toLocaleString()}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">of ${goal.targetAmount.toLocaleString()}</span>
       </div>

       {/* Progress Bar */}
       <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${percentage}%`, backgroundColor: goal.color }}
          ></div>
       </div>

       <div className="flex justify-between items-center text-sm">
          <span className="font-bold" style={{ color: goal.color }}>{percentage}%</span>
          {remaining > 0 ? (
             <span className="text-slate-400 dark:text-slate-500">~{monthsLeft} months to go</span>
          ) : (
             <span className="text-green-600 font-bold">Goal Reached!</span>
          )}
       </div>
    </div>
  );
};

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls both add/edit modal
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null); // For editing

  const handleSaveGoal = (savedGoal: Goal) => {
    if (savedGoal.id && goals.some(g => g.id === savedGoal.id)) {
      // Update existing goal
      setGoals(prev => prev.map(g => g.id === savedGoal.id ? savedGoal : g));
    } else {
      // Add new goal
      setGoals(prev => [savedGoal, ...prev]);
    }
  };

  const openAddModal = () => {
    setSelectedGoal(null); // Clear selected goal for add mode
    setIsModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Goals</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your savings targets</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200"
        >
          <Plus size={18} />
          Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onEdit={openEditModal} />
         ))}
         
         {/* Add New Placeholder Card */}
         <div 
           onClick={openAddModal}
           className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 hover:text-violet-600 transition-all cursor-pointer min-h-[250px]"
         >
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Plus size={32} />
            </div>
            <span className="font-medium">Add another goal</span>
         </div>
      </div>
      <AddEditGoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveGoal={handleSaveGoal}
        goal={selectedGoal}
      />
    </div>
  );
};

export default Goals;