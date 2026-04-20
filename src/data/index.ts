import { TopicCard } from '../types';
import { penaleCards } from './penale';
import { civileCards } from './civile';
import { procPenaleCards } from './procPenale';

export const cards: TopicCard[] = [...penaleCards, ...civileCards, ...procPenaleCards];

export const cardsBySubject = {
  penale: penaleCards,
  civile: civileCards,
  proc_penale: procPenaleCards,
} as const;
