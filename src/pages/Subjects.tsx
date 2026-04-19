import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/ui/Modal';
import { SubjectForm } from '@/components/forms/SubjectForm';
import { EmptyState } from '@/components/ui/EmptyState';
import { Chip } from '@/components/ui/Chip';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';

export function SubjectsPage() {
  const { data, createSubject } = useApp();
  const [openNew, setOpenNew] = useState(false);

  const stats = useMemo(() => {
    const byId = new Map<string, { count: number; conf: number; toStudy: number }>();
    data.subjects.forEach((s) =>
      byId.set(s.id, { count: 0, conf: 0, toStudy: 0 }),
    );
    data.topics.forEach((t) => {
      const s = byId.get(t.subjectId);
      if (!s) return;
      s.count += 1;
      s.conf += t.confidence;
      if (t.status === 'da_studiare') s.toStudy += 1;
    });
    return byId;
  }, [data.subjects, data.topics]);

  return (
    <div>
      <PageHeader
        title="Materie"
        subtitle="Tutte le materie del tuo programma. Clicca per entrare e gestire gli argomenti."
        actions={
          <button className="btn-primary" onClick={() => setOpenNew(true)}>
            + Nuova materia
          </button>
        }
      />

      {data.subjects.length === 0 ? (
        <EmptyState
          title="Ancora nessuna materia"
          description="Comincia creando la tua prima materia: potrai poi aggiungere gli argomenti."
          action={
            <button className="btn-primary" onClick={() => setOpenNew(true)}>
              Crea la prima materia
            </button>
          }
          icon="❖"
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.subjects.map((s) => {
            const st = stats.get(s.id);
            const avg = st && st.count > 0 ? Math.round(st.conf / st.count) : 0;
            return (
              <Link
                key={s.id}
                to={`/materie/${s.id}`}
                className="card block p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-ink-900">{s.name}</h3>
                      <Chip className="border-ink-200 bg-ink-50 capitalize text-ink-500">
                        {s.color}
                      </Chip>
                    </div>
                    {s.description ? (
                      <p className="mt-1 line-clamp-2 text-sm text-ink-500">
                        {s.description}
                      </p>
                    ) : null}
                  </div>
                  <span aria-hidden className="text-ink-300">›</span>
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase text-ink-400">Argomenti</dt>
                    <dd className="font-semibold">{st?.count ?? 0}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-ink-400">Da studiare</dt>
                    <dd className="font-semibold">{st?.toStudy ?? 0}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-ink-400">Conf. media</dt>
                    <dd className="font-semibold">{avg}%</dd>
                  </div>
                </dl>
                <div className="mt-3">
                  <ConfidenceBar value={avg} showLabel={false} />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Modal
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Nuova materia"
      >
        <SubjectForm
          onCancel={() => setOpenNew(false)}
          onSubmit={(values) => {
            createSubject(values);
            setOpenNew(false);
          }}
          submitLabel="Crea materia"
        />
      </Modal>
    </div>
  );
}
