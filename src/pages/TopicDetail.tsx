import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { Chip } from '@/components/ui/Chip';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { TopicForm } from '@/components/forms/TopicForm';
import { StudyCard } from '@/components/topic/StudyCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  PRIORITY_LABEL,
  STATUS_LABEL,
  priorityChipClass,
  statusChipClass,
} from '@/lib/labels';
import { formatDate } from '@/lib/utils';

export function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data,
    updateTopic,
    deleteTopic,
    markTopicReviewedToday,
    addSubtopic,
    toggleSubtopic,
    removeSubtopic,
    addFlashcard,
    removeFlashcard,
    addQuestion,
    removeQuestion,
  } = useApp();

  const topic = data.topics.find((t) => t.id === id);
  const subject = useMemo(
    () => data.subjects.find((s) => s.id === topic?.subjectId),
    [data.subjects, topic],
  );

  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Stati form inline.
  const [subTitle, setSubTitle] = useState('');
  const [cardQ, setCardQ] = useState('');
  const [cardA, setCardA] = useState('');
  const [qText, setQText] = useState('');

  if (!topic) {
    return (
      <EmptyState
        title="Argomento non trovato"
        description="L'argomento potrebbe essere stato eliminato."
        action={
          <Link className="btn-primary" to="/materie">
            Torna alle materie
          </Link>
        }
      />
    );
  }

  const handleAddSub = (e: FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) return;
    addSubtopic(topic.id, subTitle.trim());
    setSubTitle('');
  };

  const handleAddFlashcard = (e: FormEvent) => {
    e.preventDefault();
    if (!cardQ.trim() || !cardA.trim()) return;
    addFlashcard(topic.id, cardQ.trim(), cardA.trim());
    setCardQ('');
    setCardA('');
  };

  const handleAddQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;
    addQuestion(topic.id, qText.trim());
    setQText('');
  };

  return (
    <div>
      <PageHeader
        breadcrumb={
          <>
            <Link to="/materie" className="hover:underline">Materie</Link>
            {subject && (
              <>
                {' / '}
                <Link to={`/materie/${subject.id}`} className="hover:underline">
                  {subject.name}
                </Link>
              </>
            )}
          </>
        }
        title={topic.title}
        subtitle={
          <div className="flex flex-wrap items-center gap-2">
            <Chip className={priorityChipClass(topic.priority)}>
              Priorità {PRIORITY_LABEL[topic.priority]}
            </Chip>
            <Chip className={statusChipClass(topic.status)}>
              {STATUS_LABEL[topic.status]}
            </Chip>
            <span className="text-xs text-ink-500">
              Ultimo ripasso: {formatDate(topic.lastReviewedAt)}
            </span>
          </div>
        }
        actions={
          <>
            <button
              className="btn-secondary"
              onClick={() => markTopicReviewedToday(topic.id)}
            >
              Ripassato oggi
            </button>
            <button className="btn-secondary" onClick={() => setOpenEdit(true)}>
              Modifica
            </button>
            <button className="btn-danger" onClick={() => setConfirmDelete(true)}>
              Elimina
            </button>
          </>
        }
      />

      {topic.study && (
        <div className="mb-4">
          <StudyCard study={topic.study} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2">
          <h2 className="mb-2 text-lg font-semibold">Note</h2>
          {topic.note ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-700">
              {topic.note}
            </p>
          ) : (
            <p className="text-sm text-ink-400">
              Nessuna nota. Usa "Modifica" per aggiungere uno schema sintetico.
            </p>
          )}

          {topic.keywords.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {topic.keywords.map((k) => (
                <Chip key={k} className="border-ink-200 bg-ink-50 text-ink-600">
                  {k}
                </Chip>
              ))}
            </div>
          )}
        </section>

        <section className="card p-5">
          <h2 className="mb-3 text-lg font-semibold">Confidenza</h2>
          <ConfidenceBar value={topic.confidence} />
          <input
            type="range"
            min={0}
            max={100}
            value={topic.confidence}
            onChange={(e) =>
              updateTopic({ ...topic, confidence: Number(e.target.value) })
            }
            className="mt-3 w-full accent-accent-600"
          />
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="label">Priorità</div>
              <select
                className="select"
                value={topic.priority}
                onChange={(e) =>
                  updateTopic({ ...topic, priority: e.target.value as typeof topic.priority })
                }
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="bassa">Bassa</option>
              </select>
            </div>
            <div>
              <div className="label">Stato</div>
              <select
                className="select"
                value={topic.status}
                onChange={(e) =>
                  updateTopic({ ...topic, status: e.target.value as typeof topic.status })
                }
              >
                <option value="da_studiare">Da studiare</option>
                <option value="in_ripasso">In ripasso</option>
                <option value="solido">Solido</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* Sottoargomenti */}
      <section className="mt-6 card p-5">
        <h2 className="mb-3 text-lg font-semibold">Sottoargomenti</h2>
        <form onSubmit={handleAddSub} className="mb-4 flex gap-2">
          <input
            className="input flex-1"
            placeholder="Aggiungi un sottoargomento e premi invio"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <button className="btn-primary" type="submit" disabled={!subTitle.trim()}>
            Aggiungi
          </button>
        </form>
        {topic.subtopics.length === 0 ? (
          <p className="text-sm text-ink-400">Nessun sottoargomento.</p>
        ) : (
          <ul className="space-y-1">
            {topic.subtopics.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded border border-ink-100 px-3 py-2"
              >
                <label className="flex flex-1 items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={s.done}
                    onChange={() => toggleSubtopic(topic.id, s.id)}
                    className="h-4 w-4 accent-accent-600"
                  />
                  <span className={s.done ? 'text-ink-400 line-through' : ''}>
                    {s.title}
                  </span>
                </label>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => removeSubtopic(topic.id, s.id)}
                  aria-label={`Elimina ${s.title}`}
                >
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Flashcard */}
      <section className="mt-6 card p-5">
        <h2 className="mb-3 text-lg font-semibold">
          Flashcard
          <span className="ml-2 text-sm font-normal text-ink-400">
            ({topic.flashcards.length})
          </span>
        </h2>
        <form onSubmit={handleAddFlashcard} className="mb-4 grid gap-2 md:grid-cols-2">
          <input
            className="input"
            placeholder="Domanda"
            value={cardQ}
            onChange={(e) => setCardQ(e.target.value)}
          />
          <input
            className="input"
            placeholder="Risposta"
            value={cardA}
            onChange={(e) => setCardA(e.target.value)}
          />
          <div className="md:col-span-2">
            <button
              className="btn-primary"
              type="submit"
              disabled={!cardQ.trim() || !cardA.trim()}
            >
              + Aggiungi flashcard
            </button>
          </div>
        </form>
        {topic.flashcards.length === 0 ? (
          <p className="text-sm text-ink-400">Nessuna flashcard.</p>
        ) : (
          <ul className="space-y-2">
            {topic.flashcards.map((c) => (
              <li
                key={c.id}
                className="rounded border border-ink-100 px-4 py-3 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase text-ink-400">Domanda</div>
                    <div className="font-medium">{c.question}</div>
                    <div className="mt-2 text-xs uppercase text-ink-400">Risposta</div>
                    <div className="text-ink-700">{c.answer}</div>
                  </div>
                  <button
                    className="btn-ghost text-xs"
                    onClick={() => removeFlashcard(topic.id, c.id)}
                  >
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Domande aperte */}
      <section className="mt-6 card p-5">
        <h2 className="mb-3 text-lg font-semibold">
          Domande aperte
          <span className="ml-2 text-sm font-normal text-ink-400">
            ({topic.questions.length})
          </span>
        </h2>
        <form onSubmit={handleAddQuestion} className="mb-4 flex gap-2">
          <input
            className="input flex-1"
            placeholder="Es. Quando si applica lo stato di necessità?"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
          />
          <button className="btn-primary" type="submit" disabled={!qText.trim()}>
            Aggiungi
          </button>
        </form>
        {topic.questions.length === 0 ? (
          <p className="text-sm text-ink-400">Nessuna domanda aperta.</p>
        ) : (
          <ul className="space-y-1">
            {topic.questions.map((q) => (
              <li
                key={q.id}
                className="flex items-center justify-between rounded border border-ink-100 px-3 py-2 text-sm"
              >
                <span>{q.text}</span>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => removeQuestion(topic.id, q.id)}
                >
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Modifica argomento" size="lg">
        <TopicForm
          initial={topic}
          submitLabel="Salva"
          onCancel={() => setOpenEdit(false)}
          onSubmit={(v) => {
            updateTopic({
              ...topic,
              title: v.title,
              note: v.note,
              priority: v.priority,
              status: v.status,
              confidence: v.confidence,
              keywords: v.keywords,
            });
            setOpenEdit(false);
          }}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete}
        destructive
        title="Eliminare l'argomento?"
        message="Verranno rimossi anche sottoargomenti, flashcard e domande."
        confirmLabel="Elimina"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          const subjectId = topic.subjectId;
          deleteTopic(topic.id);
          navigate(subjectId ? `/materie/${subjectId}` : '/materie');
        }}
      />
    </div>
  );
}
