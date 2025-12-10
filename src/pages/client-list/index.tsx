import type React from "react";
import { useMemo, useState } from "react";
import AddClientDrawer from "@/pages/client-list/AddClientDrawer";
import Header from "@/shared/layout/Header";
import { CLIENTS_DATA } from "@/shared/data/constants";
import type { Client, ClientStatus } from "@/shared/types/types";
import BulkActionsBar from "./BulkActionsBar";
import ClientDetailDrawer from "./ClientDetailDrawer";
import ClientListHeader from "./ClientListHeader";
import ClientTable from "./ClientTable";

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
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
      {/* Header & Controls */}
      <Header
        heading="Clients"
        subheading="Manage your client relationships"
        className="mb-8"
      >
        {" "}
        <ClientListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setIsAddDrawerOpen={setIsAddDrawerOpen}
          isStatusFilterOpen={isStatusFilterOpen}
          setIsStatusFilterOpen={setIsStatusFilterOpen}
        />
      </Header>

      {/* Bulk Actions Floating Bar */}
      <BulkActionsBar
        selectedIds={selectedIds}
        handleBulkStatusChange={handleBulkStatusChange}
        handleBulkDelete={handleBulkDelete}
        setSelectedIds={setSelectedIds}
      />
      {/* Main Table */}
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
    </div>
  );
};

export default ClientList;
