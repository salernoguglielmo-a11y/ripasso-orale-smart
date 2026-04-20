import { buildCard } from './helpers';
import { TopicCard } from '../types';

const outlines = [
  ['Parte IV', 'Il diritto processuale penale e i suoi principi', 5, 'alta', 'base'],
  ['Parte IV', 'I soggetti del procedimento penale', 5, 'alta', 'intermedia'],
  ['Parte IV', 'Gli atti e le loro patologie', 5, 'alta', 'alta'],
  ['Parte IV', 'Le prove', 5, 'alta', 'intermedia'],
  ['Parte IV', 'Le misure cautelari', 5, 'alta', 'alta'],
  ['Parte IV', 'La notizia di reato e le condizioni di procedibilità', 4, 'media', 'intermedia'],
  ['Parte IV', 'Le indagini preliminari', 5, 'alta', 'intermedia'],
  ['Parte IV', 'L’udienza preliminare', 5, 'alta', 'intermedia'],
  ['Parte IV', 'I procedimenti speciali', 5, 'alta', 'intermedia'],
  ['Parte IV', 'Il dibattimento', 5, 'alta', 'intermedia'],
  ['Parte IV', 'Le impugnazioni', 5, 'alta', 'intermedia'],
  ['Parte IV', 'Il giudicato penale', 3, 'media', 'intermedia'],
  ['Parte IV', 'Il procedimento davanti al tribunale in composizione monocratica, quello al giudice di pace e il procedimento minorile', 2, 'bassa', 'alta'],
  ['Parte IV', 'I rapporti con le autorità straniere', 1, 'bassa', 'intermedia'],
] as const;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[àá]/g, 'a')
    .replace(/[èé]/g, 'e')
    .replace(/[ìí]/g, 'i')
    .replace(/[òó]/g, 'o')
    .replace(/[ùú]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const procPenaleCards: TopicCard[] = outlines.map(([area, topic, priority, examFrequency, difficulty], index) =>
  buildCard({
    id: `pp-${index + 1}`,
    subject: 'proc_penale',
    area,
    topic,
    slug: slugify(topic),
    orderIndex: index + 1,
    priority: priority as 1 | 2 | 3 | 4 | 5,
    examFrequency: examFrequency as 'alta' | 'media' | 'bassa',
    difficulty: difficulty as 'base' | 'intermedia' | 'alta',
    definition: `${topic} è un capitolo essenziale della procedura penale e va studiato come snodo del procedimento.`,
    ratio: `La scheda serve a spiegare ${topic.toLowerCase()} in modo ordinato, evidenziando funzione, presupposti, garanzie e rapporti con le altre fasi del processo.`,
    keyNorms: ['Costituzione', 'Codice di procedura penale', 'Norme speciali se rilevanti'],
    coreElements: ['inquadramento sistematico', 'presupposti applicativi', 'garanzie difensive', 'effetti processuali'],
    distinctions: ['distinguere l’istituto da quelli vicini della stessa fase', 'evitare confusioni tra presupposti, effetti e rimedi'],
    oralAnswerShort: `${topic} va esposto chiarendo anzitutto dove si colloca nel procedimento, quale funzione svolge e quali presupposti richiede.`,
    oralAnswerExtended: `In sede orale conviene presentare ${topic.toLowerCase()} come parte di una sequenza procedimentale. Prima si individua la collocazione nel codice, poi si illustrano funzione, presupposti, disciplina essenziale e ricadute sulle garanzie difensive.`,
    classicQuestions: [
      `Come collochi ${topic.toLowerCase()} nel procedimento penale?`,
      `Qual è la funzione di ${topic.toLowerCase()}?`,
      `Quali presupposti e quali garanzie devi richiamare parlando di ${topic.toLowerCase()}?`,
      `Quale collegamento faresti con la fase precedente o successiva?`,
    ],
    trapQuestions: [
      `Quale distinzione viene più spesso sbagliata in ${topic.toLowerCase()}?`,
      `Quale errore di inquadramento bisogna evitare parlando di ${topic.toLowerCase()}?`,
    ],
    miniCase: `Mini-caso: applica ${topic.toLowerCase()} a una vicenda processuale concreta e spiega quale sarebbe il corretto sviluppo procedimentale.`,
    jurisprudenceNotes: `La giurisprudenza rileva soprattutto nel chiarire presupposti, limiti e garanzie operative di ${topic.toLowerCase()}.`,
    linksToOtherCards: index === 0 ? [slugify(outlines[1][1])] : [slugify(outlines[Math.max(0, index - 1)][1]), slugify(outlines[Math.min(outlines.length - 1, index + 1)][1])],
  }),
);
