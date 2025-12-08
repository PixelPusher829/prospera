import React, { useState, useEffect } from 'react';
import { X, Save, Target, DollarSign, Calendar } from 'lucide-react';
import { Goal } from '../types/types';
import { COLOR_PALETTE } from '../data/constants';

interface AddEditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGoal: (goal: Goal) => void;
  goal: Goal | null; // Optional: goal to be edited
}

const AddEditGoalModal: React.FC<AddEditGoalModalProps> = ({ isOpen, onClose, onSaveGoal, goal }) => {
  const [currentGoal, setCurrentGoal] = useState<Omit<Goal, 'id' | 'icon'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    color: '#6d28d9', // Default color
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (goal) {
        // Populate form with existing goal data for editing
        setCurrentGoal({
          name: goal.name,
          targetAmount: goal.targetAmount,
          currentAmount: goal.currentAmount,
          deadline: goal.deadline,
          color: goal.color,
        });
      } else {
        // Reset form for adding a new goal
        setCurrentGoal({
          name: '',
          targetAmount: 0,
          currentAmount: 0,
          deadline: '',
          color: COLOR_PALETTE[0], // Default to first color in palette
        });
      }
      setErrors({}); // Clear errors when modal opens
    }
  }, [isOpen, goal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentGoal(prev => ({ ...prev, [name]: (name === 'targetAmount' || name === 'currentAmount') ? parseFloat(value) || 0 : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentGoal.name.trim()) newErrors.name = 'Goal name is required.';
    if (currentGoal.targetAmount <= 0) newErrors.targetAmount = 'Target amount must be positive.';
    if (!currentGoal.deadline) newErrors.deadline = 'Deadline is required.';
    return newErrors;
  }

  const handleSaveGoal = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const goalToSave: Goal = {
      id: goal ? goal.id : new Date().toISOString(), // Use existing ID if editing, new ID if adding
      name: currentGoal.name,
      targetAmount: currentGoal.targetAmount,
      currentAmount: currentGoal.currentAmount,
      deadline: currentGoal.deadline,
      icon: goal ? goal.icon : 'target', // Keep existing icon if editing, default if adding
      color: currentGoal.color,
    };

    onSaveGoal(goalToSave);
    onClose();
    // No need to reset currentGoal here, as useEffect handles it on modal open/goal change
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">{goal ? 'Edit Goal' : 'Create New Goal'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Goal Name</label>
            <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all ${errors.name ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500'}`}>
              <Target size={18} className="text-slate-400" />
              <input type="text" name="name" value={currentGoal.name} onChange={handleInputChange} className="w-full outline-none bg-transparent" placeholder="e.g., New Car Fund" />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Target Amount</label>
              <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all ${errors.targetAmount ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500'}`}>
                <DollarSign size={18} className="text-slate-400" />
                <input type="number" name="targetAmount" value={currentGoal.targetAmount} onChange={handleInputChange} className="w-full outline-none bg-transparent" placeholder="20000" />
              </div>
              {errors.targetAmount && <p className="text-xs text-red-500 mt-1">{errors.targetAmount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Current Amount</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-lg border-slate-200 focus-within:ring-2 focus-within:ring-violet-500">
                <DollarSign size={18} className="text-slate-400" />
                <input type="number" name="currentAmount" value={currentGoal.currentAmount} onChange={handleInputChange} className="w-full outline-none bg-transparent" placeholder="5000" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Deadline</label>
            <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all ${errors.deadline ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500'}`}>
              <Calendar size={18} className="text-slate-400" />
              <input type="date" name="deadline" value={currentGoal.deadline} onChange={handleInputChange} className="w-full outline-none bg-transparent" />
            </div>
            {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTE.map(color => (
                <div 
                  key={color}
                  onClick={() => setCurrentGoal(prev => ({ ...prev, color: color }))}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${currentGoal.color === color ? 'border-violet-500' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={handleSaveGoal} 
            disabled={Object.keys(validate()).length > 0}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium transition-all disabled:bg-violet-400 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditGoalModal;