import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Chip } from '@/components/ui/Chip';
import type { Flashcard } from '@/types';
import { shuffle } from '@/lib/utils';

interface Card {
  card: Flashcard;
  topicId: string;
  topicTitle: string;
  subjectId: string;
  subjectName: string;
}

export function FlashcardsPage() {
  const { data, logSession } = useApp();
  const [subjectId, setSubjectId] = useState<string>('');
  const [deck, setDeck] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  const pool: Card[] = useMemo(() => {
    const subjectById = new Map(data.subjects.map((s) => [s.id, s]));
    const list: Card[] = [];
    for (const t of data.topics) {
      if (subjectId && t.subjectId !== subjectId) continue;
      for (const c of t.flashcards) {
        const s = subjectById.get(t.subjectId);
        list.push({
          card: c,
          topicId: t.id,
          topicTitle: t.title,
          subjectId: t.subjectId,
          subjectName: s?.name ?? 'Senza materia',
        });
      }
    }
    return list;
  }, [data, subjectId]);

  // Ricostruisce il mazzo quando cambia il filtro materia.
  useEffect(() => {
    setDeck(shuffle(pool));
    setIndex(0);
    setRevealed(false);
    setDoneCount(0);
  }, [pool]);

  const current = deck[index];

  const handleNext = (knew: boolean) => {
    setDoneCount((n) => n + 1);
    if (current) {
      logSession({
        type: 'flashcard',
        subjectId: current.subjectId,
        subjectName: current.subjectName,
        topicId: current.topicId,
        topicTitle: current.topicTitle,
        outcome: knew ? 'bene' : 'male',
      });
    }
    setRevealed(false);
    setIndex((i) => (i + 1 < deck.length ? i + 1 : 0));
  };

  return (
    <div>
      <PageHeader
        title="Flashcard"
        subtitle="Allenati con le domande/risposte che hai creato sugli argomenti."
        actions={
          <>
            <select
              className="select md:w-60"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              aria-label="Filtra per materia"
            >
              <option value="">Tutte le materie</option>
              {data.subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <button
              className="btn-secondary"
              onClick={() => {
                setDeck(shuffle(pool));
                setIndex(0);
                setRevealed(false);
                setDoneCount(0);
              }}
              disabled={deck.length === 0}
            >
              Rimescola
            </button>
          </>
        }
      />

      {deck.length === 0 ? (
        <EmptyState
          title="Nessuna flashcard disponibile"
          description="Aggiungi flashcard dalla pagina di un argomento per allenarti qui."
          icon="▭"
          action={
            <Link to="/materie" className="btn-primary">
              Vai alle materie
            </Link>
          }
        />
      ) : current ? (
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center justify-between text-sm text-ink-500">
            <span>
              Carta <strong className="text-ink-800">{index + 1}</strong> di{' '}
              {deck.length}
            </span>
            <span>Riviste: {doneCount}</span>
          </div>
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50 px-5 py-3 text-xs">
              <Chip className="border-accent-200 bg-white text-accent-800">
                {current.subjectName}
              </Chip>
              <Link
                to={`/argomenti/${current.topicId}`}
                className="text-ink-500 hover:text-accent-700"
              >
                {current.topicTitle} ↗
              </Link>
            </div>
            <div className="min-h-48 px-6 py-10">
              <div className="text-xs uppercase tracking-wide text-ink-400">
                Domanda
              </div>
              <p className="mt-2 font-serif text-xl font-semibold text-ink-900">
                {current.card.question}
              </p>

              {revealed ? (
                <>
                  <div className="mt-6 text-xs uppercase tracking-wide text-ink-400">
                    Risposta
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-ink-700">
                    {current.card.answer}
                  </p>
                </>
              ) : (
                <button
                  className="btn-primary mt-6"
                  onClick={() => setRevealed(true)}
                >
                  Mostra risposta
                </button>
              )}
            </div>
            {revealed && (
              <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3">
                <button className="btn-danger" onClick={() => handleNext(false)}>
                  Non la sapevo
                </button>
                <button className="btn-primary" onClick={() => handleNext(true)}>
                  La sapevo
                </button>
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-ink-400">
            Suggerimento: usa Invio per rivelare o passare alla prossima.
          </p>
        </div>
      ) : null}
    </div>
  );
}
