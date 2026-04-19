import type { AppData, Subject, Topic } from '@/types';
import { nowIso, uid } from './utils';

const STORAGE_KEY = 'ripasso-orale-smart/v1';
const DATA_VERSION = 1;

export const defaultSettings = () => ({ dailyGoal: 5 });

/** Dati di partenza: materie giuridiche con alcuni argomenti d'esempio. */
export const buildSeedData = (): AppData => {
  const created = nowIso();

  const penale: Subject = {
    id: uid(),
    name: 'Diritto penale',
    description: 'Parte generale e speciale.',
    color: 'rosso',
    createdAt: created,
  };
  const procPenale: Subject = {
    id: uid(),
    name: 'Procedura penale',
    description: 'Atti, indagini, dibattimento e impugnazioni.',
    color: 'petrolio',
    createdAt: created,
  };
  const civile: Subject = {
    id: uid(),
    name: 'Diritto civile',
    description: 'Obbligazioni, contratti, responsabilità.',
    color: 'grigio',
    createdAt: created,
  };

  const mkTopic = (
    subjectId: string,
    title: string,
    note: string,
    priority: Topic['priority'],
    status: Topic['status'],
    confidence: number,
    keywords: string[],
  ): Topic => ({
    id: uid(),
    subjectId,
    title,
    note,
    priority,
    status,
    confidence,
    keywords,
    subtopics: [],
    flashcards: [],
    questions: [],
    lastReviewedAt: null,
    createdAt: created,
    updatedAt: created,
  });

  const topics: Topic[] = [
    mkTopic(
      penale.id,
      'Principio di legalità',
      'Art. 25 Cost., art. 1 e 2 c.p. Riserva di legge, tassatività, irretroattività.',
      'alta',
      'in_ripasso',
      55,
      ['legalità', 'riserva di legge', 'tassatività', 'irretroattività'],
    ),
    mkTopic(
      penale.id,
      'Elemento soggettivo',
      'Dolo, colpa, preterintenzione. Dolo eventuale vs colpa cosciente.',
      'alta',
      'da_studiare',
      30,
      ['dolo', 'colpa', 'preterintenzione', 'dolo eventuale'],
    ),
    mkTopic(
      penale.id,
      'Cause di giustificazione',
      'Legittima difesa, stato di necessità, consenso dell’avente diritto.',
      'media',
      'in_ripasso',
      60,
      ['scriminanti', 'legittima difesa', 'stato di necessità'],
    ),
    mkTopic(
      procPenale.id,
      'Misure cautelari personali',
      'Presupposti ex art. 273-274 c.p.p., principio di proporzionalità e adeguatezza.',
      'alta',
      'da_studiare',
      25,
      ['custodia cautelare', 'gravi indizi', 'esigenze cautelari'],
    ),
    mkTopic(
      procPenale.id,
      'Riti speciali',
      'Giudizio abbreviato, patteggiamento, decreto penale, direttissimo, immediato.',
      'media',
      'in_ripasso',
      50,
      ['abbreviato', 'patteggiamento', 'decreto penale'],
    ),
    mkTopic(
      civile.id,
      'Responsabilità contrattuale',
      'Artt. 1218 e segg.: inadempimento, impossibilità, onere della prova.',
      'media',
      'in_ripasso',
      45,
      ['1218', 'inadempimento', 'onere prova'],
    ),
  ];

  return {
    version: DATA_VERSION,
    subjects: [penale, procPenale, civile],
    topics,
    sessions: [],
    settings: defaultSettings(),
  };
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
    // Assicura campi nuovi introdotti in versioni future (safe default).
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
    // In caso di quota esaurita ignoriamo: l'utente vedrà i dati in memoria.
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
