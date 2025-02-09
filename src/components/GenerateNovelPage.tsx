import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { FileText } from 'lucide-react';
import { BookOpen } from 'lucide-react';


import { PenLine, ChevronDown, Import as Export, Save, Moon, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface NovelData {
  title: string;
  plotSummary: string;
  characters: string;
  toneOfStory: string;
  storyStructure: string;
  genre: string;
  era: string;
  type: 'episodic' | 'one-shot';
  coverPreview?: string;
}

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  avatar?: string | null;
}

const GenerateNovelPage = () => {
  const navigate = useNavigate();
  const [novelData, setNovelData] = useState<NovelData | null>(null);
  const [language, setLanguage] = useState('English (US)');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentNovelIndex, setCurrentNovelIndex] = useState(0);
   const [activeContent, setActiveContent] = useState<'projects' | 'tables' | 'novel' | 'shortStory' | 'longNovel'>('projects');
  const handleNavigation = (content: 'projects' | 'tables' | 'novel' | 'shortStory' | 'longNovel') => {
    setActiveContent(content);
  };

  // Sample novels array - in a real app, this would come from your backend
  const novels = [
    {
      id: 1,
      title: "The Lost Kingdom",
      summary: "A fantasy epic about a hidden realm",
    },
    {
      id: 2,
      title: "Midnight Shadows",
      summary: "A supernatural mystery in a small town",
    },
    {
      id: 3,
      title: "Future's Edge",
      summary: "A sci-fi adventure in the year 3000",
    }
  ];

  const recentItems = [
    { id: 1, title: 'Chapter 1: The Beginning', date: '2024-03-15' },
    { id: 2, title: 'Chapter 2: The Journey', date: '2024-03-14' },
    { id: 3, title: 'Notes for Chapter 3', date: '2024-03-13' },
  ];

  useEffect(() => {
    // Retrieve novel data from localStorage
    const savedNovelData = localStorage.getItem('novelData');
    if (savedNovelData) {
      setNovelData(JSON.parse(savedNovelData));
      // Add initial AI message
      setMessages([
        {
          id: 1,
          text: "I'll help you write your story based on your provided outline. Let me know if you want to start generating the content.",
          isAI: true,
          avatar: null
        }
      ]);
    } else {
      // If no data, redirect back to create page
      navigate('/create-novel');
    }
  }, [navigate]);

  const generateText = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    const newMessage: Message = {
      id: messages.length + 1,
      text: `Based on your ${novelData?.genre} story set in the ${novelData?.era} era with a ${novelData?.toneOfStory} tone, here's the next part of your story...`,
      isAI: true,
      avatar: null
    };

    setMessages(prev => [...prev, newMessage]);
    setIsGenerating(false);
  };

  const navigateToNovel = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentNovelIndex > 0) {
      setCurrentNovelIndex(currentNovelIndex - 1);
    } else if (direction === 'next' && currentNovelIndex < novels.length - 1) {
      setCurrentNovelIndex(currentNovelIndex + 1);
    }
  };

  if (!novelData) return null;

  

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f0f0f] flex flex-col">
        {/* Logo */}
        <Link to="/" className="flex items-center p-4 hover:bg-[#2a2a2a]">
          <PenLine className="h-6 w-6" />
          <span className="ml-2 text-xl font-semibold">WriteWhisper</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/" className="block px-4 py-2 rounded hover:bg-[#2a2a2a]">
              Home
            </Link>
            <button 
                onClick={() => handleNavigation('projects')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'projects' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <FolderOpen className="w-5 h-5 mr-3" />
                ข้อมูล Projects
              </button>
              <button 
                onClick={() => handleNavigation('tables')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'tables' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <FileText className="w-5 h-5 mr-3" />
                สร้างเสียงตัวละคร
              </button>
              <button 
                onClick={() => handleNavigation('novel')}
                className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${activeContent === 'novel' ? 'bg-[#2a2a2a]' : ''}`}
              >
                <BookOpen className="w-5 h-5 mr-3" />
              AI สร้างนิยาย
              Novel
              </button>
            {/* <button className="w-full text-left px-4 py-2 rounded bg-[#2a2a2a]">
              AI สร้างนิยาย
            </button> */}
          </div>

          {/* Recently Added Section */}
          <div className="mt-8">
            <div className="flex items-center px-4 py-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              Recently Added
            </div>
            <div className="space-y-1">
              {recentItems.map(item => (
                <button 
                  key={item.id}
                  className="w-full text-left px-4 py-2 rounded hover:bg-[#2a2a2a] text-sm group"
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate">{item.title}</span>
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="px-4 py-2 text-sm text-gray-400">Story Chapters</div>
            <div className="space-y-1">
              <button className="w-full text-left px-4 py-2 rounded hover:bg-[#2a2a2a] text-sm">
                Chapter 1: {novelData.title}
              </button>
            </div>
            <button className="w-full text-left px-4 py-2 text-blue-500 hover:bg-[#2a2a2a] text-sm">
              + Add New Chapter
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-300" />
            </div>
            <div className="ml-3">
              <div className="font-medium">User</div>
              <div className="text-sm text-gray-400">Points: 2000</div>
            </div>
          </div>
        </div>
      </div>

              

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateToNovel('prev')}
                disabled={currentNovelIndex === 0}
                className={`p-2 rounded-full ${currentNovelIndex === 0 ? 'text-gray-600' : 'hover:bg-gray-700'}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">{novels[currentNovelIndex].title}</h1>
                <p className="text-sm text-gray-400">{novels[currentNovelIndex].summary}</p>
              </div>
              <button 
                onClick={() => navigateToNovel('next')}
                disabled={currentNovelIndex === novels.length - 1}
                className={`p-2 rounded-full ${currentNovelIndex === novels.length - 1 ? 'text-gray-600' : 'hover:bg-gray-700'}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="ml-8 flex items-center text-sm text-gray-400">
              <span>{messages.length} messages</span>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                {language}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
              <Export className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-700 mr-4 flex items-center justify-center">
                {message.isAI ? (
                  <PenLine className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  {message.text}
                </div>
                {message.isAI && (
                  <button className="mt-2 px-4 py-1 bg-blue-500 text-sm rounded hover:bg-blue-600">
                    Generate Speech
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-700 rounded">
              <Moon className="w-5 h-5" />
            </button>
            <button 
              onClick={generateText}
              disabled={isGenerating}
              className={`px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Text'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateNovelPage;