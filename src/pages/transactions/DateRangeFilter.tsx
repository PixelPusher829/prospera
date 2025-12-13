import { Calendar } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Button from "@/shared/components/Button";
import { DatePicker } from "@/shared/components/forms";

interface DateRangeFilterProps {
	startDate: string | null;
	setStartDate: (date: string | null) => void;
	endDate: string | null;
	setEndDate: (date: string | null) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="rounded-xl border border-slate-200 bg-white p-3 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
			>
				<Calendar size={18} />
			</button>
			{isOpen && (
				<div className="absolute top-full right-0 z-10 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800">
					<div className="flex flex-col gap-4">
						<div className="relative">
							<DatePicker
								label="Start Date"
								value={startDate || ""}
								onChange={(e) => setStartDate(e.target.value)}
							/>
						</div>
						<div className="relative">
							<DatePicker
								label="End Date"
								value={endDate || ""}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</div>
						<Button
							variant="secondary"
							onClick={() => {
								setStartDate(null);
								setEndDate(null);
							}}
						>
							Clear
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateRangeFilter;
