import type React from "react";
import { ArrowDownUp, Building, ChevronRight, Mail } from "lucide-react";
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
	return (
		<div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
			<div className="min-h-[400px] overflow-x-auto">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
							<th className="w-12 px-6 py-4">
								<input
									type="checkbox"
									checked={
										selectedIds.size === sortedClients.length &&
										sortedClients.length > 0
									}
									onChange={toggleSelectAll}
									className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
								/>
							</th>
							<th
								className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 focus:outline-none dark:text-slate-400"
								onClick={() => handleSort("name")}
							>
								<div className="flex items-center gap-1">
									Name{" "}
									{sortField === "name" && (
										<ArrowDownUp
											size={14}
											className={sortDirection === "desc" ? "rotate-180" : ""}
										/>
									)}
								</div>
							</th>
							<th
								className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 focus:outline-none dark:text-slate-400"
								onClick={() => handleSort("company")}
							>
								<div className="flex items-center gap-1">
									Company{" "}
									{sortField === "company" && (
										<ArrowDownUp
											size={14}
											className={sortDirection === "desc" ? "rotate-180" : ""}
										/>
									)}
								</div>
							</th>
							<th
								className="cursor-pointer px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 focus:outline-none dark:text-slate-400"
								onClick={() => handleSort("status")}
							>
								<div className="flex items-center gap-1">
									Status{" "}
									{sortField === "status" && (
										<ArrowDownUp
											size={14}
											className={sortDirection === "desc" ? "rotate-180" : ""}
										/>
									)}
								</div>
							</th>
							<th
								className="cursor-pointer px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 focus:outline-none dark:text-slate-400"
								onClick={() => handleSort("revenue")}
							>
								<div className="flex items-center justify-end gap-1">
									Revenue{" "}
									{sortField === "revenue" && (
										<ArrowDownUp
											size={14}
											className={sortDirection === "desc" ? "rotate-180" : ""}
										/>
									)}
								</div>
							</th>
							<th
								className="cursor-pointer px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase hover:text-slate-700 focus:outline-none dark:text-slate-400"
								onClick={() => handleSort("lastContact")}
							>
								<div className="flex items-center justify-end gap-1">
									Last Contact{" "}
									{sortField === "lastContact" && (
										<ArrowDownUp
											size={14}
											className={sortDirection === "desc" ? "rotate-180" : ""}
										/>
									)}
								</div>
							</th>
							<th className="w-16 px-6 py-4"></th>
						</tr>
					</thead>
					<tbody className="">
						{sortedClients.map((client) => (
							<tr
								key={client.id}
								className={`group cursor-pointer border-b border-slate-100 transition-colors focus:outline-none dark:border-slate-700 ${
									selectedIds.has(client.id)
										? "bg-pink-50/50 dark:bg-pink-900/20"
										: "hover:bg-slate-50/50 dark:hover:bg-slate-700/50"
								} `}
								onClick={() => openDrawer(client)}
							>
								<td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
									<input
										type="checkbox"
										checked={selectedIds.has(client.id)}
										onChange={() => toggleSelection(client.id)}
										className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500 dark:border-slate-600"
									/>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
											{client.name.charAt(0)}
										</div>
										<div>
											<div className="font-semibold text-slate-700 dark:text-white">
												<InlineEditCell
													value={client.name}
													onSave={(val) =>
														updateClient(client.id, { name: val })
													}
												/>
											</div>
											<div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
												<Mail size={10} /> {client.email}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
										<Building
											size={14}
											className="text-slate-400 dark:text-slate-500"
										/>
										<InlineEditCell
											value={client.company}
											onSave={(val) =>
												updateClient(client.id, { company: val })
											}
										/>
									</div>
								</td>
								<td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
									<select
										value={client.status}
										onChange={(e) =>
											updateClient(client.id, {
												status: e.target.value as ClientStatus,
											})
										}
										className={`cursor-pointer appearance-none rounded-full border-0 px-4 py-1 text-center text-xs font-medium outline-none focus:ring-2 focus:ring-pink-500/20 ${
											client.status === ClientStatus.Active
												? "bg-green-100 text-green-800"
												: ""
										} ${
											client.status === ClientStatus.Pending
												? "bg-amber-100 text-amber-800"
												: ""
										} ${
											client.status === ClientStatus.Inactive
												? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
												: ""
										} `}
										style={{ backgroundImage: "none" }}
									>
										<option value={ClientStatus.Active}>Active</option>
										<option value={ClientStatus.Pending}>Pending</option>
										<option value={ClientStatus.Inactive}>Inactive</option>
									</select>
								</td>
								<td className="px-6 py-4 text-right font-medium text-slate-700 dark:text-white">
									<InlineEditCell
										value={client.revenue}
										type="number"
										prefix="$"
										className="justify-end"
										onSave={(val) =>
											updateClient(client.id, { revenue: Number(val) })
										}
									/>
								</td>
								<td className="px-6 py-4 text-right text-sm text-slate-500 dark:text-slate-400">
									{client.lastContact}
								</td>
								<td className="px-6 py-4 text-center">
									<button className="rounded-full p-2 text-slate-300 opacity-0 transition-colors group-hover:opacity-100 hover:text-slate-600">
										<ChevronRight size={18} />
									</button>
								</td>
							</tr>
						))}
						{sortedClients.length === 0 && (
							<tr>
								<td
									colSpan={8}
									className="py-12 text-center text-slate-500 dark:text-slate-400"
								>
									No clients found matching your filters.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{/* Pagination Controls */}
		</div>
	);
};

export default ClientTable;
