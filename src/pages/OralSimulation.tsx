import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Chip } from '@/components/ui/Chip';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import type { SessionOutcome } from '@/types';
import { shuffle } from '@/lib/utils';
import {
  PRIORITY_LABEL,
  STATUS_LABEL,
  priorityChipClass,
  statusChipClass,
} from '@/lib/labels';

interface Prompt {
  topicId: string;
  topicTitle: string;
  subjectId: string;
  subjectName: string;
  question: string;
  priority: 'alta' | 'media' | 'bassa';
  confidence: number;
}

export function OralSimulationPage() {
  const { data, applyOutcomeToTopic, logSession } = useApp();
  const [subjectId, setSubjectId] = useState('');
  const [onlyPriority, setOnlyPriority] = useState(false);
  const [deck, setDeck] = useState<Prompt[]>([]);
  const [current, setCurrent] = useState<Prompt | null>(null);
  const [focus, setFocus] = useState(false);

  // Timer
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = null;
      return;
    }
    tickRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running]);

  const prompts: Prompt[] = useMemo(() => {
    const subjectById = new Map(data.subjects.map((s) => [s.id, s]));
    const list: Prompt[] = [];
    for (const t of data.topics) {
      if (subjectId && t.subjectId !== subjectId) continue;
      if (onlyPriority && t.priority !== 'alta') continue;
      const sName = subjectById.get(t.subjectId)?.name ?? 'Senza materia';
      const base = {
        topicId: t.id,
        topicTitle: t.title,
        subjectId: t.subjectId,
        subjectName: sName,
        priority: t.priority,
        confidence: t.confidence,
      };
      if (t.questions.length === 0 && t.flashcards.length === 0) {
        list.push({
          ...base,
          question: `Parlami di: ${t.title}.`,
        });
      } else {
        t.questions.forEach((q) => list.push({ ...base, question: q.text }));
        t.flashcards.forEach((c) =>
          list.push({ ...base, question: c.question }),
        );
      }
    }
    return shuffle(list);
  }, [data, subjectId, onlyPriority]);

  const start = () => {
    if (prompts.length === 0) return;
    setDeck(prompts);
    setCurrent(prompts[0]);
    setSeconds(0);
    setRunning(true);
  };

  const nextPrompt = () => {
    const idx = deck.findIndex((p) => p === current);
    const next = deck[(idx + 1) % deck.length];
    setCurrent(next);
    setSeconds(0);
    setRunning(true);
  };

  const finish = (outcome: SessionOutcome) => {
    if (!current) return;
    setRunning(false);
    applyOutcomeToTopic(current.topicId, outcome);
    logSession({
      type: 'simulazione_orale',
      subjectId: current.subjectId,
      subjectName: current.subjectName,
      topicId: current.topicId,
      topicTitle: current.topicTitle,
      durationSeconds: seconds,
      outcome,
    });
    // Passa automaticamente alla prossima domanda.
    nextPrompt();
  };

  const stop = () => {
    setRunning(false);
    setCurrent(null);
    setFocus(false);
    setSeconds(0);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  // Modalità focus a schermo intero.
  if (focus && current) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-ink-900 text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-sm">
          <div>
            <span className="text-ink-300">{current.subjectName}</span>
            <span className="mx-2 text-ink-400">·</span>
            <span className="font-medium">{current.topicTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-lg">{mm}:{ss}</span>
            <button
              className="btn-ghost text-white hover:bg-white/10"
              onClick={() => setRunning((r) => !r)}
            >
              {running ? 'Pausa' : 'Riprendi'}
            </button>
            <button
              className="btn-ghost text-white hover:bg-white/10"
              onClick={() => setFocus(false)}
            >
              Esci focus
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-10">
          <p className="max-w-3xl text-center font-serif text-4xl leading-snug">
            {current.question}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 border-t border-white/10 p-4">
          <button className="btn-danger" onClick={() => finish('male')}>Male</button>
          <button className="btn-secondary" onClick={() => finish('medio')}>Medio</button>
          <button className="btn-primary" onClick={() => finish('bene')}>Bene</button>
          <button className="btn-ghost text-white hover:bg-white/10" onClick={nextPrompt}>
            Salta
          </button>
          <button className="btn-ghost text-white hover:bg-white/10" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Simulazione orale"
        subtitle="Estrai una domanda a caso, cronometrati e valuta come è andata."
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
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={onlyPriority}
                onChange={(e) => setOnlyPriority(e.target.checked)}
                className="h-4 w-4 accent-accent-600"
              />
              Solo priorità alta
            </label>
          </>
        }
      />

      {prompts.length === 0 ? (
        <EmptyState
          title="Non ci sono domande disponibili"
          description="Aggiungi argomenti, domande aperte o flashcard per iniziare. Se non hai nulla, useremo il titolo dell'argomento come domanda base."
          icon="✎"
          action={
            <Link to="/materie" className="btn-primary">
              Vai alle materie
            </Link>
          }
        />
      ) : !current ? (
        <div className="card p-6 text-center">
          <p className="text-ink-600">
            {prompts.length} domande disponibili in base ai filtri selezionati.
          </p>
          <button className="btn-primary mt-4" onClick={start}>
            Estrai domanda e avvia cronometro
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 bg-ink-50 px-5 py-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <Chip className="border-accent-200 bg-white text-accent-800">
                  {current.subjectName}
                </Chip>
                <Chip className={priorityChipClass(current.priority)}>
                  Priorità {PRIORITY_LABEL[current.priority]}
                </Chip>
                <Link
                  to={`/argomenti/${current.topicId}`}
                  className="text-ink-500 hover:text-accent-700"
                >
                  {current.topicTitle} ↗
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-ink-700">{mm}:{ss}</span>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => setRunning((r) => !r)}
                >
                  {running ? 'Pausa' : 'Riprendi'}
                </button>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => setFocus(true)}
                  title="Modalità focus a schermo intero"
                >
                  Focus
                </button>
              </div>
            </div>
            <div className="px-6 py-10">
              <p className="font-serif text-2xl leading-snug text-ink-900">
                {current.question}
              </p>
              <p className="mt-3 text-xs text-ink-400">
                Esponi ad alta voce. Alla fine valuta come è andata: aggiorneremo
                la confidenza.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <button className="btn-danger" onClick={() => finish('male')}>Male</button>
                <button className="btn-secondary" onClick={() => finish('medio')}>Medio</button>
                <button className="btn-primary" onClick={() => finish('bene')}>Bene</button>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost" onClick={nextPrompt}>Salta</button>
                <button className="btn-ghost" onClick={stop}>Termina</button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
            <span>
              Stato: <Chip className={statusChipClass(
                // Deriva dallo store per essere sempre aggiornato
                data.topics.find((t) => t.id === current.topicId)?.status ?? 'in_ripasso',
              )}>
                {STATUS_LABEL[
                  data.topics.find((t) => t.id === current.topicId)?.status ?? 'in_ripasso'
                ]}
              </Chip>
            </span>
            <div className="w-56">
              <ConfidenceBar
                value={data.topics.find((t) => t.id === current.topicId)?.confidence ?? 0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

