import type { ActivityType, Priority, TopicStatus, SessionOutcome } from '@/types';

// Etichette in italiano per gli enum del modello dati.

export const PRIORITY_LABEL: Record<Priority, string> = {
  alta: 'Alta',
  media: 'Media',
  bassa: 'Bassa',
};

export const STATUS_LABEL: Record<TopicStatus, string> = {
  da_studiare: 'Da studiare',
  in_ripasso: 'In ripasso',
  solido: 'Solido',
};

export const ACTIVITY_LABEL: Record<ActivityType, string> = {
  studio: 'Studio',
  ripasso: 'Ripasso',
  flashcard: 'Flashcard',
  simulazione_orale: 'Simulazione orale',
};

export const OUTCOME_LABEL: Record<SessionOutcome, string> = {
  male: 'Male',
  medio: 'Medio',
  bene: 'Bene',
};

export const PRIORITY_OPTIONS: Priority[] = ['alta', 'media', 'bassa'];
export const STATUS_OPTIONS: TopicStatus[] = ['da_studiare', 'in_ripasso', 'solido'];

export const priorityChipClass = (p: Priority): string => {
  switch (p) {
    case 'alta':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'media':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    case 'bassa':
      return 'border-ink-200 bg-ink-50 text-ink-600';
  }
};

export const statusChipClass = (s: TopicStatus): string => {
  switch (s) {
    case 'da_studiare':
      return 'border-ink-200 bg-ink-50 text-ink-700';
    case 'in_ripasso':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    case 'solido':
      return 'border-accent-200 bg-accent-50 text-accent-800';
  }
};
