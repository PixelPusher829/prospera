import { ChevronRight, Filter, Plus, Search } from "lucide-react";
import type React from "react";
import { ClientStatus } from "@/shared/types/types";
import Button from "@/shared/components/Button"; // Import Button component

interface ClientListHeaderProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	statusFilter: string;
	setStatusFilter: (status: string) => void;
	setIsAddDrawerOpen: (isOpen: boolean) => void;
	isStatusFilterOpen: boolean;
	setIsStatusFilterOpen: (isOpen: boolean) => void;
}

const ClientListHeader: React.FC<ClientListHeaderProps> = ({
	searchQuery,
	setSearchQuery,
	statusFilter,
	setStatusFilter,
	setIsAddDrawerOpen,
	isStatusFilterOpen,
	setIsStatusFilterOpen,
}) => {
	return (
		<div className="flex w-full items-center gap-3 md:w-auto">
			{/* Status Filter */}
			<div className="relative">
				<button
					onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
					className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:ring-2 focus:ring-pink-500/20 focus:outline-none md:w-48 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					type="button"
				>
					<span>{statusFilter === "All" ? "All Statuses" : statusFilter}</span>
					<ChevronRight
						size={14}
						className={`rotate-90 text-slate-400 transition-transform ${
							isStatusFilterOpen ? "rotate-[-90deg] transform" : ""
						}`}
					/>
				</button>
				{isStatusFilterOpen && (
					<div className="absolute top-full left-0 z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
						<div
							onClick={() => {
								setStatusFilter("All");
								setIsStatusFilterOpen(false);
								
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setStatusFilter("All");
									setIsStatusFilterOpen(false);
								}
							}}
							className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
							tabIndex={0}
						>
							All Statuses
						</div>
						<div
							onClick={() => {
								setStatusFilter(ClientStatus.Active);
								setIsStatusFilterOpen(false);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setStatusFilter(ClientStatus.Active);
									setIsStatusFilterOpen(false);
								}
							}}
							className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
						>
							Active
						</div>
						<div
							onClick={() => {
								setStatusFilter(ClientStatus.Pending);
								setIsStatusFilterOpen(false);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setStatusFilter(ClientStatus.Pending);
									setIsStatusFilterOpen(false);
								}
							}}
							className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
						>
							Pending
						</div>
						<div
							onClick={() => {
								setStatusFilter(ClientStatus.Inactive);
								setIsStatusFilterOpen(false);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setStatusFilter(ClientStatus.Inactive);
									setIsStatusFilterOpen(false);
								}
							}}
							className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
						>
							Inactive
						</div>
					</div>
				)}
			</div>

			{/* Search */}
			<div className="relative flex-1 md:w-64">
				<Search
					className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
					size={18}
				/>
				<input
					type="text"
					placeholder="Search clients..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-700 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
				/>
			</div>
			<button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
				<Filter size={18} />
			</button>
			<Button
				onClick={() => setIsAddDrawerOpen(true)}
				icon={<Plus size={18} />}
			>
				Add Client
			</Button>
		</div>
	);
};

export default ClientListHeader;
