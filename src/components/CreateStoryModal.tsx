import React, { useState } from 'react';
import { X, Image } from 'lucide-react';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'episodic' | 'one-shot';
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    title: '',
    characters: '',
    plotSummary: '',
    additionalInfo: '',
    toneOfStory: '',
    storyStructure: '',
    genre: '',
    era: '',
    generationTime: '30'
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, type, coverImage });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#0f0f0f] w-full max-w-5xl rounded-xl relative animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Create Title</h2>
              <p className="text-gray-400">The type of story you want to create</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Image Upload */}
            <div>
              <label htmlFor="coverImage" className="block">
                <div className="aspect-square rounded-lg border-2 border-dashed border-blue-500/50 bg-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6">
                      <Image className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-lg mb-2 text-white">Image jpg/png</p>
                      <button type="button" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Novel Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Number of Characters *</label>
                <input
                  type="number"
                  name="characters"
                  value={formData.characters}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Plot Summary *</label>
                <textarea
                  name="plotSummary"
                  value={formData.plotSummary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Additional Information (optional)</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Tone of the Story *</label>
                  <select
                    name="toneOfStory"
                    value={formData.toneOfStory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                    required
                  >
                    <option value="">Select tone</option>
                    <option value="dramatic">Dramatic</option>
                    <option value="humorous">Humorous</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Story Structure *</label>
                  <select
                    name="storyStructure"
                    value={formData.storyStructure}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                    required
                  >
                    <option value="">Select structure</option>
                    <option value="linear">Linear</option>
                    <option value="nonlinear">Non-linear</option>
                    <option value="episodic">Episodic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Genre *</label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                    required
                  >
                    <option value="">Select genre</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="scifi">Science Fiction</option>
                    <option value="romance">Romance</option>
                    <option value="mystery">Mystery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Specify the Era *</label>
                  <select
                    name="era"
                    value={formData.era}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                    required
                  >
                    <option value="">Select era</option>
                    <option value="ancient">Ancient</option>
                    <option value="medieval">Medieval</option>
                    <option value="modern">Modern</option>
                    <option value="future">Future</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Generation Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {['15', '30', '60', '120'].map((seconds) => (
                    <button
                      key={seconds}
                      type="button"
                      onClick={() => setFormData({ ...formData, generationTime: seconds })}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        formData.generationTime === seconds
                          ? 'bg-blue-500 text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {seconds} seconds
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-6"
              >
                Generate Text
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;