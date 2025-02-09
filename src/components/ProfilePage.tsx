import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, BookOpen, Settings, BarChart2, User, Camera, Mail, Lock, Globe, Bell, Trash2 } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  website: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
  };
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'April-ntt',
    email: 'april@example.com',
    bio: 'Writer passionate about fantasy and science fiction. Creating immersive worlds one story at a time.',
    website: 'https://april-writes.com',
    language: 'English',
    notifications: {
      email: true,
      push: true,
      updates: false,
    },
    subscription: {
      plan: 'Premium',
      status: 'Active',
      nextBilling: '2024-04-15'
    }
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'subscription'>('profile');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: keyof typeof profileData.notifications) => {
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [key]: !profileData.notifications[key]
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data saved:', profileData);
    // Here you would typically send the data to your backend
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
  };

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
          <Link to="/projects" className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg">
            <BarChart2 className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link to="/settings" className="flex items-center px-3 py-2 bg-[#2a2a2a] text-white rounded-lg">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        {/* User Profile */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="ml-3">
              <div className="font-medium">{profileData.name}</div>
              <div className="text-sm text-gray-400">{profileData.subscription.plan} User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-semibold mb-8">Profile Settings</h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'security' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'preferences' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'subscription' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Subscription
            </button>
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-gray-400">PNG, JPG up to 2MB</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0f0f0f] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0f0f0f] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-[#0f0f0f] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0f0f0f] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex items-center mb-4">
                  <Lock className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-medium">Password</h3>
                </div>
                <p className="text-gray-400 mb-4">Last changed 3 months ago</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Change Password
                </button>
              </div>

              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                </div>
                <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex items-center mb-4">
                  <Trash2 className="w-5 h-5 mr-2 text-red-500" />
                  <h3 className="text-lg font-medium">Delete Account</h3>
                </div>
                <p className="text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex items-center mb-4">
                  <Globe className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-medium">Language</h3>
                </div>
                <select
                  value={profileData.language}
                  onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1a1a] rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                </select>
              </div>

              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex items-center mb-4">
                  <Bell className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-medium">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="w-4 h-4 mr-2"
                    />
                    Email notifications
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      className="w-4 h-4 mr-2"
                    />
                    Push notifications
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.updates}
                      onChange={() => handleNotificationChange('updates')}
                      className="w-4 h-4 mr-2"
                    />
                    Product updates
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                    <p className="text-2xl font-bold text-blue-500">{profileData.subscription.plan}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
                    {profileData.subscription.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Next billing date</span>
                    <span>{profileData.subscription.nextBilling}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-gray-700 rounded mr-4"></div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-400">Expires 12/24</p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-400">Edit</button>
                </div>
                <button className="text-blue-500 hover:text-blue-400">
                  + Add new payment method
                </button>
              </div>

              <div className="p-6 bg-[#0f0f0f] rounded-lg">
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-gray-400">March 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$19.99</p>
                      <button className="text-sm text-blue-500 hover:text-blue-400">Download</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-gray-400">February 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$19.99</p>
                      <button className="text-sm text-blue-500 hover:text-blue-400">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] w-full max-w-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;