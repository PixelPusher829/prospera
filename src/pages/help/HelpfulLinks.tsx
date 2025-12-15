import { FileText, Mail, MessageCircle } from "lucide-react";
import type React from "react";

const HelpfulLinks: React.FC = () => {
  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-3xl bg-violet-50 p-6 text-center transition-transform hover:-translate-y-1 dark:bg-slate-800">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-700/30 dark:text-violet-400">
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
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-700/30 dark:text-blue-400">
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
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-700/30 dark:text-emerald-400">
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
  );
};

export default HelpfulLinks;
