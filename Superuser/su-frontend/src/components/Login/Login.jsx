import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import WelcomeAnimation from '../../pages/SuperAdmin/animations/WelcomeAnimation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [playLoginAnimation, setPlayLoginAnimation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { user, accessToken } = await loginUser(email, password);

      if (!accessToken) {
        throw new Error("Server did not return a token");
      }

      localStorage.setItem("accessToken", accessToken);

      // Start the animation - navigation will happen in onComplete
      setPlayLoginAnimation(true);
      
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setErrorMessage(err?.response?.data?.message || err.message);
      setIsLoading(false); // Only set loading to false on error
    }
  };

  // Handle animation completion
  const handleAnimationComplete = () => {
    navigate("/superadmin/companies");
  };

  // If animation is playing, show only the animation
  if (playLoginAnimation) {
    return (
      <WelcomeAnimation 
        onComplete={handleAnimationComplete} 
      />
    );
  }

  // Otherwise show the login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl border border-red-200/50 p-8 md:p-10">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4 shadow-lg shadow-red-500/40">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-lg opacity-0 transition duration-300 blur"></div>
              <div className="relative bg-white/60 rounded-lg backdrop-blur border border-red-200 transition duration-300">
                <div className="flex items-center px-4 py-3">
                  <Mail className="w-5 h-5 text-gray-400 transition" />
                  <input
                    id='email'
                    name='Email'
                    type="email"
                    autoComplete='email'
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 ml-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-lg opacity-0 transition duration-300 blur"></div>
              <div className="relative bg-white/60 rounded-lg backdrop-blur border border-red-200 transition duration-300">
                <div className="flex items-center px-4 py-3">
                  <Lock className="w-5 h-5 text-gray-400 transition" />
                  <input
                    id='password'
                    name='Password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 ml-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-red-600" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-red-600 hover:text-red-700 transition font-medium">Forgot password?</a>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/40"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
            <span className="px-3 text-sm text-gray-600">Or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-red-300 to-transparent"></div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 px-4 rounded-lg bg-white/60 border border-red-200 hover:border-red-400 hover:bg-red-50 transition text-gray-900 font-medium text-sm">
              Google
            </button>
            <button className="py-2 px-4 rounded-lg bg-white/60 border border-red-200 hover:border-red-400 hover:bg-red-50 transition text-gray-900 font-medium text-sm">
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account? <a href="#" className="text-red-600 hover:text-red-700 transition font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}