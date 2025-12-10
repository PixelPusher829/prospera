import {
	Building,
	ChevronRight,
	DollarSign,
	Mail,
	Save,
	Trash2,
	User,
	X,
} from "lucide-react";
import type React from "react";
import type { Client } from "@/shared/types/types";
import { ClientStatus } from "@/shared/types/types";

interface ClientDetailDrawerProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (isOpen: boolean) => void;
	selectedClient: Client | null;
	drawerForm: Partial<Client>;
	setDrawerForm: (form: Partial<Client>) => void;
	saveDrawerChanges: () => void;
	setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

const ClientDetailDrawer: React.FC<ClientDetailDrawerProps> = ({
	isDrawerOpen,
	setIsDrawerOpen,
	selectedClient,
	drawerForm,
	setDrawerForm,
	saveDrawerChanges,
	setClients,
}) => {
	return (
		<>
			{/* Slide-out Drawer Overlay */}
			{isDrawerOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
					onClick={() => setIsDrawerOpen(false)}
				/>
			)}

			{/* Slide-out Drawer Panel */}
			<div
				className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] ${
					isDrawerOpen ? "translate-x-0" : "translate-x-full"
				} `}
			>
				{selectedClient && (
					<div className="flex h-full flex-col">
						{/* Drawer Header */}
						<div className="flex items-center justify-between border-b border-slate-100 p-6">
							<div>
								<h2 className="text-xl font-bold text-slate-700">
									Client Details
								</h2>
								<p className="text-sm text-slate-500">
									View and edit information
								</p>
							</div>
							<button
								onClick={() => setIsDrawerOpen(false)}
								className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
							>
								<X size={20} />
							</button>
						</div>

						{/* Drawer Content */}
						<div className="flex-1 space-y-6 overflow-y-auto p-6">
							{/* Identity Card */}
							<div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-2xl font-bold text-white">
									{drawerForm.name?.charAt(0)}
								</div>
								<div>
									<h3 className="text-lg font-bold text-slate-700 dark:text-white">
										{drawerForm.name}
									</h3>
									<span
										className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${
											drawerForm.status === ClientStatus.Active
												? "bg-green-100 text-green-800"
												: ""
										} ${
											drawerForm.status === ClientStatus.Pending
												? "bg-amber-100 text-amber-800"
												: ""
										} ${
											drawerForm.status === ClientStatus.Inactive
												? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
												: ""
										} `}
									>
										{drawerForm.status}
									</span>
								</div>
							</div>

							{/* Form Fields */}
							<div className="space-y-4">
								<div>
									<label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
										Full Name
									</label>
									<div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-all focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20">
										<User size={18} className="text-slate-400" />
										<input
											type="text"
											value={drawerForm.name}
											onChange={(e) =>
												setDrawerForm({ ...drawerForm, name: e.target.value })
											}
											className="flex-1 text-sm text-slate-700 outline-none"
										/>
									</div>
								</div>

								<div>
									<label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
										Email Address
									</label>
									<div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-all focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20">
										<Mail size={18} className="text-slate-400" />
										<input
											type="email"
											value={drawerForm.email}
											onChange={(e) =>
												setDrawerForm({ ...drawerForm, email: e.target.value })
											}
											className="flex-1 text-sm text-slate-700 outline-none"
										/>
									</div>
								</div>

								<div>
									<label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
										Company
									</label>
									<div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-all focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20">
										<Building size={18} className="text-slate-400" />
										<input
											type="text"
											value={drawerForm.company}
											onChange={(e) =>
												setDrawerForm({
													...drawerForm,
													company: e.target.value,
												})
											}
											className="flex-1 text-sm text-slate-700 outline-none"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
											Revenue
										</label>
										<div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-all focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20">
											<DollarSign size={18} className="text-slate-400" />
											<input
												type="number"
												value={drawerForm.revenue}
												onChange={(e) =>
													setDrawerForm({
														...drawerForm,
														revenue: Number(e.target.value),
													})
												}
												className="flex-1 text-sm text-slate-700 outline-none"
											/>
										</div>
									</div>
									<div>
										<label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
											Status
										</label>
										<div className="relative">
											<select
												value={drawerForm.status}
												onChange={(e) =>
													setDrawerForm({
														...drawerForm,
														status: e.target.value as ClientStatus,
													})
												}
												className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
											>
												<option value={ClientStatus.Active}>Active</option>
												<option value={ClientStatus.Pending}>Pending</option>
												<option value={ClientStatus.Inactive}>Inactive</option>
											</select>
											<div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
												<ChevronRight
													size={14}
													className="rotate-90 text-slate-400"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Mock Activity Feed */}
							<div className="border-t border-slate-100 pt-6">
								<h4 className="mb-4 font-semibold text-slate-700">
									Recent Activity
								</h4>
								<div className="space-y-4">
									<div className="flex gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-400"></div>
										<div>
											<p className="text-sm text-slate-800">
												Invoice #4023 sent
											</p>
											<p className="text-xs text-slate-400">
												{drawerForm.lastContact}
											</p>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-300"></div>
										<div>
											<p className="text-sm text-slate-800">
												Email conversation regarding Q3 Budget
											</p>
											<p className="text-xs text-slate-400">1 month ago</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Drawer Footer */}
						<div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-6">
							<button
								onClick={() => {
									if (window.confirm("Delete this client?")) {
										setClients((prev) =>
											prev.filter((c) => c.id !== selectedClient.id),
										);
										setIsDrawerOpen(false);
									}
								}}
								className="rounded-xl p-3 text-red-500 transition-colors hover:bg-red-50"
							>
								<Trash2 size={20} />
							</button>
							<button
								onClick={saveDrawerChanges}
								className="flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 font-medium text-white shadow-lg shadow-pink-200 transition-all hover:bg-pink-700"
							>
								<Save size={18} />
								Save Changes
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ClientDetailDrawer;
