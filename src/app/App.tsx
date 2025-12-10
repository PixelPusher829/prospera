import { Bell, Menu, Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "@/app/layout/Sidebar";
import { Analytics, Budget, ClientList, Dashboard, Goals, Help, Settings, Transactions, Wallet } from "@/pages";

const Header: React.FC<{ onMenuClick: () => void; isDarkMode: boolean }> = ({
  onMenuClick,
}) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md transition-colors lg:justify-end dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu size={24} />
        </button>
        <span className="text-xl font-bold text-slate-700 dark:text-white">
          Prospera
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar - Desktop */}
        <div className="hidden w-64 items-center gap-2 rounded-full border border-transparent bg-slate-50 px-4 py-2.5 transition-all focus-within:border-violet-200 focus-within:bg-white md:flex dark:bg-slate-800 dark:focus-within:border-violet-800 dark:focus-within:bg-slate-900">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900"></span>
          </button>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-bold text-slate-700 dark:text-white">
                James Barnes
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                james@prospera.com
              </div>
            </div>
            <img
              src="https://picsum.photos/100/100"
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm dark:border-slate-800"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "analytics":
        return <Analytics />;
      case "transactions":
        return <Transactions />;
      case "wallet":
        return <Wallet />;
      case "goals":
        return <Goals />;
      case "budget":
        return <Budget />;
      case "clients":
        return <ClientList />;
      case "settings":
        return <Settings />;
      case "help":
        return <Help />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-[#f8f9fc] transition-colors duration-300 dark:bg-slate-950">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            onMenuClick={() => setIsMobileOpen(true)}
            isDarkMode={isDarkMode}
          />
          <div className="flex-1 overflow-auto">{renderContent()}</div>
        </main>
      </div>
    </Router>
  );
};

export default App;
