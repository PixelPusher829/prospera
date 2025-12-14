import { format } from "date-fns";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Default styles for react-day-picker

import InputField, { CalendarIcon } from "./InputField";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
	label,
	value,
	onChange,
	className,
	...props
}) => {
	const [selectedDay, setSelectedDay] = useState<Date | undefined>(
		value ? new Date(value as string) : undefined,
	);
	const [inputValue, setInputValue] = useState<string>(
		value ? format(new Date(value as string), "PPP") : "",
	);
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const pickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (value) {
			const dateValue = new Date(value as string);
			setSelectedDay(dateValue);
			setInputValue(format(dateValue, "PPP"));
		} else {
			setSelectedDay(undefined);
			setInputValue("");
		}
	}, [value]);

	const handleDaySelect = (day: Date | undefined) => {
		setSelectedDay(day);
		if (day) {
			setInputValue(format(day, "PPP"));
			onChange?.({
				target: { value: format(day, "yyyy-MM-dd"), name: props.name },
			} as React.ChangeEvent<HTMLInputElement>);
		} else {
			setInputValue("");
			onChange?.({
				target: { value: "", name: props.name },
			} as React.ChangeEvent<HTMLInputElement>);
		}
		setIsPickerOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		// Optionally parse the date string back to Date object if valid
		// and update selectedDay, or leave it to strict date selection from picker
	};

	const handleInputClick = () => {
		setIsPickerOpen((prev) => !prev);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			pickerRef.current &&
			!pickerRef.current.contains(event.target as Node)
		) {
			setIsPickerOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={pickerRef}>
			<InputField
				label={label}
				value={inputValue}
				onChange={handleInputChange}
				onClick={handleInputClick} // Still keeps input field clickable
				onIconClick={handleInputClick} // Icon click also toggles picker
				icon={CalendarIcon}
				readOnly // Make input read-only to force selection via picker
				className={className}
				{...props}
			/>
			{isPickerOpen && (
				<div className="absolute z-50 mt-1 rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
					<DayPicker
						mode="single"
						selected={selectedDay}
						onSelect={handleDaySelect}
						className="p-4"
						classNames={{
							caption_label: "text-lg text-slate-700 dark:text-slate-200",
							nav_button_previous: "text-slate-700 dark:text-slate-200",
							nav_button_next: "text-slate-700 dark:text-slate-200",
							head_cell: "text-slate-500 dark:text-slate-400",
							day: "text-slate-700 dark:text-slate-200",
							day_selected: "bg-violet-600 text-white hover:bg-violet-700",
							day_today: "font-bold",
							day_disabled: "text-slate-400 opacity-50",
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
