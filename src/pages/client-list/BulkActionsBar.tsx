import { X } from "lucide-react";
import type React from "react";
import { type Client, ClientStatus } from "@/shared/types/types";

interface BulkActionsBarProps {
	selectedIds: Set<string>;
	sortedClients: Client[];
	handleBulkStatusChange: (status: ClientStatus) => void;
	handleBulkDelete: () => void;
	setSelectedIds: (ids: Set<string>) => void;
}

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
	selectedIds,
	handleBulkStatusChange,
	handleBulkDelete,
	setSelectedIds,
}) => {
	if (selectedIds.size === 0) {
		return null;
	}

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-2xl bg-slate-900 px-6 py-3 text-white shadow-xl dark:bg-slate-700">
			<span className="text-sm font-medium">{selectedIds.size} selected</span>
			<div className="h-4 w-px bg-slate-700 dark:bg-slate-600"></div>
			<div className="flex items-center gap-2">
				<button
					onClick={() => handleBulkStatusChange(ClientStatus.Active)}
					className="text-xs font-medium transition-colors hover:text-green-400"
					type="button"
				>
					Set Active
				</button>
				<button
					onClick={() => handleBulkStatusChange(ClientStatus.Inactive)}
					className="text-xs font-medium transition-colors hover:text-slate-400"
					type="button"
				>
					Set Inactive
				</button>
				<button
					onClick={handleBulkDelete}
					className="ml-2 text-xs font-medium text-red-400 transition-colors hover:text-red-300"
					type="button"
				>
					Delete
				</button>
			</div>
			<button onClick={() => setSelectedIds(new Set())} className="ml-2" aria-label="close"
				type="button">
				<X size={16} />
			</button>
		</div>
	);
};

export default BulkActionsBar;
