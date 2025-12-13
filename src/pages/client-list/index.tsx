// src/pages/client-list/index.tsx
import { ChevronRight, Filter, Plus, Search } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import AddClientDrawer from "@/pages/client-list/AddClientDrawer";
import { CLIENTS_DATA } from "@/shared/data/constants";
import type { Client, ClientStatus } from "@/shared/types/types";
import { ClientStatus as ClientStatusEnum } from "@/shared/types/types";
import BulkActionsBar from "./BulkActionsBar";
import ClientDetailDrawer from "./ClientDetailDrawer";
import ClientTable from "./ClientTable";
import ListPageLayout from "@/shared/layout/ListPageLayout";
import Button from "@/shared/components/Button";
import FilterBar from "@/shared/components/FilterBar";
import { InputField } from "@/shared/components/forms";

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
      setSortDirection("asc");
    }
  };

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

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const handleBulkStatusChange = (newStatus: ClientStatus) => {
    setClients((prev) =>
      prev.map((c) =>
        selectedIds.has(c.id) ? { ...c, status: newStatus } : c
      )
    );
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.size} clients?`
      )
    ) {
      setClients((prev) => prev.filter((c) => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
    }
  };

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
    <>
      <ListPageLayout
        heading="Clients"
        subheading="Manage your client relationships"
        actionButton={
          <Button
            onClick={() => setIsAddDrawerOpen(true)}
            icon={<Plus size={18} />}
          >
            Add Client
          </Button>
        }
        filterBar={
          <FilterBar>
            <div className="relative flex-1">
              <InputField
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
                iconPosition="left"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 text-sm text-slate-700 transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:ring-2 focus:ring-pink-500/20 focus:outline-none md:w-48 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  type="button"
                >
                  <span>
                    {statusFilter === "All" ? "All Statuses" : statusFilter}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`rotate-90 text-slate-400 transition-transform ${
                      isStatusFilterOpen ? "rotate-[-90deg] transform" : ""
                    }`}
                  />
                </button>
                {isStatusFilterOpen && (
                  <div className="absolute top-full right-0 z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg md:w-48 dark:border-slate-700 dark:bg-slate-800">
                    <div
                      onClick={() => {
                        setStatusFilter("All");
                        setIsStatusFilterOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setStatusFilter("All");
                          setIsStatusFilterOpen(false);
                        }
                      }}
                      className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                      tabIndex={0}
                    >
                      All Statuses
                    </div>
                    <div
                      onClick={() => {
                        setStatusFilter(ClientStatusEnum.Active);
                        setIsStatusFilterOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setStatusFilter(ClientStatusEnum.Active);
                          setIsStatusFilterOpen(false);
                        }
                      }}
                      className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Active
                    </div>
                    <div
                      onClick={() => {
                        setStatusFilter(ClientStatusEnum.Pending);
                        setIsStatusFilterOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setStatusFilter(ClientStatusEnum.Pending);
                          setIsStatusFilterOpen(false);
                        }
                      }}
                      className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Pending
                    </div>
                    <div
                      onClick={() => {
                        setStatusFilter(ClientStatusEnum.Inactive);
                        setIsStatusFilterOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setStatusFilter(ClientStatusEnum.Inactive);
                          setIsStatusFilterOpen(false);
                        }
                      }}
                      className="cursor-pointer px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Inactive
                    </div>
                  </div>
                )}
              </div>
              <button className="rounded-xl border border-slate-200 bg-white p-3 text-slate-500 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white">
                <Filter size={18} />
              </button>
            </div>
          </FilterBar>
        }
      >
        <BulkActionsBar
          selectedIds={selectedIds}
          handleBulkStatusChange={handleBulkStatusChange}
          handleBulkDelete={handleBulkDelete}
          setSelectedIds={setSelectedIds}
        />
        <ClientTable
          sortedClients={sortedClients}
          selectedIds={selectedIds}
          toggleSelectAll={toggleSelectAll}
          toggleSelection={toggleSelection}
          handleSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          updateClient={updateClient}
          openDrawer={openDrawer}
        />
      </ListPageLayout>

      <AddClientDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAddClient={handleAddClient}
      />

      <ClientDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        selectedClient={selectedClient}
        drawerForm={drawerForm}
        setDrawerForm={setDrawerForm}
        saveDrawerChanges={saveDrawerChanges}
        setClients={setClients}
      />
    </>
  );
};

export default ClientList;
