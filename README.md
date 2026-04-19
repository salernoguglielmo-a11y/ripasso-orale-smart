# Ripasso Orale Smart

App personale per il ripasso orale universitario. Costruita attorno a materie giuridiche (diritto penale, procedura penale, civile) ma utilizzabile per qualsiasi esame.

Tutto resta **nel tuo browser** (`localStorage`): niente backend, niente account.

## Cosa fa

- **Dashboard** con panoramica, obiettivo giornaliero e suggerimenti automatici di cosa ripassare oggi.
- **Materie → Argomenti → Sottoargomenti** con note, parole chiave, priorità, stato e confidenza 0-100.
- **Flashcard** (domanda/risposta) e **domande aperte** associate agli argomenti.
- **Modalità allenamento** flashcard con mazzo mescolato.
- **Simulazione orale** con domanda casuale, timer integrato, modalità *focus* a schermo intero e valutazione finale (male / medio / bene) che aggiorna automaticamente la confidenza.
- **Storico sessioni** filtrabile per materia e tipo di attività.
- **Import / export JSON** e reset dati nelle impostazioni.
- **Ricerca, filtri per stato/priorità e ordinamenti** all'interno di una materia.

### Algoritmo di suggerimento

Ogni argomento riceve un punteggio di urgenza basato, in ordine, su:

1. priorità (alta / media / bassa)
2. distanza dalla confidenza piena (100 − confidenza)
3. giorni trascorsi dall'ultimo ripasso (saturato a 30)
4. stato (da studiare pesa più di in ripasso)

Gli argomenti già ripassati oggi vengono esclusi, a meno che non siano ad alta priorità con confidenza sotto il 40%.

## Stack

- **React 18 + TypeScript** con Vite
- **Tailwind CSS**
- **react-router-dom** per la navigazione
- Stato in `Context + useReducer`, persistenza in `localStorage`
- Zero dipendenze UI esterne (nessuna libreria di componenti)

## Struttura

```
src/
├── main.tsx                 # entrypoint + Router
├── App.tsx                  # routes
├── index.css                # base tailwind + componenti stile
├── types/                   # tipi del dominio
├── lib/
│   ├── storage.ts           # load/save/seed/import/export
│   ├── suggest.ts           # algoritmo di suggerimento ripasso
│   ├── labels.ts            # label IT + classi colore per enum
│   └── utils.ts             # id, date, clamp, shuffle, cn
├── context/AppContext.tsx   # stato globale
├── components/
│   ├── layout/              # Layout, Sidebar, PageHeader
│   ├── ui/                  # Chip, ConfidenceBar, Modal, ConfirmDialog, EmptyState
│   ├── forms/               # SubjectForm, TopicForm
│   └── topic/               # TopicListItem
└── pages/
    ├── Dashboard.tsx
    ├── Subjects.tsx
    ├── SubjectDetail.tsx
    ├── TopicDetail.tsx
    ├── Flashcards.tsx
    ├── OralSimulation.tsx
    ├── History.tsx
    └── Settings.tsx
```

## Avvio in locale

Richiede **Node 18+**.

```bash
npm install
npm run dev
```

Apri http://localhost:5173

### Comandi disponibili

```bash
npm run dev        # server di sviluppo
npm run build      # build di produzione in ./dist
npm run preview    # serve la build di produzione
npm run typecheck  # solo controllo tipi
```

## Deploy online

Il risultato di `npm run build` è una SPA statica in `dist/`: basta pubblicarla su Netlify, Vercel, GitHub Pages o qualunque hosting statico.

> Se usi un hosting che non gestisce il fallback dei path SPA, aggiungi una regola per servire `index.html` su tutte le route.

## Dati

I dati sono serializzati sotto la chiave `ripasso-orale-smart/v1` in `localStorage`. In qualsiasi momento puoi esportare/importare un backup JSON dalle Impostazioni.

Al primo avvio l'app carica dati di esempio su diritto penale, procedura penale e civile, che puoi tranquillamente modificare o eliminare.
