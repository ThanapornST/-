import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from './context/ThemeContext';
import LoginCard from './components/Login/LoginCard';
import RegisterCard from './components/Login/RegisterCard';
import HomePage from './components/HomePage';
// import CreatePage from './components/CreatePage';
// import NovelEditor from './components/NovelEditor/NovelEditor';
// import CreateVoicePage from './components/CreateVoice/CreateVoicePage';
// import Including_character_creation from './components/Including character creation';
// import ChatNovel from './components/ChatNovel/ChatNovel';
// import NovelGenerator from './components/NovelGenerator/NovelGenerator';
// import PromotionPage from './components/Promotion/PromotionPage';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-theme-primary dark:bg-dark-primary transition-theme flex items-center justify-center p-4">
      <div className="relative flex w-full max-w-[1000px] h-[600px] bg-theme-secondary dark:bg-dark-secondary rounded-2xl shadow-xl overflow-hidden transition-theme">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="bg-theme-primary dark:bg-dark-primary text-theme-primary dark:text-dark-text min-h-screen transition-theme">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<AuthLayout><LoginCard /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><RegisterCard /></AuthLayout>} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/editor" element={<NovelEditor />} />
            <Route path="/create-voice" element={<CreateVoicePage />} />
            <Route path="/ai-novel" element={<Including_character_creation />} />
            <Route path="/chat-novel" element={<ChatNovel />} />
            <Route path="/novel-generator" element={<NovelGenerator />} />
            <Route path="/including-character-creation" element={<Including_character_creation />} />
            <Route path="/promotion" element={<PromotionPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;