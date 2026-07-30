import { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const icons = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <div className={`toast toast--${toast.type}`} onClick={() => removeToast(toast.id)}>
      <span style={{ fontWeight: 700 }}>{icons[toast.type]}</span>
      <span>{toast.message}</span>
    </div>
  );
}
