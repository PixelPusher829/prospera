import { LayoutGrid } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Header from "@/shared/layout/Header";
import {
  BALANCE_HISTORY,
  EXPENSE_STATS,
  MOCK_SUMMARY,
} from "@/shared/data/constants";
import { getFinancialAdvice } from "@/shared/services/geminiService";
import AiAdvisor from "./AiAdvisor";
import BalanceOverview from "./BalanceOverview";
import BudgetComparison from "./BudgetComparison";
import ExpenseStatistics from "./ExpenseStatistics";
import StatCard from "./StatCard";

const Analytics: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState<boolean>(false);

  const generateInsight = async () => {
    setLoadingInsight(true);
    const advice = await getFinancialAdvice(
      MOCK_SUMMARY,
      EXPENSE_STATS,
      BALANCE_HISTORY,
    );
    setInsight(advice);
    setLoadingInsight(false);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <Header
        heading="Analytics"
        subheading="Deep dive into financial trends and AI insights"
      >
        {" "}
        <button
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          type="button"
        >
          <LayoutGrid size={18} />
          Export Report
        </button>
      </Header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total balance"
          amount={MOCK_SUMMARY.balance}
          growth={MOCK_SUMMARY.balanceGrowth}
          transactions={50}
          categories={15}
          comparisonText={
            <>
              You have extra{" "}
              <span className="font-semibold text-green-600">$1,700</span>{" "}
              compared to last month
            </>
          }
        />
        <StatCard
          title="Income"
          amount={MOCK_SUMMARY.income}
          growth={MOCK_SUMMARY.incomeGrowth}
          transactions={27}
          categories={6}
          comparisonText={
            <>
              You earned extra{" "}
              <span className="font-semibold text-green-600">$500</span>{" "}
              compared to last month
            </>
          }
        />
        <StatCard
          title="Expense"
          amount={MOCK_SUMMARY.expense}
          growth={MOCK_SUMMARY.expenseGrowth}
          transactions={23}
          categories={9}
          isExpense
          comparisonText={
            <>
              You spent extra{" "}
              <span className="font-semibold text-red-600">$1,222</span>{" "}
              compared to last month
            </>
          }
        />
      </div>

      {/* Charts Section 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BalanceOverview />
        <ExpenseStatistics />
      </div>

      {/* Charts Section 2 & AI */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BudgetComparison />
        <AiAdvisor
          insight={insight}
          loadingInsight={loadingInsight}
          generateInsight={generateInsight}
        />
      </div>
    </div>
  );
};

export default Analytics;
