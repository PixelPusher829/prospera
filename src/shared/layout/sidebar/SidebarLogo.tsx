import type React from "react";
import logo from "@/shared/assets/logo.svg";

interface SidebarLogoProps {
  isCollapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ isCollapsed }) => {
  return (
    <div
      className={`mb-10 flex items-center ${
        isCollapsed ? "justify-center" : "gap-4 px-6"
      }`}
    >
      <img src={logo} alt="" className="w-8" />
      <span
        className={`overflow-hidden whitespace-nowrap text-3xl font-bold text-slate-700 transition-all duration-300 dark:text-white ${
          isCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"
        }`}
      >
        Prospera
      </span>
    </div>
  );
};

export default SidebarLogo;