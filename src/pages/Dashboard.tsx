import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { TopicListItem } from '@/components/topic/TopicListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { suggestReviewOrder } from '@/lib/suggest';
import { isSameDay } from '@/lib/utils';

export function DashboardPage() {
  const { data, markTopicReviewedToday } = useApp();
  const { subjects, topics, sessions, settings } = data;

  // Statistiche principali memoizzate.
  const stats = useMemo(() => {
    const total = topics.length;
    const toStudy = topics.filter((t) => t.status === 'da_studiare').length;
    const inRipasso = topics.filter((t) => t.status === 'in_ripasso').length;
    const solid = topics.filter((t) => t.status === 'solido').length;
    const avgConfidence = total
      ? Math.round(topics.reduce((s, t) => s + t.confidence, 0) / total)
      : 0;
    return { total, toStudy, inRipasso, solid, avgConfidence };
  }, [topics]);

  const suggestions = useMemo(() => suggestReviewOrder(topics).slice(0, 5), [topics]);

  const reviewedToday = useMemo(
    () =>
      sessions.filter(
        (s) =>
          (s.type === 'ripasso' ||
            s.type === 'simulazione_orale' ||
            s.type === 'flashcard') &&
          isSameDay(s.date),
      ).length,
    [sessions],
  );

  const subjectById = (id: string) => subjects.find((s) => s.id === id);
  const goal = settings.dailyGoal;
  const goalProgress = Math.min(100, Math.round((reviewedToday / Math.max(1, goal)) * 100));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Una panoramica di materie, argomenti e cosa ripassare oggi."
        actions={
          <>
            <Link to="/materie" className="btn-secondary">Materie</Link>
            <Link to="/simulazione" className="btn-primary">Inizia simulazione</Link>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Materie" value={subjects.length} />
        <StatCard label="Argomenti" value={stats.total} />
        <StatCard
          label="Da studiare / In ripasso / Solidi"
          value={`${stats.toStudy} · ${stats.inRipasso} · ${stats.solid}`}
          tone="mixed"
        />
        <StatCard label="Confidenza media" value={`${stats.avgConfidence}%`} />
      </div>

      {/* Obiettivo giornaliero */}
      <section className="mt-6 card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Obiettivo giornaliero</h2>
            <p className="text-sm text-ink-500">
              Ripassa almeno <strong>{goal}</strong> argomenti oggi — completati:{' '}
              <strong>{reviewedToday}</strong>.
            </p>
          </div>
          <Link to="/impostazioni" className="btn-ghost text-sm">
            Modifica
          </Link>
        </div>
        <div className="mt-3">
          <ConfidenceBar value={goalProgress} showLabel={false} />
        </div>
      </section>

      {/* Suggerimenti */}
      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Cosa ripassare oggi</h2>
            <p className="text-sm text-ink-500">
              Ordinato per priorità, confidenza e tempo dall'ultimo ripasso.
            </p>
          </div>
        </div>
        {suggestions.length === 0 ? (
          <EmptyState
            title="Sei a posto per oggi."
            description="Non ci sono argomenti che hanno bisogno di un ripasso urgente."
            icon="✓"
          />
        ) : (
          <div className="space-y-2">
            {suggestions.map((t) => (
              <TopicListItem
                key={t.id}
                topic={t}
                subject={subjectById(t.subjectId)}
                onReview={markTopicReviewedToday}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: 'mixed';
}) {
  return (
    <div className="card p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-ink-500">
        {label}
      </div>
      <div
        className={`mt-1 font-serif font-semibold text-ink-900 ${
          tone === 'mixed' ? 'text-lg' : 'text-2xl'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
