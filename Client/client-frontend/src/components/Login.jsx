import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginSuccessAnimation from "../animations/LoginAnimation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginAnimation, setLoginAnimation] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        credentials: "include", // IMPORTANT for cookie auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ SAVE TOKENS TO LOCALSTORAGE
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Success – show animation
      setLoginAnimation(true);

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Animation overlay */}
      {showLoginAnimation && (
        <LoginSuccessAnimation
          onComplete={() => navigate("/")}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        </div>

        {/* Login card */}
        <div className="relative w-full max-w-md">

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-5xl font-black tracking-tight mb-2">
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                HRMS
              </span>
              <span className="text-white"> Portal</span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm">
                Sign in to continue to your account
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-center mb-4 text-sm">
                {error}
              </p>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-indigo-500"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg text-white font-semibold disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;