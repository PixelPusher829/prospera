import {
  ChevronDown,
  FileText,
  Mail,
  MessageCircle,
  Search,
} from "lucide-react";
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
          className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`px-5 text-slate-600 transition-all duration-300 dark:text-slate-300 ${isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {answer}
      </div>
    </div>
  );
};

const Help: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-700 dark:text-white">
          How can we help you?
        </h1>
        <div className="relative mx-auto max-w-xl">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-700 shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:shadow-none"
          />
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-violet-50 p-6 text-center transition-transform hover:-translate-y-1 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <FileText size={28} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-700 dark:text-white">
            Documentation
          </h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Detailed guides and API references
          </p>
          <button className="text-sm font-semibold text-violet-600 hover:underline dark:text-violet-400">
            Read Docs
          </button>
        </div>
        <div className="rounded-3xl bg-blue-50 p-6 text-center transition-transform hover:-translate-y-1 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <MessageCircle size={28} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-700 dark:text-white">
            Live Chat
          </h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Chat with our support team
          </p>
          <button className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Start Chat
          </button>
        </div>
        <div className="rounded-3xl bg-emerald-50 p-6 text-center transition-transform hover:-translate-y-1 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Mail size={28} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-700 dark:text-white">
            Email Support
          </h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Get help via email within 24h
          </p>
          <button className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
            Send Email
          </button>
        </div>
      </div>

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
