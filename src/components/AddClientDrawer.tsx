import React, { useState } from 'react';
import { X, Save, User, Mail, Building, DollarSign, ChevronRight } from 'lucide-react';
import { Client, ClientStatus } from '../types/types';

interface AddClientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (newClient: Client) => void;
}

const AddClientDrawer: React.FC<AddClientDrawerProps> = ({ isOpen, onClose, onAddClient }) => {
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    email: '',
    company: '',
    revenue: 0,
    status: ClientStatus.Pending,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newClient.name) newErrors.name = 'Name is required.';
    if (!newClient.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(newClient.email)) newErrors.email = 'Email is invalid.';
    if (!newClient.company) newErrors.company = 'Company is required.';
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
      name: '',
      email: '',
      company: '',
      revenue: 0,
      status: ClientStatus.Pending,
    });
    setErrors({});
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-700">Add New Client</h2>
              <p className="text-sm text-slate-500">Enter the details for the new client.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Full Name</label>
                <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all ${errors.name ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500'}`}>
                  <User size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={newClient.name}
                    onChange={handleInputChange}
                    className="flex-1 outline-none text-sm text-slate-700 bg-transparent"
                    placeholder="e.g., John Doe"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Email Address</label>
                <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all ${errors.email ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500'}`}>
                  <Mail size={18} className="text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    value={newClient.email}
                    onChange={handleInputChange}
                    className="flex-1 outline-none text-sm text-slate-700 bg-transparent"
                    placeholder="e.g., john.doe@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Company</label>
                <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all ${errors.company ? 'border-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500'}`}>
                  <Building size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    name="company"
                    value={newClient.company}
                    onChange={handleInputChange}
                    className="flex-1 outline-none text-sm text-slate-700 bg-transparent"
                    placeholder="e.g., Acme Inc."
                  />
                </div>
                {errors.company && <p className="text-xs text-red-500 mt-1 ml-1">{errors.company}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Revenue</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                    <DollarSign size={18} className="text-slate-400" />
                    <input 
                      type="number" 
                      name="revenue"
                      value={newClient.revenue}
                      onChange={handleInputChange}
                      className="flex-1 outline-none text-sm text-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Status</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={newClient.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 appearance-none bg-white"
                    >
                      <option value={ClientStatus.Pending}>Pending</option>
                      <option value={ClientStatus.Active}>Active</option>
                      <option value={ClientStatus.Inactive}>Inactive</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronRight size={14} className="rotate-90 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button 
              onClick={handleAddClient}
              disabled={!newClient.name || !newClient.email || !newClient.company}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-violet-200 disabled:bg-violet-400 disabled:cursor-not-allowed"
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
