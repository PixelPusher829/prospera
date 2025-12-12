import type React from "react";

interface SidebarMobileOverlayProps {
	isMobileOpen: boolean;
	setIsMobileOpen: (open: boolean) => void;
}

const SidebarMobileOverlay: React.FC<SidebarMobileOverlayProps> = ({
	isMobileOpen,
	setIsMobileOpen,
}) => {
	if (!isMobileOpen) return null;

	return (
		<button
			type="button"
			aria-label="Close side menu"
			className="dark:bg-opacity-70 fixed inset-0 z-30 h-full w-full bg-black/50 lg:hidden"
			onClick={() => setIsMobileOpen(false)}
			onKeyDown={(e) => {
				if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
					setIsMobileOpen(false);
				}
			}}
		/>
	);
};

export default SidebarMobileOverlay;
