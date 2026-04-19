import { useEffect, type ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Nasconde padding interno, utile quando il contenuto include già la form. */
  size?: 'sm' | 'md' | 'lg';
}

/** Modal accessibile minimale con chiusura via ESC o overlay. */
export function Modal({ open, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const maxW =
    size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxW} overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3">
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="rounded p-1 text-ink-500 hover:bg-ink-100 hover:text-ink-800"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto scroll-thin px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
