const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-parchment rounded-2xl shadow-xl max-w-sm w-full p-7 border border-ink/10">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <p className="text-sm text-ink/60 mt-2 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 mt-7">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-full border border-ink/15 hover:border-ink/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-full bg-rust text-parchment hover:bg-rust-dark transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
