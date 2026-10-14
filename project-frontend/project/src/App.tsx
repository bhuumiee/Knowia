import { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/pages/Dashboard';
import UploadMaterials from '@/pages/UploadMaterials';
import AITutor from '@/pages/AITutor';
import AdaptiveQuiz from '@/pages/AdaptiveQuiz';
import LearningProgress from '@/pages/LearningProgress';
import CourseMaterials from '@/pages/CourseMaterials';

const pageTitles = {
  dashboard: 'Dashboard',
  upload: 'Upload Materials',
  tutor: 'AI Tutor',
  quiz: 'Adaptive Quiz',
  progress: 'Learning Progress',
  materials: 'Course Materials',
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar onMenuClick={() => setSidebarOpen(true)} title={pageTitles[activePage]} onNavigate={handleNavigate} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            {activePage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {activePage === 'upload' && <UploadMaterials />}
            {activePage === 'tutor' && <AITutor />}
            {activePage === 'quiz' && <AdaptiveQuiz />}
            {activePage === 'progress' && <LearningProgress />}
            {activePage === 'materials' && <CourseMaterials />}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
