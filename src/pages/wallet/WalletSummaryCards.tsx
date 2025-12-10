import {
	ArrowUpRight,
	ShieldCheck,
	TrendingUp,
	Wallet as WalletIcon,
} from "lucide-react";
import type React from "react";

interface WalletSummaryCardsProps {
	netWorth: number;
	totalAssets: number;
	totalLiabilities: number;
}

const WalletSummaryCards: React.FC<WalletSummaryCardsProps> = ({
	netWorth,
	totalAssets,
	totalLiabilities,
}) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
			{/* Net Worth */}
			<div className="relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white">
				<div className="absolute top-0 right-0 p-8 opacity-10">
					<WalletIcon size={80} />
				</div>
				<div>
					<p className="mb-1 font-medium text-slate-400 dark:text-violet-200">
						Net Worth
					</p>
					<h2 className="text-3xl font-bold text-white">
						${netWorth.toLocaleString()}
					</h2>
				</div>
				<div className="flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-md">
					<ArrowUpRight size={16} className="text-green-400" />
					<span>+2.4% vs last month</span>
				</div>
			</div>

			{/* Total Assets */}
			<div className="flex min-h-[160px] flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
				<div className="mb-2 flex items-center gap-3">
					<div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
						<TrendingUp size={20} />
					</div>
					<span className="font-semibold text-slate-700 dark:text-white">
						Total Assets
					</span>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-emerald-600">
						${totalAssets.toLocaleString()}
					</h2>
					<p className="mt-1 text-xs text-slate-400 dark:text-slate-300">
						Cash, Savings, Investments
					</p>
				</div>
			</div>

			{/* Total Liabilities */}
			<div className="flex min-h-[160px] flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
				<div className="mb-2 flex items-center gap-3">
					<div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-400">
						<ShieldCheck size={20} />
					</div>
					<span className="font-semibold text-slate-700 dark:text-white">
						Total Debts
					</span>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-red-600">
						${totalLiabilities.toLocaleString()}
					</h2>
					<p className="mt-1 text-xs text-slate-400 dark:text-slate-300">
						Credit Cards, Loans
					</p>
				</div>
			</div>
		</div>
	);
};

export default WalletSummaryCards;
