import {
  ArrowDownUp,
  Building,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Filter,
  Mail,
  MoreVertical,
  Plus,
  Save,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { CLIENTS_DATA } from "@/data/constants";
import { type Client, ClientStatus } from "@/types/types";
import AddClientDrawer from "@/components/utils/AddClientDrawer";

// Component for Inline Editing
const InlineEditCell: React.FC<{
  value: string | number;
  type?: "text" | "number";
  onSave: (val: string) => void;
  className?: string;
  prefix?: string;
}> = ({ value, onSave, type = "text", className = "", prefix = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSave(tempValue.toString());
      setIsEditing(false);
    } else if (e.key === "Escape") {
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
        className="w-full rounded-md border-2 border-pink-500 bg-white px-2 py-1 text-sm focus:outline-none"
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
      className={`group -mx-2 cursor-pointer rounded border border-transparent px-2 py-1 transition-colors hover:border-slate-200 hover:bg-slate-100 hover:text-pink-700 ${className}`}
      title="Click to edit"
    >
      {prefix}
      {value}
    </div>
  );
};

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(CLIENTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Drawer State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [drawerForm, setDrawerForm] = useState<Partial<Client>>({});

  // Sorting States
  const [sortField, setSortField] = useState<keyof Client | null>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtering, Sorting, Pagination Logic
  const sortedClients = useMemo(() => {
    const currentClients = clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      currentClients.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return currentClients;
  }, [clients, searchQuery, statusFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc"); // Default to ascending for new sort field
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
    if (selectedIds.size === sortedClients.length && sortedClients.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedClients.map((c) => c.id)));
    }
  };

  // CRUD Operations
  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const handleBulkStatusChange = (newStatus: ClientStatus) => {
    setClients((prev) =>
      prev.map((c) =>
        selectedIds.has(c.id) ? { ...c, status: newStatus } : c,
      ),
    );
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.size} clients?`,
      )
    ) {
      setClients((prev) => prev.filter((c) => !selectedIds.has(c.id)));
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
    <div className="relative mx-auto min-h-full max-w-[1600px] p-6 lg:p-10">
      {/* Header & Controls */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">
            Clients
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your client relationships
          </p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:ring-2 focus:ring-pink-500/20 focus:outline-none md:w-48 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <span>
                {statusFilter === "All" ? "All Statuses" : statusFilter}
              </span>
              <ChevronRight
                size={14}
                className={`rotate-90 text-slate-400 transition-transform ${isStatusFilterOpen ? "rotate-[-90deg] transform" : ""}`}
              />
            </button>
            {isStatusFilterOpen && (
              <div className="absolute top-full left-0 z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div
                  onClick={() => {
                    setStatusFilter("All");
                    setIsStatusFilterOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  All Statuses
                </div>
                <div
                  onClick={() => {
                    setStatusFilter(ClientStatus.Active);
                    setIsStatusFilterOpen(false);
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
                  className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Pending
                </div>
                <div
                  onClick={() => {
                    setStatusFilter(ClientStatus.Inactive);
                    setIsStatusFilterOpen(false);
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
          <button
            onClick={() => setIsAddDrawerOpen(true)}
            className="bg-violet-600 flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
          >
            <Plus size={18} />
            Add Client
          </button>
        </div>
      </div>

      {/* Bulk Actions Floating Bar */}
      {selectedIds.size > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-2xl bg-slate-900 px-6 py-3 text-white shadow-xl dark:bg-slate-700">
          <span className="text-sm font-medium">
            {selectedIds.size} selected
          </span>
          <div className="h-4 w-px bg-slate-700 dark:bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange(ClientStatus.Active)}
              className="text-xs font-medium transition-colors hover:text-green-400"
            >
              Set Active
            </button>
            <button
              onClick={() => handleBulkStatusChange(ClientStatus.Inactive)}
              className="text-xs font-medium transition-colors hover:text-slate-400"
            >
              Set Inactive
            </button>
            <button
              onClick={handleBulkDelete}
              className="ml-2 text-xs font-medium text-red-400 transition-colors hover:text-red-300"
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
                  className={`group cursor-pointer border-b border-slate-100 transition-colors focus:outline-none dark:border-slate-700 ${selectedIds.has(client.id) ? "bg-pink-50/50 dark:bg-pink-900/20" : "hover:bg-slate-50/50 dark:hover:bg-slate-700/50"} `}
                  onClick={() => openDrawer(client)}
                >
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={client.status}
                      onChange={(e) =>
                        updateClient(client.id, {
                          status: e.target.value as ClientStatus,
                        })
                      }
                      className={`cursor-pointer appearance-none rounded-full border-0 px-4 py-1 text-center text-xs font-medium outline-none focus:ring-2 focus:ring-pink-500/20 ${client.status === ClientStatus.Active ? "bg-green-100 text-green-800" : ""} ${client.status === ClientStatus.Pending ? "bg-amber-100 text-amber-800" : ""} ${client.status === ClientStatus.Inactive ? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200" : ""} `}
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

      <AddClientDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAddClient={handleAddClient}
      />

      {/* Slide-out Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} `}
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
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${drawerForm.status === ClientStatus.Active ? "bg-green-100 text-green-800" : ""} ${drawerForm.status === ClientStatus.Pending ? "bg-amber-100 text-amber-800" : ""} ${drawerForm.status === ClientStatus.Inactive ? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200" : ""} `}
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
    </div>
  );
};

export default ClientList;
