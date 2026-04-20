// Modello dati dell'applicazione. Mantenuto minimale ed estendibile.

export type Priority = 'alta' | 'media' | 'bassa';
export type TopicStatus = 'da_studiare' | 'in_ripasso' | 'solido';
export type SessionOutcome = 'male' | 'medio' | 'bene';
export type ActivityType =
  | 'studio'
  | 'ripasso'
  | 'flashcard'
  | 'simulazione_orale';

/** Singola flashcard domanda/risposta, collegata a un argomento. */
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: string; // ISO
}

/** Domanda aperta collegata a un argomento (usata nella simulazione orale). */
export interface OpenQuestion {
  id: string;
  text: string;
  createdAt: string;
}

/** Sotto-argomento: un nodo annidato all'interno di un topic. */
export interface Subtopic {
  id: string;
  title: string;
  note?: string;
  done: boolean;
}

/**
 * Scheda di studio estesa, compatibile con le "TopicCard" del repo sorgente.
 * Tutti i campi sono opzionali: un Topic creato a mano dall'utente può non averli,
 * mentre i Topic importati dal programma li popolano per una UI più ricca.
 */
export interface TopicStudyContent {
  area?: string;
  examFrequency?: 'alta' | 'media' | 'bassa';
  difficulty?: 'base' | 'intermedia' | 'alta';
  /** Ordine logico all'interno della materia (1..N). */
  orderIndex?: number;
  definition?: string;
  ratio?: string;
  keyNorms?: string[];
  coreElements?: string[];
  distinctions?: string[];
  oralAnswerShort?: string;
  oralAnswerExtended?: string;
  miniCase?: string;
  jurisprudenceNotes?: string;
  commonMistakes?: string[];
  checklist?: string[];
  /** slug di altre schede collegate. */
  links?: string[];
  /** chiave stabile del programma di provenienza (slug) per dedup. */
  sourceKey?: string;
}

/** Argomento: unità minima che si studia e ripassa. */
export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  note?: string;
  priority: Priority;
  status: TopicStatus;
  /** Confidenza 0-100 gestita dall'utente o aggiornata dall'esito di sessioni. */
  confidence: number;
  /** Parole chiave utili per la ricerca. */
  keywords: string[];
  subtopics: Subtopic[];
  flashcards: Flashcard[];
  questions: OpenQuestion[];
  lastReviewedAt: string | null; // ISO o null se mai ripassato
  createdAt: string;
  updatedAt: string;
  /** Contenuti di studio estesi opzionali (caricati dal programma). */
  study?: TopicStudyContent;
}

/** Materia: raggruppa più argomenti (es. Diritto penale). */
export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: string; // usato come "etichetta" nei chip
  createdAt: string;
}

/** Sessione di studio/ripasso tracciata per lo storico. */
export interface StudySession {
  id: string;
  date: string; // ISO
  type: ActivityType;
  subjectId?: string;
  subjectName?: string;
  topicId?: string;
  topicTitle?: string;
  durationSeconds?: number;
  outcome?: SessionOutcome;
  notes?: string;
}

/** Preferenze utente salvate in localStorage. */
export interface AppSettings {
  dailyGoal: number; // numero di argomenti da ripassare al giorno
}

/** Radice dei dati persistiti. */
export interface AppData {
  version: number;
  subjects: Subject[];
  topics: Topic[];
  sessions: StudySession[];
  settings: AppSettings;
}
