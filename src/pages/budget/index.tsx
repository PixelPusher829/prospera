import { AlertCircle, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { MOCK_BUDGET } from "@/shared/data/constants";
import type { BudgetCategory } from "@/shared/types/types";
import EditBudgetModal from "@/pages/budget/EditBudgetModal";
import Header from "@/shared/components/layout/Header";

const Budget: React.FC = () => {
  const [budget, setBudget] = useState<BudgetCategory[]>(MOCK_BUDGET);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const totalBudget = budget.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budget.reduce((acc, curr) => acc + curr.spent, 0);

  const handleSaveBudget = (updatedBudget: BudgetCategory[]) => {
    setBudget(updatedBudget);
  };

  return (
    <div className="mx-auto min-h-full max-w-[1600px] p-6 lg:p-10">
      <Header heading="Monthly Budget" subheading="Keep your spending in check" className="mb-10">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
          type="button"
        >
          <Plus size={18} />
          Edit Budget
        </button>
      </Header>


      {/* Summary Header */}
      <div className="mb-10 flex flex-col items-center justify-between gap-8 rounded-3xl bg-slate-900 p-8 text-white md:flex-row dark:bg-slate-800">
        <div className="w-full flex-1">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="mb-1 font-medium text-slate-400 dark:text-slate-300">
                Total Spent
              </p>
              <h2 className="text-4xl font-bold text-white">
                ${totalSpent.toLocaleString()}
              </h2>
            </div>
            <div className="text-right">
              <p className="mb-1 font-medium text-slate-400 dark:text-slate-300">
                Total Budget
              </p>
              <p className="text-xl font-semibold text-white">
                ${totalBudget.toLocaleString()}
              </p>
            </div>
          </div>
          {/* Master Progress */}
          <div className="h-4 w-full overflow-hidden rounded-full bg-white/10 dark:bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
              style={{
                width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 text-right text-sm text-slate-400 dark:text-slate-300">
            {Math.round((totalSpent / totalBudget) * 100)}% used
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {budget.map((item) => {
          const Icon = item.icon;
          const percentage = Math.round((item.spent / item.limit) * 100);
          const isOver = percentage > 100;

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-2xl p-3"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Limit: ${item.limit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xl font-bold ${isOver ? "text-red-500" : "text-slate-700 dark:text-white"}`}
                  >
                    ${item.spent}
                  </span>
                </div>
              </div>

              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full ${isOver ? "bg-red-500" : ""}`}
                  style={{
                    width: `${Math.min(100, percentage)}%`,
                    backgroundColor: isOver ? undefined : item.color,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
                <span style={{ color: isOver ? "#ef4444" : item.color }}>
                  {percentage}%
                </span>
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
