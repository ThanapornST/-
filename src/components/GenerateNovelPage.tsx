import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FolderOpen, FileText, BookOpen, PenLine, ChevronDown, Import as Export, Save, Moon, User, Clock, ChevronLeft, ChevronRight, Volume2, Plus, Pencil, Star, ArrowLeft, Trash2 } from 'lucide-react';
import { synthesizeSpeech } from '../services/textToSpeech';

interface NovelData {
  title: string;
  characters: number;
  plotSummary: string;
  additionalInfo: string;
  toneOfStory: string;
  storyStructure: string;
  genre: string;
  era: string;
  generationTime: number;
  type: 'episodic' | 'one-shot';
  coverImage?: string;
}

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  sender: 'Sun' | 'Schebel' | 'System';
  avatar: string;
}

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

const GenerateNovelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [novelData, setNovelData] = useState<NovelData | null>(null);
  const [language, setLanguage] = useState('Thai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentNovelIndex, setCurrentNovelIndex] = useState(0);
  const [activeContent, setActiveContent] = useState<'chat' | 'projects' | 'character-voices'>('chat');
  const [rightContent, setRightContent] = useState<'chat' | 'outline' | 'settings'>('chat');
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(4);

  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: 'ชื่อ',
      status: 'active',
      isStarred: true
    },
    {
      id: 2,
      name: 'ชื่อ',
      status: 'active',
      isStarred: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "เฮ้ย ชอบเกมที่เธอวาดมากเลย สวยจัง ทำไมไม่ลองมาทำงานที่บริษัทเราดูล่ะ?",
      isAI: false,
      sender: "Sun",
      avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      text: "ขอบคุณค่ะ แต่ว่าชอบทำงานฟรีแลนซ์มากกว่า",
      isAI: true,
      sender: "Schebel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
    },
    {
      id: 3,
      text: "โห ทำไมล่ะ? ที่บริษัทเรามีสวัสดิการดีนะ แถมได้เจอเพื่อนร่วมงานเพียบเลย สนุกแน่นอน!",
      isAI: false,
      sender: "Sun",
      avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=50&h=50&fit=crop"
    },
    {
      id: 4,
      text: "ชอบทำงานคนเดียวมากกว่าค่ะ",
      isAI: true,
      sender: "Schebel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
    }
  ]);

  // Get current messages
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const novels = [
    {
      id: 1,
      title: "Freelance girl and direct sales guy",
    },
  ];

  const generateSpeech = useCallback(async (text: string) => {
    try {
      setIsGeneratingSpeech(true);
      const audioContent = await synthesizeSpeech(text);
      
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      setAudioPlayer(audio);
      await audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsGeneratingSpeech(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    };
  }, [audioPlayer]);

  useEffect(() => {
    if (location.state?.novelData) {
      setNovelData(location.state.novelData);
      if (location.state.mode === 'create') {
        const initialMessage: Message = {
          id: messages.length + 1,
          text: `สร้างนิยายเรื่อง "${location.state.novelData.title}" ที่มีเนื้อเรื่องเกี่ยวกับ ${location.state.novelData.plotSummary}`,
          isAI: false,
          sender: "System",
          avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=50&h=50&fit=crop"
        };
        setMessages(prev => [...prev, initialMessage]);
      }
    } else {
      const savedNovelData = localStorage.getItem('novelData');
      if (savedNovelData) {
        setNovelData(JSON.parse(savedNovelData));
      } else {
        navigate('/create-novel');
      }
    }
  }, [location.state, navigate]);

  const generateText = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    const lastMessage = messages[messages.length - 1];
    const isSunNext = lastMessage.sender === 'Schebel';
    
    let newText = '';
    
    if (novelData) {
      if (isSunNext) {
        const responses = [
          `ฉันชอบแนวคิดเรื่อง ${novelData.title} มาก โดยเฉพาะในส่วนของ ${novelData.plotSummary}`,
          `เรื่องราวแนว ${novelData.genre} นี่น่าสนใจมากเลย คุณคิดยังไงกับการพัฒนาตัวละครต่อ?`,
          `บรรยากาศแบบ ${novelData.era} เข้ากับโทนเรื่อง ${novelData.toneOfStory} ได้ดีมากเลย`
        ];
        newText = responses[Math.floor(Math.random() * responses.length)];
      } else {
        const responses = [
          `ขอบคุณค่ะ ฉันตั้งใจให้เรื่องนี้มีความพิเศษในแบบ ${novelData.toneOfStory}`,
          `ใช่ค่ะ ฉันวางโครงเรื่องแบบ ${novelData.storyStructure} เพื่อให้เข้ากับธีมหลัก`,
          `ฉันพยายามสร้างตัวละครให้สมจริงในบริบทของยุค ${novelData.era} ค่ะ`
        ];
        newText = responses[Math.floor(Math.random() * responses.length)];
      }
    } else {
      newText = isSunNext ? 
        "เล่าเพิ่มเติมเกี่ยวกับแนวคิดของเรื่องได้ไหม?" : 
        "ฉันกำลังพัฒนาเนื้อเรื่องให้น่าสนใจมากขึ้นค่ะ";
    }

    const newMessage: Message = {
      id: messages.length + 1,
      text: newText,
      isAI: true,
      sender: isSunNext ? 'Sun' : 'Schebel',
      avatar: isSunNext 
        ? "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=50&h=50&fit=crop"
        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
    };

    setMessages(prev => [...prev, newMessage]);
    setIsGenerating(false);

    const totalPages = Math.ceil((messages.length + 1) / messagesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const renderMainContent = () => {
    switch (activeContent) {
      case 'projects':
        return (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">My Projects</h1>
              <Link 
                to="/create-novel"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create New Project
              </Link>
            </div>

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
                        <button 
                          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          Open Project
                        </button>
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
        );

      case 'character-voices':
        return (
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Character Voices</h2>
              <button className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors">
                Add Voice
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="relative group">
                  <div className="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl text-gray-400">{character.name}</span>
                      </div>
                      {character.isStarred && (
                        <Star className="absolute top-0 right-0 w-5 h-5 text-yellow-500" fill="currentColor" />
                      )}
                    </div>
                    <span className="text-gray-400">Status: {character.status}</span>
                    <button className="mt-2">
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="relative group">
                <div className="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center justify-center h-full cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                  <div className="w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-gray-400">Add Character</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="flex-1 overflow-auto p-4">
              {currentMessages.map((message) => (
                <div key={message.id} className="flex items-start mb-6">
                  <div className="flex items-start">
                    <img 
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-sm mb-1">{message.sender}</div>
                      <div className="bg-[#2a2a2a] p-4 rounded-lg max-w-xl">
                        <p className="text-white">{message.text}</p>
                      </div>
                      <button
                        onClick={() => generateSpeech(message.text)}
                        disabled={isGeneratingSpeech}
                        className={`mt-2 px-4 py-1 bg-blue-500 text-sm rounded hover:bg-blue-600 flex items-center gap-2 ${
                          isGeneratingSpeech ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {isGeneratingSpeech ? 'กำลังสร้างเสียง...' : 'สร้างเสียง'}
                      </button>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => handleSelectMessage(message.id)}
                    className="ml-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-2 p-4 border-t border-gray-800">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.ceil(messages.length / messagesPerPage) }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1 
                      ? 'bg-blue-500' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(messages.length / messagesPerPage)}
                className={`px-3 py-1 rounded ${
                  currentPage === Math.ceil(messages.length / messagesPerPage)
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

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
                  {isGenerating ? 'กำลังสร้าง...' : 'สร้างข้อความ'}
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  const handleSelectMessage = (messageId: number) => {
    setSelectedMessages(prev => {
      if (prev.includes(messageId)) {
        return prev.filter(id => id !== messageId);
      } else {
        return [...prev, messageId];
      }
    });
  };

  if (!novelData) return null;

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
          <button 
            onClick={() => setActiveContent('projects')}
            className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${
              activeContent === 'projects' ? 'bg-[#2a2a2a] text-white' : ''
            }`}
          >
            <FolderOpen className="w-5 h-5 mr-3" />
            Projects
          </button>
          <button 
            onClick={() => setActiveContent('character-voices')}
            className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${
              activeContent === 'character-voices' ? 'bg-[#2a2a2a] text-white' : ''
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Character Voices
          </button>
          <button 
            onClick={() => setActiveContent('chat')}
            className={`flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg w-full ${
              activeContent === 'chat' ? 'bg-[#2a2a2a] text-white' : ''
            }`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            AI Novel Generator
          </button>
        </nav>

        {/* Story Chapters */}
        <div className="mt-8">
          <div className="flex items-center px-4 py-2 text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            Chapters
          </div>
          <div className="space-y-1">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#2a2a2a] text-sm">
              Chapter 1: First Meeting
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#2a2a2a] text-sm">
              Chapter 2: The Proposal
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-[#2a2a2a] text-sm">
              Chapter 3: Working Together
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="pt-4 border-t border-gray-800">
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
            <h1 className="text-xl font-semibold">{novels[currentNovelIndex].title}</h1>
            <div className="ml-8 flex items-center text-sm text-gray-400">
              <span>{messages.length} messages</span>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                {language}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <Export className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default GenerateNovelPage;