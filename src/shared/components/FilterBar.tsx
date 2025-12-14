// src/shared/components/FilterBar.tsx
import type React from "react";

interface FilterBarProps {
	children: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({ children }) => {
	return <div className="mb-6 flex flex-col gap-4 md:flex-row">{children}</div>;
};

export default FilterBar;
