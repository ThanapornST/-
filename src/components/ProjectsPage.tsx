import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, BookOpen, Settings, BarChart2, Clock, User, ChevronRight, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  lastModified: string;
  progress: number;
  chapters: number;
  words: number;
  status: 'draft' | 'published' | 'archived';
  coverImage: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'The Lost Kingdom',
    type: 'Fantasy Novel',
    lastModified: '2024-03-20',
    progress: 65,
    chapters: 12,
    words: 45000,
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'City of Dreams',
    type: 'Science Fiction',
    lastModified: '2024-03-18',
    progress: 90,
    chapters: 18,
    words: 62000,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Whispers in the Dark',
    type: 'Horror',
    lastModified: '2024-03-15',
    progress: 30,
    chapters: 5,
    words: 15000,
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'
  }
];

const ProjectsPage = () => {
  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f0f0f] p-4 flex flex-col">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-8 hover:opacity-80">
          <PenLine className="h-6 w-6" />
          <span className="ml-2 text-xl font-semibold">WriteWhisper</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <Link to="/create-novel" className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg">
            <BookOpen className="w-5 h-5 mr-3" />
            Create Novel
          </Link>
          <Link to="/projects" className="flex items-center px-3 py-2 bg-[#2a2a2a] text-white rounded-lg">
            <BarChart2 className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link to="/settings" className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        {/* User Profile */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-300" />
            </div>
            <div className="ml-3">
              <div className="font-medium">April-ntt</div>
              <div className="text-sm text-gray-400">Premium User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="p-8 border-b border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <Link 
              to="/create-novel"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create New Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0f0f0f] p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Total Projects</div>
              <div className="text-2xl font-semibold">{projects.length}</div>
            </div>
            <div className="bg-[#0f0f0f] p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Published</div>
              <div className="text-2xl font-semibold">
                {projects.filter(p => p.status === 'published').length}
              </div>
            </div>
            <div className="bg-[#0f0f0f] p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Total Words</div>
              <div className="text-2xl font-semibold">
                {projects.reduce((acc, p) => acc + p.words, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-[#0f0f0f] p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Total Chapters</div>
              <div className="text-2xl font-semibold">
                {projects.reduce((acc, p) => acc + p.chapters, 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#0f0f0f] rounded-lg overflow-hidden group">
                <div className="relative aspect-video">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <Link 
                        to={`/project/${project.id}`}
                        className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        Open Project
                      </Link>
                      <button className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium mb-1">{project.title}</h3>
                      <span className="text-sm text-gray-400">{project.type}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      project.status === 'published' ? 'bg-green-500/10 text-green-500' :
                      project.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{project.lastModified}</span>
                      </div>
                      <div className="text-gray-400">
                        {project.words.toLocaleString()} words
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
