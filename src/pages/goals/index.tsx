import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import AddEditGoalModal from "@/pages/goals/AddEditGoalModal";
import Header from "@/shared/layout/Header";
import { MOCK_GOALS } from "@/shared/data/constants";
import type { Goal } from "@/shared/types/types";
import AddGoalPlaceholderCard from "./AddGoalPlaceholderCard";
import GoalCard from "./GoalCard";

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
    <div className="container">
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

        <AddGoalPlaceholderCard openAddModal={openAddModal} />
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
