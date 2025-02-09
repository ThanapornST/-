import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { PenLine, BookOpen, FolderOpen, FileText, BookMarked, LogOut, Plus } from 'lucide-react';
    import NewProjectModal from './CreateNovelPage/NewProjectModal';

    interface Project {
      id: string;
      title: string;
      description: string;
      coverImage?: string;
    }

    const CreateNovelPage = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const navigate = useNavigate();
      const [projects, setProjects] = useState<Project[]>([
        {
          id: '1',
          title: 'Cubic',
          description: 'A romantic-drama novel that is currently built in the new way, often revolving around the relationship of characters with different life experiences. The story usually follows Nathaniel, a person who is often the most troubled...'
        },
        {
          id: '2',
          title: 'Cubic',
          description: 'A romantic-drama novel that is currently built in the new way, often revolving around the relationship of characters with different life experiences. The story usually follows Nathaniel, a person who is often the most troubled...'
        },
        {
          id: '3',
          title: 'Cubic',
          description: 'A romantic-drama novel that is currently built in the new way, often revolving around the relationship of characters with different life experiences. The story usually follows Nathaniel, a person who is often the most troubled...'
        }
      ]);

      const [activeContent, setActiveContent] = useState<'projects' | 'tables' | 'novel' | 'shortStory' | 'longNovel'>('projects');

      const handleNewProject = (projectData: {
        title: string;
        description: string;
        type: string;
        coverImage?: File;
      }) => {
        const newProject: Project = {
          id: Date.now().toString(),
          title: projectData.title,
          description: projectData.description,
          coverImage: projectData.coverImage ? URL.createObjectURL(projectData.coverImage) : undefined,
        };

        setProjects([newProject, ...projects]);
      };

      const handleLogoClick = () => {
        navigate('/');
      };

      const handleNavigation = (content: 'projects' | 'tables' | 'novel' | 'shortStory' | 'longNovel') => {
        setActiveContent(content);
      };

      const renderContent = () => {
        switch (activeContent) {
          case 'projects':
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#0f0f0f] p-6 rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    {project.coverImage && (
                      <div 
                        className="h-32 mb-4 rounded-lg bg-cover bg-center" 
                        style={{ backgroundImage: `url(${project.coverImage})` }}
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-4">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            );
          case 'tables':
            return <div>Tables Content</div>;
          case 'novel':
            return <div>Novel Content</div>;
          case 'shortStory':
            return <div>Short Story Content</div>;
          case 'longNovel':
            return <div>Long Novel Content</div>;
          default:
            return <div>Projects Content</div>;
        }
      };

      return (
        <div className="flex h-screen bg-[#1a1a1a] text-white">
          {/* Sidebar */}
          <div className="w-64 bg-[#0f0f0f] p-4 flex flex-col">
            {/* Logo */}
            <div 
              className="flex items-center mb-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <PenLine className="h-6 w-6 text-white" />
              <span className="ml-2 text-xl font-semibold">Write Whisper</span>
            </div>

            {/* New Project Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mb-8"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <button 
                onClick={() => handleNavigation('projects')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'projects' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <FolderOpen className="w-5 h-5 mr-3" />
                Projects
              </button>
              <button 
                onClick={() => handleNavigation('tables')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'tables' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Tables
              </button>
              <button 
                onClick={() => handleNavigation('novel')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'novel' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Novel
              </button>
              <button 
                onClick={() => handleNavigation('shortStory')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'shortStory' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <BookMarked className="w-5 h-5 mr-3" />
                Short Story
              </button>
              <button 
                onClick={() => handleNavigation('longNovel')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'longNovel' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <BookMarked className="w-5 h-5 mr-3" />
                Long Novel
              </button>
            </nav>

            {/* Log Out at Bottom */}
            <div className="mt-auto">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold">Welcome back, April-ntt</h1>
                <div className="mt-4 inline-block bg-[#0f0f0f] px-4 py-2 rounded-lg">
                  <h2 className="text-lg">Updated Stats</h2>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-600">
                {/* Profile picture placeholder */}
              </div>
            </div>

            {/* Render Content based on active tab */}
            {renderContent()}
          </div>

          {/* New Project Modal */}
          <NewProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleNewProject}
          />
        </div>
      );
    };

    export default CreateNovelPage;
