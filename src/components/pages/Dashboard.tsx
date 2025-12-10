import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle,
  CreditCard,
  DollarSign,
  Plus,
  Target,
  Wallet,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { MOCK_GOALS, MOCK_SUMMARY, MOCK_TRANSACTIONS } from "@/data/constants";
import AddEditTransactionModal from "@/components/utils/AddEditTransactionModal";

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({
  setActiveTab,
}) => {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
      {/* Welcome Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">
            Good Morning, James!
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Here is your financial health check for today.
          </p>
        </div>
        <button
          onClick={() => setIsAddTransactionModalOpen(true)}
          className="bg-violet-600 flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 dark:shadow-none"
        >
          <Plus size={18} />
          Quick Add Transaction
        </button>
      </div>

      {/* Hero Cards - Net Worth & Safe to Spend */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Net Worth */}
        <div className="group relative flex h-48 flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl dark:bg-violet-900/20">
          <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
            <Wallet size={100} />
          </div>
          <div className="z-10">
            <p className="mb-1 font-medium text-slate-400 dark:text-violet-200">
              Total Net Worth
            </p>
            <h2 className="text-3xl font-bold text-white">$54,710.50</h2>
          </div>
          <div className="z-10 flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-md">
            <ArrowUpRight size={16} className="text-green-400" />
            <span className="text-slate-200">+2.4% this month</span>
          </div>
        </div>

        {/* Monthly Budget Left */}
        <div
          className="flex h-48 cursor-pointer flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-green-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-green-700"
          onClick={() => setActiveTab("budget")}
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <DollarSign size={18} />
              </div>
              <span className="font-semibold text-slate-700 dark:text-white">
                Safe to Spend
              </span>
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <h3 className="font-bold text-slate-700 dark:text-white">
                  Monthly Budget
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target: $1,000.00
                </p>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                38%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "38%" }}
              ></div>
            </div>
          </div>
        </div>
        {/* Active Goals Summary */}
        <div
          className="flex h-48 cursor-pointer flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-violet-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-violet-700"
          onClick={() => setActiveTab("goals")}
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-full bg-violet-100 p-2 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                <Target size={18} />
              </div>
              <span className="font-semibold text-slate-700 dark:text-white">
                Top Goal
              </span>
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <h3 className="font-bold text-slate-700 dark:text-white">
                  {MOCK_GOALS[0].name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target: ${MOCK_GOALS[0].targetAmount.toLocaleString()}
                </p>
              </div>
              <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                34%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-violet-600 dark:bg-violet-500"
                style={{ width: "34%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Alerts / Notifications */}

        <div className="flex h-48 flex-col overflow-y-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Bell size={18} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-white">
              Notifications
            </span>
          </div>
          <div className="flex flex-grow flex-col justify-end">
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500"></div>
                <p className="text-slate-600 dark:text-slate-300">
                  Bill due tomorrow:{" "}
                  <span className="font-semibold text-slate-700 dark:text-white">
                    Internet ($80)
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"></div>
                <p className="text-slate-600 dark:text-slate-300">
                  Salary of{" "}
                  <span className="font-semibold text-slate-700 dark:text-white">
                    $4,200
                  </span>{" "}
                  received.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Transactions List */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-700 dark:text-white">
              Recent Transactions
            </h3>
            <button
              onClick={() => setActiveTab("transactions")}
              className="text-sm font-medium text-pink-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {MOCK_TRANSACTIONS.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full p-3 ${
                      t.type === "income"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {t.type === "income" ? (
                      <ArrowDownRight size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-white">
                      {t.payee}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.date} • {t.category}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-700 dark:text-white"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Breakdown Mini */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-6 text-lg font-bold text-slate-700 dark:text-white">
            Cash Flow
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowDownRight size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Income
                  </p>
                  <p className="font-bold text-slate-700 dark:text-white">
                    $8,500.00
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100 dark:bg-slate-700"></div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Expense
                  </p>
                  <p className="font-bold text-slate-700 dark:text-white">
                    $6,222.00
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 dark:border-slate-700">
              <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-white">
                Today's Spending
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Coffee
                  </span>
                  <span className="font-medium text-slate-700 dark:text-white">
                    $5.40
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Transport
                  </span>
                  <span className="font-medium text-slate-700 dark:text-white">
                    $12.00
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-bold dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300">
                    Total
                  </span>
                  <span className="text-900 dark:text-white">$17.40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEditTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
