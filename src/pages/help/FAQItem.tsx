import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";

const FAQItem: React.FC<{ question: string; answer: string }> = ({
	question,
	answer,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between p-5 text-left"
			>
				<span className="font-semibold text-slate-700 dark:text-white">
					{question}
				</span>
				<ChevronDown
					size={20}
					className={`text-slate-500 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			<div
				className={`px-5 text-slate-600 transition-all duration-300 dark:text-slate-300 ${
					isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				{answer}
			</div>
		</div>
	);
};

export default FAQItem;
