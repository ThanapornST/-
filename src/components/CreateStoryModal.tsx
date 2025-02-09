import React, { useState, useRef } from 'react';
import { X, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'episodic' | 'one-shot';
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();
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
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateFile = (file: File): boolean => {
    setUploadError('');

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image file (JPG, PNG, or GIF)');
      return false;
    }

    // Check file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFile = async (file: File) => {
    if (validateFile(file)) {
      try {
        // Create a preview URL
        const preview = URL.createObjectURL(file);
        setCoverImage(file);
        setCoverPreview(preview);
        setUploadError('');
      } catch (error) {
        setUploadError('Error processing image. Please try again.');
        console.error('Error processing image:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create form data for submission
      const submitData = {
        ...formData,
        type,
        coverImage: coverPreview,
        characters: parseInt(formData.characters, 10),
        generationTime: parseInt(formData.generationTime, 10)
      };

      // Store the form data in localStorage
      localStorage.setItem('novelData', JSON.stringify(submitData));

      // Navigate to the generate novel page with the data
      navigate('/generate-novel', { 
        state: { 
          novelData: submitData,
          mode: 'create'
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              <div
                className={`relative aspect-square rounded-lg border-2 border-dashed 
                  ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500/50 bg-[#1a1a1a]'}
                  ${uploadError ? 'border-red-500' : ''}
                  transition-colors duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="coverImage"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                />
                
                {coverPreview ? (
                  <div className="relative w-full h-full group">
                    <img 
                      src={coverPreview} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-2"
                      >
                        Change Image
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label 
                    htmlFor="coverImage" 
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Image className="w-16 h-16 text-blue-500 mb-4" />
                    <p className="text-lg mb-2 text-white">Drag and drop your image here</p>
                    <p className="text-sm text-gray-400 mb-4">or</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Choose File
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                      Supported formats: JPG, PNG, GIF<br />
                      Max file size: 5MB
                    </p>
                  </label>
                )}
              </div>
              
              {uploadError && (
                <p className="mt-2 text-sm text-red-500">{uploadError}</p>
              )}
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