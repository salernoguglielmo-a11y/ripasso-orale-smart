import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-ink-50 text-ink-800">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-ink-200 bg-white md:block">
        <Sidebar />
      </aside>

      {/* Sidebar mobile: drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-ink-200 bg-white shadow-xl">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-200 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            className="rounded p-1 text-ink-700 hover:bg-ink-100"
            onClick={() => setOpen(true)}
            aria-label="Apri menu"
          >
            ☰
          </button>
          <span className="font-serif text-lg font-semibold">
            Ripasso <span className="text-accent-700">Orale</span>
          </span>
          <span className="w-6" />
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>

        <footer className="border-t border-ink-200 bg-white/60 px-4 py-3 text-center text-xs text-ink-400 md:px-8">
          Ripasso Orale Smart · uso personale · dati salvati solo nel tuo
          browser
        </footer>
      </div>
    </div>
  );
}
