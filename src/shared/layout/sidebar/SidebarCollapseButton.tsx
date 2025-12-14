import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface SidebarCollapseButtonProps {
	isCollapsed: boolean;
	setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarCollapseButton: React.FC<SidebarCollapseButtonProps> = ({
	isCollapsed,
	setIsCollapsed,
}) => {
	return (
		<button
			type="button"
			onClick={() => setIsCollapsed(!isCollapsed)}
			className="absolute top-9 -right-3 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-pink-50 hover:text-slate-700 lg:flex dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white"
		>
			{isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
		</button>
	);
};

export default SidebarCollapseButton;
