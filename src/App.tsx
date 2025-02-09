import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreateNovelPage from './components/CreateNovelPage';
import GenerateNovelPage from './components/GenerateNovelPage';
import ProjectsPage from './components/ProjectsPage';
import ProfilePage from './components/ProfilePage';
import PricingPage from './components/PricingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-novel" element={<CreateNovelPage />} />
        <Route path="/generate-novel" element={<GenerateNovelPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;