import { ArrowUpRight, DollarSign, Target, Wallet } from "lucide-react";
import type React from "react";

interface HeroCardProps {
	title: string;
	value: string;
	percentage?: string;
	progress?: number;
	icon: "wallet" | "dollar" | "target";
	onClick?: () => void;
	type: "primary" | "secondary";
}

const ICONS = {
	wallet: Wallet,
	dollar: DollarSign,
	target: Target,
};

const HeroCard: React.FC<HeroCardProps> = ({
	title,
	value,
	percentage,
	progress,
	icon,
	onClick,
	type,
}) => {
	const Icon = ICONS[icon];

	if (type === "primary") {
		return (
			<div className="group relative flex h-48 flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl dark:bg-violet-900/20">
				<div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
					<Icon size={100} />
				</div>
				<div className="z-10">
					<p className="mb-1 font-medium text-slate-400 dark:text-violet-200">
						{title}
					</p>
					<h2 className="text-2xl @[200px]:text-3xl font-bold text-white">{value}</h2>
				</div>
				<div className="z-10 flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-md">
					<ArrowUpRight size={16} className="text-green-400" />
					<span className="text-slate-200">{percentage}</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className="flex h-48 cursor-pointer flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-green-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-green-700"
			onClick={onClick}
		>
			<div>
				<div className="mb-2 flex items-center gap-2">
					<div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
						<Icon size={18} />
					</div>
					<span className="font-semibold text-slate-700 dark:text-white">
						{title}
					</span>
				</div>
			</div>
			<div>
				<div className="mb-2 flex items-end justify-between">
					<div>
						<h3 className="text-base @[150px]:text-lg @[200px]:text-xl font-bold text-slate-700 dark:text-white">
							{value}
						</h3>
					</div>
					<span className="text-lg @[150px]:text-xl font-bold text-green-600 dark:text-green-400">
						{percentage}
					</span>
				</div>
				{progress && (
					<div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
						<div
							className="h-full rounded-full bg-green-500"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeroCard;
