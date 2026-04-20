import { useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { exportData, importData } from '@/lib/storage';

export function SettingsPage() {
  const { data, updateSettings, replaceAll, resetAll, loadProgramma } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [dailyGoal, setDailyGoal] = useState<number>(data.settings.dailyGoal);
  const [programmaMsg, setProgrammaMsg] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportData(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().split('T')[0];
    a.download = `ripasso-orale-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    setImportError(null);
    try {
      const text = await file.text();
      const imported = importData(text);
      replaceAll(imported);
    } catch (e) {
      setImportError(
        e instanceof Error ? e.message : 'File non valido.',
      );
    }
  };

  return (
    <div>
      <PageHeader
        title="Impostazioni"
        subtitle="Preferenze, backup e gestione dei dati locali."
      />

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Obiettivo giornaliero</h2>
        <p className="mb-3 text-sm text-ink-500">
          Numero di argomenti che vuoi ripassare in un giorno tipico.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={50}
            className="input w-24"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Math.max(1, Number(e.target.value) || 1))}
          />
          <button
            className="btn-primary"
            onClick={() => updateSettings({ dailyGoal })}
          >
            Salva
          </button>
        </div>
      </section>

      <section className="card mt-4 p-5">
        <h2 className="text-lg font-semibold">Programma di studio</h2>
        <p className="mb-3 text-sm text-ink-500">
          Carica il programma completo di <strong>diritto penale</strong>,{' '}
          <strong>diritto civile</strong> e <strong>procedura penale</strong>.
          Le materie e gli argomenti già presenti non vengono toccati: si
          aggiungono solo i mancanti.
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            const { addedSubjects, addedTopics } = loadProgramma();
            if (addedSubjects === 0 && addedTopics === 0) {
              setProgrammaMsg('Il programma era già presente: nulla da aggiungere.');
            } else {
              const parts = [];
              if (addedSubjects > 0) parts.push(`${addedSubjects} materie`);
              if (addedTopics > 0) parts.push(`${addedTopics} argomenti`);
              setProgrammaMsg(`Aggiunti: ${parts.join(' e ')}.`);
            }
          }}
        >
          Carica programma completo
        </button>
        {programmaMsg && (
          <p className="mt-3 text-sm text-accent-700">{programmaMsg}</p>
        )}
      </section>

      <section className="card mt-4 p-5">
        <h2 className="text-lg font-semibold">Backup dei dati</h2>
        <p className="mb-3 text-sm text-ink-500">
          Esporta tutti i tuoi dati in un file JSON o importali da un backup.
          Tutto resta nel tuo browser.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={handleExport}>
            Esporta JSON
          </button>
          <button
            className="btn-secondary"
            onClick={() => fileRef.current?.click()}
          >
            Importa JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = '';
            }}
          />
        </div>
        {importError && (
          <p className="mt-3 text-sm text-red-600">Errore: {importError}</p>
        )}
      </section>

      <section className="card mt-4 border-red-200 p-5">
        <h2 className="text-lg font-semibold text-red-700">Zona pericolosa</h2>
        <p className="mb-3 text-sm text-ink-500">
          Reimposta l'app ai dati iniziali. Le materie, gli argomenti, le
          flashcard e lo storico verranno sostituiti con quelli di esempio.
        </p>
        <button className="btn-danger" onClick={() => setConfirmReset(true)}>
          Reset completo
        </button>
      </section>

      <section className="card mt-4 p-5 text-sm text-ink-500">
        <h2 className="mb-1 text-lg font-semibold text-ink-900">Sui dati</h2>
        <p>
          L'app salva tutto in <code>localStorage</code> del tuo browser. Non
          c'è server. Svuotare la cache del browser cancella i dati: prima fai
          un export!
        </p>
      </section>

      <ConfirmDialog
        open={confirmReset}
        destructive
        title="Reset completo?"
        message="Verranno sostituiti tutti i dati correnti. Assicurati di aver fatto un export."
        confirmLabel="Azzera"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAll();
          setDailyGoal(5);
          setConfirmReset(false);
        }}
      />
    </div>
  );
}
