import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type {
  AppData,
  AppSettings,
  Flashcard,
  OpenQuestion,
  SessionOutcome,
  StudySession,
  Subject,
  Subtopic,
  Topic,
  TopicStatus,
  ActivityType,
} from '@/types';
import { loadData, saveData, resetData as storageReset } from '@/lib/storage';
import { clamp, nowIso, uid } from '@/lib/utils';

type Action =
  | { type: 'SET_ALL'; data: AppData }
  | { type: 'ADD_SUBJECT'; subject: Subject }
  | { type: 'UPDATE_SUBJECT'; subject: Subject }
  | { type: 'DELETE_SUBJECT'; id: string }
  | { type: 'ADD_TOPIC'; topic: Topic }
  | { type: 'UPDATE_TOPIC'; topic: Topic }
  | { type: 'DELETE_TOPIC'; id: string }
  | { type: 'ADD_SESSION'; session: StudySession }
  | { type: 'DELETE_SESSION'; id: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<AppSettings> };

function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case 'SET_ALL':
      return action.data;
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, action.subject] };
    case 'UPDATE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map((s) =>
          s.id === action.subject.id ? { ...s, ...action.subject } : s,
        ),
      };
    case 'DELETE_SUBJECT': {
      return {
        ...state,
        subjects: state.subjects.filter((s) => s.id !== action.id),
        topics: state.topics.filter((t) => t.subjectId !== action.id),
      };
    }
    case 'ADD_TOPIC':
      return { ...state, topics: [...state.topics, action.topic] };
    case 'UPDATE_TOPIC':
      return {
        ...state,
        topics: state.topics.map((t) =>
          t.id === action.topic.id
            ? { ...action.topic, updatedAt: nowIso() }
            : t,
        ),
      };
    case 'DELETE_TOPIC':
      return { ...state, topics: state.topics.filter((t) => t.id !== action.id) };
    case 'ADD_SESSION':
      return { ...state, sessions: [action.session, ...state.sessions] };
    case 'DELETE_SESSION':
      return { ...state, sessions: state.sessions.filter((s) => s.id !== action.id) };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    default:
      return state;
  }
}

interface AppContextValue {
  data: AppData;
  // subjects
  createSubject: (input: Omit<Subject, 'id' | 'createdAt'>) => Subject;
  updateSubject: (s: Subject) => void;
  deleteSubject: (id: string) => void;
  // topics
  createTopic: (
    input: Partial<Topic> & Pick<Topic, 'subjectId' | 'title'>,
  ) => Topic;
  updateTopic: (t: Topic) => void;
  deleteTopic: (id: string) => void;
  markTopicReviewedToday: (id: string, note?: string) => void;
  applyOutcomeToTopic: (id: string, outcome: SessionOutcome) => void;
  // subtopics, flashcards, questions (mutate inside topic)
  addSubtopic: (topicId: string, title: string, note?: string) => void;
  toggleSubtopic: (topicId: string, subId: string) => void;
  updateSubtopic: (topicId: string, sub: Subtopic) => void;
  removeSubtopic: (topicId: string, subId: string) => void;
  addFlashcard: (topicId: string, q: string, a: string) => void;
  removeFlashcard: (topicId: string, cardId: string) => void;
  addQuestion: (topicId: string, text: string) => void;
  removeQuestion: (topicId: string, qId: string) => void;
  // sessions
  logSession: (s: Omit<StudySession, 'id' | 'date'> & { date?: string }) => void;
  deleteSession: (id: string) => void;
  // settings
  updateSettings: (s: Partial<AppSettings>) => void;
  // data management
  replaceAll: (data: AppData) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

/** Mappatura esito -> delta confidenza, con clamp 0..100. */
const outcomeDelta = (o: SessionOutcome): number =>
  o === 'bene' ? 15 : o === 'medio' ? 3 : -12;

const outcomeStatus = (o: SessionOutcome, current: TopicStatus): TopicStatus => {
  if (o === 'bene') return current === 'da_studiare' ? 'in_ripasso' : 'solido';
  if (o === 'medio') return current === 'solido' ? 'in_ripasso' : current;
  return 'in_ripasso';
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, loadData);

  // Persistenza automatica ad ogni cambio stato.
  useEffect(() => {
    saveData(data);
  }, [data]);

  // ----- Subjects -----
  const createSubject: AppContextValue['createSubject'] = useCallback((input) => {
    const subject: Subject = {
      id: uid(),
      createdAt: nowIso(),
      ...input,
    };
    dispatch({ type: 'ADD_SUBJECT', subject });
    return subject;
  }, []);

  const updateSubject: AppContextValue['updateSubject'] = useCallback((s) => {
    dispatch({ type: 'UPDATE_SUBJECT', subject: s });
  }, []);

  const deleteSubject: AppContextValue['deleteSubject'] = useCallback((id) => {
    dispatch({ type: 'DELETE_SUBJECT', id });
  }, []);

  // ----- Topics -----
  const createTopic: AppContextValue['createTopic'] = useCallback((input) => {
    const now = nowIso();
    const topic: Topic = {
      id: uid(),
      subjectId: input.subjectId,
      title: input.title,
      note: input.note ?? '',
      priority: input.priority ?? 'media',
      status: input.status ?? 'da_studiare',
      confidence: clamp(input.confidence ?? 0, 0, 100),
      keywords: input.keywords ?? [],
      subtopics: input.subtopics ?? [],
      flashcards: input.flashcards ?? [],
      questions: input.questions ?? [],
      lastReviewedAt: input.lastReviewedAt ?? null,
      createdAt: now,
      updatedAt: now,
    };
    dispatch({ type: 'ADD_TOPIC', topic });
    return topic;
  }, []);

  const updateTopic: AppContextValue['updateTopic'] = useCallback((t) => {
    dispatch({
      type: 'UPDATE_TOPIC',
      topic: { ...t, confidence: clamp(t.confidence, 0, 100) },
    });
  }, []);

  const deleteTopic: AppContextValue['deleteTopic'] = useCallback((id) => {
    dispatch({ type: 'DELETE_TOPIC', id });
  }, []);

  const logSession: AppContextValue['logSession'] = useCallback((s) => {
    const session: StudySession = {
      id: uid(),
      date: s.date ?? nowIso(),
      type: s.type,
      subjectId: s.subjectId,
      subjectName: s.subjectName,
      topicId: s.topicId,
      topicTitle: s.topicTitle,
      durationSeconds: s.durationSeconds,
      outcome: s.outcome,
      notes: s.notes,
    };
    dispatch({ type: 'ADD_SESSION', session });
  }, []);

  const markTopicReviewedToday: AppContextValue['markTopicReviewedToday'] = useCallback(
    (id, note) => {
      const topic = data.topics.find((t) => t.id === id);
      if (!topic) return;
      const subject = data.subjects.find((s) => s.id === topic.subjectId);
      const updated: Topic = {
        ...topic,
        lastReviewedAt: nowIso(),
        status: topic.status === 'da_studiare' ? 'in_ripasso' : topic.status,
      };
      dispatch({ type: 'UPDATE_TOPIC', topic: updated });
      const session: StudySession = {
        id: uid(),
        date: nowIso(),
        type: 'ripasso' satisfies ActivityType,
        subjectId: subject?.id,
        subjectName: subject?.name,
        topicId: topic.id,
        topicTitle: topic.title,
        notes: note,
      };
      dispatch({ type: 'ADD_SESSION', session });
    },
    [data.subjects, data.topics],
  );

  const applyOutcomeToTopic: AppContextValue['applyOutcomeToTopic'] = useCallback(
    (id, outcome) => {
      const topic = data.topics.find((t) => t.id === id);
      if (!topic) return;
      const newConfidence = clamp(topic.confidence + outcomeDelta(outcome), 0, 100);
      const newStatus = outcomeStatus(outcome, topic.status);
      const updated: Topic = {
        ...topic,
        confidence: newConfidence,
        status: newStatus,
        lastReviewedAt: nowIso(),
      };
      dispatch({ type: 'UPDATE_TOPIC', topic: updated });
    },
    [data.topics],
  );

  // ----- Mutators all'interno di un topic -----
  const mutateTopic = useCallback(
    (topicId: string, mutator: (t: Topic) => Topic) => {
      const topic = data.topics.find((t) => t.id === topicId);
      if (!topic) return;
      dispatch({ type: 'UPDATE_TOPIC', topic: mutator(topic) });
    },
    [data.topics],
  );

  const addSubtopic: AppContextValue['addSubtopic'] = useCallback(
    (topicId, title, note) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        subtopics: [
          ...t.subtopics,
          { id: uid(), title, note, done: false },
        ],
      }));
    },
    [mutateTopic],
  );

  const toggleSubtopic: AppContextValue['toggleSubtopic'] = useCallback(
    (topicId, subId) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        subtopics: t.subtopics.map((s) =>
          s.id === subId ? { ...s, done: !s.done } : s,
        ),
      }));
    },
    [mutateTopic],
  );

  const updateSubtopic: AppContextValue['updateSubtopic'] = useCallback(
    (topicId, sub) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        subtopics: t.subtopics.map((s) => (s.id === sub.id ? { ...s, ...sub } : s)),
      }));
    },
    [mutateTopic],
  );

  const removeSubtopic: AppContextValue['removeSubtopic'] = useCallback(
    (topicId, subId) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        subtopics: t.subtopics.filter((s) => s.id !== subId),
      }));
    },
    [mutateTopic],
  );

  const addFlashcard: AppContextValue['addFlashcard'] = useCallback(
    (topicId, q, a) => {
      const card: Flashcard = {
        id: uid(),
        question: q,
        answer: a,
        createdAt: nowIso(),
      };
      mutateTopic(topicId, (t) => ({ ...t, flashcards: [...t.flashcards, card] }));
    },
    [mutateTopic],
  );

  const removeFlashcard: AppContextValue['removeFlashcard'] = useCallback(
    (topicId, cardId) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        flashcards: t.flashcards.filter((f) => f.id !== cardId),
      }));
    },
    [mutateTopic],
  );

  const addQuestion: AppContextValue['addQuestion'] = useCallback(
    (topicId, text) => {
      const q: OpenQuestion = { id: uid(), text, createdAt: nowIso() };
      mutateTopic(topicId, (t) => ({ ...t, questions: [...t.questions, q] }));
    },
    [mutateTopic],
  );

  const removeQuestion: AppContextValue['removeQuestion'] = useCallback(
    (topicId, qId) => {
      mutateTopic(topicId, (t) => ({
        ...t,
        questions: t.questions.filter((q) => q.id !== qId),
      }));
    },
    [mutateTopic],
  );

  const deleteSession: AppContextValue['deleteSession'] = useCallback((id) => {
    dispatch({ type: 'DELETE_SESSION', id });
  }, []);

  const updateSettings: AppContextValue['updateSettings'] = useCallback((s) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings: s });
  }, []);

  const replaceAll: AppContextValue['replaceAll'] = useCallback((d) => {
    dispatch({ type: 'SET_ALL', data: d });
  }, []);

  const resetAll: AppContextValue['resetAll'] = useCallback(() => {
    dispatch({ type: 'SET_ALL', data: storageReset() });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      data,
      createSubject,
      updateSubject,
      deleteSubject,
      createTopic,
      updateTopic,
      deleteTopic,
      markTopicReviewedToday,
      applyOutcomeToTopic,
      addSubtopic,
      toggleSubtopic,
      updateSubtopic,
      removeSubtopic,
      addFlashcard,
      removeFlashcard,
      addQuestion,
      removeQuestion,
      logSession,
      deleteSession,
      updateSettings,
      replaceAll,
      resetAll,
    }),
    [
      data,
      createSubject,
      updateSubject,
      deleteSubject,
      createTopic,
      updateTopic,
      deleteTopic,
      markTopicReviewedToday,
      applyOutcomeToTopic,
      addSubtopic,
      toggleSubtopic,
      updateSubtopic,
      removeSubtopic,
      addFlashcard,
      removeFlashcard,
      addQuestion,
      removeQuestion,
      logSession,
      deleteSession,
      updateSettings,
      replaceAll,
      resetAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve essere usato dentro AppProvider');
  return ctx;
}
