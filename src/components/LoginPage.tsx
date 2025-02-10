import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenLine, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { loginWithEmail } from '../firebase.ts';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { user, error: loginError } = await loginWithEmail(email, password);
      
      if (loginError) {
        setError(loginError);
      } else if (user) {
        // Successful login
        navigate('/create-novel');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-500 max-w-3xl mx-auto flex">
        {/* Left side - Image */}
        <div className="w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80"
            alt="Decorative"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Close button */}
            <div className="flex justify-end mb-6">
              <Link to="/" className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl">×</span>
              </Link>
            </div>

            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <PenLine className="h-5 w-5 text-gray-700" />
                <span className="font-medium text-gray-700">WriteWhisper</span>
              </div>
              <h2 className="text-2xl font-medium text-gray-800">Welcome back!</h2>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Email address"
                required
                disabled={isLoading}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-gray-500 hover:text-gray-700">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="mb-4">or continue with</p>
              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                  <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-600">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;