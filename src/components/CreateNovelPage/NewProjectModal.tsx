import React, { useState } from 'react';
import { X, PenLine } from 'lucide-react';
import CreateStoryModal from '../CreateStoryModal';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    title: string;
    description: string;
    type: string;
    coverImage?: File;
  }) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [storyType, setStoryType] = useState<'episodic' | 'one-shot'>('episodic');

  if (!isOpen) return null;

  const handleEpisodicStory = () => {
    setStoryType('episodic');
    setShowCreateStory(true);
  };

  const handleOneShot = () => {
    setStoryType('one-shot');
    setShowCreateStory(true);
  };

  if (showCreateStory) {
    return (
      <CreateStoryModal
        isOpen={true}
        onClose={() => {
          setShowCreateStory(false);
          onClose();
        }}
        type={storyType}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] w-full max-w-lg rounded-xl p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center text-white mb-8">
          <h2 className="text-2xl font-semibold mb-2">Create Title</h2>
          <p className="text-gray-400">The type of story you want to create</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button 
            onClick={handleEpisodicStory}
            className="group relative p-6 rounded-xl border border-blue-500/20 bg-[#1a1a1a] hover:border-blue-500/50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <PenLine className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-white font-medium mb-1">Episodic Story</h3>
              <p className="text-xs text-gray-400">(with multiple chapters)</p>
            </div>
            <div className="absolute inset-0 border border-blue-500/0 rounded-xl group-hover:border-blue-500/50 transition-colors" />
          </button>

          <button 
            onClick={handleOneShot}
            className="group relative p-6 rounded-xl border border-blue-500/20 bg-[#1a1a1a] hover:border-blue-500/50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <PenLine className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-white font-medium mb-1">Create Title</h3>
              <p className="text-xs text-gray-400">(one-shot)</p>
            </div>
            <div className="absolute inset-0 border border-blue-500/0 rounded-xl group-hover:border-blue-500/50 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;