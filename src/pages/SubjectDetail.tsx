import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { SubjectForm } from '@/components/forms/SubjectForm';
import { TopicForm } from '@/components/forms/TopicForm';
import { TopicListItem } from '@/components/topic/TopicListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  PRIORITY_LABEL,
  PRIORITY_OPTIONS,
  STATUS_LABEL,
  STATUS_OPTIONS,
} from '@/lib/labels';

export function SubjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data,
    updateSubject,
    deleteSubject,
    createTopic,
    markTopicReviewedToday,
  } = useApp();

  const subject = data.subjects.find((s) => s.id === id);

  const [openEdit, setOpenEdit] = useState(false);
  const [openNewTopic, setOpenNewTopic] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'' | (typeof STATUS_OPTIONS)[number]>('');
  const [priorityFilter, setPriorityFilter] = useState<'' | (typeof PRIORITY_OPTIONS)[number]>('');
  const [sortBy, setSortBy] = useState<
    'programma' | 'priority' | 'confidence' | 'title' | 'recent'
  >('programma');

  const topics = useMemo(() => {
    if (!subject) return [];
    let list = data.topics.filter((t) => t.subjectId === subject.id);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.note?.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q)),
      );
    }
    if (statusFilter) list = list.filter((t) => t.status === statusFilter);
    if (priorityFilter) list = list.filter((t) => t.priority === priorityFilter);
    const priorityRank = { alta: 0, media: 1, bassa: 2 } as const;
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'confidence':
          return a.confidence - b.confidence;
        case 'recent':
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case 'priority':
          return priorityRank[a.priority] - priorityRank[b.priority];
        case 'programma':
        default: {
          const ai = a.study?.orderIndex;
          const bi = b.study?.orderIndex;
          if (ai == null && bi == null) return a.title.localeCompare(b.title);
          if (ai == null) return 1;
          if (bi == null) return -1;
          return ai - bi;
        }
      }
    });
    return list;
  }, [data.topics, subject, query, statusFilter, priorityFilter, sortBy]);

  if (!subject) {
    return (
      <EmptyState
        title="Materia non trovata"
        description="La materia potrebbe essere stata eliminata."
        action={
          <Link className="btn-primary" to="/materie">
            Torna alle materie
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb={<Link to="/materie" className="hover:underline">← Materie</Link>}
        title={subject.name}
        subtitle={subject.description}
        actions={
          <>
            <button className="btn-secondary" onClick={() => setOpenEdit(true)}>
              Modifica
            </button>
            <button
              className="btn-danger"
              onClick={() => setConfirmDelete(true)}
            >
              Elimina
            </button>
            <button className="btn-primary" onClick={() => setOpenNewTopic(true)}>
              + Nuovo argomento
            </button>
          </>
        }
      />

      {/* Filtri */}
      <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          className="input"
          placeholder="Cerca argomento, nota o parola chiave..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select md:w-44"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as '' | typeof statusFilter)}
        >
          <option value="">Tutti gli stati</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select
          className="select md:w-40"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as '' | typeof priorityFilter)}
        >
          <option value="">Tutte le priorità</option>
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
          ))}
        </select>
        <select
          className="select md:w-44"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="programma">Ordine del programma</option>
          <option value="priority">Ordina per priorità</option>
          <option value="confidence">Ordina per confidenza</option>
          <option value="title">Ordina per titolo</option>
          <option value="recent">Più recenti</option>
        </select>
      </div>

      {topics.length === 0 ? (
        <EmptyState
          title="Nessun argomento"
          description="Aggiungi il primo argomento a questa materia per iniziare."
          action={
            <button className="btn-primary" onClick={() => setOpenNewTopic(true)}>
              Aggiungi argomento
            </button>
          }
          icon="✎"
        />
      ) : (
        <div className="space-y-2">
          {topics.map((t) => (
            <TopicListItem
              key={t.id}
              topic={t}
              subject={subject}
              onReview={markTopicReviewedToday}
            />
          ))}
        </div>
      )}

      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Modifica materia">
        <SubjectForm
          initial={subject}
          submitLabel="Salva"
          onCancel={() => setOpenEdit(false)}
          onSubmit={(v) => {
            updateSubject({ ...subject, ...v });
            setOpenEdit(false);
          }}
        />
      </Modal>

      <Modal
        open={openNewTopic}
        onClose={() => setOpenNewTopic(false)}
        title={`Nuovo argomento in ${subject.name}`}
        size="lg"
      >
        <TopicForm
          submitLabel="Crea argomento"
          onCancel={() => setOpenNewTopic(false)}
          onSubmit={(v) => {
            createTopic({ subjectId: subject.id, ...v });
            setOpenNewTopic(false);
          }}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete}
        destructive
        title="Eliminare la materia?"
        message="Tutti gli argomenti associati verranno eliminati. L'azione non è reversibile."
        confirmLabel="Elimina"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          deleteSubject(subject.id);
          navigate('/materie');
        }}
      />
    </div>
  );
}
