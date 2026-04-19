import { useState, type FormEvent } from 'react';
import type { Subject } from '@/types';

interface Props {
  initial?: Partial<Subject>;
  onSubmit: (values: { name: string; description?: string; color: string }) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const COLORS = ['petrolio', 'rosso', 'ambra', 'grigio', 'indaco'];

export function SubjectForm({ initial, onSubmit, onCancel, submitLabel = 'Salva' }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? 'petrolio');

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() || undefined, color });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div>
        <label className="label" htmlFor="subject-name">Nome materia</label>
        <input
          id="subject-name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Es. Diritto penale"
          autoFocus
        />
      </div>
      <div>
        <label className="label" htmlFor="subject-desc">Descrizione</label>
        <textarea
          id="subject-desc"
          className="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Testi, programma, note sul corso"
        />
      </div>
      <div>
        <label className="label">Etichetta</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`chip cursor-pointer capitalize ${
                color === c
                  ? 'border-accent-500 bg-accent-50 text-accent-800'
                  : 'border-ink-200 text-ink-500 hover:bg-ink-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Annulla
          </button>
        )}
        <button type="submit" className="btn-primary" disabled={!name.trim()}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
