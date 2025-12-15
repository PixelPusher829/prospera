// src/pages/client-list/ClientTable.tsx

import { Building, ChevronRight, Mail } from "lucide-react";
import type React from "react";
import StatusBadge from "@/shared/components/StatusBadge";
import Table, { type Column } from "@/shared/components/Table";
import { type Client, ClientStatus } from "@/shared/types/types";
import InlineEditCell from "./InlineEditCell";

interface ClientTableProps {
	sortedClients: Client[];
	selectedIds: Set<string>;
	toggleSelectAll: () => void;
	toggleSelection: (id: string) => void;
	handleSort: (field: keyof Client) => void;
	sortField: keyof Client | null;
	sortDirection: "asc" | "desc";
	updateClient: (id: string, updates: Partial<Client>) => void;
	openDrawer: (client: Client) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
	sortedClients,
	selectedIds,
	toggleSelectAll,
	toggleSelection,
	handleSort,
	sortField,
	sortDirection,
	updateClient,
	openDrawer,
}) => {
	const columns: Column<Client>[] = [
		{
			header: "Name",
			accessor: "name",
			cell: (client) => (
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
						{client.name.charAt(0)}
					</div>
					<div>
						<div className="font-semibold text-slate-700 dark:text-white">
							<InlineEditCell
								value={client.name}
								onSave={(val) => updateClient(client.id, { name: val })}
							/>
						</div>
						<div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
							<Mail size={10} /> {client.email}
						</div>
					</div>
				</div>
			),
		},
		{
			header: "Company",
			accessor: "company",
			cell: (client) => (
				<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
					<Building size={14} className="text-slate-400 dark:text-slate-500" />
					<InlineEditCell
						value={client.company}
						onSave={(val) => updateClient(client.id, { company: val })}
					/>
				</div>
			),
		},
		{
			header: "Status",
			accessor: "status",
			cell: (client) => (
				<div className="relative" onClick={(e) => e.stopPropagation()}>
					<StatusBadge status={client.status} />
					<select
						value={client.status}
						onChange={(e) =>
							updateClient(client.id, {
								status: e.target.value as ClientStatus,
							})
						}
						className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
					>
						{Object.values(ClientStatus).map((statusOption) => (
							<option key={statusOption} value={statusOption}>
								{statusOption}
							</option>
						))}
					</select>
				</div>
			),
		},
		{
			header: "Revenue",
			accessor: "revenue",
			headerClassName: "justify-start",
			className: "font-medium text-slate-700 dark:text-white",
			cell: (client) => (
				<InlineEditCell
					value={client.revenue}
					type="number"
					prefix="$"
					onSave={(val) => updateClient(client.id, { revenue: Number(val) })}
				/>
			),
		},
		{
			header: "Last Contact",
			accessor: "lastContact",
			className: "text-sm text-slate-500 dark:text-slate-400",
			cell: (client) => client.lastContact,
		},
	];

	return (
		<Table
			data={sortedClients}
			columns={columns}
			selectedIds={selectedIds}
			toggleSelection={toggleSelection}
			toggleSelectAll={toggleSelectAll}
			handleSort={handleSort}
			sortField={sortField}
			sortDirection={sortDirection}
			getRowId={(client) => client.id}
			onRowClick={openDrawer}
			renderRowActions={(client) => (
				<button
					onClick={(e) => {
						e.stopPropagation();
						openDrawer(client);
					}}
					className="rounded-full p-2 text-slate-300 opacity-0 transition-colors group-hover:opacity-100 hover:text-slate-600"
				>
					<ChevronRight size={18} />
				</button>
			)}
			actionsColumnClassName="w-16"
			noItemsMessage="No clients found matching your filters."
		/>
	);
};

export default ClientTable;
