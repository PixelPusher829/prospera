import type React from "react";
import { useState } from "react";
import SidebarMobileOverlay from "./SidebarMobileOverlay";
import SidebarCollapseButton from "./SidebarCollapseButton";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarBottomActions from "./SidebarBottomActions";

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeTab: string; 
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isDarkMode,
  toggleTheme,
  activeTab, 
  setActiveTab
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavLinkClick = (path) => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    } setActiveTab(path);
  };

  return (
    <>
      <SidebarMobileOverlay
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <aside
        className={`fixed top-0 left-0 z-30 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-64"} lg:static lg:translate-x-0`}
      >
        <div className="relative flex h-full flex-col py-6">
          <SidebarCollapseButton
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <SidebarLogo isCollapsed={isCollapsed} />
          <SidebarNav
            isCollapsed={isCollapsed}
            onClick={handleNavLinkClick}
            activeTab={activeTab}
          />
          <SidebarBottomActions
            isCollapsed={isCollapsed}
            onClick={handleNavLinkClick}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            activeTab={activeTab}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;