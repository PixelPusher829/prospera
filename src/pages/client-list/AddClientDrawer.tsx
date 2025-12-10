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
        className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] ${isOpen ? "translate-x-0" : "translate-x-full"} `}
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
              <div>
                <label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
                  Full Name
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${errors.name ? "border-red-500" : "border-slate-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"}`}
                >
                  <User size={18} className="text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
                    placeholder="e.g., John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 ml-1 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
                  Email Address
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${errors.email ? "border-red-500" : "border-slate-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"}`}
                >
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
                    placeholder="e.g., john.doe@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 ml-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
                  Company
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${errors.company ? "border-red-500" : "border-slate-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"}`}
                >
                  <Building size={18} className="text-slate-400" />
                  <input
                    type="text"
                    name="company"
                    value={newClient.company}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
                    placeholder="e.g., Acme Inc."
                  />
                </div>
                {errors.company && (
                  <p className="mt-1 ml-1 text-xs text-red-500">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 ml-1 block text-xs font-semibold text-slate-500 uppercase">
                    Revenue
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition-all focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
                    <DollarSign size={18} className="text-slate-400" />
                    <input
                      type="number"
                      name="revenue"
                      value={newClient.revenue}
                      onChange={handleInputChange}
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
                      name="status"
                      value={newClient.status}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                    >
                      <option value={ClientStatus.Pending}>Pending</option>
                      <option value={ClientStatus.Active}>Active</option>
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
          </div>

          {/* Drawer Footer */}
          <div className="flex justify-end border-t border-slate-100 bg-slate-50 p-6">
            <button
              onClick={handleAddClient}
              disabled={
                !newClient.name || !newClient.email || !newClient.company
              }
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all disabled:cursor-not-allowed disabled:bg-violet-400"
            >
              <Save size={18} />
              Add Client
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientDrawer;
