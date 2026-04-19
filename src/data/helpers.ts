import { Flashcard, TopicCard } from '../types';

type CardInput = Omit<TopicCard, 'status' | 'classicQuestions' | 'trapQuestions' | 'miniCase' | 'jurisprudenceNotes' | 'commonMistakes' | 'flashcards' | 'checklist'> & {
  classicQuestions?: string[];
  trapQuestions?: string[];
  miniCase?: string;
  jurisprudenceNotes?: string;
  commonMistakes?: string[];
  flashcards?: Flashcard[];
  checklist?: string[];
};

const defaultQuestions = (topic: string): string[] => [
  `Come definiresti ${topic.toLowerCase()}?`,
  `Qual è la ratio di ${topic.toLowerCase()}?`,
  `Quali sono gli elementi essenziali di ${topic.toLowerCase()}?`,
  `Come distingui ${topic.toLowerCase()} dagli istituti vicini?`,
];

const defaultTrapQuestions = (topic: string): string[] => [
  `Qual è l'errore più comune quando si espone ${topic.toLowerCase()}?`,
  `In quale punto ${topic.toLowerCase()} viene spesso confuso con un istituto affine?`,
];

const defaultFlashcards = (topic: string, keyNorms: string[], coreElements: string[]): Flashcard[] => [
  { q: `Qual è il nucleo di ${topic.toLowerCase()}?`, a: coreElements[0] ?? topic },
  { q: `Quale norma devi citare per ${topic.toLowerCase()}?`, a: keyNorms[0] ?? 'Norma di riferimento della materia' },
  { q: `Qual è il secondo elemento utile da ricordare?`, a: coreElements[1] ?? coreElements[0] ?? 'Struttura dell’istituto' },
  { q: `Quale distinzione va subito chiarita?`, a: 'La distinzione dagli istituti vicini indicata nella scheda.' },
  { q: `Come lo chiuderesti in sede orale?`, a: 'Con definizione, ratio, norme essenziali e differenze principali.' },
];

export const buildCard = (input: CardInput): TopicCard => ({
  ...input,
  status: 'non iniziato',
  classicQuestions: input.classicQuestions ?? defaultQuestions(input.topic),
  trapQuestions: input.trapQuestions ?? defaultTrapQuestions(input.topic),
  miniCase: input.miniCase ?? `Caso sintetico: applica ${input.topic.toLowerCase()} a una fattispecie concreta, spiegando presupposti ed esito.`,
  jurisprudenceNotes: input.jurisprudenceNotes ?? `In giurisprudenza conta soprattutto la corretta delimitazione dei presupposti e dei rapporti con gli istituti confinanti.`,
  commonMistakes: input.commonMistakes ?? [
    `Dare una definizione troppo astratta di ${input.topic.toLowerCase()}.`,
    'Saltare la ratio dell’istituto.',
    'Confondere il tema con figure vicine senza esplicitare la differenza.',
  ],
  flashcards: input.flashcards ?? defaultFlashcards(input.topic, input.keyNorms, input.coreElements),
  checklist: input.checklist ?? ['definizione', 'ratio', 'norme essenziali', 'elementi costitutivi', 'distinzioni'],
});
