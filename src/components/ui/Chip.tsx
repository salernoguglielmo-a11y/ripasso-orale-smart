import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

/** Piccolo badge "chip" stilizzato con bordo. */
export function Chip({ children, className, title }: ChipProps) {
  return (
    <span className={cn('chip', className)} title={title}>
      {children}
    </span>
  );
}
