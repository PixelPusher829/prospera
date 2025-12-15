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
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";
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
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setDrawerForm({ ...drawerForm, [name]: value });
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDrawerForm({ ...drawerForm, status: e.target.value as ClientStatus });
	};

	return (
		<>
			{/* Slide-out Drawer Overlay */}
			{isDrawerOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity dark:bg-black/80"
					onClick={() => setIsDrawerOpen(false)}
				/>
			)}

			{/* Slide-out Drawer Panel */}
			<div
				className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] dark:bg-slate-800 dark:shadow-2xl dark:shadow-slate-900/70 ${
					isDrawerOpen ? "translate-x-0" : "translate-x-full"
				} `}
			>
				{selectedClient && (
					<div className="flex h-full flex-col">
						{/* Drawer Header */}
						<div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
							<div>
								<h2 className="text-xl font-bold text-slate-700 dark:text-white">
									Client Details
								</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									View and edit information
								</p>
							</div>
							<button
								onClick={() => setIsDrawerOpen(false)}
								className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
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
												? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
												: ""
										} ${
											drawerForm.status === ClientStatus.Pending
												? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
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
								<InputField
									label="Full Name"
									name="name"
									value={drawerForm.name}
									onChange={handleInputChange}
								/>

								<InputField
									label="Email Address"
									name="email"
									type="email"
									value={drawerForm.email}
									onChange={handleInputChange}
								/>

								<InputField
									label="Company"
									name="company"
									value={drawerForm.company}
									onChange={handleInputChange}
								/>

								<div className="grid grid-cols-2 gap-4">
									<InputField
										label="Revenue"
										name="revenue"
										type="number"
										value={drawerForm.revenue}
										onChange={handleInputChange}
									/>
									<SelectField
										label="Status"
										name="status"
										value={drawerForm.status}
										onValueChange={(value) =>
											handleStatusChange({
												target: { name: "status", value },
											} as React.ChangeEvent<HTMLSelectElement>)
										}
									>
										<SelectItem value={ClientStatus.Active}>Active</SelectItem>
										<SelectItem value={ClientStatus.Pending}>
											Pending
										</SelectItem>
										<SelectItem value={ClientStatus.Inactive}>
											Inactive
										</SelectItem>
									</SelectField>
								</div>
							</div>

							{/* Mock Activity Feed */}
							<div className="border-t border-slate-100 pt-6 dark:border-slate-800">
								<h4 className="mb-4 font-semibold text-slate-700 dark:text-white">
									Recent Activity
								</h4>
								<div className="space-y-4">
									<div className="flex gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-400"></div>
										<div>
											<p className="text-sm text-slate-800 dark:text-slate-200">
												Invoice #4023 sent
											</p>
											<p className="text-xs text-slate-400 dark:text-slate-500">
												{drawerForm.lastContact}
											</p>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-300"></div>
										<div>
											<p className="text-sm text-slate-800 dark:text-slate-200">
												Email conversation regarding Q3 Budget
											</p>
											<p className="text-xs text-slate-400 dark:text-slate-500">1 month ago</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Drawer Footer */}
						<div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
							<button
								onClick={() => {
									if (window.confirm("Delete this client?")) {
										setClients((prev) =>
											prev.filter((c) => c.id !== selectedClient.id),
										);
										setIsDrawerOpen(false);
									}
								}}
								className="rounded-xl p-3 text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
							>
								<Trash2 size={20} />
							</button>
							<Button onClick={saveDrawerChanges} icon={<Save size={18} />}>
								Save Changes
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ClientDetailDrawer;
