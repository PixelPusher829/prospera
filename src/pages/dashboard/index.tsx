import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import AddEditTransactionModal from "@/pages/transactions/AddEditTransactionModal";
import Button from "@/shared/components/Button"; // Import Button component
import { MOCK_GOALS } from "@/shared/data/constants";
import Header from "@/shared/layout/Header";
import CashFlow from "./CashFlow";
import HeroCard from "./HeroCard";
import Notifications from "./Notifications";
import RecentTransactions from "./RecentTransactions";

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({
  setActiveTab,
}) => {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);

  return (
    <div className="@container container">
      {/* Welcome Section */}
      <Header
        heading="Good Morning, James!"
        subheading="Here is your financial health check for today."
      >
        <Button
          variant="primary"
          onClick={() => setIsAddTransactionModalOpen(true)}
          icon={<Plus size={18} />}
        >
          Quick Add Transaction
        </Button>
      </Header>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-2 @4xl:grid-cols-4">
        <HeroCard
          type="primary"
          title="Total Net Worth"
          value="$54,710.50"
          percentage="+2.4% this month"
          icon="wallet"
        />
        <HeroCard
          type="secondary"
          title="Safe to Spend"
          value="Monthly Budget"
          percentage="38%"
          progress={38}
          icon="dollar"
          onClick={() => setActiveTab("budget")}
        />
        <HeroCard
          type="secondary"
          title="Top Goal"
          value={MOCK_GOALS[0].name}
          percentage="34%"
          progress={34}
          icon="target"
          onClick={() => setActiveTab("goals")}
        />
        <Notifications />
      </div>

      <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
        {" "}
        <RecentTransactions setActiveTab={setActiveTab} />
        <CashFlow />
      </div>
      <AddEditTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
