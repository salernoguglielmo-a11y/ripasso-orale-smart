import { ReactNode, useEffect, useMemo, useState } from 'react';
import { cardsBySubject } from './data';
import { StudyStatus, Subject, TopicCard } from './types';

type SortMode = 'logical' | 'priority';
type ProgressEntry = { status: StudyStatus; lastReviewed?: string };
type ProgressMap = Record<string, ProgressEntry>;

const STORAGE_KEY = 'ripasso-orale-smart-progress';

const SUBJECTS: { key: Subject; label: string }[] = [
  { key: 'penale', label: 'Diritto penale' },
  { key: 'civile', label: 'Diritto civile' },
  { key: 'proc_penale', label: 'Procedura penale' },
];

const STATUS_OPTIONS: Array<'all' | StudyStatus> = ['all', 'non iniziato', 'in studio', 'da consolidare', 'solido'];

const readProgress = (): ProgressMap => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
};

const rankStatus = (status: StudyStatus): number => {
  switch (status) {
    case 'solido':
      return 4;
    case 'da consolidare':
      return 3;
    case 'in studio':
      return 2;
    default:
      return 1;
  }
};

const enrichCard = (card: TopicCard, progress: ProgressMap) => {
  const saved = progress[card.slug];
  return {
    ...card,
    status: saved?.status ?? card.status,
    lastReviewed: saved?.lastReviewed,
  };
};

export default function App() {
  const [subject, setSubject] = useState<Subject>('penale');
  const [sortMode, setSortMode] = useState<SortMode>('logical');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | StudyStatus>('all');
  const [progress, setProgress] = useState<ProgressMap>({});
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const subjectCards = useMemo(() => {
    const base = cardsBySubject[subject].map((card) => enrichCard(card, progress));
    const filtered = base.filter((card) => {
      const haystack = [card.topic, card.definition, card.ratio, card.area].join(' ').toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : card.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortMode === 'logical') return a.orderIndex - b.orderIndex;
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (rankStatus(a.status) !== rankStatus(b.status)) return rankStatus(a.status) - rankStatus(b.status);
      return a.orderIndex - b.orderIndex;
    });

    return sorted;
  }, [progress, search, sortMode, statusFilter, subject]);

  useEffect(() => {
    if (!subjectCards.length) {
      setSelectedSlug('');
      return;
    }
    const stillVisible = subjectCards.some((card) => card.slug === selectedSlug);
    if (!stillVisible) setSelectedSlug(subjectCards[0].slug);
  }, [selectedSlug, subjectCards]);

  const selectedCard = subjectCards.find((card) => card.slug === selectedSlug) ?? subjectCards[0];

  const stats = useMemo(() => {
    const base = cardsBySubject[subject].map((card) => enrichCard(card, progress));
    return {
      total: base.length,
      solid: base.filter((card) => card.status === 'solido').length,
      inProgress: base.filter((card) => card.status === 'in studio').length,
      toConsolidate: base.filter((card) => card.status === 'da consolidare').length,
    };
  }, [progress, subject]);

  const updateCardStatus = (slug: string, status: StudyStatus) => {
    setProgress((current) => ({
      ...current,
      [slug]: {
        status,
        lastReviewed: new Date().toISOString(),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Ripasso orale smart</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Banca dati per il ripasso dell orale da avvocato con doppia logica di studio: ordine del manuale e priorita d esame.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUBJECTS.map((item) => (
              <button
                key={item.key}
                onClick={() => setSubject(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${subject === item.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-4">
          <StatCard label="Schede" value={String(stats.total)} />
          <StatCard label="In studio" value={String(stats.inProgress)} />
          <StatCard label="Da consolidare" value={String(stats.toConsolidate)} />
          <StatCard label="Solide" value={String(stats.solid)} />
        </section>

        <section className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cerca per tema, area o definizione"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | StudyStatus)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-slate-500"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'Tutti gli stati' : option}
              </option>
            ))}
          </select>
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-slate-500"
          >
            <option value="logical">Ordine logico</option>
            <option value="priority">Priorita d esame</option>
          </select>
          <div className="flex items-center rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600">
            {subjectCards.length} schede visibili
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[340px,1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-wide text-slate-500">
              <span>Elenco schede</span>
              <span>{sortMode === 'logical' ? 'manuale' : 'priorita'}</span>
            </div>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {subjectCards.map((card) => (
                <button
                  key={card.slug}
                  onClick={() => setSelectedSlug(card.slug)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${selectedCard?.slug === card.slug ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                      #{card.orderIndex}
                    </span>
                    <span className="text-[11px] opacity-80">Priorita {card.priority}/5</span>
                  </div>
                  <div className="text-sm font-semibold leading-5">{card.topic}</div>
                  <div className={`mt-2 text-xs ${selectedCard?.slug === card.slug ? 'text-slate-300' : 'text-slate-500'}`}>{card.area}</div>
                </button>
              ))}
            </div>
          </aside>

          <main>
            {selectedCard ? (
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge>{selectedCard.area}</Badge>
                  <Badge>Ordine {selectedCard.orderIndex}</Badge>
                  <Badge>Priorita {selectedCard.priority}/5</Badge>
                  <Badge>Frequenza {selectedCard.examFrequency}</Badge>
                  <Badge>Stato {selectedCard.status}</Badge>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{selectedCard.topic}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{selectedCard.definition}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard title="Ratio" content={selectedCard.ratio} />
                  <InfoList title="Norme essenziali" items={selectedCard.keyNorms} />
                  <InfoList title="Elementi chiave" items={selectedCard.coreElements} />
                  <InfoList title="Distinzioni" items={selectedCard.distinctions} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard title="Risposta breve" content={selectedCard.oralAnswerShort} />
                  <InfoCard title="Risposta estesa" content={selectedCard.oralAnswerExtended} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoList title="Domande classiche" items={selectedCard.classicQuestions} />
                  <InfoList title="Domande trabocchetto" items={selectedCard.trapQuestions} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard title="Mini caso" content={selectedCard.miniCase} />
                  <InfoCard title="Nota giurisprudenziale" content={selectedCard.jurisprudenceNotes} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoList title="Errori frequenti" items={selectedCard.commonMistakes} />
                  <InfoList title="Checklist finale" items={selectedCard.checklist} />
                </div>

                <section className="mt-6 rounded-2xl border border-slate-200 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Flashcard</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {selectedCard.flashcards.map((flashcard, index) => (
                      <div key={`${selectedCard.slug}-flash-${index}`} className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Domanda</div>
                        <div className="mt-1 text-sm font-medium">{flashcard.q}</div>
                        <div className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Risposta</div>
                        <div className="mt-1 text-sm text-slate-700">{flashcard.a}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-6 flex flex-wrap gap-2">
                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white" onClick={() => updateCardStatus(selectedCard.slug, 'in studio')}>
                    Segna in studio
                  </button>
                  <button className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-medium text-white" onClick={() => updateCardStatus(selectedCard.slug, 'da consolidare')}>
                    Segna da consolidare
                  </button>
                  <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white" onClick={() => updateCardStatus(selectedCard.slug, 'solido')}>
                    Segna solido
                  </button>
                </section>
              </article>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
                Nessuna scheda trovata con i filtri attuali.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{children}</span>;
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{content}</p>
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
