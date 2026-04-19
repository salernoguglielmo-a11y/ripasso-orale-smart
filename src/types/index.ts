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
