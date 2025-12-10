import { Sparkles } from "lucide-react";
import type React from "react";

interface AiAdvisorProps {
	insight: string;
	loadingInsight: boolean;
	generateInsight: () => void;
}

const AiAdvisor: React.FC<AiAdvisorProps> = ({
	insight,
	loadingInsight,
	generateInsight,
}) => {
	return (
		<div className="flex flex-col rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-violet-200">
			<div className="mb-4 flex items-center gap-3">
				<div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
					<Sparkles size={20} className="text-yellow-300" />
				</div>
				<h3 className="text-lg font-bold">Prospera AI Advisor</h3>
			</div>

			<div className="mb-4 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
				{insight ? (
					<p className="text-sm leading-relaxed text-violet-50">{insight}</p>
				) : (
					<div className="flex h-full flex-col items-center justify-center text-center text-sm text-violet-200">
						<p>
							Get AI-powered insights based on your current financial metrics.
						</p>
					</div>
				)}
			</div>

			<button
				onClick={generateInsight}
				disabled={loadingInsight}
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-violet-700 transition-colors hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-70"
			>
				{loadingInsight ? (
					<>
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"></span>
						Analyzing...
					</>
				) : (
					"Generate Insights"
				)}
			</button>
		</div>
	);
};

export default AiAdvisor;
