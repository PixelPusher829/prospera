import { format } from "date-fns";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Default styles for react-day-picker
import { type ZodType, z } from "zod";

import InputField, { CalendarIcon } from "./InputField";

interface DatePickerProps<T>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	// Zod schema for validation
	schema?: ZodType<T>;
	// Callback for validated changes (value and error)
	onValidatedChange?: (value: T | string, error?: string) => void;
	// External error prop, can be used for server-side errors or parent component validation
	error?: string;
}

const DatePicker = <T,>({
	label,
	value,
	onChange,
	className,
	schema,
	onValidatedChange,
	error: externalError,
	...props
}: DatePickerProps<T>) => {
	const [selectedDay, setSelectedDay] = useState<Date | undefined>(
		value ? new Date(value as string) : undefined,
	);
	const [inputValue, setInputValue] = useState<string>(
		value ? format(new Date(value as string), "PPP") : "",
	);
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [internalError, setInternalError] = useState<string | undefined>(
		undefined,
	);
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

	const validate = useCallback(
		(dateValue: Date | undefined) => {
			if (schema) {
				// Convert Date object to a format Zod can validate if schema expects a string,
				// or validate directly if schema expects a Date object.
				// Assuming schema expects a Date object for simplicity here,
				// otherwise, further transformation might be needed.
				const result = schema.safeParse(dateValue);
				if (!result.success) {
					setInternalError(result.error.errors[0].message);
					return result.error.errors[0].message;
				} else {
					setInternalError(undefined);
				}
			}
			return undefined;
		},
		[schema],
	);

	const handleDaySelect = (day: Date | undefined) => {
		setSelectedDay(day);
		let formattedValue = "";
		let validationError: string | undefined;

		if (day) {
			formattedValue = format(day, "yyyy-MM-dd"); // Consistent format for internal value
			setInputValue(format(day, "PPP")); // Display format
			validationError = validate(day);
		} else {
			setInputValue("");
			validationError = validate(undefined); // Validate undefined if day is cleared
		}

		// Notify parent
		if (onValidatedChange) {
			onValidatedChange(day as T, validationError);
		}

		// Call original onChange
		onChange?.({
			target: { value: formattedValue, name: props.name },
		} as React.ChangeEvent<HTMLInputElement>);

		setIsPickerOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		// For direct input, we might want to parse and validate
		// or keep it read-only and rely on picker selection
		// For now, it's read-only, so this part is less critical for validation
		if (onChange) {
			onChange(e);
		}
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

	const displayError = externalError || internalError;

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
				error={displayError} // Pass down the combined error
				{...props}
			/>
			{isPickerOpen && (
				<div className="absolute z-50 mt-1 rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
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
							day_selected: "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-800",
							day_today: "font-bold",
							day_disabled: "text-slate-400 opacity-50 dark:text-slate-500",
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
