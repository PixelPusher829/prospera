import type React from "react";
import type { Account } from "@/shared/types/types";

interface CreditCardVisualProps {
	account: Account;
	onEdit: (account: Account) => void;
}

const CreditCardVisual: React.FC<CreditCardVisualProps> = ({
	account,
	onEdit,
}) => {
	return (
		<div
			onClick={() => onEdit(account)}
			className={`relative rounded-2xl bg-gradient-to-r p-6 shadow-lg ${
				account.colorTheme || "from-slate-700 to-slate-900"
			} group flex aspect-[1.58/1] cursor-pointer flex-col justify-between overflow-hidden text-white transition-transform hover:-translate-y-1`}
		>
			{/* Background decoration */}
			<div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white opacity-10 blur-2xl"></div>
			<div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-black opacity-10 blur-xl"></div>

			<div className="z-10 flex items-start justify-between">
				<span className="text-xs font-medium tracking-wider uppercase opacity-80">
					{account.institution}
				</span>
				{account.institution.toLowerCase().includes("visa") ? (
					<span className="text-lg font-bold italic opacity-90">VISA</span>
				) : (
					<div className="flex -space-x-3">
						<div className="h-6 w-6 rounded-full bg-red-500/80"></div>
						<div className="h-6 w-6 rounded-full bg-yellow-500/80"></div>
					</div>
				)}
			</div>

			<div className="z-10">
				<div className="mb-2 flex items-center gap-4">
					<div className="h-7 w-10 rounded border border-white/20 bg-yellow-200/20 backdrop-blur-sm"></div>
					<div className="font-mono text-lg tracking-widest opacity-90">
						{account.accountNumber || "**** **** **** 0000"}
					</div>
				</div>
				<div className="flex items-end justify-between">
					<div>
						<p className="mb-0.5 text-[10px] uppercase opacity-60">
							Card Holder
						</p>
						<p className="text-sm font-medium tracking-wide">James Barnes</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreditCardVisual;
