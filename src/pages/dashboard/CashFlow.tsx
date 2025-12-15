import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type React from "react";

const CashFlow: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-lg font-bold text-slate-700 dark:text-white">
        Cash Flow
      </h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-700/30 dark:text-green-400">
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
            <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-700/30 dark:text-red-400">
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
              <span className="text-slate-500 dark:text-slate-400">Coffee</span>
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
              <span className="text-slate-700 dark:text-slate-300">Total</span>
              <span className="text-900 dark:text-white">$17.40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
