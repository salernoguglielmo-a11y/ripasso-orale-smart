import { useState } from 'react';
import type { TopicStudyContent } from '@/types';
import { Chip } from '@/components/ui/Chip';

interface Props {
  study: TopicStudyContent;
}

/**
 * Scheda di studio estesa: mostra tutti i campi avanzati del programma
 * (definizione, ratio, norme chiave, risposta orale breve/estesa, ecc.).
 * I blocchi mancanti non vengono renderizzati.
 */
export function StudyCard({ study }: Props) {
  const [extended, setExtended] = useState(false);

  const has = (v: string | string[] | undefined): boolean =>
    Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());

  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Scheda di studio</h2>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {study.area && (
            <Chip className="border-ink-200 bg-ink-50 text-ink-600">
              {study.area}
            </Chip>
          )}
          {study.examFrequency && (
            <Chip className="border-accent-200 bg-accent-50 text-accent-800">
              Frequenza {study.examFrequency}
            </Chip>
          )}
          {study.difficulty && (
            <Chip className="border-ink-200 bg-ink-50 text-ink-600">
              Difficoltà {study.difficulty}
            </Chip>
          )}
        </div>
      </div>

      {has(study.definition) && (
        <Block label="Definizione">
          <p className="text-sm leading-relaxed text-ink-800">{study.definition}</p>
        </Block>
      )}

      {has(study.ratio) && (
        <Block label="Ratio">
          <p className="text-sm leading-relaxed text-ink-800">{study.ratio}</p>
        </Block>
      )}

      {has(study.keyNorms) && (
        <Block label="Norme chiave">
          <div className="flex flex-wrap gap-2">
            {study.keyNorms!.map((n) => (
              <Chip key={n} className="border-accent-200 bg-white text-accent-800">
                {n}
              </Chip>
            ))}
          </div>
        </Block>
      )}

      {has(study.coreElements) && (
        <Block label="Elementi fondamentali">
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-700">
            {study.coreElements!.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </Block>
      )}

      {has(study.distinctions) && (
        <Block label="Distinzioni importanti">
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-700">
            {study.distinctions!.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </Block>
      )}

      {has(study.oralAnswerShort) && (
        <Block label="Risposta orale — breve">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-800">
            {study.oralAnswerShort}
          </p>
        </Block>
      )}

      {has(study.oralAnswerExtended) && (
        <Block label="Risposta orale — estesa">
          {extended ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-800">
              {study.oralAnswerExtended}
            </p>
          ) : (
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={() => setExtended(true)}
            >
              Mostra risposta estesa
            </button>
          )}
        </Block>
      )}

      {has(study.miniCase) && (
        <Block label="Mini-caso">
          <p className="text-sm italic leading-relaxed text-ink-700">
            {study.miniCase}
          </p>
        </Block>
      )}

      {has(study.jurisprudenceNotes) && (
        <Block label="Note di giurisprudenza">
          <p className="text-sm leading-relaxed text-ink-700">
            {study.jurisprudenceNotes}
          </p>
        </Block>
      )}

      {has(study.commonMistakes) && (
        <Block label="Errori frequenti">
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-700">
            {study.commonMistakes!.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </Block>
      )}

      {has(study.checklist) && (
        <Block label="Checklist pre-risposta">
          <ul className="space-y-1 text-sm text-ink-700">
            {study.checklist!.map((el, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-accent-600">✓</span>
                <span>{el}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="label">{label}</div>
      {children}
    </div>
  );
}
