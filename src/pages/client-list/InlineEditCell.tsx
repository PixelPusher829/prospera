import type React from "react";
import { useState } from "react";

interface InlineEditCellProps {
	value: string | number;
	type?: "text" | "number";
	onSave: (val: string) => void;
	className?: string;
	prefix?: string;
}

const InlineEditCell: React.FC<InlineEditCellProps> = ({
	value,
	onSave,
	type = "text",
	className = "",
	prefix = "",
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [tempValue, setTempValue] = useState(value);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			onSave(tempValue.toString());
			setIsEditing(false);
		} else if (e.key === "Escape") {
			setTempValue(value);
			setIsEditing(false);
		}
	};

	if (isEditing) {
		return (
			<input
				autoFocus
				type={type}
				value={tempValue}
				onChange={(e) => setTempValue(e.target.value)}
				onBlur={() => {
					onSave(tempValue.toString());
					setIsEditing(false);
				}}
				onKeyDown={handleKeyDown}
				className="w-full rounded-md border-2 border-pink-500 bg-white px-2 py-1 text-sm focus:outline-none"
				onClick={(e) => e.stopPropagation()}
			/>
		);
	}

	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setIsEditing(true);
			}}
			className={`group -mx-2 cursor-pointer rounded border border-transparent px-2 py-1 transition-colors hover:border-slate-200 hover:bg-slate-100 hover:text-pink-700 ${className}`}
			title="Click to edit"
		>
			{prefix}
			{value}
		</div>
	);
};

export default InlineEditCell;
