import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-sm p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">✍️ WriteWhisper</h2>
          <p className="text-base mt-2">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-gray-500">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <button className="text-sm text-blue-500 font-medium">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;