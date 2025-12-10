import {
  Calendar,
  Car,
  Laptop,
  MoreVertical,
  Plane,
  Plus,
  Target,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { MOCK_GOALS } from "@/shared/data/constants";
import AddEditGoalModal from "@/pages/goals/AddEditGoalModal";
import Header from "@/shared/components/layout/Header";

const GoalCard: React.FC<{ goal: Goal; onEdit: (goal: Goal) => void }> = ({
  goal,
  onEdit,
}) => {
  const percentage = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
  );
  const remaining = goal.targetAmount - goal.currentAmount;

  // Simple estimation logic: assume saving $500/month if not specified (mock)
  const monthlyContribution = 500;
  const monthsLeft = Math.ceil(remaining / monthlyContribution);

  const getIcon = () => {
    switch (goal.icon) {
      case "car":
        return <Car size={24} />;
      case "plane":
        return <Plane size={24} />;
      case "laptop":
        return <Laptop size={24} />;
      default:
        return <Target size={24} />;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
          >
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-white">
              {goal.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar size={12} />
              Target: {goal.deadline}
            </div>
          </div>
        </div>
        <button
          onClick={() => onEdit(goal)}
          className="text-slate-300 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span className="text-3xl font-bold text-slate-700 dark:text-white">
          ${goal.currentAmount.toLocaleString()}
        </span>
        <span className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          of ${goal.targetAmount.toLocaleString()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: goal.color }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-bold" style={{ color: goal.color }}>
          {percentage}%
        </span>
        {remaining > 0 ? (
          <span className="text-slate-400 dark:text-slate-500">
            ~{monthsLeft} months to go
          </span>
        ) : (
          <span className="font-bold text-green-600">Goal Reached!</span>
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
    if (savedGoal.id && goals.some((g) => g.id === savedGoal.id)) {
      // Update existing goal
      setGoals((prev) =>
        prev.map((g) => (g.id === savedGoal.id ? savedGoal : g)),
      );
    } else {
      // Add new goal
      setGoals((prev) => [savedGoal, ...prev]);
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
    <div className="mx-auto min-h-full max-w-[1600px] p-6 lg:p-10">
      <Header
        heading="Financial Goals"
        subheading="Track your savings targets"
        className="mb-10"
      >
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
        >
          <Plus size={18} />
          Create New Goal
        </button>
      </Header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onEdit={openEditModal} />
        ))}

        {/* Add New Placeholder Card */}
        <div
          onClick={openAddModal}
          className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-6 text-slate-400 transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-violet-900/10"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
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
