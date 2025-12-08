import React, { useEffect, useState } from 'react';
import { LogOut, Check } from 'lucide-react';

const LogoutAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('fadeIn'); // fadeIn -> logout -> complete -> fadeOut

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('logout'), 300);
    const timer2 = setTimeout(() => setStage('complete'), 1200);
    const timer3 = setTimeout(() => setStage('fadeOut'), 1800);
    const timer4 = setTimeout(() => onComplete && onComplete(), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        stage === 'fadeIn' ? 'opacity-0' : stage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40" />
        
        {/* Pulsing orbs */}
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl transition-all duration-1000 ${
            stage === 'logout' || stage === 'complete' ? 'scale-150 opacity-60' : 'scale-100 opacity-30'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl transition-all duration-1000 ${
            stage === 'logout' || stage === 'complete' ? 'scale-150 opacity-60' : 'scale-100 opacity-30'
          }`}
          style={{ transitionDelay: '100ms' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Icon container */}
        <div
          className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/50 transition-all duration-500 ${
            stage === 'logout' ? 'scale-110 rotate-12' : stage === 'complete' ? 'scale-100 rotate-0' : 'scale-95'
          }`}
        >
          {/* Outer ring animation */}
          <div
            className={`absolute inset-0 rounded-full border-4 border-purple-400 transition-all duration-700 ${
              stage === 'logout' || stage === 'complete' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full border-4 border-pink-400 transition-all duration-700 ${
              stage === 'logout' || stage === 'complete' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{ transitionDelay: '150ms' }}
          />

          {/* Icon transition */}
          {stage !== 'complete' ? (
            <LogOut
              className={`w-10 h-10 text-white transition-all duration-500 ${
                stage === 'logout' ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <Check
              className="w-12 h-12 text-white animate-in zoom-in duration-300"
            />
          )}
        </div>

        {/* Text */}
        <div className="text-center">
          <h2
            className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-500 ${
              stage === 'fadeIn' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {stage === 'complete' ? 'See You Soon!' : 'Logging Out...'}
          </h2>
          
          {/* Loading dots */}
          {stage !== 'complete' && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animationDuration: '600ms',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          className={`w-64 h-1 bg-gray-800 rounded-full overflow-hidden transition-all duration-300 ${
            stage === 'fadeIn' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            className={`h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] rounded-full transition-all duration-1000 ease-out ${
              stage === 'logout' ? 'w-2/3' : stage === 'complete' ? 'w-full' : 'w-1/3'
            }`}
            style={{
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </div>
      </div>

      {/* CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoutAnimation;