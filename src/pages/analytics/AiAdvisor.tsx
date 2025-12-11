import { Sparkles } from "lucide-react";
import type React from "react";
import Button from "@/shared/components/Button"; // Import Button component

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

			<Button
				variant="primary"
				onClick={generateInsight}
				isLoading={loadingInsight}
				className="w-full bg-white text-violet-700! hover:bg-violet-100! disabled:cursor-not-allowed disabled:opacity-70" // Override with custom styling
			>
				Generate Insights
			</Button>
		</div>
	);
};

export default AiAdvisor;
