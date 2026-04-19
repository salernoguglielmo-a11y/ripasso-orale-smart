import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Props {
  onNavigate?: () => void;
}

const links: Array<{ to: string; label: string; icon: string }> = [
  { to: '/', label: 'Dashboard', icon: '◎' },
  { to: '/materie', label: 'Materie', icon: '❖' },
  { to: '/flashcard', label: 'Flashcard', icon: '▭' },
  { to: '/simulazione', label: 'Simulazione orale', icon: '✎' },
  { to: '/storico', label: 'Storico', icon: '⟲' },
  { to: '/impostazioni', label: 'Impostazioni', icon: '⚙' },
];

export function Sidebar({ onNavigate }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink-200 px-5 py-5">
        <div className="font-serif text-xl font-semibold leading-tight">
          Ripasso <span className="text-accent-700">Orale</span>
        </div>
        <p className="mt-1 text-xs text-ink-500">
          Studio, ripasso e simulazione.
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn('nav-link', isActive && 'nav-link-active')
            }
          >
            <span className="w-5 text-center text-ink-400">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
