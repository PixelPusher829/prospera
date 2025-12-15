import { TrendingUp } from "lucide-react";
import type React from "react";
import { INVESTMENT_CATEGORIES } from "@/shared/data/constants";
import type { Account } from "@/shared/types/types";

interface InvestmentRowProps {
  account: Account;
  onEdit: (account: Account) => void;
}

const InvestmentRow: React.FC<InvestmentRowProps> = ({ account, onEdit }) => {
  const category = account.investmentCategory
    ? INVESTMENT_CATEGORIES.find(
        (cat) => cat.value === account.investmentCategory,
      )
    : null;

  const IconComponent = category?.icon || TrendingUp;
  const iconBgClass = category?.iconBgClass || "bg-slate-100";
  const iconTextColorClass = category?.iconTextColorClass || "text-slate-600";

  return (
    <div
      onClick={() => onEdit(account)}
      className="cursor-pointer rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-violet-200 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none dark:hover:border-violet-800"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-2xl p-3 ${iconBgClass} ${iconTextColorClass}`}>
          <IconComponent size={24} />
        </div>
        <span className="rounded-lg bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-700/30 dark:text-green-400">
          +12.5%
        </span>
      </div>
      <h4 className="text-lg font-bold text-slate-700 dark:text-white">
        {account.name}
      </h4>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {account.institution}
      </p>
      <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
        <p className="mb-1 text-xs text-slate-400 dark:text-slate-500">
          Total Value
        </p>
        <p className="text-2xl font-bold text-slate-700 dark:text-white">
          {account.currency === "BTC" ? "₿" : "$"}
          {account.balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default InvestmentRow;
