import { buildCard } from './helpers';
import { TopicCard } from '../types';

const outlines = [
  ['Sezione I', 'I principi del diritto civile', 5, 'alta', 'base'],
  ['Sezione I', 'La persona fisica', 5, 'alta', 'base'],
  ['Sezione I', 'Le persone giuridiche e gli enti non riconosciuti', 4, 'media', 'intermedia'],
  ['Sezione II', 'Le cose ed i beni', 4, 'media', 'base'],
  ['Sezione II', 'I diritti reali e il diritto di proprietà', 5, 'alta', 'intermedia'],
  ['Sezione II', 'I diritti reali limitati e le servitù prediali', 3, 'media', 'intermedia'],
  ['Sezione II', 'Il possesso e l’usucapione', 5, 'alta', 'intermedia'],
  ['Sezione III', 'I fatti e gli atti giuridici', 4, 'media', 'base'],
  ['Sezione III', 'Il negozio giuridico', 5, 'alta', 'intermedia'],
  ['Sezione III', 'La rappresentanza', 5, 'alta', 'intermedia'],
  ['Sezione III', 'La patologia del negozio giuridico', 5, 'alta', 'alta'],
  ['Sezione III', 'La pubblicità e la trascrizione', 3, 'media', 'intermedia'],
  ['Sezione IV', 'I diritti di obbligazione', 5, 'alta', 'base'],
  ['Sezione IV', 'Le modificazioni dei soggetti del rapporto obbligatorio', 3, 'media', 'intermedia'],
  ['Sezione IV', 'L’estinzione del rapporto obbligatorio', 5, 'alta', 'intermedia'],
  ['Sezione IV', 'La responsabilità del debitore e la garanzia del creditore', 5, 'alta', 'intermedia'],
  ['Sezione IV', 'Il contratto in generale', 5, 'alta', 'base'],
  ['Sezione IV', 'La formazione del contratto', 5, 'alta', 'intermedia'],
  ['Sezione IV', 'Gli effetti del contratto', 4, 'media', 'intermedia'],
  ['Sezione IV', 'L’interpretazione e l’integrazione del contratto', 4, 'media', 'intermedia'],
  ['Sezione IV', 'L’estinzione del contratto', 4, 'media', 'intermedia'],
  ['Sezione IV', 'Le altre fonti di obbligazione', 4, 'media', 'intermedia'],
  ['Sezione IV', 'I singoli contratti', 3, 'media', 'alta'],
  ['Sezione V', 'Il diritto di famiglia e le nuove formazioni sociali', 3, 'media', 'intermedia'],
  ['Sezione V', 'Il regime patrimoniale della famiglia e delle nuove formazioni sociali', 2, 'bassa', 'intermedia'],
  ['Sezione V', 'La filiazione', 3, 'media', 'intermedia'],
  ['Sezione V', 'Gli alimenti', 2, 'bassa', 'base'],
  ['Sezione V', 'La successione a causa di morte', 5, 'alta', 'intermedia'],
  ['Sezione V', 'L’acquisto dell’eredità e la rinuncia', 4, 'media', 'intermedia'],
  ['Sezione V', 'La successione per legge', 4, 'media', 'intermedia'],
  ['Sezione V', 'La successione testamentaria', 5, 'alta', 'intermedia'],
  ['Sezione V', 'La successione a titolo particolare: il legato', 3, 'media', 'intermedia'],
  ['Sezione V', 'La comunione e la divisione dell’eredità', 2, 'bassa', 'intermedia'],
  ['Sezione V', 'La donazione', 4, 'media', 'intermedia'],
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

export const civileCards: TopicCard[] = outlines.map(([area, topic, priority, examFrequency, difficulty], index) =>
  buildCard({
    id: `civ-${index + 1}`,
    subject: 'civile',
    area,
    topic,
    slug: slugify(topic),
    orderIndex: index + 1,
    priority: priority as 1 | 2 | 3 | 4 | 5,
    examFrequency: examFrequency as 'alta' | 'media' | 'bassa',
    difficulty: difficulty as 'base' | 'intermedia' | 'alta',
    definition: `${topic} è un capitolo fondamentale del diritto civile da esporre con ordine, lessico corretto e visione sistematica.`,
    ratio: `La scheda serve a spiegare ${topic.toLowerCase()} con taglio lineare: definizione, struttura, effetti e collegamenti con gli istituti vicini.`,
    keyNorms: ['Codice civile', 'Disposizioni preliminari', 'Norme speciali se rilevanti'],
    coreElements: ['inquadramento sistematico', 'presupposti', 'disciplina essenziale', 'effetti e rimedi'],
    distinctions: ['distinguere l’istituto dalle figure vicine', 'evitare confusioni tra piano definitorio ed effetti'],
    oralAnswerShort: `${topic} va esposto partendo dalla definizione, proseguendo con funzione, struttura e norme essenziali, e chiudendo con il punto in cui l’istituto si distingue dalle figure vicine.`,
    oralAnswerExtended: `In sede orale conviene presentare ${topic.toLowerCase()} in modo lineare. Prima si fa l’inquadramento generale, poi si richiamano norme, presupposti, effetti e rimedi, e infine si chiariscono i rapporti con gli altri capitoli della materia.`,
    classicQuestions: [
      `Come definiresti ${topic.toLowerCase()}?`,
      `Quali sono i presupposti di ${topic.toLowerCase()}?`,
      `Quali norme richiami quando parli di ${topic.toLowerCase()}?`,
      `Quale collegamento faresti con il resto del programma di civile?`,
    ],
    trapQuestions: [
      `Quale distinzione viene spesso confusa parlando di ${topic.toLowerCase()}?`,
      `Quale errore espositivo bisogna evitare su ${topic.toLowerCase()}?`,
    ],
    miniCase: `Mini-caso: applica ${topic.toLowerCase()} a una vicenda concreta e spiega quali effetti civili ne derivano.`,
    jurisprudenceNotes: `La giurisprudenza rileva soprattutto nella delimitazione dei presupposti, degli effetti e dei rimedi applicabili a ${topic.toLowerCase()}.`,
    linksToOtherCards: index === 0 ? [slugify(outlines[1][1])] : [slugify(outlines[Math.max(0, index - 1)][1]), slugify(outlines[Math.min(outlines.length - 1, index + 1)][1])],
  }),
);
