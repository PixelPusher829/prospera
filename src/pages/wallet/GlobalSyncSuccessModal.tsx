import type React from "react";

interface GlobalSyncSuccessModalProps {
	onClose: () => void;
}

const GlobalSyncSuccessModal: React.FC<GlobalSyncSuccessModalProps> = ({
	onClose,
}) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="m-4 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
				<h3 className="mb-4 text-xl font-bold text-slate-700">
					Bank Sync Complete!
				</h3>
				<p className="mb-6 text-slate-600">
					Your financial data has been successfully updated.
				</p>
				<button
					onClick={onClose}
					className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all hover:bg-violet-700"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default GlobalSyncSuccessModal;
