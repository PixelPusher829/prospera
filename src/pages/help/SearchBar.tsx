import { Search } from "lucide-react";
import type React from "react";
import { InputField } from "@/shared/components/forms";

const SearchBar: React.FC = () => {
	return (
		<div className="relative mx-auto max-w-xl">
			<Search
				className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
				size={20}
			/>
			<InputField
				type="text"
				placeholder="Search for answers..."
				className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-700 shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-violet-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:shadow-none"
			/>
		</div>
	);
};

export default SearchBar;
