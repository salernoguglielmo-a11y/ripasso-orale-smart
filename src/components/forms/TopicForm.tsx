import { useState, type FormEvent } from 'react';
import type { Priority, Topic, TopicStatus } from '@/types';
import {
  PRIORITY_LABEL,
  PRIORITY_OPTIONS,
  STATUS_LABEL,
  STATUS_OPTIONS,
} from '@/lib/labels';

export interface TopicFormValues {
  title: string;
  note?: string;
  priority: Priority;
  status: TopicStatus;
  confidence: number;
  keywords: string[];
}

interface Props {
  initial?: Partial<Topic>;
  onSubmit: (values: TopicFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function TopicForm({ initial, onSubmit, onCancel, submitLabel = 'Salva' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [note, setNote] = useState(initial?.note ?? '');
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'media');
  const [status, setStatus] = useState<TopicStatus>(initial?.status ?? 'da_studiare');
  const [confidence, setConfidence] = useState<number>(initial?.confidence ?? 0);
  const [keywordsStr, setKeywordsStr] = useState<string>(
    (initial?.keywords ?? []).join(', '),
  );

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const keywords = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    onSubmit({
      title: title.trim(),
      note: note.trim() || undefined,
      priority,
      status,
      confidence,
      keywords,
    });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div>
        <label className="label" htmlFor="topic-title">Titolo argomento</label>
        <input
          id="topic-title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Es. Cause di giustificazione"
          autoFocus
        />
      </div>

      <div>
        <label className="label" htmlFor="topic-note">Note sintetiche</label>
        <textarea
          id="topic-note"
          className="textarea"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Schema dei concetti chiave, articoli, casi..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="topic-priority">Priorità</label>
          <select
            id="topic-priority"
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="topic-status">Stato</label>
          <select
            id="topic-status"
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value as TopicStatus)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="topic-confidence">
          Confidenza: <span className="font-semibold text-ink-800">{confidence}%</span>
        </label>
        <input
          id="topic-confidence"
          type="range"
          min={0}
          max={100}
          step={1}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="w-full accent-accent-600"
        />
      </div>

      <div>
        <label className="label" htmlFor="topic-keywords">Parole chiave</label>
        <input
          id="topic-keywords"
          className="input"
          value={keywordsStr}
          onChange={(e) => setKeywordsStr(e.target.value)}
          placeholder="separate da virgola. Es. dolo, colpa, 43 c.p."
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Annulla
          </button>
        )}
        <button type="submit" className="btn-primary" disabled={!title.trim()}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
