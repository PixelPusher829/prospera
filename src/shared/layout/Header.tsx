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
}): React.ReactElement {
	return (
		<div
			className={`${className} flex flex-col items-start justify-between gap-6 @2xl:flex-row @2xl:items-end`}
		>
			<div>
				<h1 className="text-3xl font-bold text-slate-700 dark:text-white">{heading}</h1>
				<p className="mt-1 text-slate-500 dark:text-slate-400">{subheading}</p>
			</div>
			<div className="flex items-center gap-3 shrink-0">{children}</div>
		</div>
	);
}
