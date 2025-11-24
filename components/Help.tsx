import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle, FileText, Mail } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-slate-900 dark:text-white">{question}</span>
        <ChevronDown size={20} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-5 text-slate-600 dark:text-slate-300 transition-all duration-300 ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        {answer}
      </div>
    </div>
  );
};

const Help: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 max-w-[1200px] mx-auto min-h-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-violet-50 dark:bg-slate-800 p-6 rounded-3xl text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Documentation</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Detailed guides and API references</p>
          <button className="text-violet-600 dark:text-violet-400 font-semibold text-sm hover:underline">Read Docs</button>
        </div>
        <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-3xl text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Chat with our support team</p>
          <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">Start Chat</button>
        </div>
        <div className="bg-emerald-50 dark:bg-slate-800 p-6 rounded-3xl text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Email Support</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get help via email within 24h</p>
          <button className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:underline">Send Email</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
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

        <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-3xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <MessageCircle size={120} />
           </div>
           <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
           <p className="text-slate-400 mb-6">We're here to help you manage your finances better.</p>
           
           <form className="space-y-4 relative z-10">
              <div>
                 <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Subject</label>
                 <input type="text" className="w-full bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
              </div>
              <div>
                 <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Message</label>
                 <textarea rows={4} className="w-full bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"></textarea>
              </div>
              <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 rounded-xl font-bold transition-colors">
                 Send Message
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Help;