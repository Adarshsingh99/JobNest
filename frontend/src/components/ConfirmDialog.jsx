export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog__icon">🗑️</div>
        <div className="confirm-dialog__title">{title}</div>
        <div className="confirm-dialog__text">{message}</div>
        <div className="confirm-dialog__actions">
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
