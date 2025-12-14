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
import { useCallback, useState } from "react";
import { z } from "zod";
import Button from "@/shared/components/Button";
import { InputField, SelectField, SelectItem } from "@/shared/components/forms";
import { type Client, ClientStatus } from "@/shared/types/types";

// Define Zod schema for client validation
const clientSchema = z.object({
	name: z.string().min(1, "Name is required."),
	email: z.string().min(1, "Email is required.").email("Email is invalid."),
	company: z.string().min(1, "Company is required."),
	revenue: z.number().min(0, "Revenue cannot be negative."),
	status: z.nativeEnum(ClientStatus, { message: "Status is required." }),
});

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
	const [errors, setErrors] = useState<Record<string, string | undefined>>({});

	const handleValidatedChange = useCallback(
		(fieldName: keyof Client, value: any, error?: string) => {
			setNewClient((prev) => ({ ...prev, [fieldName]: value }));
			setErrors((prev) => ({ ...prev, [fieldName]: error }));
		},
		[],
	);

	const handleAddClient = () => {
		// Validate all fields on submission
		const validationResult = clientSchema.safeParse(newClient);

		if (!validationResult.success) {
			const newErrors: Record<string, string> = {};
			validationResult.error.errors.forEach((err) => {
				if (err.path.length > 0) {
					newErrors[err.path[0]] = err.message;
				}
			});
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
								onValidatedChange={(value, error) =>
									handleValidatedChange("name", value, error)
								}
								schema={clientSchema
									.pick({ name: true })
									.transform((val) => val.name)}
								placeholder="e.g. John Doe"
								error={errors.name}
							/>

							<InputField
								label="Email Address"
								name="email"
								type="email"
								value={newClient.email}
								onValidatedChange={(value, error) =>
									handleValidatedChange("email", value, error)
								}
								schema={clientSchema
									.pick({ email: true })
									.transform((val) => val.email)}
								placeholder="e.g. john.doe@example.com"
								error={errors.email}
							/>

							<InputField
								label="Company"
								name="company"
								value={newClient.company}
								onValidatedChange={(value, error) =>
									handleValidatedChange("company", value, error)
								}
								schema={clientSchema
									.pick({ company: true })
									.transform((val) => val.company)}
								placeholder="e.g. Acme Inc."
								error={errors.company}
							/>

							<div className="grid grid-cols-2 gap-4">
								<InputField
									label="Revenue"
									name="revenue"
									type="number"
									format="currency" // Assuming currency formatting for revenue
									value={newClient.revenue}
									onValidatedChange={(value, error) =>
										handleValidatedChange(
											"revenue",
											parseFloat(value as string),
											error,
										)
									}
									schema={clientSchema
										.pick({ revenue: true })
										.transform((val) => val.revenue)}
									error={errors.revenue}
								/>
								<SelectField
									label="Status"
									name="status"
									value={newClient.status}
									onValidatedChange={(value, error) =>
										handleValidatedChange("status", value, error)
									}
									schema={clientSchema
										.pick({ status: true })
										.transform((val) => val.status)}
									error={errors.status}
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
