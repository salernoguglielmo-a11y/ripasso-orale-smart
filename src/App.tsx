import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AppProvider } from '@/context/AppContext';
import { DashboardPage } from '@/pages/Dashboard';
import { SubjectsPage } from '@/pages/Subjects';
import { SubjectDetailPage } from '@/pages/SubjectDetail';
import { TopicDetailPage } from '@/pages/TopicDetail';
import { FlashcardsPage } from '@/pages/Flashcards';
import { OralSimulationPage } from '@/pages/OralSimulation';
import { HistoryPage } from '@/pages/History';
import { SettingsPage } from '@/pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/materie" element={<SubjectsPage />} />
          <Route path="/materie/:id" element={<SubjectDetailPage />} />
          <Route path="/argomenti/:id" element={<TopicDetailPage />} />
          <Route path="/flashcard" element={<FlashcardsPage />} />
          <Route path="/simulazione" element={<OralSimulationPage />} />
          <Route path="/storico" element={<HistoryPage />} />
          <Route path="/impostazioni" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
