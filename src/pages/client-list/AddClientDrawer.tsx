import {
	Building,
	ChevronRight,
	DollarSign,
	Mail,
	Save,
	User,
	X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { type Client, ClientStatus } from "@/shared/types/types";
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";

interface AddClientDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	onAddClient: (newClient: Client) => void;
}

const AddClientDrawer: React.FC<AddClientDrawerProps> = ({
	isOpen,
	onClose,
	onAddClient,
}) => {
	const [newClient, setNewClient] = useState<Partial<Client>>({
		name: "",
		email: "",
		company: "",
		revenue: 0,
		status: ClientStatus.Pending,
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setNewClient((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (!newClient.name) newErrors.name = "Name is required.";
		if (!newClient.email) newErrors.email = "Email is required.";
		else if (!/\S+@\S+\.\S+/.test(newClient.email))
			newErrors.email = "Email is invalid.";
		if (!newClient.company) newErrors.company = "Company is required.";
		return newErrors;
	};

	const handleAddClient = () => {
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		const clientToAdd: Client = {
			id: new Date().toISOString(), // Simple unique ID
			...newClient,
			lastContact: new Date().toLocaleDateString(),
		} as Client;

		onAddClient(clientToAdd);
		onClose();
		setNewClient({
			name: "",
			email: "",
			company: "",
			revenue: 0,
			status: ClientStatus.Pending,
		});
		setErrors({});
	};

	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
					onClick={onClose}
				/>
			)}
			<div
				className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] ${
					isOpen ? "translate-x-0" : "translate-x-full"
				} `}
			>
				<div className="flex h-full flex-col">
					{/* Drawer Header */}
					<div className="flex items-center justify-between p-6">
						<div>
							<h2 className="text-xl font-bold text-slate-700">
								Add New Client
							</h2>
							<p className="text-sm text-slate-500">
								Enter the details for the new client.
							</p>
						</div>
						<button
							onClick={onClose}
							className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
						>
							<X size={20} />
						</button>
					</div>

					{/* Drawer Content */}
					<div className="flex-1 space-y-6 overflow-y-auto p-6">
						<div className="space-y-4">
							<InputField
								label="Full Name"
								name="name"
								value={newClient.name}
								onChange={handleInputChange}
								placeholder="e.g., John Doe"
								error={errors.name}
							/>

							<InputField
								label="Email Address"
								name="email"
								type="email"
								value={newClient.email}
								onChange={handleInputChange}
								placeholder="e.g., john.doe@example.com"
								error={errors.email}
							/>

							<InputField
								label="Company"
								name="company"
								value={newClient.company}
								onChange={handleInputChange}
								placeholder="e.g., Acme Inc."
								error={errors.company}
							/>

							<div className="grid grid-cols-2 gap-4">
								<InputField
									label="Revenue"
									name="revenue"
									type="number"
									value={newClient.revenue}
									onChange={handleInputChange}
								/>
								<SelectField
									label="Status"
									name="status"
									value={newClient.status}
									onValueChange={(value) =>
										handleInputChange({
											target: { name: "status", value },
										} as React.ChangeEvent<HTMLSelectElement>)
									}
								>
									<SelectItem value={ClientStatus.Pending}>Pending</SelectItem>
									<SelectItem value={ClientStatus.Active}>Active</SelectItem>
									<SelectItem value={ClientStatus.Inactive}>
										Inactive
									</SelectItem>
								</SelectField>
							</div>
						</div>
					</div>

					{/* Drawer Footer */}
					<div className="flex justify-end border-t border-slate-100 bg-slate-50 p-6">
						<Button
							variant="primary"
							onClick={handleAddClient}
							disabled={
								!newClient.name || !newClient.email || !newClient.company
							}
							icon={<Save size={18} />}
						>
							Add Client
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddClientDrawer;
