import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { X, Image } from 'lucide-react';

const CreateStoryPage = () => {
  const { type } = useParams();
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
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Create Title</h1>
          <button className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-400 mb-8">The type of story you want to create</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Column - Image Upload */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg border-2 border-dashed border-blue-500/50 bg-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <Image className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <p className="text-lg mb-2">Image jpg/png</p>
                  <button type="button" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                    Choose File
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="coverImage"
              />
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Novel Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Number of Characters *</label>
              <input
                type="number"
                name="characters"
                value={formData.characters}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Plot Summary *</label>
              <textarea
                name="plotSummary"
                value={formData.plotSummary}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Information (optional)</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tone of the Story *</label>
                <select
                  name="toneOfStory"
                  value={formData.toneOfStory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
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
                <label className="block text-sm font-medium mb-1">Story Structure *</label>
                <select
                  name="storyStructure"
                  value={formData.storyStructure}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select structure</option>
                  <option value="linear">Linear</option>
                  <option value="nonlinear">Non-linear</option>
                  <option value="episodic">Episodic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Genre *</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
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
                <label className="block text-sm font-medium mb-1">Specify the Era *</label>
                <select
                  name="era"
                  value={formData.era}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
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
              <label className="block text-sm font-medium mb-2">Generation Time</label>
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
  );
};

export default CreateStoryPage;
