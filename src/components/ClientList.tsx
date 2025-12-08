import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Mail, Building, X, Save, Trash2, Check, ChevronRight, User, DollarSign, Calendar, Plus, ArrowDownUp, ChevronLeft } from 'lucide-react';
import { CLIENTS_DATA } from '../data/constants';
import { ClientStatus, Client } from "../types/types";
import AddClientDrawer from './AddClientDrawer';

// Component for Inline Editing
const InlineEditCell: React.FC<{
  value: string | number;
  type?: 'text' | 'number';
  onSave: (val: string) => void;
  className?: string;
  prefix?: string;
}> = ({ value, onSave, type = 'text', className = '', prefix = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(tempValue.toString());
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={() => {
           onSave(tempValue.toString());
           setIsEditing(false);
        }}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border-2 border-violet-500 rounded-md focus:outline-none text-sm bg-white"
        onClick={(e) => e.stopPropagation()} 
      />
    );
  }

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer hover:bg-slate-100 hover:text-violet-700 px-2 py-1 -mx-2 rounded transition-colors border border-transparent hover:border-slate-200 group ${className}`}
      title="Click to edit"
    >
      {prefix}{value}
    </div>
  );
};

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(CLIENTS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Drawer State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [drawerForm, setDrawerForm] = useState<Partial<Client>>({});

  // Pagination & Sorting States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Client | null>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filtering, Sorting, Pagination Logic
  const paginatedAndSortedClients = useMemo(() => {
    let currentClients = clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      currentClients.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    // Apply pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return currentClients.slice(indexOfFirstItem, indexOfLastItem);
  }, [clients, searchQuery, statusFilter, sortField, sortDirection, currentPage, itemsPerPage]);

  const totalClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).length;
  }, [clients, searchQuery, statusFilter]);

  const totalPages = Math.ceil(totalClients / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc'); // Default to ascending for new sort field
    }
  };

  // Selection Logic
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedAndSortedClients.length && paginatedAndSortedClients.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedAndSortedClients.map(c => c.id)));
    }
  };

  // CRUD Operations
  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleAddClient = (newClient: Client) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleBulkStatusChange = (newStatus: ClientStatus) => {
    setClients(prev => prev.map(c => selectedIds.has(c.id) ? { ...c, status: newStatus } : c));
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} clients?`)) {
      setClients(prev => prev.filter(c => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
    }
  };

  // Drawer Handlers
  const openDrawer = (client: Client) => {
    setSelectedClient(client);
    setDrawerForm({ ...client });
    setIsDrawerOpen(true);
  };

  const saveDrawerChanges = () => {
    if (selectedClient && drawerForm) {
      updateClient(selectedClient.id, drawerForm);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="relative p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">Clients</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your client relationships</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsAddDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-medium transition-all shadow-lg shadow-violet-200"
          >
            <Plus size={18} />
            Add Client
          </button>
          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm text-slate-600 dark:text-slate-300"
          >
            <option value="All">All Status</option>
            <option value={ClientStatus.Active}>Active</option>
            <option value={ClientStatus.Pending}>Pending</option>
            <option value={ClientStatus.Inactive}>Inactive</option>
          </select>

          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm text-slate-700 dark:text-white"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6 z-10 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <div className="h-4 w-px bg-slate-700 dark:bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleBulkStatusChange(ClientStatus.Active)}
              className="text-xs font-medium hover:text-green-400 transition-colors"
            >
              Set Active
            </button>
            <button 
              onClick={() => handleBulkStatusChange(ClientStatus.Inactive)}
              className="text-xs font-medium hover:text-slate-400 transition-colors"
            >
              Set Inactive
            </button>
             <button 
              onClick={handleBulkDelete}
              className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors ml-2"
            >
              Delete
            </button>
          </div>
          <button onClick={() => setSelectedIds(new Set())} className="ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                <th className="py-4 px-6 w-12">
                   <input 
                    type="checkbox" 
                    checked={selectedIds.size === paginatedAndSortedClients.length && paginatedAndSortedClients.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500"
                   />
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    Name {sortField === 'name' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('company')}>
                  <div className="flex items-center gap-1">
                    Company {sortField === 'company' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    Status {sortField === 'status' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right cursor-pointer hover:text-slate-700" onClick={() => handleSort('revenue')}>
                  <div className="flex items-center justify-end gap-1">
                    Revenue {sortField === 'revenue' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right cursor-pointer hover:text-slate-700" onClick={() => handleSort('lastContact')}>
                  <div className="flex items-center justify-end gap-1">
                    Last Contact {sortField === 'lastContact' && <ArrowDownUp size={14} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
                  </div>
                </th>
                <th className="py-4 px-6 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {paginatedAndSortedClients.map((client) => (
                <tr 
                  key={client.id} 
                  className={`
                    group transition-colors cursor-pointer
                    ${selectedIds.has(client.id) ? 'bg-violet-50/50 dark:bg-violet-900/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/50'}
                  `}
                  onClick={() => openDrawer(client)}
                >
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(client.id)}
                      onChange={() => toggleSelection(client.id)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700 dark:text-white">
                          <InlineEditCell 
                            value={client.name} 
                            onSave={(val) => updateClient(client.id, { name: val })} 
                          />
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Mail size={10} /> {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <Building size={14} className="text-slate-400 dark:text-slate-500"/>
                        <InlineEditCell 
                            value={client.company} 
                            onSave={(val) => updateClient(client.id, { company: val })} 
                          />
                     </div>
                  </td>
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                     <select
                       value={client.status}
                       onChange={(e) => updateClient(client.id, { status: e.target.value as ClientStatus })}
                       className={`
                        appearance-none pl-3 pr-8 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-violet-500/20 outline-none
                        ${client.status === ClientStatus.Active ? 'bg-green-100 text-green-800' : ''}
                        ${client.status === ClientStatus.Pending ? 'bg-amber-100 text-amber-800' : ''}
                        ${client.status === ClientStatus.Inactive ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200' : ''}
                       `}
                       style={{ backgroundImage: 'none' }} 
                     >
                       <option value={ClientStatus.Active}>Active</option>
                       <option value={ClientStatus.Pending}>Pending</option>
                       <option value={ClientStatus.Inactive}>Inactive</option>
                     </select>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-700 dark:text-white">
                    <InlineEditCell 
                        value={client.revenue} 
                        type="number"
                        prefix="$"
                        className="justify-end"
                        onSave={(val) => updateClient(client.id, { revenue: Number(val) })} 
                    />
                  </td>
                  <td className="py-4 px-6 text-right text-sm text-slate-500 dark:text-slate-400">
                    {client.lastContact}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-300 hover:text-slate-600 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedAndSortedClients.length === 0 && (
                 <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 dark:text-slate-400">
                       No clients found matching your filters.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="p-4 flex justify-between items-center bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <AddClientDrawer 
        isOpen={isAddDrawerOpen} 
        onClose={() => setIsAddDrawerOpen(false)}
        onAddClient={handleAddClient}
      />

      {/* Slide-out Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out
        ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
         {selectedClient && (
           <div className="h-full flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h2 className="text-xl font-bold text-slate-700">Client Details</h2>
                    <p className="text-sm text-slate-500">View and edit information</p>
                 </div>
                 <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <X size={20} />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 
                 {/* Identity Card */}
                 <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold">
                       {drawerForm.name?.charAt(0)}
                    </div>
                    <div>
                       <h3 className="font-bold text-lg text-slate-700 dark:text-white">{drawerForm.name}</h3>
                       <span className={`
                          inline-block px-2 py-0.5 rounded text-xs font-medium mt-1
                          ${drawerForm.status === ClientStatus.Active ? 'bg-green-100 text-green-800' : ''}
                          ${drawerForm.status === ClientStatus.Pending ? 'bg-amber-100 text-amber-800' : ''}
                          ${drawerForm.status === ClientStatus.Inactive ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200' : ''}
                       `}>
                          {drawerForm.status}
                       </span>
                    </div>
                 </div>

                 {/* Form Fields */}
                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Full Name</label>
                       <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                          <User size={18} className="text-slate-400" />
                          <input 
                            type="text" 
                            value={drawerForm.name}
                            onChange={(e) => setDrawerForm({...drawerForm, name: e.target.value})}
                            className="flex-1 outline-none text-sm text-slate-700"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Email Address</label>
                       <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                          <Mail size={18} className="text-slate-400" />
                          <input 
                            type="email" 
                            value={drawerForm.email}
                            onChange={(e) => setDrawerForm({...drawerForm, email: e.target.value})}
                            className="flex-1 outline-none text-sm text-slate-700"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Company</label>
                       <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                          <Building size={18} className="text-slate-400" />
                          <input 
                            type="text" 
                            value={drawerForm.company}
                            onChange={(e) => setDrawerForm({...drawerForm, company: e.target.value})}
                            className="flex-1 outline-none text-sm text-slate-700"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Revenue</label>
                          <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
                             <DollarSign size={18} className="text-slate-400" />
                             <input 
                               type="number" 
                               value={drawerForm.revenue}
                               onChange={(e) => setDrawerForm({...drawerForm, revenue: Number(e.target.value)})}
                               className="flex-1 outline-none text-sm text-slate-700"
                             />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Status</label>
                          <div className="relative">
                             <select
                                value={drawerForm.status}
                                onChange={(e) => setDrawerForm({...drawerForm, status: e.target.value as ClientStatus})}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 appearance-none bg-white"
                             >
                                <option value={ClientStatus.Active}>Active</option>
                                <option value={ClientStatus.Pending}>Pending</option>
                                <option value={ClientStatus.Inactive}>Inactive</option>
                             </select>
                             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronRight size={14} className="rotate-90 text-slate-400" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Mock Activity Feed */}
                 <div className="pt-6 border-t border-slate-100">
                    <h4 className="font-semibold text-slate-700 mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                       <div className="flex gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-violet-400 shrink-0"></div>
                          <div>
                             <p className="text-sm text-slate-800">Invoice #4023 sent</p>
                             <p className="text-xs text-slate-400">{drawerForm.lastContact}</p>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0"></div>
                          <div>
                             <p className="text-sm text-slate-800">Email conversation regarding Q3 Budget</p>
                             <p className="text-xs text-slate-400">1 month ago</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                 <button 
                   onClick={() => {
                      if(window.confirm('Delete this client?')) {
                         setClients(prev => prev.filter(c => c.id !== selectedClient.id));
                         setIsDrawerOpen(false);
                      }
                   }}
                   className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                 >
                    <Trash2 size={20} />
                 </button>
                 <button 
                   onClick={saveDrawerChanges}
                   className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                 >
                    <Save size={18} />
                    Save Changes
                 </button>
              </div>
           </div>
         )}
      </div>

    </div>
  );
};

export default ClientList;