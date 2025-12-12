import type React from "react";
import Button from "@/shared/components/Button"; // Import Button component

interface GlobalSyncSuccessModalProps {
	onClose: () => void;
}

const GlobalSyncSuccessModal: React.FC<GlobalSyncSuccessModalProps> = ({
	onClose,
}) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-xl">
				<h3 className="mb-4 text-xl font-bold text-slate-700">
					Bank Sync Complete!
				</h3>
				<p className="mb-6 text-lg text-slate-600">
					Your financial data has been successfully updated.
				</p>
				<Button variant="primary" onClick={onClose} className="px-10">
					Close
				</Button>
			</div>
		</div>
	);
};

export default GlobalSyncSuccessModal;
