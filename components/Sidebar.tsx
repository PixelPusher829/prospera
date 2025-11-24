import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Wallet, 
  Target, 
  PieChart, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut,
  Moon,
  Sun,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavItem, SidebarProps } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft, path: '/transactions' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
  { id: 'budget', label: 'Budget', icon: PieChart, path: '/budget' },
  { id: 'goals', label: 'Goals', icon: Target, path: '/goals' },
  { id: 'clients', label: 'Client List', icon: Users, path: '/clients' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen, isDarkMode, toggleTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-30 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-64'}
        lg:translate-x-0 lg:static
      `}>
        <div className="flex flex-col h-full py-6 relative">
          
          {/* Collapse Toggle Button (Desktop Only) */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-9 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm z-50 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Logo */}
          <div className={`flex items-center gap-3 mb-10 px-6 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xl shrink-0">
              P
            </div>
            <span className={`text-2xl font-bold text-slate-900 dark:text-white overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Prospera
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`
                    w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-200
                    ${isActive 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200/50' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                  <span className={`font-medium text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2 px-3">
             <button 
              onClick={() => {
                setActiveTab('settings');
                setIsMobileOpen(false);
              }}
              title={isCollapsed ? 'Settings' : undefined}
              className={`
                w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-colors
                ${activeTab === 'settings' 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-200/50' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Settings size={20} className="shrink-0" />
              <span className={`font-medium text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>Settings</span>
            </button>

             <button 
              onClick={() => {
                setActiveTab('help');
                setIsMobileOpen(false);
              }}
              title={isCollapsed ? 'Help' : undefined}
              className={`
                w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-colors
                ${activeTab === 'help' 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-200/50' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <HelpCircle size={20} className="shrink-0" />
              <span className={`font-medium text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>Help</span>
            </button>
            <button 
              title={isCollapsed ? 'Log out' : undefined}
              className={`w-full flex items-center gap-4 px-3 py-3 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
              <LogOut size={20} className="shrink-0" />
              <span className={`font-medium text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>Log out</span>
            </button>
            
            <div className={`pt-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-1`}>
               <div 
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full bg-violet-100 dark:bg-slate-800 text-violet-600 dark:text-yellow-400 flex items-center justify-center cursor-pointer shrink-0 hover:bg-violet-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
               </div>
               <div className={`text-xs text-slate-400 dark:text-slate-500 overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>v1.2.0</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;