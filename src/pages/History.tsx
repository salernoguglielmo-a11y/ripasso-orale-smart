import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Chip } from '@/components/ui/Chip';
import { ACTIVITY_LABEL, OUTCOME_LABEL } from '@/lib/labels';
import { formatDateTime, formatDuration } from '@/lib/utils';
import type { ActivityType } from '@/types';

export function HistoryPage() {
  const { data, deleteSession } = useApp();
  const [typeFilter, setTypeFilter] = useState<'' | ActivityType>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');

  const sessions = useMemo(() => {
    let list = [...data.sessions];
    if (typeFilter) list = list.filter((s) => s.type === typeFilter);
    if (subjectFilter) list = list.filter((s) => s.subjectId === subjectFilter);
    return list;
  }, [data.sessions, typeFilter, subjectFilter]);

  return (
    <div>
      <PageHeader
        title="Storico sessioni"
        subtitle="Tutte le sessioni di ripasso, flashcard e simulazione salvate."
        actions={
          <>
            <select
              className="select md:w-48"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as '' | ActivityType)}
            >
              <option value="">Tutti i tipi</option>
              <option value="ripasso">Ripasso</option>
              <option value="flashcard">Flashcard</option>
              <option value="simulazione_orale">Simulazione orale</option>
              <option value="studio">Studio</option>
            </select>
            <select
              className="select md:w-56"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">Tutte le materie</option>
              {data.subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </>
        }
      />

      {sessions.length === 0 ? (
        <EmptyState
          title="Ancora nessuna sessione"
          description="Quando segni un argomento come ripassato, fai flashcard o una simulazione, la vedrai qui."
          icon="⟲"
        />
      ) : (
        <div className="card divide-y divide-ink-100">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Chip className="border-accent-200 bg-accent-50 text-accent-800">
                  {ACTIVITY_LABEL[s.type]}
                </Chip>
                {s.subjectName && (
                  <span className="text-sm text-ink-600">{s.subjectName}</span>
                )}
                {s.topicTitle && (
                  <span className="text-sm font-medium text-ink-900">
                    · {s.topicTitle}
                  </span>
                )}
                {s.outcome && (
                  <Chip className="border-ink-200 bg-ink-50 text-ink-600">
                    {OUTCOME_LABEL[s.outcome]}
                  </Chip>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-500">
                <span>{formatDateTime(s.date)}</span>
                {s.durationSeconds ? (
                  <span>⧖ {formatDuration(s.durationSeconds)}</span>
                ) : null}
                <button
                  className="btn-ghost text-xs"
                  onClick={() => deleteSession(s.id)}
                  aria-label="Elimina sessione"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
