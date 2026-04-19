import { buildCard } from './helpers';
import { TopicCard } from '../types';

const outlines = [
  ['Parte I', 'Il diritto penale e i suoi principi', 5, 'alta', 'base'],
  ['Parte I', 'L’efficacia della legge penale nel tempo e nello spazio', 5, 'alta', 'intermedia'],
  ['Parte I', 'Il reato in generale', 5, 'alta', 'intermedia'],
  ['Parte I', 'Le cause di esclusione del reato e della pena', 5, 'alta', 'intermedia'],
  ['Parte I', 'Le forme di manifestazione del reato', 5, 'alta', 'intermedia'],
  ['Parte I', 'Il concorso di reati ed il concorso apparente di norme coesistenti', 4, 'media', 'alta'],
  ['Parte I', 'Il concorso di persone nel reato', 5, 'alta', 'intermedia'],
  ['Parte I', 'L’imputabilità e la pena', 5, 'alta', 'intermedia'],
  ['Parte I', 'Le conseguenze civili del reato', 3, 'media', 'intermedia'],
  ['Parte speciale', 'La parte speciale del diritto penale: un’introduzione', 3, 'media', 'base'],
  ['Parte speciale', 'I delitti contro la personalità dello Stato', 2, 'bassa', 'intermedia'],
  ['Parte speciale', 'I delitti contro la pubblica amministrazione', 5, 'alta', 'alta'],
  ['Parte speciale', 'I delitti contro l’amministrazione della giustizia', 4, 'media', 'intermedia'],
  ['Parte speciale', 'I delitti contro l’ordine pubblico', 2, 'bassa', 'intermedia'],
  ['Parte speciale', 'I delitti contro l’incolumità pubblica', 2, 'bassa', 'intermedia'],
  ['Parte speciale', 'I delitti contro l’ambiente', 3, 'media', 'intermedia'],
  ['Parte speciale', 'I reati contro il patrimonio culturale', 1, 'bassa', 'base'],
  ['Parte speciale', 'I delitti contro la fede pubblica', 2, 'bassa', 'intermedia'],
  ['Parte speciale', 'I delitti contro l’economia pubblica, l’industria e il commercio', 2, 'bassa', 'intermedia'],
  ['Parte speciale', 'I delitti contro la persona', 5, 'alta', 'alta'],
  ['Parte speciale', 'I delitti contro il patrimonio', 5, 'alta', 'alta'],
  ['Parte speciale', 'Le altre tipologie di delitti', 1, 'bassa', 'base'],
  ['Parte speciale', 'Le contravvenzioni', 3, 'media', 'base'],
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

export const penaleCards: TopicCard[] = outlines.map(([area, topic, priority, examFrequency, difficulty], index) =>
  buildCard({
    id: `pen-${index + 1}`,
    subject: 'penale',
    area,
    topic,
    slug: slugify(topic),
    orderIndex: index + 1,
    priority: priority as 1 | 2 | 3 | 4 | 5,
    examFrequency: examFrequency as 'alta' | 'media' | 'bassa',
    difficulty: difficulty as 'base' | 'intermedia' | 'alta',
    definition: `${topic} è un capitolo essenziale del diritto penale da conoscere in chiave sistematica e in ottica di esposizione orale.`,
    ratio: `La ratio della scheda è consentire una esposizione lineare di ${topic.toLowerCase()}, mettendo al centro struttura, funzione e problemi applicativi.`,
    keyNorms: ['Costituzione', 'Codice penale', 'Norme speciali se rilevanti'],
    coreElements: [
      `inquadramento sistematico di ${topic.toLowerCase()}`,
      'presupposti applicativi',
      'distinzioni con istituti limitrofi',
      'ricadute pratiche e interpretative',
    ],
    distinctions: [
      `distinguere ${topic.toLowerCase()} dai temi confinanti della stessa parte del programma`,
      'evitare sovrapposizioni con categorie solo apparentemente affini',
    ],
    oralAnswerShort: `${topic} va esposto partendo dalla definizione dell’istituto o del gruppo di reati, proseguendo con la ratio e chiudendo con gli elementi che la commissione usa per verificare se il candidato ha realmente compreso la materia.`,
    oralAnswerExtended: `In sede orale conviene presentare ${topic.toLowerCase()} in modo ordinato. Prima si fa l’inquadramento generale, poi si indicano le norme di riferimento, quindi si illustrano struttura, presupposti, problemi interpretativi e differenze rispetto agli istituti vicini. La chiusura deve sempre richiamare la funzione della disciplina e le ricadute pratiche.`,
    classicQuestions: [
      `Come esporresti ${topic.toLowerCase()} in modo sistematico?`,
      `Quali sono i nodi principali di ${topic.toLowerCase()}?`,
      `Quali norme devi richiamare parlando di ${topic.toLowerCase()}?`,
      `Quali collegamenti faresti con altri capitoli del penale?`,
    ],
    trapQuestions: [
      `Qual è la distinzione che più spesso viene sbagliata in ${topic.toLowerCase()}?`,
      `Quale errore di impostazione bisogna evitare parlando di ${topic.toLowerCase()}?`,
    ],
    miniCase: `Mini-caso: applica ${topic.toLowerCase()} a una fattispecie concreta e spiega quali elementi useresti per qualificare correttamente il fatto.`,
    jurisprudenceNotes: `La giurisprudenza conta soprattutto nella delimitazione dei presupposti e nell’interpretazione delle fattispecie ricomprese in ${topic.toLowerCase()}.`,
    linksToOtherCards: index === 0 ? [slugify(outlines[1][1])] : [slugify(outlines[Math.max(0, index - 1)][1]), slugify(outlines[Math.min(outlines.length - 1, index + 1)][1])],
  }),
);
