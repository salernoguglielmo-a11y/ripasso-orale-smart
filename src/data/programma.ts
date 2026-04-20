// Programma di studio importato dal repository Ripasso_claude_orale.
// Contiene materiale di ripasso per Diritto penale, Diritto civile e Procedura penale.
// Non modificare a mano: rigenerare dal repo sorgente se necessario.

import type { Priority } from '@/types';

export type ProgrammaSubjectKey = 'penale' | 'civile' | 'proc_penale';
export type ExamFrequency = 'alta' | 'media' | 'bassa';
export type Difficulty = 'base' | 'intermedia' | 'alta';

export interface ProgrammaSubject {
  key: ProgrammaSubjectKey;
  name: string;
  description: string;
  color: string;
}

export interface ProgrammaCard {
  key: string;                // slug sorgente, per dedup
  subjectKey: ProgrammaSubjectKey;
  area: string;
  title: string;
  /** Ordine logico all'interno del programma della materia (1..N). */
  orderIndex: number;
  priority: Priority;         // mapping da 1..5
  examFrequency: ExamFrequency;
  difficulty: Difficulty;
  keywords: string[];
  definition: string;
  ratio: string;
  keyNorms: string[];
  coreElements: string[];
  distinctions: string[];
  oralAnswerShort: string;
  oralAnswerExtended: string;
  classicQuestions: string[];
  trapQuestions: string[];
  miniCase: string;
  jurisprudenceNotes: string;
  commonMistakes: string[];
  checklist: string[];
  flashcards: { q: string; a: string }[];
}

export const PROGRAMMA_SUBJECTS: ProgrammaSubject[] = [
  { key: 'penale', name: 'Diritto penale', description: 'Parte generale e speciale, elemento soggettivo, cause di giustificazione.', color: 'rosso' },
  { key: 'civile', name: 'Diritto civile', description: 'Obbligazioni, contratto, responsabilità contrattuale ed extracontrattuale.', color: 'grigio' },
  { key: 'proc_penale', name: 'Procedura penale', description: 'Principi, atti, indagini, dibattimento, impugnazioni e patologie.', color: 'petrolio' },
];

export const PROGRAMMA_CARDS: ProgrammaCard[] = [
  {
    "key": "principio-di-legalita",
    "subjectKey": "penale",
    "area": "Parte generale",
    "title": "Principio di legalità",
    "orderIndex": 1,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "base",
    "keywords": [
      "riserva di legge",
      "tassatività e determinatezza",
      "irretroattività sfavorevole",
      "divieto di analogia in malam partem"
    ],
    "definition": "Il principio di legalità impone che nessuno possa essere punito per un fatto che non sia espressamente previsto come reato dalla legge, né con pene non stabilite dalla legge.",
    "ratio": "Garantire prevedibilità, riserva di legge e limitazione del potere punitivo statale.",
    "keyNorms": [
      "Art. 1 c.p.",
      "Art. 25, comma 2, Cost.",
      "Art. 2 c.p."
    ],
    "coreElements": [
      "riserva di legge",
      "tassatività e determinatezza",
      "irretroattività sfavorevole",
      "divieto di analogia in malam partem"
    ],
    "distinctions": [
      "Da distinguere dalla mera irretroattività: la legalità comprende anche tassatività e determinatezza.",
      "Non esclude l’interpretazione estensiva, ma vieta l’analogia sfavorevole."
    ],
    "oralAnswerShort": "Il principio di legalità è il cardine del diritto penale liberale. Significa che il reato e la pena devono trovare fondamento nella legge, con sufficiente determinatezza. Ne derivano la riserva di legge, il divieto di analogia in malam partem e l’irretroattività della legge penale sfavorevole.",
    "oralAnswerExtended": "Quando parlo di principio di legalità devo partire dall’articolo 25 della Costituzione e dall’articolo 1 del codice penale. Il principio esprime la scelta per cui il potere punitivo dello Stato non può essere arbitrario. Il fatto punibile deve essere previsto dalla legge e la sanzione deve essere predeterminata. Sul piano contenutistico la legalità si articola nella riserva di legge, nella tassatività e determinatezza della fattispecie, nell’irretroattività della legge sfavorevole e nel divieto di analogia in malam partem. È invece ammessa l’analogia favorevole e resta possibile l’interpretazione estensiva, purché non si travalichi il significato ragionevolmente ricavabile dal testo normativo.",
    "classicQuestions": [
      "Quali corollari discendono dal principio di legalità?",
      "Che differenza c’è tra interpretazione estensiva e analogia?",
      "La consuetudine può creare reati?",
      "Come si collega la legalità alla successione di leggi nel tempo?"
    ],
    "trapQuestions": [
      "Il divieto di analogia opera anche in bonam partem?",
      "La riserva di legge è assoluta in ogni dettaglio della disciplina penale?"
    ],
    "miniCase": "Un fatto socialmente riprovevole non espressamente previsto dalla legge penale può essere punito per analogia con una fattispecie vicina? No: il divieto di analogia in malam partem lo impedisce.",
    "jurisprudenceNotes": "La Corte costituzionale valorizza la determinatezza come presidio di prevedibilità della sanzione penale.",
    "commonMistakes": [
      "Ridurre la legalità alla sola irretroattività.",
      "Confondere analogia e interpretazione estensiva.",
      "Dimenticare il profilo costituzionale."
    ],
    "checklist": [
      "citare Costituzione e codice",
      "indicare i corollari",
      "spiegare analogia vs interpretazione estensiva"
    ],
    "flashcards": [
      {
        "q": "Qual è la norma costituzionale chiave?",
        "a": "L’art. 25, comma 2, Cost."
      },
      {
        "q": "È ammessa l’analogia sfavorevole?",
        "a": "No, è vietata in malam partem."
      },
      {
        "q": "La consuetudine può fondare un reato?",
        "a": "No."
      },
      {
        "q": "La legge favorevole può retroagire?",
        "a": "Sì, secondo i limiti dell’art. 2 c.p."
      },
      {
        "q": "Tassatività e determinatezza a cosa servono?",
        "a": "A rendere prevedibile il precetto penale."
      }
    ]
  },
  {
    "key": "struttura-del-reato",
    "subjectKey": "penale",
    "area": "Parte generale",
    "title": "Struttura del reato",
    "orderIndex": 5,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "tipicità",
      "antigiuridicità",
      "colpevolezza",
      "punibilità"
    ],
    "definition": "Il reato è comunemente ricostruito come fatto tipico, antigiuridico, colpevole e punibile.",
    "ratio": "Scomporre l’illecito penale in passaggi logici per verificare in modo ordinato la responsabilità.",
    "keyNorms": [
      "Art. 40 c.p.",
      "Art. 42 c.p.",
      "Artt. 50-54 c.p."
    ],
    "coreElements": [
      "tipicità",
      "antigiuridicità",
      "colpevolezza",
      "punibilità"
    ],
    "distinctions": [
      "La tipicità riguarda la conformità del fatto alla fattispecie.",
      "L’antigiuridicità viene meno in presenza di scriminanti.",
      "La colpevolezza attiene al rimprovero personale."
    ],
    "oralAnswerShort": "La struttura del reato consente di verificare in sequenza se il fatto è tipico, antigiuridico, colpevole e concretamente punibile. Prima guardo la corrispondenza alla norma incriminatrice, poi verifico se esistono cause di giustificazione, poi il coefficiente soggettivo e infine eventuali cause che escludono la punibilità.",
    "oralAnswerExtended": "In sede d’esame conviene esporre la struttura del reato come schema progressivo. Il primo livello è la tipicità: bisogna verificare condotta, evento, nesso causale e presupposti della fattispecie. Il secondo è l’antigiuridicità: il fatto tipico può tuttavia risultare lecito se coperto da una causa di giustificazione. Il terzo è la colpevolezza, che richiede imputabilità, dolo o colpa secondo la previsione normativa, e possibilità di muovere un rimprovero personale all’agente. Infine, si considera la punibilità in concreto, verificando ad esempio cause personali di non punibilità o estinzione del reato. La forza di questo schema è evitare confusioni tra liceità del fatto, elemento psicologico e conseguenze sanzionatorie.",
    "classicQuestions": [
      "Quali sono gli elementi del reato secondo l’impostazione tripartita?",
      "Che ruolo hanno le cause di giustificazione?",
      "Dove si colloca la punibilità?",
      "Come si distingue la colpevolezza dall’antigiuridicità?"
    ],
    "trapQuestions": [
      "Un fatto tipico è sempre antigiuridico?",
      "La mancanza di imputabilità esclude la tipicità?"
    ],
    "miniCase": "Tizio colpisce Caio per difendersi da un’aggressione attuale. Il fatto può essere tipico come lesione, ma la legittima difesa incide sul piano dell’antigiuridicità.",
    "jurisprudenceNotes": "In giurisprudenza lo schema resta uno strumento ordinatore, pur con ricostruzioni dogmatiche non sempre coincidenti.",
    "commonMistakes": [
      "Confondere tipicità e antigiuridicità.",
      "Dimenticare la punibilità in concreto.",
      "Trattare le scriminanti come elementi soggettivi."
    ],
    "checklist": [
      "fare lo schema in ordine",
      "separare scriminanti e colpevolezza",
      "non dimenticare la punibilità"
    ],
    "flashcards": [
      {
        "q": "Quali sono i quattro passaggi classici?",
        "a": "Tipicità, antigiuridicità, colpevolezza, punibilità."
      },
      {
        "q": "Le scriminanti dove operano?",
        "a": "Sul piano dell’antigiuridicità."
      },
      {
        "q": "Il dolo dove si colloca?",
        "a": "Nella colpevolezza."
      },
      {
        "q": "L’imputabilità a cosa attiene?",
        "a": "Alla colpevolezza."
      },
      {
        "q": "La punibilità è sempre implicita?",
        "a": "No, va verificata in concreto."
      }
    ]
  },
  {
    "key": "dolo",
    "subjectKey": "penale",
    "area": "Elemento soggettivo",
    "title": "Dolo",
    "orderIndex": 9,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "rappresentazione del fatto",
      "volontà della condotta e dell’evento",
      "compatibilità con il dolo diretto e eventuale"
    ],
    "definition": "Il dolo consiste nella coscienza e volontà del fatto tipico, secondo la definizione dell’art. 43 c.p.",
    "ratio": "Attribuire responsabilità per fatti voluti e consapevolmente realizzati.",
    "keyNorms": [
      "Art. 42 c.p.",
      "Art. 43 c.p."
    ],
    "coreElements": [
      "rappresentazione del fatto",
      "volontà della condotta e dell’evento",
      "compatibilità con il dolo diretto e eventuale"
    ],
    "distinctions": [
      "Si distingue dalla colpa, in cui manca la volontà dell’evento.",
      "Il dolo eventuale si distingue dalla colpa cosciente per l’accettazione del rischio."
    ],
    "oralAnswerShort": "Il dolo è la forma ordinaria di imputazione soggettiva nel delitto. Richiede coscienza e volontà del fatto tipico. Può presentarsi come dolo intenzionale, diretto o eventuale, e il punto più delicato all’orale è la distinzione tra dolo eventuale e colpa cosciente.",
    "oralAnswerExtended": "Per spiegare il dolo bisogna partire dall’articolo 43 del codice penale. Il dolo implica che l’agente si rappresenti gli elementi essenziali del fatto e li voglia. Nella forma intenzionale l’evento è lo scopo perseguito; nel dolo diretto l’evento è accettato come conseguenza certa o altamente probabile; nel dolo eventuale il soggetto non mira all’evento, ma si rappresenta la possibilità del suo verificarsi e agisce accettandone il rischio. Il tema centrale è il confine con la colpa cosciente, dove il soggetto prevede l’evento ma confida di evitarlo. In sede orale conviene far emergere il diverso atteggiamento psicologico verso il rischio.",
    "classicQuestions": [
      "Che cosa dice l’art. 43 c.p.?",
      "Quali forme di dolo conosci?",
      "Come distingui dolo eventuale e colpa cosciente?",
      "Il dolo è sempre richiesto nei delitti?"
    ],
    "trapQuestions": [
      "Nel dolo eventuale l’evento è voluto come scopo?",
      "La semplice previsione dell’evento basta a integrare il dolo?"
    ],
    "miniCase": "Un automobilista effettua una manovra estremamente pericolosa in area affollata. La qualificazione dipende dal fatto che abbia accettato il rischio dell’evento o confidato seriamente di evitarlo.",
    "jurisprudenceNotes": "La giurisprudenza insiste sull’accettazione del rischio come dato differenziale rispetto alla colpa cosciente.",
    "commonMistakes": [
      "Dire che il dolo coincide con la mera intenzione.",
      "Confondere dolo diretto e eventuale.",
      "Non spiegare il confine con la colpa cosciente."
    ],
    "checklist": [
      "citare art. 43",
      "spiegare le forme di dolo",
      "chiudere con dolo eventuale vs colpa cosciente"
    ],
    "flashcards": [
      {
        "q": "Qual è la base normativa?",
        "a": "Art. 43 c.p."
      },
      {
        "q": "Qual è la forma più intensa?",
        "a": "Il dolo intenzionale."
      },
      {
        "q": "Che cosa distingue il dolo eventuale?",
        "a": "L’accettazione del rischio dell’evento."
      },
      {
        "q": "La previsione dell’evento basta?",
        "a": "No, serve anche il profilo volitivo."
      },
      {
        "q": "Dolo e colpa possono coincidere?",
        "a": "No, sono forme diverse di imputazione soggettiva."
      }
    ]
  },
  {
    "key": "cause-di-giustificazione",
    "subjectKey": "penale",
    "area": "Cause di esclusione del reato",
    "title": "Cause di giustificazione",
    "orderIndex": 13,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "consenso dell’avente diritto",
      "esercizio di un diritto o adempimento di un dovere",
      "legittima difesa",
      "uso legittimo delle armi",
      "stato di necessità"
    ],
    "definition": "Le cause di giustificazione rendono lecito un fatto altrimenti tipico, escludendone l’antigiuridicità.",
    "ratio": "Bilanciare l’interesse protetto dalla norma penale con altri interessi o facoltà ritenuti prevalenti dall’ordinamento.",
    "keyNorms": [
      "Artt. 50-54 c.p."
    ],
    "coreElements": [
      "consenso dell’avente diritto",
      "esercizio di un diritto o adempimento di un dovere",
      "legittima difesa",
      "uso legittimo delle armi",
      "stato di necessità"
    ],
    "distinctions": [
      "Si distinguono dalle scusanti, che non rendono lecito il fatto ma escludono il rimprovero.",
      "Operano sul piano oggettivo dell’antigiuridicità."
    ],
    "oralAnswerShort": "Le cause di giustificazione escludono l’antigiuridicità del fatto. Il fatto resta tipico ma diventa lecito perché l’ordinamento, in presenza di determinate condizioni, reputa prevalente un diverso interesse. Esempi classici sono la legittima difesa e lo stato di necessità.",
    "oralAnswerExtended": "Quando si trattano le cause di giustificazione bisogna dire subito che esse incidono sul secondo gradino della struttura del reato, cioè l’antigiuridicità. Il fatto è conforme alla fattispecie, ma l’ordinamento lo considera lecito. Le principali scriminanti codificate sono il consenso dell’avente diritto, l’esercizio di un diritto o l’adempimento di un dovere, la legittima difesa, l’uso legittimo delle armi e lo stato di necessità. In sede orale è importante sottolineare che le scriminanti hanno portata oggettiva e, in presenza dei presupposti, elidono il disvalore giuridico del fatto. Va poi distinto il loro regime da quello delle scusanti, dove il fatto resta illecito ma non rimproverabile in concreto.",
    "classicQuestions": [
      "Su quale piano operano le cause di giustificazione?",
      "Quali sono le principali scriminanti codicistiche?",
      "Che differenza c’è tra legittima difesa e stato di necessità?",
      "In cosa differiscono scriminanti e scusanti?"
    ],
    "trapQuestions": [
      "Se c’è una scriminante il fatto non è tipico?",
      "La legittima difesa è una causa di esclusione della colpevolezza?"
    ],
    "miniCase": "Un soggetto reagisce a un’aggressione attuale con un mezzo proporzionato e necessario: il fatto può integrare gli estremi della legittima difesa ed essere quindi lecito.",
    "jurisprudenceNotes": "La giurisprudenza valuta con attenzione attualità del pericolo, necessità della reazione e proporzione.",
    "commonMistakes": [
      "Confondere scriminanti e scusanti.",
      "Dire che la scriminante elimina la tipicità.",
      "Non collegarle alla struttura del reato."
    ],
    "checklist": [
      "dire che il fatto resta tipico",
      "spiegare antigiuridicità",
      "distinguere scriminanti e scusanti"
    ],
    "flashcards": [
      {
        "q": "Le scriminanti su cosa incidono?",
        "a": "Sull’antigiuridicità."
      },
      {
        "q": "La legittima difesa è una scriminante?",
        "a": "Sì."
      },
      {
        "q": "Il consenso dell’avente diritto è una scriminante?",
        "a": "Sì, nei limiti di disponibilità del diritto."
      },
      {
        "q": "Le scusanti rendono lecito il fatto?",
        "a": "No."
      },
      {
        "q": "Lo stato di necessità cosa presuppone?",
        "a": "Un pericolo attuale di danno grave alla persona e una condotta necessitata."
      }
    ]
  },
  {
    "key": "obbligazioni",
    "subjectKey": "civile",
    "area": "Teoria generale",
    "title": "Obbligazioni",
    "orderIndex": 3,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "base",
    "keywords": [
      "soggetti",
      "prestazione",
      "interesse creditorio",
      "patrimonialità della prestazione",
      "buona fede e correttezza"
    ],
    "definition": "L’obbligazione è il rapporto giuridico in forza del quale un soggetto, debitore, è tenuto a una prestazione patrimonialmente valutabile nell’interesse di un altro soggetto, il creditore.",
    "ratio": "Consentire la cooperazione economico-sociale attraverso vincoli giuridici relativi.",
    "keyNorms": [
      "Art. 1173 c.c.",
      "Art. 1174 c.c.",
      "Art. 1175 c.c."
    ],
    "coreElements": [
      "soggetti",
      "prestazione",
      "interesse creditorio",
      "patrimonialità della prestazione",
      "buona fede e correttezza"
    ],
    "distinctions": [
      "Si distingue dai diritti reali, che sono assoluti.",
      "Il rapporto obbligatorio è relativo e vincola determinati soggetti."
    ],
    "oralAnswerShort": "L’obbligazione è un rapporto relativo tra debitore e creditore, avente a oggetto una prestazione patrimonialmente valutabile e rispondente a un interesse, anche non patrimoniale, del creditore. Le fonti sono indicate dall’articolo 1173 del codice civile.",
    "oralAnswerExtended": "Per esporre bene le obbligazioni bisogna partire dalla nozione di rapporto giuridico relativo. Il debitore è tenuto a una prestazione che può consistere in dare, fare o non fare, purché sia suscettibile di valutazione economica e corrisponda a un interesse del creditore. L’articolo 1173 individua le fonti: contratto, fatto illecito e ogni altro atto o fatto idoneo a produrle secondo l’ordinamento. Il rapporto obbligatorio è governato anche dai canoni di correttezza e buona fede, che incidono non solo nella fase esecutiva ma in tutta la dinamica del rapporto. In sede orale conviene poi distinguere le obbligazioni dai diritti reali, sottolineando il carattere relativo del vincolo.",
    "classicQuestions": [
      "Quali sono le fonti delle obbligazioni?",
      "Che cosa significa patrimonialità della prestazione?",
      "Che differenza c’è tra diritti reali e diritti di credito?",
      "Qual è il ruolo della buona fede?"
    ],
    "trapQuestions": [
      "L’interesse del creditore deve essere necessariamente patrimoniale?",
      "Ogni obbligo morale è un’obbligazione civile?"
    ],
    "miniCase": "Tizio promette a Caio una prestazione di consulenza dietro compenso: nasce un rapporto obbligatorio con contenuto patrimoniale e dovere di correttezza reciproca.",
    "jurisprudenceNotes": "La buona fede oggettiva viene valorizzata come criterio integrativo del rapporto obbligatorio.",
    "commonMistakes": [
      "Confondere fonte e contenuto dell’obbligazione.",
      "Dimenticare il requisito della patrimonialità.",
      "Non distinguere diritti reali e obbligazioni."
    ],
    "checklist": [
      "definizione completa",
      "fonti ex art. 1173",
      "distinzione da diritti reali"
    ],
    "flashcards": [
      {
        "q": "Qual è la norma sulle fonti?",
        "a": "Art. 1173 c.c."
      },
      {
        "q": "L’interesse del creditore può essere non patrimoniale?",
        "a": "Sì."
      },
      {
        "q": "Il rapporto obbligatorio è assoluto o relativo?",
        "a": "Relativo."
      },
      {
        "q": "La prestazione deve essere patrimoniale?",
        "a": "Sì."
      },
      {
        "q": "Buona fede e correttezza dove si collocano?",
        "a": "Nella disciplina generale del rapporto obbligatorio."
      }
    ]
  },
  {
    "key": "adempimento",
    "subjectKey": "civile",
    "area": "Obbligazioni",
    "title": "Adempimento",
    "orderIndex": 6,
    "priority": "media",
    "examFrequency": "alta",
    "difficulty": "base",
    "keywords": [
      "esattezza della prestazione",
      "tempo",
      "luogo",
      "diligenza",
      "identità e integrità dell’adempimento"
    ],
    "definition": "L’adempimento è l’esatta esecuzione della prestazione dovuta.",
    "ratio": "Realizzare l’interesse del creditore secondo il programma obbligatorio.",
    "keyNorms": [
      "Artt. 1176, 1182, 1183, 1197 c.c."
    ],
    "coreElements": [
      "esattezza della prestazione",
      "tempo",
      "luogo",
      "diligenza",
      "identità e integrità dell’adempimento"
    ],
    "distinctions": [
      "Si distingue dall’adempimento inesatto, che può integrare inadempimento.",
      "La prestazione in luogo dell’adempimento richiede il consenso del creditore."
    ],
    "oralAnswerShort": "L’adempimento consiste nell’esatta esecuzione della prestazione dovuta, secondo diligenza, tempo, luogo e modalità previste dal rapporto. Non basta eseguire qualcosa: occorre eseguire proprio quanto dovuto.",
    "oralAnswerExtended": "Per affrontare l’adempimento bisogna sottolineare che non si identifica con un qualsiasi comportamento satisfattivo, ma con l’esatta esecuzione della prestazione dedotta nel rapporto. Rilevano l’identità, l’integrità e la puntualità dell’esecuzione, oltre al criterio della diligenza previsto dall’articolo 1176 del codice civile. Vanno poi considerati tempo e luogo dell’adempimento, disciplinati dagli articoli 1182 e seguenti. Particolarmente utile all’orale è distinguere l’adempimento esatto dalla datio in solutum, che costituisce prestazione diversa e richiede l’accordo del creditore.",
    "classicQuestions": [
      "Che cosa significa esattezza dell’adempimento?",
      "Qual è il ruolo della diligenza?",
      "Dove si esegue la prestazione?",
      "Che differenza c’è tra adempimento e datio in solutum?"
    ],
    "trapQuestions": [
      "Il debitore può liberarsi eseguendo una prestazione diversa senza consenso?",
      "Ogni ritardo equivale automaticamente a impossibilità definitiva?"
    ],
    "miniCase": "Il debitore consegna un bene diverso da quello pattuito e sostiene che il valore economico è analogo. Non c’è adempimento esatto se il creditore non accetta la prestazione diversa.",
    "jurisprudenceNotes": "La giurisprudenza valorizza l’esatto soddisfacimento dell’interesse creditorio e il criterio di buona fede.",
    "commonMistakes": [
      "Ridurre l’adempimento alla sola esecuzione materiale.",
      "Dimenticare diligenza, tempo e luogo.",
      "Confondere adempimento inesatto e inesistenza totale della prestazione."
    ],
    "checklist": [
      "parlare di esattezza",
      "citare la diligenza",
      "distinguere datio in solutum"
    ],
    "flashcards": [
      {
        "q": "Cos’è l’adempimento?",
        "a": "L’esatta esecuzione della prestazione dovuta."
      },
      {
        "q": "Quale norma richiama la diligenza?",
        "a": "Art. 1176 c.c."
      },
      {
        "q": "La prestazione diversa libera il debitore?",
        "a": "Solo se il creditore acconsente."
      },
      {
        "q": "Contano tempo e luogo?",
        "a": "Sì, fanno parte dell’esattezza dell’adempimento."
      },
      {
        "q": "L’adempimento inesatto può avere rilievo risarcitorio?",
        "a": "Sì."
      }
    ]
  },
  {
    "key": "contratto-in-generale",
    "subjectKey": "civile",
    "area": "Contratto",
    "title": "Contratto in generale",
    "orderIndex": 14,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "base",
    "keywords": [
      "accordo",
      "autonomia contrattuale",
      "causa",
      "oggetto",
      "forma quando prescritta"
    ],
    "definition": "Il contratto è l’accordo di due o più parti per costituire, regolare o estinguere un rapporto giuridico patrimoniale.",
    "ratio": "Attribuire ai privati uno strumento di autonomia negoziale per disciplinare interessi patrimoniali.",
    "keyNorms": [
      "Art. 1321 c.c.",
      "Art. 1322 c.c.",
      "Art. 1325 c.c."
    ],
    "coreElements": [
      "accordo",
      "autonomia contrattuale",
      "causa",
      "oggetto",
      "forma quando prescritta"
    ],
    "distinctions": [
      "Si distingue dall’atto unilaterale, che non richiede accordo.",
      "Va distinto anche dal fatto illecito come fonte di obbligazioni."
    ],
    "oralAnswerShort": "Il contratto, ai sensi dell’articolo 1321 del codice civile, è l’accordo di due o più parti diretto a costituire, regolare o estinguere un rapporto patrimoniale. È il principale strumento dell’autonomia privata, nei limiti imposti dalla legge e dall’ordine pubblico.",
    "oralAnswerExtended": "Per spiegare il contratto occorre partire dalla definizione normativa e dall’autonomia contrattuale. L’articolo 1322 consente alle parti di determinare liberamente il contenuto del contratto e anche di concludere contratti atipici, purché diretti a realizzare interessi meritevoli di tutela. Gli elementi essenziali sono indicati dall’articolo 1325: accordo, causa, oggetto e forma quando prescritta. All’orale è importante mostrare che il contratto non è solo accordo, ma accordo giuridicamente rilevante, idoneo a produrre effetti patrimoniali e valutato alla luce di liceità, meritevolezza e disciplina delle invalidità.",
    "classicQuestions": [
      "Che cos’è il contratto?",
      "Che cosa si intende per autonomia contrattuale?",
      "Quali sono gli elementi essenziali?",
      "Sono ammessi contratti atipici?"
    ],
    "trapQuestions": [
      "Ogni accordo tra privati è un contratto?",
      "L’autonomia privata è illimitata?"
    ],
    "miniCase": "Due professionisti disciplinano per iscritto una collaborazione economica con obblighi reciproci. L’accordo integra un contratto se è diretto a regolare un rapporto patrimoniale.",
    "jurisprudenceNotes": "La meritevolezza e la causa concreta hanno assunto crescente rilievo nella lettura del contratto.",
    "commonMistakes": [
      "Fermarsi alla definizione astratta.",
      "Dimenticare art. 1322 e contratti atipici.",
      "Confondere contratto ed elemento formale scritto."
    ],
    "checklist": [
      "citare 1321, 1322, 1325",
      "parlare di autonomia privata",
      "chiudere con limiti e meritevolezza"
    ],
    "flashcards": [
      {
        "q": "Qual è la norma definitoria?",
        "a": "Art. 1321 c.c."
      },
      {
        "q": "Quale norma disciplina l’autonomia contrattuale?",
        "a": "Art. 1322 c.c."
      },
      {
        "q": "Gli elementi essenziali dove si trovano?",
        "a": "Art. 1325 c.c."
      },
      {
        "q": "I contratti atipici sono ammessi?",
        "a": "Sì, se meritevoli di tutela."
      },
      {
        "q": "Il contratto richiede sempre la forma scritta?",
        "a": "No, solo quando prevista dalla legge."
      }
    ]
  },
  {
    "key": "invalidita-del-contratto",
    "subjectKey": "civile",
    "area": "Contratto",
    "title": "Invalidità del contratto",
    "orderIndex": 17,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "nullità per contrarietà a norme imperative o mancanza di elementi essenziali",
      "annullabilità per incapacità o vizi del consenso",
      "diverso regime processuale e sostanziale"
    ],
    "definition": "L’invalidità comprende principalmente nullità e annullabilità, quali forme patologiche che incidono sulla validità del contratto.",
    "ratio": "Sanzionare difetti genetici del negozio in modo coerente con l’interesse tutelato dall’ordinamento.",
    "keyNorms": [
      "Art. 1418 c.c.",
      "Artt. 1425 ss. c.c."
    ],
    "coreElements": [
      "nullità per contrarietà a norme imperative o mancanza di elementi essenziali",
      "annullabilità per incapacità o vizi del consenso",
      "diverso regime processuale e sostanziale"
    ],
    "distinctions": [
      "La nullità tutela interessi generali ed è normalmente insanabile.",
      "L’annullabilità tutela interessi particolari ed è suscettibile di convalida."
    ],
    "oralAnswerShort": "L’invalidità del contratto si articola soprattutto in nullità e annullabilità. La nullità colpisce il contratto in contrasto con interessi generali o privo di elementi essenziali; l’annullabilità riguarda invece vizi che incidono su interessi particolari, come incapacità o vizi del consenso.",
    "oralAnswerExtended": "All’orale conviene distinguere subito nullità e annullabilità in base a presupposti, legittimazione e regime. La nullità, disciplinata dall’articolo 1418 del codice civile, ricorre ad esempio quando il contratto è contrario a norme imperative, manca di uno degli elementi essenziali, ha causa o oggetto illecito o negli altri casi previsti dalla legge. Essa è rilevabile d’ufficio, imprescrittibile quanto all’azione di accertamento ed è tendenzialmente insanabile, salvo ipotesi specifiche. L’annullabilità, invece, dipende da incapacità legale o naturale o da vizi del consenso, e può essere fatta valere solo dai soggetti nel cui interesse è prevista. Inoltre è soggetta a prescrizione e a convalida. La commissione apprezza molto una comparazione ordinata tra le due figure.",
    "classicQuestions": [
      "Che differenza c’è tra nullità e annullabilità?",
      "Quando un contratto è nullo?",
      "Quando è annullabile?",
      "L’annullabilità è sanabile?"
    ],
    "trapQuestions": [
      "La nullità si prescrive?",
      "Il giudice può rilevare d’ufficio l’annullabilità?"
    ],
    "miniCase": "Un contratto viene stipulato da un soggetto incapace di agire: il contratto non è nullo per ciò solo, ma annullabile secondo il regime previsto dalla legge.",
    "jurisprudenceNotes": "Grande rilievo ha assunto la nozione di nullità di protezione in alcuni settori speciali.",
    "commonMistakes": [
      "Confondere nullità e inefficacia.",
      "Dire che ogni vizio produce nullità.",
      "Dimenticare convalida e prescrizione dell’annullabilità."
    ],
    "checklist": [
      "fare tabella mentale nullità vs annullabilità",
      "citare art. 1418",
      "menzionare convalida e rilievo d’ufficio"
    ],
    "flashcards": [
      {
        "q": "La nullità è rilevabile d’ufficio?",
        "a": "Sì, di regola."
      },
      {
        "q": "L’annullabilità può essere convalidata?",
        "a": "Sì."
      },
      {
        "q": "La mancanza di elemento essenziale cosa produce?",
        "a": "Nullità."
      },
      {
        "q": "I vizi del consenso cosa producono?",
        "a": "Annullabilità."
      },
      {
        "q": "Nullità e annullabilità tutelano gli stessi interessi?",
        "a": "No."
      }
    ]
  },
  {
    "key": "principi-del-processo-penale",
    "subjectKey": "proc_penale",
    "area": "Principi",
    "title": "Principi del processo penale",
    "orderIndex": 1,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "base",
    "keywords": [
      "giusto processo",
      "contraddittorio",
      "terzietà e imparzialità",
      "presunzione di non colpevolezza",
      "diritto di difesa"
    ],
    "definition": "I principi del processo penale delineano il modello accusatorio costituzionalmente orientato, fondato su garanzie di difesa, terzietà del giudice e giusto processo.",
    "ratio": "Assicurare equilibrio tra accertamento del fatto, tutela dei diritti fondamentali e corretto esercizio della giurisdizione penale.",
    "keyNorms": [
      "Art. 111 Cost.",
      "Art. 24 Cost.",
      "Art. 27 Cost.",
      "Art. 190 c.p.p."
    ],
    "coreElements": [
      "giusto processo",
      "contraddittorio",
      "terzietà e imparzialità",
      "presunzione di non colpevolezza",
      "diritto di difesa"
    ],
    "distinctions": [
      "Il modello accusatorio si distingue da quello inquisitorio per separazione delle funzioni e centralità del contraddittorio.",
      "La presunzione di non colpevolezza non coincide con una regola di mero trattamento mediatico, ma informa l’intero procedimento."
    ],
    "oralAnswerShort": "Il processo penale italiano è costruito su un modello accusatorio costituzionalmente garantito. I principi centrali sono giusto processo, contraddittorio nella formazione della prova, terzietà del giudice, diritto di difesa e presunzione di non colpevolezza.",
    "oralAnswerExtended": "Quando si espongono i principi del processo penale conviene partire dall’articolo 111 della Costituzione, che consacra il giusto processo. Il modello è accusatorio: le funzioni di accusa, difesa e giudizio restano distinte; il giudice è terzo e imparziale; la prova si forma, di regola, nel contraddittorio tra le parti. A ciò si aggiungono il diritto di difesa di cui all’articolo 24 Costituzione e la presunzione di non colpevolezza di cui all’articolo 27. Questi principi condizionano l’intera procedura, dalla fase delle indagini fino al giudizio e alle impugnazioni, e rappresentano il criterio interpretativo di fondo delle singole norme processuali.",
    "classicQuestions": [
      "Quali sono i principi costituzionali del processo penale?",
      "Che cosa significa modello accusatorio?",
      "Che ruolo ha il contraddittorio?",
      "Come si collega la presunzione di non colpevolezza al procedimento?"
    ],
    "trapQuestions": [
      "La prova si forma sempre e solo in dibattimento senza eccezioni?",
      "Terzietà e imparzialità del giudice sono sinonimi perfetti?"
    ],
    "miniCase": "Una dichiarazione raccolta unilateralmente in indagine non ha automaticamente lo stesso valore della prova formata nel contraddittorio dibattimentale.",
    "jurisprudenceNotes": "La giurisprudenza costituzionale ha costantemente rafforzato la centralità del contraddittorio e della ragionevole durata.",
    "commonMistakes": [
      "Parlare di modello accusatorio in modo generico.",
      "Dimenticare gli articoli costituzionali.",
      "Confondere principio e regola tecnica di singoli atti."
    ],
    "checklist": [
      "partire dalla Costituzione",
      "spiegare accusatorio",
      "citare contraddittorio e difesa"
    ],
    "flashcards": [
      {
        "q": "Qual è la norma costituzionale chiave?",
        "a": "Art. 111 Cost."
      },
      {
        "q": "Il giudice che posizione deve avere?",
        "a": "Terza e imparziale."
      },
      {
        "q": "La prova come si forma di regola?",
        "a": "Nel contraddittorio tra le parti."
      },
      {
        "q": "Quale articolo tutela la difesa?",
        "a": "Art. 24 Cost."
      },
      {
        "q": "Quale articolo afferma la non colpevolezza?",
        "a": "Art. 27 Cost."
      }
    ]
  },
  {
    "key": "nullita-inutilizzabilita-inammissibilita-decadenza",
    "subjectKey": "proc_penale",
    "area": "Patologie degli atti",
    "title": "Nullità, inutilizzabilità, inammissibilità, decadenza",
    "orderIndex": 4,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "alta",
    "keywords": [
      "nullità come vizio dell’atto",
      "inutilizzabilità come divieto di uso probatorio",
      "inammissibilità come difetto della domanda o impugnazione",
      "decadenza come perdita del potere nel termine"
    ],
    "definition": "Sono categorie patologiche del processo penale che colpiscono, rispettivamente, la validità dell’atto, il suo uso probatorio, l’ammissibilità della domanda o impugnazione e la perdita di un potere per decorso del termine.",
    "ratio": "Garantire rispetto delle forme essenziali, corretto uso del materiale processuale e certezza delle scansioni temporali.",
    "keyNorms": [
      "Artt. 177 ss. c.p.p.",
      "Art. 191 c.p.p."
    ],
    "coreElements": [
      "nullità come vizio dell’atto",
      "inutilizzabilità come divieto di uso probatorio",
      "inammissibilità come difetto della domanda o impugnazione",
      "decadenza come perdita del potere nel termine"
    ],
    "distinctions": [
      "La nullità attiene alla validità dell’atto.",
      "L’inutilizzabilità colpisce soprattutto il valore probatorio dell’atto.",
      "L’inammissibilità opera spesso sugli atti di impulso o impugnazione.",
      "La decadenza riguarda il mancato esercizio tempestivo di facoltà o poteri."
    ],
    "oralAnswerShort": "Queste quattro figure non vanno confuse. La nullità riguarda un atto viziato nelle forme; l’inutilizzabilità impedisce che un atto o il suo contenuto sia usato come prova; l’inammissibilità preclude l’esame di una domanda o impugnazione non conforme; la decadenza comporta la perdita di un potere per il suo mancato esercizio nel termine previsto.",
    "oralAnswerExtended": "All’orale questa è una scheda decisiva, perché misura la padronanza del processo. La nullità è una sanzione processuale che colpisce l’atto compiuto in violazione di forme essenziali previste dalla legge; ha un proprio regime di deducibilità, rilevabilità e sanatoria. L’inutilizzabilità, invece, opera sul piano probatorio: ai sensi dell’articolo 191 c.p.p. le prove acquisite in violazione dei divieti stabiliti dalla legge non possono essere utilizzate. L’inammissibilità riguarda normalmente atti introduttivi, richieste o impugnazioni che non rispettano requisiti previsti dalla legge. La decadenza, infine, consiste nella perdita del potere di compiere un atto per mancato rispetto del termine. La commissione si aspetta una distinzione netta sia sul piano funzionale sia su quello degli effetti.",
    "classicQuestions": [
      "Che differenza c’è tra nullità e inutilizzabilità?",
      "Quando si parla di inammissibilità?",
      "Che cos’è la decadenza?",
      "L’inutilizzabilità ha lo stesso regime della nullità?"
    ],
    "trapQuestions": [
      "Ogni atto nullo è anche inutilizzabile?",
      "La decadenza coincide con l’inammissibilità?"
    ],
    "miniCase": "Un atto di impugnazione è depositato oltre il termine: il problema è di decadenza dal potere di impugnare, con conseguente inammissibilità dell’atto tardivo.",
    "jurisprudenceNotes": "La distinzione tra nullità e inutilizzabilità è centrale nella giurisprudenza di legittimità.",
    "commonMistakes": [
      "Usare le quattro categorie come sinonimi.",
      "Dire che l’inutilizzabilità è una semplice nullità aggravata.",
      "Dimenticare l’art. 191 c.p.p."
    ],
    "checklist": [
      "definire tutte e quattro",
      "citare art. 191",
      "fare esempi concreti"
    ],
    "flashcards": [
      {
        "q": "Quale norma disciplina l’inutilizzabilità della prova illegale?",
        "a": "Art. 191 c.p.p."
      },
      {
        "q": "La nullità colpisce cosa?",
        "a": "La validità dell’atto."
      },
      {
        "q": "L’inammissibilità riguarda spesso cosa?",
        "a": "Domande o impugnazioni non conformi."
      },
      {
        "q": "La decadenza da cosa deriva?",
        "a": "Dal mancato rispetto di un termine."
      },
      {
        "q": "Nullità e inutilizzabilità coincidono?",
        "a": "No."
      }
    ]
  },
  {
    "key": "atti-processuali",
    "subjectKey": "proc_penale",
    "area": "Atti",
    "title": "Atti processuali",
    "orderIndex": 3,
    "priority": "media",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "forma",
      "documentazione",
      "notificazioni e comunicazioni",
      "termini",
      "lingua e sottoscrizione"
    ],
    "definition": "Gli atti processuali sono le manifestazioni di attività delle parti, del giudice e degli altri soggetti del procedimento disciplinate dalla legge processuale penale.",
    "ratio": "Assicurare ordine, conoscibilità, certezza e controllabilità del procedimento.",
    "keyNorms": [
      "Libro II c.p.p."
    ],
    "coreElements": [
      "forma",
      "documentazione",
      "notificazioni e comunicazioni",
      "termini",
      "lingua e sottoscrizione"
    ],
    "distinctions": [
      "La disciplina degli atti è il contenitore generale; le patologie sono tema distinto, seppur collegato.",
      "Non ogni irregolarità formale produce nullità."
    ],
    "oralAnswerShort": "Gli atti processuali sono disciplinati nel libro secondo del codice di procedura penale e rispondono all’esigenza di garantire certezza e regolarità del procedimento. Rilevano forma, documentazione, termini, notificazioni e lingua degli atti.",
    "oralAnswerExtended": "Per trattare gli atti processuali è utile spiegare che il codice dedica a essi una disciplina generale relativa alle forme, alla documentazione, ai termini, alle notificazioni e agli adempimenti necessari per la loro conoscibilità. La funzione delle regole formali non è burocratica, ma garantistica: serve a rendere il procedimento controllabile e a tutelare il diritto di difesa. In sede d’esame bisogna anche ricordare che non ogni difformità formale genera automaticamente una nullità, perché occorre verificare il regime normativo della violazione e il tipo di interesse protetto.",
    "classicQuestions": [
      "Che cosa si intende per atto processuale?",
      "Qual è la funzione della forma?",
      "Perché i termini sono importanti?",
      "Che rapporto c’è tra atti e nullità?"
    ],
    "trapQuestions": [
      "Ogni violazione di forma rende nullo l’atto?",
      "La disciplina degli atti è separata dal diritto di difesa?"
    ],
    "miniCase": "Un atto viene comunicato in modo irregolare e la parte non ne ha effettiva conoscenza: la rilevanza processuale dipenderà dal tipo di vizio e dalle norme sulla nullità o rinnovazione.",
    "jurisprudenceNotes": "Si valorizza il collegamento tra regole formali e concreta effettività del contraddittorio.",
    "commonMistakes": [
      "Trattare le forme come meri formalismi.",
      "Non collegare termini e notifiche al diritto di difesa.",
      "Confondere irregolarità e nullità."
    ],
    "checklist": [
      "citare libro II",
      "spiegare funzione garantistica",
      "chiudere con rapporto tra forma e patologie"
    ],
    "flashcards": [
      {
        "q": "Dove si trova la disciplina generale degli atti?",
        "a": "Nel libro II del c.p.p."
      },
      {
        "q": "La forma processuale a cosa serve?",
        "a": "A garantire certezza e difesa."
      },
      {
        "q": "Ogni vizio formale genera nullità?",
        "a": "No."
      },
      {
        "q": "I termini hanno rilievo processuale?",
        "a": "Sì, fondamentale."
      },
      {
        "q": "Le notificazioni perché contano?",
        "a": "Per la conoscibilità degli atti."
      }
    ]
  },
  {
    "key": "indagini-preliminari",
    "subjectKey": "proc_penale",
    "area": "Fase investigativa",
    "title": "Indagini preliminari",
    "orderIndex": 5,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "notizia di reato",
      "attività del pubblico ministero e della polizia giudiziaria",
      "segretezza relativa",
      "durata e proroghe",
      "esiti: esercizio azione penale o archiviazione"
    ],
    "definition": "Le indagini preliminari sono la fase procedimentale finalizzata alle determinazioni del pubblico ministero sull’esercizio dell’azione penale.",
    "ratio": "Consentire al pubblico ministero di verificare la fondatezza della notizia di reato e decidere se esercitare l’azione penale o chiedere l’archiviazione.",
    "keyNorms": [
      "Art. 326 c.p.p.",
      "Artt. 330 ss. c.p.p.",
      "Art. 405 c.p.p."
    ],
    "coreElements": [
      "notizia di reato",
      "attività del pubblico ministero e della polizia giudiziaria",
      "segretezza relativa",
      "durata e proroghe",
      "esiti: esercizio azione penale o archiviazione"
    ],
    "distinctions": [
      "Le indagini non coincidono con il giudizio.",
      "La prova dibattimentale resta distinta dagli atti investigativi, salvo eccezioni."
    ],
    "oralAnswerShort": "Le indagini preliminari servono al pubblico ministero per decidere se esercitare l’azione penale o chiedere l’archiviazione. Sono avviate dalla notizia di reato e si svolgono prevalentemente attraverso l’attività del pubblico ministero e della polizia giudiziaria.",
    "oralAnswerExtended": "Le indagini preliminari sono disciplinate come fase prodromica al processo e sono finalizzate, ai sensi dell’articolo 326 del codice di procedura penale, alle determinazioni inerenti all’esercizio dell’azione penale. Tutto parte dalla notizia di reato, che impone l’iscrizione e l’avvio dell’attività investigativa. In questa fase operano il pubblico ministero e la polizia giudiziaria, con possibilità di compiere atti tipici e di richiedere al giudice gli interventi necessari nei casi previsti. Le indagini hanno una durata legale e possono concludersi con la richiesta di archiviazione o con l’esercizio dell’azione penale. In sede orale è bene sottolineare che gli atti di indagine non coincidono automaticamente con prova dibattimentale, poiché il modello accusatorio privilegia la formazione della prova nel contraddittorio.",
    "classicQuestions": [
      "Qual è la funzione delle indagini preliminari?",
      "Chi le svolge?",
      "Come si concludono?",
      "Che ruolo ha la notizia di reato?"
    ],
    "trapQuestions": [
      "Le indagini servono già ad accertare definitivamente la responsabilità?",
      "Gli atti di indagine sono sempre prova piena nel giudizio?"
    ],
    "miniCase": "Ricevuta una denuncia, il pubblico ministero iscrive la notizia di reato e avvia gli accertamenti per verificare se esistano elementi sufficienti per sostenere l’accusa in giudizio.",
    "jurisprudenceNotes": "Il controllo sul rispetto dei termini e dei diritti difensivi è tema frequente nella giurisprudenza processuale.",
    "commonMistakes": [
      "Dire che le indagini sono già processo in senso pieno.",
      "Dimenticare l’alternativa tra azione penale e archiviazione.",
      "Confondere atti investigativi e prova dibattimentale."
    ],
    "checklist": [
      "citare art. 326",
      "parlare di notizia di reato",
      "chiudere con esiti della fase"
    ],
    "flashcards": [
      {
        "q": "A cosa servono le indagini preliminari?",
        "a": "Alle determinazioni del PM sull’azione penale."
      },
      {
        "q": "Chi le svolge?",
        "a": "PM e polizia giudiziaria."
      },
      {
        "q": "Da cosa prendono avvio?",
        "a": "Dalla notizia di reato."
      },
      {
        "q": "Quali sbocchi hanno?",
        "a": "Archiviazione o esercizio dell’azione penale."
      },
      {
        "q": "Gli atti d’indagine sono di regola prova dibattimentale?",
        "a": "No."
      }
    ]
  },
  {
    "key": "efficacia-legge-penale-tempo",
    "subjectKey": "penale",
    "area": "Parte generale",
    "title": "Efficacia della legge penale nel tempo",
    "orderIndex": 2,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "irretroattività sfavorevole",
      "retroattività favorevole",
      "abolitio criminis",
      "legge temporanea",
      "successione di norme integratrici"
    ],
    "definition": "L’efficacia della legge penale nel tempo disciplina i rapporti fra fatto commesso e norma vigente, risolvendo i conflitti intertemporali quando la disciplina muta.",
    "ratio": "Conciliare la certezza della sanzione con il favor rei, evitando applicazioni retroattive peggiorative e valorizzando le modifiche di clemenza.",
    "keyNorms": [
      "Art. 2 c.p.",
      "Art. 25, comma 2, Cost.",
      "Art. 7 CEDU",
      "Art. 673 c.p.p. (revoca della sentenza per abolitio criminis)"
    ],
    "coreElements": [
      "irretroattività della legge sfavorevole (nullum crimen sine praevia lege)",
      "retroattività della legge abolitiva (abolitio criminis)",
      "applicazione della legge più favorevole al reo (lex mitior)",
      "limite del giudicato per la sola abolitio, non per la mera attenuazione",
      "regime particolare delle leggi temporanee ed eccezionali (art. 2, u.c.)"
    ],
    "distinctions": [
      "Abolitio criminis vs successione meramente modificativa: la prima travolge anche il giudicato, la seconda no.",
      "Leggi temporanee ed eccezionali: continuano ad applicarsi ai fatti commessi sotto la loro vigenza anche se più severe.",
      "Modifiche delle norme integratrici (norme extrapenali richiamate): la giurisprudenza distingue fra elementi costitutivi e meri presupposti storici."
    ],
    "oralAnswerShort": "La disciplina è nell’articolo 2 del codice penale e nell’articolo 25 della Costituzione. Vale l’irretroattività della legge sfavorevole e la retroattività di quella più favorevole. L’abolitio criminis travolge il giudicato ex articolo 673 c.p.p.; la semplice riduzione di pena no. Le leggi temporanee ed eccezionali derogano a questa regola.",
    "oralAnswerExtended": "Il principio di irretroattività è un corollario della legalità e ha rango costituzionale. L’articolo 2, comma 1, c.p. vieta di applicare una legge penale a fatti anteriori alla sua entrata in vigore. Il comma 2 disciplina l’abolitio criminis: se una nuova legge non considera più reato il fatto, cessa l’esecuzione e cadono gli effetti penali anche dopo il giudicato, in attuazione dell’articolo 673 c.p.p. Il comma 4 prevede l’applicazione retroattiva della lex mitior, purché non sia intervenuto giudicato, salvo che la nuova norma sia più favorevole in modo assoluto. L’ultimo comma salva le leggi temporanee ed eccezionali, che continuano ad applicarsi ai fatti commessi sotto la loro vigenza. Un tema classico è quello della successione di norme integratrici: secondo le Sezioni Unite Magera la modifica di norme extrapenali richiamate incide sulla punibilità solo se muta un elemento costitutivo, non un mero presupposto storico. Si richiama inoltre l’articolo 7 CEDU e la giurisprudenza Scoppola, che impone la retroattività della lex mitior anche in executivis nei casi di rilevanza convenzionale.",
    "classicQuestions": [
      "Cos’è l’abolitio criminis e come si distingue dalla successione modificativa?",
      "Qual è la sorte del giudicato di condanna in caso di lex mitior non abolitiva?",
      "Qual è la disciplina delle leggi temporanee ed eccezionali?",
      "Cosa dice la sentenza Scoppola CEDU sulla retroattività in mitius?"
    ],
    "trapQuestions": [
      "La successione di norme integratrici (ad esempio tabelle stupefacenti) determina sempre abolitio?",
      "Il decreto-legge non convertito è equiparabile a un’abolitio criminis?"
    ],
    "miniCase": "Tizio è condannato in via definitiva per un fatto che la nuova legge non considera più reato: il giudice dell’esecuzione revoca la sentenza ex art. 673 c.p.p. Se invece la nuova legge riduce solo la pena massima, il giudicato non si tocca.",
    "jurisprudenceNotes": "Sez. Un. Giordano 2008 e Magera 2009 sulla distinzione fra abolitio e modifica mediata; Corte cost. 230/2012 sui limiti dell’estensione del giudicato; CEDU Scoppola c. Italia 2009 sulla lex mitior.",
    "commonMistakes": [
      "Ritenere che ogni lex mitior travolga il giudicato.",
      "Confondere abolitio criminis con mera attenuazione sanzionatoria.",
      "Dimenticare il regime delle leggi temporanee."
    ],
    "checklist": [
      "citare art. 2 c.p. e art. 25 Cost.",
      "distinguere abolitio vs successione modificativa",
      "richiamare art. 673 c.p.p. e Scoppola",
      "chiudere con leggi temporanee/eccezionali"
    ],
    "flashcards": [
      { "q": "Quale comma dell’art. 2 c.p. prevede l’abolitio criminis?", "a": "Il secondo." },
      { "q": "La lex mitior non abolitiva travolge il giudicato?", "a": "No, salvo casi di rilevanza convenzionale tipo Scoppola." },
      { "q": "Le leggi temporanee si applicano retroattivamente in mitius?", "a": "No, restano applicabili ai fatti commessi sotto la loro vigenza." },
      { "q": "Quale norma attua l’abolitio in executivis?", "a": "L’art. 673 c.p.p." },
      { "q": "Qual è la fonte costituzionale dell’irretroattività sfavorevole?", "a": "Art. 25, comma 2, Cost." }
    ]
  },
  {
    "key": "efficacia-legge-penale-spazio",
    "subjectKey": "penale",
    "area": "Parte generale",
    "title": "Efficacia della legge penale nello spazio",
    "orderIndex": 3,
    "priority": "media",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "territorialità",
      "locus commissi delicti",
      "universalità",
      "personalità attiva e passiva",
      "rinnovamento del giudizio"
    ],
    "definition": "Disciplina l’ambito spaziale di applicazione della legge penale italiana, fondata in via principale sul principio di territorialità e integrata da criteri di extraterritorialità tipizzati.",
    "ratio": "Assicurare la sovranità punitiva dello Stato sul territorio e consentire la repressione di fatti esterni che ledono interessi interni o universali.",
    "keyNorms": [
      "Art. 3 c.p.",
      "Artt. 6-10 c.p.",
      "Art. 11 c.p. (rinnovamento del giudizio)",
      "Art. 6, comma 2, c.p. (locus commissi delicti)"
    ],
    "coreElements": [
      "principio di territorialità (art. 6 c.p.)",
      "criterio della condotta o dell’evento per il locus",
      "delitti politici e contro lo Stato (art. 7)",
      "delitti comuni del cittadino o dello straniero all’estero (artt. 9 e 10)",
      "rinnovamento del giudizio in presenza di sentenza straniera (art. 11)"
    ],
    "distinctions": [
      "Territorialità pura (art. 6) vs criteri suppletivi (artt. 7-10).",
      "Personalità attiva (cittadino autore) vs passiva (cittadino vittima).",
      "Universalità per delitti contro l’umanità: criterio residuale di giurisdizione."
    ],
    "oralAnswerShort": "La legge penale italiana si applica in via principale per territorialità, ex articolo 6 c.p.: basta che condotta o evento si siano verificati in Italia. Agli artt. 7-10 si affiancano criteri extraterritoriali: difesa di interessi dello Stato, personalità attiva o passiva, universalità. L’articolo 11 consente il rinnovamento del giudizio nonostante una sentenza straniera.",
    "oralAnswerExtended": "Il regime spaziale ha come cardine la territorialità. Secondo l’articolo 6 c.p. il reato si considera commesso nel territorio dello Stato quando anche soltanto una parte della condotta o l’evento si sia verificato in Italia. Tale criterio è completato dagli articoli 7-10, che prevedono l’applicazione della legge italiana anche a fatti compiuti all’estero in relazione a delitti politici, contro la personalità dello Stato, contro la pubblica amministrazione e, a condizioni più stringenti, a delitti comuni del cittadino (art. 9) o dello straniero (art. 10). Si affiancano i criteri di personalità attiva e passiva e quello di universalità per i crimini contro l’umanità. Quando per lo stesso fatto è stata pronunciata sentenza all’estero, l’articolo 11 consente il rinnovamento del giudizio in Italia, fermo il ne bis in idem convenzionale nei rapporti UE. Vanno ricordati i regimi speciali derivanti da trattati (es. mandato d’arresto europeo) e l’ampia giurisprudenza sui reati informatici, dove la condotta può essere polverizzata su più giurisdizioni.",
    "classicQuestions": [
      "Come si individua il locus commissi delicti?",
      "Quando la legge italiana si applica a reati commessi all’estero dal cittadino?",
      "Che rapporto c’è fra art. 11 c.p. e ne bis in idem convenzionale?",
      "Qual è la disciplina per i delitti informatici transnazionali?"
    ],
    "trapQuestions": [
      "La semplice ideazione del reato in Italia radica la giurisdizione?",
      "Il rinnovamento del giudizio ex art. 11 è sempre obbligatorio?"
    ],
    "miniCase": "Tizio, dall’Italia, truffa via internet una vittima in Germania. L’articolo 6 radica la giurisdizione italiana perché la condotta si è svolta in Italia; la sentenza tedesca non impedirebbe il giudizio in Italia salvo il ne bis in idem UE ex art. 54 CAAS.",
    "jurisprudenceNotes": "Sez. Un. 2020 sul locus in tema di reati informatici; Corte di Giustizia sul ne bis in idem (es. Kossowski, Menci).",
    "commonMistakes": [
      "Confondere territorialità con personalità attiva.",
      "Applicare l’art. 11 ignorando il ne bis in idem UE.",
      "Non citare art. 6, comma 2, sul criterio della condotta/evento."
    ],
    "checklist": [
      "partire dall’art. 6 e dalla territorialità",
      "richiamare artt. 7-10 come eccezioni",
      "menzionare art. 11 e il ne bis in idem UE",
      "chiudere con casi informatici"
    ],
    "flashcards": [
      { "q": "Quale articolo esprime il principio di territorialità?", "a": "L’art. 6 c.p." },
      { "q": "Basta la condotta in Italia per radicare la giurisdizione?", "a": "Sì, o anche solo l’evento." },
      { "q": "Cosa prevede l’art. 11 c.p.?", "a": "Il rinnovamento del giudizio in presenza di sentenza straniera." },
      { "q": "Quale criterio giustifica la giurisdizione per i crimini di guerra?", "a": "L’universalità." },
      { "q": "Il ne bis in idem UE è disciplinato da?", "a": "Art. 54 CAAS e art. 50 CDFUE." }
    ]
  },
  {
    "key": "rapporto-fra-norme-penali",
    "subjectKey": "penale",
    "area": "Parte generale",
    "title": "Rapporto fra norme penali",
    "orderIndex": 4,
    "priority": "media",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "specialità",
      "sussidiarietà",
      "consunzione",
      "concorso apparente",
      "ne bis in idem sostanziale"
    ],
    "definition": "Insieme dei criteri che regolano il coordinamento fra più disposizioni astrattamente applicabili al medesimo fatto, distinguendo il concorso apparente dal concorso effettivo di reati.",
    "ratio": "Evitare la duplicazione della risposta sanzionatoria per un unico disvalore, in ossequio al ne bis in idem sostanziale.",
    "keyNorms": [
      "Art. 15 c.p. (specialità)",
      "Art. 84 c.p. (reato complesso)",
      "Art. 9 L. 689/1981 (specialità fra norma penale e amministrativa)",
      "Art. 649 c.p.p. (ne bis in idem processuale)"
    ],
    "coreElements": [
      "principio di specialità (lex specialis derogat generali)",
      "sussidiarietà espressa o tacita",
      "consunzione o assorbimento: un reato esaurisce il disvalore dell’altro",
      "reato complesso come caso di unità normativa",
      "clausole di riserva esplicite"
    ],
    "distinctions": [
      "Concorso apparente vs concorso materiale/formale: solo il primo esclude la pluralità di imputazioni.",
      "Specialità unilaterale vs bilaterale reciproca: solo la prima è risolvibile ex art. 15 c.p.",
      "Consunzione vs sussidiarietà tacita: la prima guarda al disvalore, la seconda al rango della tutela."
    ],
    "oralAnswerShort": "Quando più norme sembrano applicabili allo stesso fatto si parla di concorso apparente, risolto con i criteri di specialità, sussidiarietà e consunzione. L’articolo 15 c.p. codifica la specialità. Fra norma penale e amministrativa interviene l’articolo 9 L. 689/1981. L’obiettivo è evitare una doppia punizione per un unico disvalore.",
    "oralAnswerExtended": "La questione del concorso apparente di norme nasce ogni volta che una stessa condotta risulta sussumibile in più fattispecie. Il criterio principale è quello di specialità, disciplinato dall’articolo 15 c.p.: la norma speciale prevale sulla generale quando contiene tutti gli elementi della generale più uno specializzante. Accanto opera la sussidiarietà, espressa (clausole tipo ‘se il fatto non costituisce più grave reato’) o tacita, che applica la norma sussidiaria solo in mancanza della principale. La consunzione, categoria dottrinale, fa cadere l’applicazione di una norma quando il suo disvalore è interamente esaurito da un’altra. Strettamente connesso è il tema del reato complesso (art. 84), in cui l’unità normativa è sancita dal legislatore. Nel rapporto fra sanzione penale e amministrativa vige l’articolo 9 L. 689/1981, che applica la specialità salvo diversa disposizione. La prospettiva convenzionale del ne bis in idem (sentenza Grande Stevens, Menci della CGUE) ha imposto una lettura sostanziale, valutando tipo e severità delle sanzioni.",
    "classicQuestions": [
      "Cos’è la specialità ex art. 15 c.p. e come si riconosce?",
      "Come si distingue consunzione da sussidiarietà?",
      "Qual è il rapporto fra reato complesso e concorso apparente?",
      "Come opera il ne bis in idem convenzionale sulle sanzioni amministrative punitive?"
    ],
    "trapQuestions": [
      "La specialità reciproca bilaterale è risolvibile con l’art. 15?",
      "La consunzione è espressamente codificata nel codice penale?"
    ],
    "miniCase": "Tizio commette rapina impropria: il fatto soddisfa sia la previsione di furto sia la violenza/minaccia. Si applica la rapina come reato complesso ex art. 84: non c’è doppia punizione per furto e violenza privata.",
    "jurisprudenceNotes": "Sez. Un. 2017 sui rapporti fra truffa aggravata e malversazione; Grande Stevens e Menci sul ne bis in idem punitivo.",
    "commonMistakes": [
      "Confondere concorso formale con concorso apparente.",
      "Ritenere la consunzione codificata ex art. 15.",
      "Trascurare il ne bis in idem convenzionale nel dialogo con l’amministrativo."
    ],
    "checklist": [
      "partire dal ne bis in idem sostanziale",
      "citare art. 15 c.p. e art. 84",
      "ricordare art. 9 L. 689/1981",
      "chiudere con Grande Stevens/Menci"
    ],
    "flashcards": [
      { "q": "Quale articolo codifica la specialità?", "a": "L’art. 15 c.p." },
      { "q": "Il reato complesso è disciplinato da?", "a": "L’art. 84 c.p." },
      { "q": "Fra sanzione penale e amministrativa vale?", "a": "L’art. 9 L. 689/1981." },
      { "q": "Sentenza CEDU cardine sul ne bis in idem?", "a": "Grande Stevens c. Italia." },
      { "q": "Cosa risolve la specialità unilaterale?", "a": "Il concorso apparente." }
    ]
  },
  {
    "key": "condotta-nesso-causale",
    "subjectKey": "penale",
    "area": "Elemento oggettivo",
    "title": "Condotta, nesso causale e concause",
    "orderIndex": 6,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "condizionalistica",
      "causalità adeguata",
      "causalità umana",
      "concause sopravvenute",
      "giudizio controfattuale"
    ],
    "definition": "La condotta è il comportamento umano penalmente rilevante; il nesso causale lega condotta ed evento secondo criteri giuridici di imputazione oggettiva.",
    "ratio": "Ancorare la responsabilità penale a un rapporto di causazione reale, evitando una imputazione meramente storica o oggettivamente illimitata.",
    "keyNorms": [
      "Art. 40 c.p.",
      "Art. 41 c.p.",
      "Art. 42 c.p."
    ],
    "coreElements": [
      "azione o omissione penalmente rilevante",
      "nesso causale naturalistico (condicio sine qua non)",
      "limiti giuridici: causalità adeguata, umana, imputazione oggettiva",
      "concause preesistenti, simultanee, sopravvenute",
      "clausola di equivalenza delle cause (art. 41, co. 1)"
    ],
    "distinctions": [
      "Causalità attiva (art. 40 co. 1) vs causalità omissiva (art. 40 co. 2) con obbligo giuridico di impedire l’evento.",
      "Concausa sopravvenuta autonoma che interrompe il nesso (art. 41 co. 2) vs concausa non autonoma che non lo interrompe.",
      "Certezza processuale (oltre ogni ragionevole dubbio) vs certezza scientifica generale."
    ],
    "oralAnswerShort": "Il nesso causale è disciplinato dagli articoli 40 e 41 c.p. In base alla condicio sine qua non, la condotta è causa se eliminandola mentalmente l’evento non si sarebbe verificato. Le concause non escludono il nesso salvo che, ex art. 41 co. 2, siano sopravvenute e da sole sufficienti a produrre l’evento. Per l’omissione si richiede un obbligo giuridico di impedimento (art. 40 co. 2).",
    "oralAnswerExtended": "Il nesso causale è stato per anni oggetto di ricostruzioni alternative. La teoria condizionalistica pura, pur fondata sull’articolo 40 c.p., è stata integrata da quella della causalità umana di Antolisei e dalla causalità adeguata. La giurisprudenza più evoluta, soprattutto dopo le Sezioni Unite Franzese del 2002, adotta un modello di sussunzione sotto leggi scientifiche o di copertura: il giudice deve accertare, con alto grado di credibilità razionale e oltre ogni ragionevole dubbio, che senza quella condotta l’evento non si sarebbe verificato o si sarebbe verificato in epoca significativamente posteriore. Il regime delle concause è fissato dall’articolo 41: il comma 1 afferma l’equivalenza, il comma 2 introduce l’eccezione delle cause sopravvenute da sole sufficienti. Nella responsabilità omissiva impropria, ex articolo 40 comma 2, occorre l’obbligo giuridico di impedire l’evento, fonte della posizione di garanzia (protezione o controllo). In questo ambito si utilizza la ‘causalità ipotetica’: si accerta se l’azione doverosa avrebbe impedito l’evento.",
    "classicQuestions": [
      "Cosa afferma la sentenza Franzese sul nesso causale?",
      "Come si ricostruisce la causalità omissiva?",
      "Quando una concausa interrompe il nesso?",
      "Qual è la differenza fra posizione di protezione e di controllo?"
    ],
    "trapQuestions": [
      "La causalità omissiva richiede sempre una legge scientifica universale?",
      "L’articolo 41, co. 2 si applica anche alle concause preesistenti?"
    ],
    "miniCase": "Un medico omette una diagnosi; il paziente muore per una patologia preesistente. Si applica l’art. 40 co. 2: se l’intervento doveroso avrebbe, con alto grado di credibilità razionale, evitato l’evento, sussiste responsabilità omissiva.",
    "jurisprudenceNotes": "Sez. Un. Franzese 2002 sulla ‘probabilità logica’; Sez. Un. Thyssenkrupp 2014 sulla colpa nelle strutture complesse; Sez. Un. ThyssenKrupp sui compendi causale/colpevolezza.",
    "commonMistakes": [
      "Confondere probabilità statistica e probabilità logica.",
      "Applicare l’art. 41 co. 2 a concause preesistenti.",
      "Dimenticare l’obbligo giuridico come presupposto della causalità omissiva."
    ],
    "checklist": [
      "partire da art. 40 e Franzese",
      "distinguere commissivo e omissivo",
      "citare art. 41 co. 2 per le concause",
      "chiudere con lo standard BARD"
    ],
    "flashcards": [
      { "q": "Quale sentenza cardine sul nesso causale?", "a": "Sez. Un. Franzese 2002." },
      { "q": "Quando la concausa interrompe il nesso?", "a": "Se sopravvenuta e da sola sufficiente (art. 41 co. 2)." },
      { "q": "L’obbligo di impedire l’evento è fonte di?", "a": "Posizione di garanzia." },
      { "q": "Standard probatorio del nesso?", "a": "Alta credibilità razionale oltre ogni ragionevole dubbio." },
      { "q": "Le concause equivalgono alle cause?", "a": "Sì, ex art. 41 co. 1." }
    ]
  },
  {
    "key": "tentativo",
    "subjectKey": "penale",
    "area": "Forme di manifestazione del reato",
    "title": "Tentativo",
    "orderIndex": 8,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "idoneità",
      "univocità",
      "atti preparatori",
      "desistenza volontaria",
      "recesso attivo"
    ],
    "definition": "Il tentativo si ha quando il soggetto compie atti idonei, diretti in modo non equivoco a commettere un delitto, senza che l’azione si compia o l’evento si verifichi (art. 56 c.p.).",
    "ratio": "Estendere la punibilità alle condotte prossime alla consumazione, tutelando il bene giuridico minacciato ma rispettando il principio di offensività.",
    "keyNorms": [
      "Art. 56 c.p.",
      "Art. 49 c.p. (reato impossibile)",
      "Art. 115 c.p. (istigazione e accordo non seguiti da reato)"
    ],
    "coreElements": [
      "idoneità degli atti in concreto (ex ante, a base parziale)",
      "univocità della direzione verso il delitto",
      "mancata consumazione per cause esterne",
      "riduzione di pena obbligatoria (1/3 - 2/3)",
      "estensione solo ai delitti dolosi, mai alle contravvenzioni né alla colpa"
    ],
    "distinctions": [
      "Atti preparatori non punibili vs atti esecutivi punibili come tentativo.",
      "Reato impossibile ex art. 49 (inidoneità assoluta) vs tentativo inidoneo.",
      "Desistenza volontaria (esclude la punibilità per il tentativo, art. 56 co. 3) vs recesso attivo (riduce la pena, co. 4)."
    ],
    "oralAnswerShort": "Il tentativo è disciplinato dall’articolo 56 del codice penale. Occorrono atti idonei e univocamente diretti alla commissione del delitto che non si compie o il cui evento non si verifica per cause esterne. La pena è diminuita. La desistenza volontaria esclude la punibilità; il recesso attivo la riduce.",
    "oralAnswerExtended": "La disciplina del tentativo risponde a un’esigenza di anticipazione della tutela, pur nel rispetto del principio di offensività. L’articolo 56 c.p. richiede atti idonei e univoci. L’idoneità è valutata con giudizio ex ante a base parziale: ci si colloca al momento della condotta sulla base delle conoscenze dell’agente e dell’osservatore scientifico. L’univocità esprime la direzione inequivoca al delitto e va ricostruita in concreto, alla luce del piano criminoso. Sono rilevanti solo gli atti esecutivi: la dottrina tradizionale distingue fra preparatori (non punibili) ed esecutivi, ma il confine è mobile e va letto con il criterio della prossimità al risultato. Il tentativo è configurabile solo nei delitti dolosi; restano esclusi colpa, preterintenzione, contravvenzioni, alcuni reati di pura condotta (omissivi propri) e gli attentati. Le cause esterne che impediscono la consumazione fanno scattare la pena diminuita; la volontaria desistenza dal compimento dell’azione esclude la punibilità (salvo che gli atti già compiuti configurino un altro reato). Il recesso attivo, a consumazione avvenuta ma prima dell’evento, determina solo una riduzione della pena. Si richiama l’articolo 49 per il reato impossibile, con inidoneità assoluta della condotta o inesistenza dell’oggetto.",
    "classicQuestions": [
      "Come si valuta l’idoneità degli atti?",
      "Qual è la differenza fra desistenza e recesso attivo?",
      "Il tentativo è configurabile nei reati contravvenzionali?",
      "Quando un atto è univocamente diretto al delitto?"
    ],
    "trapQuestions": [
      "La desistenza volontaria esclude sempre ogni responsabilità?",
      "Il tentativo si configura nei reati di pericolo presunto?"
    ],
    "miniCase": "Tizio punta l’arma, poi spontaneamente rinuncia e si allontana: desistenza volontaria, non punibile salvo il reato di porto d’arma. Se invece ha già sparato ferendo, l’eventuale soccorso configura recesso attivo con riduzione della pena.",
    "jurisprudenceNotes": "Sez. Un. 2000 sul tentativo di rapina e atti idonei; Cass. sul tentativo di furto in abitazione rispetto all’accesso al luogo chiuso.",
    "commonMistakes": [
      "Confondere desistenza volontaria e recesso attivo.",
      "Ritenere punibili meri atti preparatori.",
      "Applicare il tentativo alla colpa o alle contravvenzioni."
    ],
    "checklist": [
      "citare art. 56 c.p.",
      "spiegare idoneità ex ante e univocità",
      "distinguere desistenza e recesso",
      "chiudere con esclusioni (colpa, contravvenzioni)"
    ],
    "flashcards": [
      { "q": "Quali requisiti richiede l’art. 56?", "a": "Atti idonei e univocamente diretti al delitto." },
      { "q": "La desistenza volontaria?", "a": "Esclude la punibilità del tentativo." },
      { "q": "Il recesso attivo?", "a": "Riduce la pena del tentativo consumato." },
      { "q": "Il tentativo è configurabile nella colpa?", "a": "No, solo nei delitti dolosi." },
      { "q": "Il reato impossibile è disciplinato da?", "a": "L’art. 49 c.p." }
    ]
  },
  {
    "key": "colpa",
    "subjectKey": "penale",
    "area": "Elemento soggettivo",
    "title": "Colpa",
    "orderIndex": 10,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "negligenza, imprudenza, imperizia",
      "colpa generica e specifica",
      "colpa cosciente",
      "regola cautelare",
      "prevedibilità ed evitabilità"
    ],
    "definition": "La colpa è l’atteggiamento psicologico caratterizzato dalla violazione di una regola cautelare, scritta o non scritta, con evento non voluto ma prevedibile ed evitabile.",
    "ratio": "Fondare la responsabilità su un rimprovero personale e oggettivo per la violazione del dovere di diligenza, salvaguardando la libertà di azione entro il rischio consentito.",
    "keyNorms": [
      "Art. 43 c.p.",
      "Art. 42, comma 2, c.p.",
      "Art. 590-sexies c.p. (colpa medica)",
      "Art. 2043 c.c. (diligenza ordinaria come parametro comparativo)"
    ],
    "coreElements": [
      "inosservanza di una regola cautelare (negligenza, imprudenza, imperizia, oppure colpa specifica)",
      "prevedibilità ed evitabilità dell’evento",
      "misura soggettiva: esigibilità del comportamento",
      "nesso causale e nesso tra regola violata ed evento (‘concretizzazione del rischio’)",
      "colpa cosciente: previsione dell’evento accettato come impossibile"
    ],
    "distinctions": [
      "Colpa generica (art. 43: negligenza, imprudenza, imperizia) vs colpa specifica (violazione di leggi, regolamenti, ordini o discipline).",
      "Colpa cosciente (art. 61 n. 3) vs dolo eventuale: nel primo l’evento è previsto ma sicuramente escluso, nel secondo accettato come possibile.",
      "Misura oggettiva (regola cautelare) vs soggettiva (capacità concreta dell’agente modello)."
    ],
    "oralAnswerShort": "La colpa è disciplinata dall’articolo 43 c.p. e consiste nella violazione di una regola cautelare con evento prevedibile ed evitabile, non voluto. Si articola in colpa generica e specifica. Si distingue dalla colpa cosciente, aggravante ex art. 61 n. 3, e dal dolo eventuale. In tema medico rileva l’articolo 590-sexies c.p.",
    "oralAnswerExtended": "La colpa, disciplinata dall’articolo 43 c.p., è la forma di colpevolezza fondata sulla violazione di un dovere di diligenza. L’articolo 42, comma 2, sancisce l’eccezionalità della responsabilità colposa nei delitti, salvo diversa previsione. La dottrina la scinde in misura oggettiva (cioè la regola cautelare violata, generica o specifica) e misura soggettiva (l’esigibilità della condotta rispetto all’agente modello). L’imputazione dell’evento richiede che esso sia concreta realizzazione del rischio che la regola mirava a prevenire. La giurisprudenza distingue la colpa generica (negligenza, imprudenza, imperizia) dalla colpa specifica (violazione di disposizioni normative o di cautele codificate). La colpa cosciente, aggravante dell’articolo 61 n. 3, non si confonde con il dolo eventuale: essa presuppone la fiduciosa esclusione dell’evento previsto. In ambito sanitario, l’articolo 590-sexies c.p., introdotto dalla legge Gelli-Bianco, esclude la punibilità per imperizia quando l’operatore si è attenuto alle linee guida accreditate, in linea con la sentenza Mariotti (Sez. Un. 2018).",
    "classicQuestions": [
      "Qual è la distinzione fra dolo eventuale e colpa cosciente?",
      "Come si ricostruisce la misura soggettiva della colpa?",
      "Qual è la disciplina della colpa medica dopo la legge Gelli-Bianco?",
      "Cos’è la ‘concretizzazione del rischio’?"
    ],
    "trapQuestions": [
      "La mera inosservanza di una regola cautelare basta a integrare la colpa?",
      "L’art. 590-sexies si applica anche alla negligenza e imprudenza?"
    ],
    "miniCase": "Un chirurgo esegue un intervento seguendo linee guida accreditate ma commette un errore di imperizia lieve: ex art. 590-sexies non è punibile; se l’errore è di negligenza resta responsabile.",
    "jurisprudenceNotes": "Sez. Un. Thyssenkrupp 2014 su colpa nelle organizzazioni complesse; Sez. Un. Mariotti 2018 sull’art. 590-sexies; Corte cost. 295/2022 sui limiti dell’esonero.",
    "commonMistakes": [
      "Confondere colpa cosciente e dolo eventuale.",
      "Trascurare la misura soggettiva e la concretizzazione del rischio.",
      "Applicare l’art. 590-sexies oltre l’imperizia."
    ],
    "checklist": [
      "citare artt. 43 e 42 co. 2",
      "distinguere misura oggettiva e soggettiva",
      "spiegare colpa generica/specifica e cosciente",
      "chiudere con 590-sexies/Mariotti"
    ],
    "flashcards": [
      { "q": "Quale articolo definisce la colpa?", "a": "L’art. 43 c.p." },
      { "q": "La colpa cosciente è?", "a": "Un’aggravante ex art. 61 n. 3." },
      { "q": "La colpa specifica richiede?", "a": "Violazione di leggi, regolamenti, ordini o discipline." },
      { "q": "L’art. 590-sexies si applica a?", "a": "Imperizia medica con rispetto delle linee guida." },
      { "q": "Cosa richiede la ‘concretizzazione del rischio’?", "a": "Che l’evento sia quello prevenuto dalla regola cautelare." }
    ]
  },
  {
    "key": "imputabilita",
    "subjectKey": "penale",
    "area": "Colpevolezza",
    "title": "Imputabilità",
    "orderIndex": 14,
    "priority": "alta",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "capacità di intendere e di volere",
      "vizio totale o parziale di mente",
      "actiones liberae in causa",
      "minore età",
      "ubriachezza e stupefacenti"
    ],
    "definition": "L’imputabilità è la capacità di intendere e di volere al momento del fatto, presupposto della colpevolezza e della pena.",
    "ratio": "Riconoscere sanzione penale solo a chi è capace di autodeterminarsi, garantendo il principio di personalità (art. 27 Cost.).",
    "keyNorms": [
      "Artt. 85-98 c.p.",
      "Art. 27, comma 1 e 3, Cost.",
      "Artt. 88-89 c.p. (vizio totale/parziale di mente)",
      "Art. 97-98 c.p. (minore età)",
      "Art. 87 c.p. (actiones liberae in causa)"
    ],
    "coreElements": [
      "capacità di intendere e di volere al momento del fatto",
      "cause tipizzate di esclusione/diminuzione (vizio di mente, età, ubriachezza cronica, sordomutismo)",
      "imputabilità presunta oltre i 18 anni, valutata fra 14 e 18",
      "non rilevano ubriachezza e intossicazione volontarie ex art. 92",
      "actiones liberae in causa: punibilità per fatto commesso in stato procurato di incapacità"
    ],
    "distinctions": [
      "Vizio totale (art. 88, esclude imputabilità) vs vizio parziale (art. 89, pena ridotta).",
      "Ubriachezza occasionale volontaria o colposa (art. 92, non esclude) vs ubriachezza abituale o cronica (artt. 94-95).",
      "Minore di 14 anni (non imputabile) vs 14-18 (imputabilità valutata in concreto)."
    ],
    "oralAnswerShort": "L’imputabilità è la capacità di intendere e di volere (art. 85 c.p.). È presupposto della colpevolezza. Viene meno in casi tipici: vizio totale di mente (art. 88), minore età, sordomutismo. Il vizio parziale (art. 89) riduce la pena. Le actiones liberae in causa restano punibili (art. 87).",
    "oralAnswerExtended": "L’imputabilità, ex articolo 85 c.p., è la capacità di intendere e di volere al momento del fatto. Si tratta di un presupposto della colpevolezza, in linea con l’articolo 27 Cost. Sono cause tipizzate di esclusione: il vizio totale di mente (art. 88), la minore età (artt. 97 e 98), il sordomutismo (art. 96) e le forme di intossicazione cronica. Il vizio parziale di mente (art. 89) non esclude l’imputabilità ma riduce la pena. Le Sezioni Unite Raso del 2005 hanno affermato che anche disturbi della personalità, purché di consistente entità, possono rilevare come infermità. L’ubriachezza e l’uso di stupefacenti occasionali e volontari non incidono sull’imputabilità (art. 92 co. 1); anzi, se preordinate ad agire in stato di incapacità rendono la pena aumentata, in applicazione della figura delle actiones liberae in causa, disciplinate all’articolo 87. Il minore di 14 anni è sempre non imputabile; tra 14 e 18 anni occorre un accertamento in concreto sulla maturità, ed è comunque prevista un’attenuazione della pena.",
    "classicQuestions": [
      "Qual è la differenza fra vizio totale e parziale di mente?",
      "I disturbi della personalità possono escludere l’imputabilità?",
      "Cosa sono le actiones liberae in causa?",
      "Come si accerta l’imputabilità del minore?"
    ],
    "trapQuestions": [
      "L’ubriachezza volontaria esclude l’imputabilità?",
      "La semplice nevrosi è sempre infermità ex art. 88?"
    ],
    "miniCase": "Tizio si ubriaca per darsi coraggio prima di commettere una rapina: l’ubriachezza è preordinata e punibile ai sensi dell’art. 87 (actio libera in causa) con pena aumentata.",
    "jurisprudenceNotes": "Sez. Un. Raso 2005 sui disturbi di personalità; Corte cost. 41/2017 sui limiti di trattabilità dei non imputabili; Cass. sui minori e accertamento della maturità.",
    "commonMistakes": [
      "Confondere vizio totale e parziale.",
      "Ritenere che l’ubriachezza volontaria riduca l’imputabilità.",
      "Sottovalutare la soglia di consistenza per i disturbi di personalità."
    ],
    "checklist": [
      "citare art. 85 c.p. e art. 27 Cost.",
      "ricordare artt. 88-89",
      "richiamare Raso sui disturbi di personalità",
      "chiudere con actio libera in causa"
    ],
    "flashcards": [
      { "q": "Quale norma definisce l’imputabilità?", "a": "L’art. 85 c.p." },
      { "q": "Il vizio parziale?", "a": "Non esclude l’imputabilità ma riduce la pena (art. 89)." },
      { "q": "L’ubriachezza preordinata?", "a": "Rientra nelle actiones liberae in causa (art. 87)." },
      { "q": "Il minore di 14 anni è imputabile?", "a": "No, mai." },
      { "q": "Sentenza sui disturbi di personalità?", "a": "Sez. Un. Raso 2005." }
    ]
  },
  {
    "key": "concorso-di-persone",
    "subjectKey": "penale",
    "area": "Concorso di persone e circostanze",
    "title": "Concorso di persone nel reato",
    "orderIndex": 15,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "plurisoggettività eventuale",
      "contributo materiale o morale",
      "agevolazione colposa",
      "mutamento del titolo del reato",
      "concorso anomalo"
    ],
    "definition": "Si ha concorso di persone quando più soggetti realizzano insieme un reato: il codice punisce ciascuno secondo la pena stabilita, con possibili temperamenti.",
    "ratio": "Estendere la punibilità a tutti coloro che offrono un contributo causalmente rilevante alla realizzazione del fatto, valorizzando il principio di personalità.",
    "keyNorms": [
      "Art. 110 c.p.",
      "Art. 111 c.p. (determinazione al reato di non imputabile)",
      "Art. 112 c.p. (aggravanti)",
      "Art. 114 c.p. (attenuante del minimo contributo)",
      "Art. 116 c.p. (concorso anomalo)"
    ],
    "coreElements": [
      "pluralità di agenti",
      "realizzazione del fatto tipico",
      "contributo causale (materiale, morale, omissivo)",
      "consapevolezza del fatto altrui (elemento soggettivo)",
      "unità giuridica del reato concorsuale"
    ],
    "distinctions": [
      "Concorso morale (istigazione, determinazione, rafforzamento) vs concorso materiale.",
      "Concorso eventuale (art. 110) vs reato a concorso necessario (es. rissa).",
      "Concorso anomalo ex art. 116 vs cooperazione colposa ex art. 113."
    ],
    "oralAnswerShort": "Il concorso di persone è disciplinato dall’articolo 110 c.p.: quando più persone concorrono nel medesimo reato, ciascuno soggiace alla pena prevista. Richiede contributo causale, pluralità di agenti e consapevolezza del fatto altrui. L’articolo 116 regola il concorso anomalo quando il reato realizzato è diverso da quello voluto.",
    "oralAnswerExtended": "La disciplina del concorso ruota attorno all’articolo 110 c.p., che adotta una clausola generale di estensione della punibilità. La dottrina identifica due teorie principali: differenziata (ruoli tipici) e unitaria, quest’ultima accolta dal codice. Serve un contributo causale alla realizzazione del reato: può essere materiale (partecipazione esecutiva) o morale (istigazione, rafforzamento dell’altrui proposito). Anche l’omissione è concorso se sussiste un obbligo giuridico di impedimento. Sul piano soggettivo occorre la consapevolezza del concorso di altri, non necessariamente un previo accordo (basta la cd. ‘adesione’). Il codice prevede una serie di correttivi: l’articolo 111 punisce la determinazione al reato di un non imputabile; l’articolo 112 disciplina le aggravanti (numero concorrenti, promotori, uso di minori); l’articolo 114 consente una riduzione per il partecipe di minima importanza. L’articolo 116 regola il cosiddetto concorso anomalo, quando uno dei concorrenti realizza un reato diverso e più grave di quello voluto: gli altri rispondono se l’evento era prevedibile, secondo la lettura costituzionalmente orientata imposta da Corte cost. 42/1965. Infine, l’articolo 117 regola il mutamento del titolo del reato per effetto di qualità personali (es. pubblico ufficiale).",
    "classicQuestions": [
      "Quali teorie sul concorso e quale è accolta dal codice?",
      "Come si configura il concorso morale?",
      "Cos’è il concorso anomalo ex art. 116?",
      "Quale è la portata dell’articolo 117?"
    ],
    "trapQuestions": [
      "La mera presenza sul luogo integra concorso?",
      "Chi non sa del ruolo altrui può concorrere ex art. 110?"
    ],
    "miniCase": "Tizio e Caio pianificano un furto. Caio, durante l’azione, uccide il custode. Tizio risponde di rapina aggravata dal concorso anomalo (art. 116) se l’evento era prevedibile.",
    "jurisprudenceNotes": "Corte cost. 42/1965 sulla lettura costituzionale dell’art. 116; Sez. Un. 2004 sul concorso morale nei reati associativi; Cass. su presenza e contributo atipico.",
    "commonMistakes": [
      "Ritenere la presenza inerte sufficiente al concorso.",
      "Confondere art. 116 (concorso anomalo) con cooperazione colposa (art. 113).",
      "Dimenticare l’art. 117 per i reati propri."
    ],
    "checklist": [
      "citare art. 110 e teoria unitaria",
      "spiegare contributo materiale/morale",
      "richiamare art. 116 e Corte cost. 42/1965",
      "chiudere con art. 117"
    ],
    "flashcards": [
      { "q": "Quale articolo esprime la clausola generale del concorso?", "a": "L’art. 110 c.p." },
      { "q": "Il concorso anomalo è regolato da?", "a": "L’art. 116 c.p." },
      { "q": "La presenza inerte è concorso?", "a": "No, serve un contributo causale." },
      { "q": "Quale norma regola il mutamento del titolo?", "a": "L’art. 117 c.p." },
      { "q": "Quale sentenza costituzionale interpreta l’art. 116?", "a": "Corte cost. 42/1965." }
    ]
  },
  {
    "key": "circostanze",
    "subjectKey": "penale",
    "area": "Concorso di persone e circostanze",
    "title": "Circostanze del reato",
    "orderIndex": 16,
    "priority": "media",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "aggravanti e attenuanti",
      "circostanze comuni e speciali",
      "giudizio di bilanciamento",
      "art. 69 c.p.",
      "attenuanti generiche art. 62-bis"
    ],
    "definition": "Le circostanze sono elementi accessori che modificano la risposta sanzionatoria senza mutare la struttura del reato, rendendolo più o meno grave.",
    "ratio": "Adeguare la pena alla concreta gravità del fatto, valorizzando elementi oggettivi o soggettivi che incidono sul disvalore.",
    "keyNorms": [
      "Artt. 61-62 c.p. (aggravanti e attenuanti comuni)",
      "Art. 62-bis c.p. (attenuanti generiche)",
      "Art. 63-64 c.p. (calcolo della pena con più circostanze)",
      "Art. 69 c.p. (bilanciamento)",
      "Art. 59 c.p. (imputazione oggettiva e soggettiva delle circostanze)"
    ],
    "coreElements": [
      "aggravanti e attenuanti, comuni o speciali",
      "ad effetto comune, speciale (aumento/ riduzione fino a 1/3), indipendenti",
      "imputazione: aggravanti richiedono conoscenza o colpa (art. 59); attenuanti valutate anche se ignorate",
      "giudizio di bilanciamento quando concorrono circostanze eterogenee",
      "attenuanti generiche art. 62-bis per adeguamento al caso concreto"
    ],
    "distinctions": [
      "Circostanze oggettive vs soggettive (art. 70): rilevano per l’estensione ai concorrenti.",
      "Circostanze ad effetto comune (<1/3) vs ad effetto speciale (>1/3) vs indipendenti.",
      "Aggravanti a responsabilità oggettiva (vecchio art. 59) superate da riforma 1990 e Corte cost."
    ],
    "oralAnswerShort": "Le circostanze modificano la pena senza mutare il reato. L’articolo 59 c.p. esige conoscenza o colpa per le aggravanti. Quando concorrono circostanze eterogenee si applica il giudizio di bilanciamento ex art. 69. Le attenuanti generiche, ex art. 62-bis, servono all’adeguamento al caso concreto.",
    "oralAnswerExtended": "Le circostanze sono elementi accessori che adeguano la pena al disvalore concreto, senza incidere sulla tipicità. Possono essere aggravanti o attenuanti, comuni (artt. 61 e 62) o speciali, oggettive o soggettive (art. 70). Il codice distingue tre categorie in base agli effetti: comune (variazione fino a un terzo), speciale (oltre un terzo) e indipendente (pena diversa rispetto alla fattispecie base). La riforma del 1990 ha modificato l’articolo 59 per superare la responsabilità oggettiva delle aggravanti: oggi richiedono conoscenza o colpa, mentre le attenuanti operano anche se ignorate. Quando nello stesso fatto concorrono circostanze eterogenee, l’articolo 69 c.p. prevede un giudizio di bilanciamento in prevalenza, equivalenza o prevalenza delle attenuanti sulle aggravanti, con alcuni limiti imposti dal legislatore (es. divieto di prevalenza delle attenuanti nei confronti della recidiva reiterata). Le attenuanti generiche, introdotte dall’articolo 62-bis, consentono al giudice di valorizzare elementi non espressamente previsti, purché espressi con motivazione non apparente (Sez. Un. 2008 sui criteri motivazionali).",
    "classicQuestions": [
      "Come si calcolano le circostanze ad effetto comune?",
      "Quali criteri per il bilanciamento ex art. 69?",
      "Come si imputano aggravanti e attenuanti dopo la riforma del ’90?",
      "Qual è la funzione delle attenuanti generiche?"
    ],
    "trapQuestions": [
      "Le attenuanti generiche vanno sempre concesse?",
      "Il bilanciamento è libero o soggetto a divieti legali?"
    ],
    "miniCase": "Tizio commette furto con destrezza (aggravante, art. 625) ma risarcisce il danno (attenuante, art. 62 n. 6). Il giudice effettua il bilanciamento ex art. 69, motivando la prevalenza o l’equivalenza.",
    "jurisprudenceNotes": "Sez. Un. 2008 sul metodo motivazionale del giudice sulle 62-bis; Corte cost. 74/2016 sui limiti al bilanciamento.",
    "commonMistakes": [
      "Ritenere le aggravanti a responsabilità oggettiva.",
      "Ignorare i divieti legali al bilanciamento.",
      "Confondere circostanze e elementi costitutivi del reato."
    ],
    "checklist": [
      "citare artt. 61-62 e 59",
      "spiegare categoria effetti (comune/speciale/indipendente)",
      "ricordare art. 69 con limiti legali",
      "chiudere con 62-bis e motivazione"
    ],
    "flashcards": [
      { "q": "L’art. 59 richiede?", "a": "Conoscenza o colpa per le aggravanti, indifferente per le attenuanti." },
      { "q": "Cosa fa l’art. 69?", "a": "Disciplina il bilanciamento fra circostanze eterogenee." },
      { "q": "Effetto comune significa?", "a": "Aumento o riduzione fino a un terzo." },
      { "q": "Le attenuanti generiche sono in?", "a": "Art. 62-bis c.p." },
      { "q": "Dopo la riforma 1990 le aggravanti sono?", "a": "Non più a responsabilità oggettiva." }
    ]
  },
  {
    "key": "concorso-di-reati",
    "subjectKey": "penale",
    "area": "Concorso di reati",
    "title": "Concorso di reati e continuazione",
    "orderIndex": 17,
    "priority": "media",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "concorso materiale",
      "concorso formale",
      "continuazione",
      "cumulo giuridico",
      "medesimo disegno criminoso"
    ],
    "definition": "Si ha concorso di reati quando con più azioni od omissioni, o anche con una sola azione, si violano più disposizioni di legge o la stessa più volte.",
    "ratio": "Sanzionare la pluralità di offese evitando il rigore del cumulo materiale puro, grazie ai temperamenti del cumulo giuridico e della continuazione.",
    "keyNorms": [
      "Art. 71 c.p. (cumulo materiale)",
      "Art. 81, comma 1 c.p. (concorso formale)",
      "Art. 81, comma 2 c.p. (continuazione)",
      "Art. 78 c.p. (limiti del cumulo)"
    ],
    "coreElements": [
      "concorso materiale: più azioni, più reati",
      "concorso formale: una sola azione, più reati (cumulo giuridico)",
      "continuazione: più violazioni unite da medesimo disegno criminoso",
      "aumento fino al triplo sulla pena del reato più grave (art. 81)",
      "limiti di cumulo materiale (art. 78: pene non oltre 30 anni reclusione)"
    ],
    "distinctions": [
      "Concorso materiale (art. 71) vs formale (art. 81 co. 1): numero di azioni.",
      "Continuazione (art. 81 co. 2) vs concorso formale: richiede il medesimo disegno criminoso.",
      "Reato abituale vs continuazione: il primo è unità naturalistica."
    ],
    "oralAnswerShort": "Il concorso di reati si distingue in materiale e formale. Il cumulo materiale sconta tutte le pene, con i limiti dell’articolo 78. L’articolo 81 introduce il cumulo giuridico per il concorso formale e per la continuazione, quest’ultima legata al medesimo disegno criminoso. L’aumento è fino al triplo.",
    "oralAnswerExtended": "Il sistema sanzionatorio italiano mitiga la regola classica del cumulo materiale (art. 71 c.p.) con due istituti. Il primo è il concorso formale, previsto dall’articolo 81 comma 1: una sola azione od omissione integra più reati; si applica la pena del più grave aumentata fino al triplo. Il secondo è la continuazione (art. 81 comma 2): più azioni realizzano più reati in esecuzione di un medesimo disegno criminoso. Secondo la giurisprudenza consolidata (Sez. Un. 2000, 2017) il disegno criminoso è una rappresentazione anticipata e unitaria, sia pure nelle grandi linee, delle violazioni future. Anche in caso di continuazione si applica il cumulo giuridico: pena più grave aumentata fino al triplo. Gli articoli 73 e 78 stabiliscono i limiti: pena detentiva temporanea non superiore a 30 anni di reclusione, 6 di arresto. L’istituto della continuazione opera tanto nel processo (riconoscimento in sentenza) quanto in fase esecutiva (art. 671 c.p.p.). Si applica anche a reati già giudicati con sentenze separate.",
    "classicQuestions": [
      "Come si distingue il concorso materiale dal formale?",
      "Quali requisiti richiede la continuazione?",
      "Qual è la cornice del cumulo giuridico?",
      "Come si applica l’art. 671 c.p.p. in executivis?"
    ],
    "trapQuestions": [
      "Il medesimo disegno criminoso coincide con la premeditazione?",
      "Il reato continuato è considerato unico a tutti gli effetti?"
    ],
    "miniCase": "Tizio commette nel tempo cinque furti nello stesso supermercato con identica modalità: il giudice, se ravvisa un disegno criminoso unitario, applica la continuazione ex art. 81 co. 2.",
    "jurisprudenceNotes": "Sez. Un. 2000 e 2017 sul disegno criminoso; Corte cost. 183/2011 sul concorso formale.",
    "commonMistakes": [
      "Applicare la continuazione senza ravvisare il disegno criminoso.",
      "Superare i limiti dell’art. 78 nel cumulo materiale.",
      "Confondere continuazione e reato abituale."
    ],
    "checklist": [
      "citare art. 81 c.p.",
      "spiegare differenza materiale/formale/continuazione",
      "richiamare limiti dell’art. 78",
      "chiudere con art. 671 c.p.p. in executivis"
    ],
    "flashcards": [
      { "q": "Cosa prevede l’art. 81?", "a": "Concorso formale e continuazione con cumulo giuridico." },
      { "q": "Aumento massimo sulla pena più grave?", "a": "Fino al triplo." },
      { "q": "Requisito tipico della continuazione?", "a": "Il medesimo disegno criminoso." },
      { "q": "Limite della reclusione temporanea?", "a": "30 anni (art. 78)." },
      { "q": "Quale articolo c.p.p. riconosce la continuazione in executivis?", "a": "L’art. 671 c.p.p." }
    ]
  },
  {
    "key": "responsabilita-contrattuale",
    "subjectKey": "civile",
    "area": "Obbligazioni",
    "title": "Responsabilità contrattuale",
    "orderIndex": 9,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "art. 1218 c.c.",
      "prevedibilità del danno",
      "causa non imputabile",
      "obbligazioni di mezzi e di risultato",
      "onere probatorio"
    ],
    "definition": "La responsabilità contrattuale è l’obbligo del debitore inadempiente di risarcire il danno, salvo che provi che l’inadempimento è dipeso da causa a lui non imputabile.",
    "ratio": "Tutelare l’interesse creditorio al corretto adempimento, distribuendo razionalmente gli oneri probatori e bilanciando autonomia privata e protezione del creditore.",
    "keyNorms": [
      "Art. 1218 c.c.",
      "Art. 1176 c.c. (diligenza)",
      "Art. 1225 c.c. (prevedibilità)",
      "Art. 1227 c.c. (concorso di colpa)",
      "Art. 1256 c.c. (impossibilità)"
    ],
    "coreElements": [
      "inadempimento o inesatto adempimento",
      "imputabilità al debitore (colpa presunta)",
      "danno risarcibile nei limiti dell’art. 1223 e ss.",
      "prevedibilità salvo dolo (art. 1225)",
      "onere probatorio: il creditore prova fonte e scadenza, il debitore l’adempimento o la causa non imputabile"
    ],
    "distinctions": [
      "Obbligazioni di mezzi (diligenza) vs di risultato (conseguimento del bene dovuto) – distinzione superata a livello di onere probatorio da Sez. Un. 2008.",
      "Responsabilità contrattuale (art. 1218) vs extracontrattuale (art. 2043): onere probatorio, prescrizione, prevedibilità.",
      "Impossibilità oggettiva ex art. 1256 vs difficoltà economica sopravvenuta."
    ],
    "oralAnswerShort": "La responsabilità contrattuale è disciplinata dall’articolo 1218 c.c. Il creditore deve provare la fonte dell’obbligazione e la scadenza; il debitore è tenuto a dimostrare l’adempimento o una causa non imputabile. Il danno risarcibile è quello prevedibile (art. 1225), salvo dolo. Si distingue dalla responsabilità extracontrattuale per onere probatorio, prescrizione e ambito del danno.",
    "oralAnswerExtended": "Il modello italiano è quello del debito – responsabilità fondato sull’articolo 1218. La giurisprudenza più recente (Sez. Un. 13533/2001 e successive) ha semplificato l’onere probatorio: il creditore deve solo allegare l’inadempimento di una obbligazione contrattualmente assunta; al debitore spetta provare l’adempimento o la causa non imputabile. Il criterio di imputazione è di tipo soggettivo oggettivizzato: si guarda alla diligenza ex articolo 1176 c.c., che per i professionisti è quella del buon professionista in relazione all’attività svolta. Il danno risarcibile comprende il danno emergente e il lucro cessante (art. 1223), è limitato a quello prevedibile al tempo dell’insorgenza dell’obbligazione (art. 1225, salvo dolo) ed è ridotto in caso di concorso colposo del creditore (art. 1227). L’impossibilità sopravvenuta, ex articolo 1256, estingue l’obbligazione se oggettiva e non imputabile; altrimenti si traduce in inadempimento. La classica distinzione fra obbligazioni di mezzi e di risultato, pur meno rilevante sul piano probatorio, resta utile per individuare il contenuto della prestazione, specialmente in tema di responsabilità professionale (Sez. Un. 2008 Scarpelli).",
    "classicQuestions": [
      "Chi ha l’onere probatorio nell’inadempimento?",
      "Come opera la prevedibilità ex art. 1225?",
      "Qual è la differenza fra obbligazioni di mezzi e di risultato?",
      "Cosa prevede l’art. 1256 in tema di impossibilità?"
    ],
    "trapQuestions": [
      "La difficoltà economica sopravvenuta è causa non imputabile?",
      "Il danno imprevedibile è sempre irrisarcibile?"
    ],
    "miniCase": "Un’impresa non consegna il bene a scadenza. Il compratore prova contratto e scadenza; l’impresa deve provare l’adempimento o che l’evento era estraneo alla sua sfera di controllo.",
    "jurisprudenceNotes": "Sez. Un. 13533/2001 sul riparto dell’onere probatorio; Sez. Un. 2008 Scarpelli sulle obbligazioni di mezzi/risultato; Sez. Un. 2019 sulla responsabilità medica.",
    "commonMistakes": [
      "Onerare il creditore della prova dell’inadempimento.",
      "Ignorare il limite della prevedibilità.",
      "Confondere impossibilità sopravvenuta e onerosità sopravvenuta."
    ],
    "checklist": [
      "citare art. 1218 c.c.",
      "spiegare riparto onere probatorio Sez. Un. 2001",
      "ricordare art. 1225 (prevedibilità)",
      "chiudere con responsabilità professionale"
    ],
    "flashcards": [
      { "q": "Quale norma fonda la responsabilità contrattuale?", "a": "L’art. 1218 c.c." },
      { "q": "Chi prova la causa non imputabile?", "a": "Il debitore." },
      { "q": "La prevedibilità del danno?", "a": "Limita il risarcimento salvo dolo (art. 1225)." },
      { "q": "Quale la diligenza richiesta?", "a": "Quella dell’art. 1176 c.c." },
      { "q": "Sentenza SS.UU. su onere probatorio?", "a": "13533/2001." }
    ]
  },
  {
    "key": "responsabilita-extracontrattuale",
    "subjectKey": "civile",
    "area": "Illecito civile",
    "title": "Responsabilità extracontrattuale",
    "orderIndex": 22,
    "priority": "alta",
    "examFrequency": "alta",
    "difficulty": "intermedia",
    "keywords": [
      "art. 2043 c.c.",
      "danno ingiusto",
      "nesso di causalità materiale e giuridica",
      "colpa e dolo",
      "danno non patrimoniale art. 2059"
    ],
    "definition": "La responsabilità extracontrattuale, o aquiliana, obbliga chi cagiona ad altri un danno ingiusto con fatto doloso o colposo a risarcirlo (art. 2043 c.c.).",
    "ratio": "Apprestare una tutela generale di tipo risarcitorio contro le lesioni ingiuste di situazioni giuridiche soggettive, al di fuori di un pre-esistente vincolo obbligatorio.",
    "keyNorms": [
      "Art. 2043 c.c.",
      "Art. 2059 c.c. (danno non patrimoniale)",
      "Artt. 2047-2054 c.c. (responsabilità speciali)",
      "Art. 2697 c.c. (onere della prova)"
    ],
    "coreElements": [
      "fatto (condotta)",
      "ingiustizia del danno (lesione di interesse protetto)",
      "nesso causale (causalità materiale e giuridica)",
      "elemento soggettivo (dolo o colpa)",
      "danno patrimoniale (art. 1223-1226) e non patrimoniale (art. 2059)"
    ],
    "distinctions": [
      "Danno ingiusto (art. 2043) vs antigiuridico: la Cass. 500/1999 amplia la tutela agli interessi legittimi.",
      "Responsabilità per colpa vs responsabilità oggettiva o aggravata (artt. 2050-2054).",
      "Danno evento vs danno conseguenza (Sez. Un. 2008 San Martino)."
    ],
    "oralAnswerShort": "L’articolo 2043 c.c. impone il risarcimento del danno ingiusto cagionato con dolo o colpa. Occorrono fatto, ingiustizia, nesso causale, elemento soggettivo e danno. Il non patrimoniale è risarcibile ex art. 2059 nei casi di legge e di lesione di diritti costituzionalmente tutelati, secondo le Sezioni Unite del 2008.",
    "oralAnswerExtended": "La responsabilità extracontrattuale ha clausola generale nell’articolo 2043 c.c. La giurisprudenza ha scandito cinque elementi: fatto (condotta commissiva o omissiva); ingiustizia del danno, cioè lesione non iure di un interesse giuridicamente protetto; nesso di causalità materiale (artt. 40-41 c.p. per richiamo) e giuridica (art. 1223 c.c.); elemento soggettivo di dolo o colpa; quantum del danno, articolato in patrimoniale e non patrimoniale. La sentenza Cass. 500/1999 ha esteso la risarcibilità anche alle lesioni di interessi legittimi oppositivi e pretensivi, marcando il passaggio a un’atipicità ampia dell’illecito aquiliano. In materia di danno non patrimoniale, l’articolo 2059 è stato rivisitato dalle Sez. Un. di San Martino (11/11/2008): il risarcimento è dovuto oltre che nei casi espressamente previsti dalla legge, anche per lesione di diritti inviolabili della persona. La responsabilità aquiliana si differenzia dalla contrattuale per onere probatorio (il danneggiato prova anche colpa e nesso), prescrizione (5 anni, salvo fatto-reato), e ambito del danno (inclusivo anche dell’imprevedibile). Il codice prevede fattispecie speciali: art. 2048 (sorveglianza), 2050 (attività pericolose), 2051 (custodia), 2052 (animali), 2053 (edifici), 2054 (circolazione stradale).",
    "classicQuestions": [
      "Quali sono gli elementi costitutivi dell’illecito aquiliano?",
      "Cosa ha stabilito Cass. 500/1999?",
      "Quali categorie di danno non patrimoniale risarcibili dopo San Martino?",
      "Come opera la responsabilità da cose in custodia ex art. 2051?"
    ],
    "trapQuestions": [
      "Il danno non patrimoniale è risarcibile in ogni lesione?",
      "Il nesso causale in materia civile coincide con quello penale?"
    ],
    "miniCase": "Un pedone cade a causa di una buca stradale non segnalata: l’ente gestore risponde ex art. 2051 salvo che provi il caso fortuito, compreso l’eventuale concorso di colpa del danneggiato ex art. 1227.",
    "jurisprudenceNotes": "Cass. 500/1999 sulla lesione di interessi legittimi; Sez. Un. San Martino 2008 sul danno non patrimoniale; Sez. Un. 2019 sui criteri di liquidazione.",
    "commonMistakes": [
      "Applicare il 2059 a qualsiasi sofferenza.",
      "Confondere causalità materiale e giuridica.",
      "Dimenticare il regime probatorio delle responsabilità speciali."
    ],
    "checklist": [
      "citare art. 2043 c.c. e cinque elementi",
      "richiamare Cass. 500/1999",
      "sviluppare San Martino sul 2059",
      "chiudere con responsabilità speciali"
    ],
    "flashcards": [
      { "q": "Quale articolo contiene la clausola generale?", "a": "L’art. 2043 c.c." },
      { "q": "Sentenza cardine sugli interessi legittimi?", "a": "Cass. 500/1999." },
      { "q": "Il danno non patrimoniale è disciplinato da?", "a": "L’art. 2059 c.c." },
      { "q": "Quale prescrizione?", "a": "5 anni salvo fatto-reato." },
      { "q": "Art. 2051 riguarda?", "a": "Danni da cose in custodia." }
    ]
  },
  {
    "key": "possesso",
    "subjectKey": "civile",
    "area": "Diritti reali",
    "title": "Possesso",
    "orderIndex": 27,
    "priority": "media",
    "examFrequency": "media",
    "difficulty": "intermedia",
    "keywords": [
      "corpus e animus",
      "possesso vale titolo",
      "usucapione",
      "detenzione",
      "azioni possessorie"
    ],
    "definition": "Il possesso è il potere di fatto su una cosa che si manifesta in un’attività corrispondente all’esercizio della proprietà o di altro diritto reale.",
    "ratio": "Tutelare la relazione di fatto con la cosa, in quanto apparente esercizio di un diritto, e favorire la certezza dei traffici giuridici.",
    "keyNorms": [
      "Art. 1140 c.c.",
      "Art. 1141 c.c. (presunzione di possesso)",
      "Art. 1153 c.c. (possesso vale titolo)",
      "Artt. 1158-1167 c.c. (usucapione)",
      "Artt. 1168-1170 c.c. (azioni possessorie)"
    ],
    "coreElements": [
      "corpus (potere di fatto sulla cosa)",
      "animus possidendi (intenzione di tenere la cosa come propria)",
      "possesso vs detenzione nomine alieno",
      "acquisto originario e derivativo",
      "effetti: usucapione, frutti, azioni possessorie"
    ],
    "distinctions": [
      "Possesso (animus) vs detenzione (solo corpus, es. locatario).",
      "Possesso di buona fede vs mala fede: rileva per frutti (artt. 1147-1148) e usucapione abbreviata.",
      "Azione di spoglio (art. 1168) vs manutenzione (art. 1170)."
    ],
    "oralAnswerShort": "Il possesso, ex art. 1140 c.c., è il potere di fatto sulla cosa accompagnato dall’animus. Si distingue dalla detenzione. Consente l’acquisto per usucapione e l’applicazione della regola possesso vale titolo (art. 1153) per i beni mobili. È tutelato da azioni possessorie: spoglio e manutenzione.",
    "oralAnswerExtended": "Il possesso, disciplinato dall’articolo 1140 c.c., presuppone due elementi: il corpus, ossia il potere di fatto sulla cosa, e l’animus, inteso come intenzione di esercitare la cosa a titolo di proprietario o di titolare di altro diritto reale. Quando manca l’animus si parla di detenzione. Il possesso può essere di buona fede (conoscenza di agire uti dominus in difetto di un vizio di titolo) o di mala fede, con effetti differenziati sull’acquisto dei frutti (artt. 1147-1148) e sull’usucapione abbreviata (art. 1159). La regola possesso vale titolo, all’articolo 1153, consente l’acquisto a titolo originario del diritto di proprietà o di altro diritto reale sui beni mobili non registrati quando il possessore riceve in buona fede la cosa in base a un titolo astrattamente idoneo. Il possesso protratto consente l’usucapione secondo tempi differenziati: venti anni per beni immobili (art. 1158), dieci per la buona fede con titolo trascritto (art. 1159), regimi speciali per universalità e beni mobili registrati. A tutela del possesso sono previste l’azione di spoglio (art. 1168) per chi sia stato violentemente o occultamente privato del possesso e l’azione di manutenzione (art. 1170) per la difesa del possesso continuato ultrannuale. Si distingue dalle azioni petitorie (rivendica, negatoria): queste mirano al diritto, non al possesso.",
    "classicQuestions": [
      "Che differenza c’è fra possesso e detenzione?",
      "Come opera l’art. 1153 c.c.?",
      "Quali sono i termini dell’usucapione ordinaria e abbreviata?",
      "Qual è la differenza fra azione di spoglio e di manutenzione?"
    ],
    "trapQuestions": [
      "Il possesso è presunto sempre ex art. 1141?",
      "La detenzione può trasformarsi in possesso?"
    ],
    "miniCase": "Tizio compra in buona fede un orologio da un rivenditore non proprietario: ai sensi dell’art. 1153 ne diventa proprietario nonostante il difetto di titolarità del dante causa.",
    "jurisprudenceNotes": "Sez. Un. 2017 sull’interversione del possesso; Cass. sui requisiti dell’usucapione.",
    "commonMistakes": [
      "Confondere possesso e detenzione.",
      "Ritenere l’art. 1153 applicabile ai beni registrati.",
      "Ignorare la distinzione fra spoglio e manutenzione."
    ],
    "checklist": [
      "citare art. 1140 c.c.",
      "spiegare corpus e animus",
      "richiamare art. 1153 e usucapione",
      "chiudere con azioni possessorie"
    ],
    "flashcards": [
      { "q": "Cosa richiede il possesso?", "a": "Corpus e animus." },
      { "q": "L’art. 1153 c.c. opera per?", "a": "Beni mobili non registrati in buona fede." },
      { "q": "Termine ordinario dell’usucapione immobiliare?", "a": "Venti anni." },
      { "q": "L’azione di spoglio è nell’?", "a": "Art. 1168 c.c." },
      { "q": "La detenzione?", "a": "È il possesso nomine alieno senza animus." }
    ]
  }
];
