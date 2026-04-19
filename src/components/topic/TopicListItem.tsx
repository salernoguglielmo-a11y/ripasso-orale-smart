import { Link } from 'react-router-dom';
import type { Subject, Topic } from '@/types';
import { Chip } from '@/components/ui/Chip';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import {
  PRIORITY_LABEL,
  STATUS_LABEL,
  priorityChipClass,
  statusChipClass,
} from '@/lib/labels';
import { formatDate } from '@/lib/utils';

interface Props {
  topic: Topic;
  subject?: Subject;
  onReview?: (id: string) => void;
}

/** Riga di argomento usata nelle liste (materia, dashboard, ricerca). */
export function TopicListItem({ topic, subject, onReview }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/argomenti/${topic.id}`}
            className="truncate font-medium text-ink-900 hover:text-accent-700"
          >
            {topic.title}
          </Link>
          {subject && (
            <Chip className="border-ink-200 bg-ink-50 text-ink-600">
              {subject.name}
            </Chip>
          )}
          <Chip className={priorityChipClass(topic.priority)}>
            {PRIORITY_LABEL[topic.priority]}
          </Chip>
          <Chip className={statusChipClass(topic.status)}>
            {STATUS_LABEL[topic.status]}
          </Chip>
        </div>
        {topic.note ? (
          <p className="mt-1 line-clamp-1 text-sm text-ink-500">{topic.note}</p>
        ) : null}
        <div className="mt-2 flex items-center gap-4">
          <div className="w-40 sm:w-56">
            <ConfidenceBar value={topic.confidence} />
          </div>
          <span className="text-xs text-ink-400">
            Ultimo ripasso: {formatDate(topic.lastReviewedAt)}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {onReview && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onReview(topic.id)}
            title="Segna come ripassato oggi"
          >
            Ripassato oggi
          </button>
        )}
        <Link to={`/argomenti/${topic.id}`} className="btn-primary">
          Apri
        </Link>
      </div>
    </div>
  );
}
