import { Content } from "@radix-ui/react-select";
import type React from "react";
import { useEffect, useRef, useState } from "react";

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

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSave(tempValue.toString());

			setIsEditing(false);
		} else if (e.key === "Escape") {
			setTempValue(value);

			setIsEditing(false);
		}
	};

	const handleBlur = () => {
		onSave(tempValue.toString());

		setIsEditing(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		e.stopPropagation();

		if (!isEditing) {
			setIsEditing(true);
		}
	};

	return (
		<div className={`inline-flex items-center ${className}`}>
			{prefix && <span className="mr-1">{prefix}</span>}

			<input
				ref={inputRef}
				type={type}
				value={tempValue}
				onChange={(e) => setTempValue(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				readOnly={!isEditing}
				onClick={handleClick}
				style={{
					width: `${String(tempValue).length + (type === "number" ? 4 : 2)}ch`,

					minWidth: "8ch",
				}}
				className={`cursor-pointer rounded-sm px-2 py-1 outline transition-all duration-400 ease-in-out ${
					isEditing
						? "rounded-sm bg-white outline-violet-300 focus:ring-2 focus:ring-violet-300 focus:outline-none"
						: "bg-white border-transparent outline-transparent outline-offset-5"
				} ${!isEditing && "outline-offset-0 hover:text-violet-700 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:outline-transparent"} `}
			/>
		</div>
	);
};

export default InlineEditCell;
