import type React from "react";

export default function Header({
	children,
	heading,
	subheading,
	className,
}: {
	children?: React.ReactNode;
	heading: string;
	subheading: string;
	className?: string;
}): React.FC {
	return (
		<div
			className={`${className} flex flex-col items-start justify-between gap-4 md:flex-row md:items-center`}
		>
			<div>
				<h1 className="$ text-3xl font-bold text-slate-700">{heading}</h1>
				<p className="mt-1 text-slate-500">{subheading}</p>
			</div>
			<div className="flex items-center gap-3">{children}</div>
		</div>
	);
}
