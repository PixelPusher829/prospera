import type React from "react";
import FAQItem from "./FAQItem";
import HelpfulLinks from "./HelpfulLinks";
import SearchBar from "./SearchBar";

const Help: React.FC = () => {
	return (
		<div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold text-slate-700 dark:text-white">
					How can we help you?
				</h1>
				<SearchBar />
			</div>

			<HelpfulLinks />

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-1">
				<div>
					<h2 className="mb-6 text-2xl font-bold text-slate-700 dark:text-white">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						<FAQItem
							question="How do I connect my bank account?"
							answer="Go to the Wallet tab, click on 'Link Account', and select your banking institution from the secure Plaid integration menu."
						/>
						<FAQItem
							question="Is my data secure?"
							answer="Yes, we use bank-grade 256-bit encryption for all data storage and transfer. We never store your banking credentials."
						/>
						<FAQItem
							question="Can I export my transaction history?"
							answer="Absolutely. Navigate to the Analytics tab and click the 'Export Report' button to download a CSV or PDF summary."
						/>
						<FAQItem
							question="How does the AI advisor work?"
							answer="Our Gemini-powered AI analyzes your categorized spending habits and income trends to provide personalized financial advice."
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Help;
