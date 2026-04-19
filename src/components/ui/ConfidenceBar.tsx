import { clamp } from '@/lib/utils';

interface Props {
  value: number; // 0..100
  showLabel?: boolean;
}

/** Barra orizzontale che rappresenta la confidenza su un argomento. */
export function ConfidenceBar({ value, showLabel = true }: Props) {
  const v = clamp(Math.round(value), 0, 100);
  const tone =
    v >= 70
      ? 'bg-accent-600'
      : v >= 40
        ? 'bg-amber-500'
        : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div className={`h-full ${tone}`} style={{ width: `${v}%` }} />
      </div>
      {showLabel && (
        <span className="w-10 text-right text-xs font-medium text-ink-600">{v}%</span>
      )}
    </div>
  );
}
