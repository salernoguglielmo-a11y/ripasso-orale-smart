import type { Topic } from '@/types';
import { daysBetween } from './utils';

// Algoritmo di suggerimento: punteggio più alto = priorità di ripasso più urgente.
// Combina in modo trasparente priorità, bassa confidenza, giorni dall'ultimo ripasso e stato.

const priorityWeight = (p: Topic['priority']) =>
  p === 'alta' ? 40 : p === 'media' ? 22 : 10;

const statusWeight = (s: Topic['status']) =>
  s === 'da_studiare' ? 30 : s === 'in_ripasso' ? 18 : 0;

/** Calcola un punteggio di urgenza per un argomento. */
export const reviewScore = (t: Topic, today = new Date()): number => {
  const pr = priorityWeight(t.priority);
  const st = statusWeight(t.status);
  const confGap = Math.max(0, 100 - t.confidence); // 0..100
  const daysSince = daysBetween(t.lastReviewedAt, today);
  // Dopo 30 giorni si satura; le cose mai ripassate prendono il massimo.
  const timeFactor = Number.isFinite(daysSince)
    ? Math.min(daysSince, 30)
    : 30;
  return pr + st + confGap * 0.6 + timeFactor * 1.2;
};

/** Restituisce gli argomenti ordinati dal più al meno urgente, escludendo i già ripassati oggi. */
export const suggestReviewOrder = (topics: Topic[], today = new Date()): Topic[] => {
  return [...topics]
    .filter((t) => {
      if (!t.lastReviewedAt) return true;
      const d = new Date(t.lastReviewedAt);
      const sameDay =
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate();
      // Anche se ripassato oggi, se confidenza < 40 e priorità alta va riproposto.
      if (sameDay && !(t.confidence < 40 && t.priority === 'alta')) return false;
      return true;
    })
    .sort((a, b) => reviewScore(b, today) - reviewScore(a, today));
};

/** Primi N suggerimenti. */
export const topSuggestions = (topics: Topic[], n = 5): Topic[] =>
  suggestReviewOrder(topics).slice(0, n);
