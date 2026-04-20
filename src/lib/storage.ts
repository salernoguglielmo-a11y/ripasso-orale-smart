import type { AppData, Subject, Topic } from '@/types';
import { nowIso, uid } from './utils';
import {
  PROGRAMMA_CARDS,
  PROGRAMMA_SUBJECTS,
  type ProgrammaCard,
  type ProgrammaSubjectKey,
} from '@/data/programma';

const STORAGE_KEY = 'ripasso-orale-smart/v1';
const DATA_VERSION = 1;

export const defaultSettings = () => ({ dailyGoal: 5 });

/**
 * Costruisce subjects + topics a partire dal programma importato dal repo sorgente.
 * Usato sia come seed iniziale sia dalla funzione di merge in caso di re-import.
 */
const buildFromProgramma = (): { subjects: Subject[]; topics: Topic[] } => {
  const created = nowIso();
  const subjectByKey = new Map<ProgrammaSubjectKey, Subject>();

  const subjects: Subject[] = PROGRAMMA_SUBJECTS.map((s) => {
    const subject: Subject = {
      id: uid(),
      name: s.name,
      description: s.description,
      color: s.color,
      createdAt: created,
    };
    subjectByKey.set(s.key, subject);
    return subject;
  });

  const topics: Topic[] = PROGRAMMA_CARDS.map((c) =>
    cardToTopic(c, subjectByKey.get(c.subjectKey)!.id, created),
  );

  return { subjects, topics };
};

/** Converte una singola scheda del programma in un Topic del nostro modello. */
const cardToTopic = (c: ProgrammaCard, subjectId: string, created: string): Topic => {
  const flashcards = c.flashcards.map((f) => ({
    id: uid(),
    question: f.q,
    answer: f.a,
    createdAt: created,
  }));
  const questions = [...c.classicQuestions, ...c.trapQuestions].map((t) => ({
    id: uid(),
    text: t,
    createdAt: created,
  }));
  // La nota sintetica è una distillazione leggibile: l'utente vede comunque
  // la scheda completa nella sezione "Scheda di studio" del TopicDetail.
  const note = [c.definition, c.ratio ? `Ratio: ${c.ratio}` : null]
    .filter(Boolean)
    .join('\n\n');
  return {
    id: uid(),
    subjectId,
    title: c.title,
    note,
    priority: c.priority,
    status: 'da_studiare',
    confidence: 0,
    keywords: c.keywords,
    subtopics: [],
    flashcards,
    questions,
    lastReviewedAt: null,
    createdAt: created,
    updatedAt: created,
    study: {
      area: c.area,
      examFrequency: c.examFrequency,
      difficulty: c.difficulty,
      orderIndex: c.orderIndex,
      definition: c.definition,
      ratio: c.ratio,
      keyNorms: c.keyNorms,
      coreElements: c.coreElements,
      distinctions: c.distinctions,
      oralAnswerShort: c.oralAnswerShort,
      oralAnswerExtended: c.oralAnswerExtended,
      miniCase: c.miniCase,
      jurisprudenceNotes: c.jurisprudenceNotes,
      commonMistakes: c.commonMistakes,
      checklist: c.checklist,
      sourceKey: c.key,
    },
  };
};

/** Dati di partenza: programma completo di penale, civile e procedura penale. */
export const buildSeedData = (): AppData => {
  const { subjects, topics } = buildFromProgramma();
  return {
    version: DATA_VERSION,
    subjects,
    topics,
    sessions: [],
    settings: defaultSettings(),
  };
};

/**
 * Unisce il programma ai dati correnti senza distruggere il progresso:
 * - se una materia del programma non esiste, la crea
 * - se un argomento del programma (match per sourceKey o titolo+materia) non esiste, lo crea
 * - altrimenti lascia l'argomento esistente intatto
 */
export const mergeProgrammaInto = (data: AppData): AppData => {
  const created = nowIso();
  const subjects = [...data.subjects];
  const topics = [...data.topics];
  const subjectByKey = new Map<ProgrammaSubjectKey, Subject>();

  for (const ps of PROGRAMMA_SUBJECTS) {
    const existing = subjects.find(
      (s) => s.name.toLowerCase() === ps.name.toLowerCase(),
    );
    if (existing) {
      subjectByKey.set(ps.key, existing);
    } else {
      const created_s: Subject = {
        id: uid(),
        name: ps.name,
        description: ps.description,
        color: ps.color,
        createdAt: created,
      };
      subjects.push(created_s);
      subjectByKey.set(ps.key, created_s);
    }
  }

  for (const card of PROGRAMMA_CARDS) {
    const subject = subjectByKey.get(card.subjectKey);
    if (!subject) continue;
    const already = topics.find(
      (t) =>
        t.subjectId === subject.id &&
        (t.study?.sourceKey === card.key ||
          t.title.toLowerCase() === card.title.toLowerCase()),
    );
    if (already) continue;
    topics.push(cardToTopic(card, subject.id, created));
  }

  return { ...data, subjects, topics };
};

const isValidData = (d: unknown): d is AppData => {
  if (!d || typeof d !== 'object') return false;
  const x = d as Partial<AppData>;
  return (
    typeof x.version === 'number' &&
    Array.isArray(x.subjects) &&
    Array.isArray(x.topics) &&
    Array.isArray(x.sessions) &&
    !!x.settings
  );
};

/** Carica i dati da localStorage; se mancano o sono corrotti, genera i dati seed. */
export const loadData = (): AppData => {
  if (typeof window === 'undefined') return buildSeedData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = buildSeedData();
      saveData(seed);
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (!isValidData(parsed)) {
      const seed = buildSeedData();
      saveData(seed);
      return seed;
    }
    return {
      version: DATA_VERSION,
      subjects: parsed.subjects,
      topics: parsed.topics.map((t) => ({
        ...t,
        subtopics: t.subtopics ?? [],
        flashcards: t.flashcards ?? [],
        questions: t.questions ?? [],
        keywords: t.keywords ?? [],
      })),
      sessions: parsed.sessions,
      settings: { ...defaultSettings(), ...parsed.settings },
    };
  } catch {
    const seed = buildSeedData();
    saveData(seed);
    return seed;
  }
};

export const saveData = (data: AppData): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota esaurita: l'utente vedrà comunque i dati in memoria.
  }
};

export const resetData = (): AppData => {
  const seed = buildSeedData();
  saveData(seed);
  return seed;
};

export const exportData = (data: AppData): string =>
  JSON.stringify(data, null, 2);

export const importData = (raw: string): AppData => {
  const parsed = JSON.parse(raw);
  if (!isValidData(parsed)) {
    throw new Error('Formato JSON non valido.');
  }
  saveData(parsed);
  return parsed;
};

export const STORAGE_CONSTANTS = { STORAGE_KEY, DATA_VERSION };
