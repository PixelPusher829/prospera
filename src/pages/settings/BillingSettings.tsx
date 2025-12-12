import { CreditCard } from "lucide-react";
import type React from "react";
import Button from "@/shared/components/Button"; // Import Button component

const BillingSettings: React.FC = () => {
	return (
		<div className="py-10 text-center">
			<CreditCard
				size={48}
				className="mx-auto mb-4 text-slate-300 dark:text-slate-600"
			/>
			<h3 className="text-lg font-bold text-slate-700 dark:text-white">
				Payment Method
			</h3>
			<p className="mb-6 text-slate-500 dark:text-slate-400">
				Manage your subscription and billing details
			</p>
			<Button variant="primary">Add Payment Method</Button>
		</div>
	);
};

export default BillingSettings;
