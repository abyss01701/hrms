import React, { useEffect, useRef } from "react";

const LoginSuccessAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const glowRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    // Overlay fade-in
    containerRef.current.style.animation = "fadeIn 0.3s ease-out forwards";

    // Icon pop + glow
    iconRef.current.style.animation = "popIn 0.7s ease-out forwards";

    // Glow pulse ring
    glowRef.current.style.animation = "glowPulse 1.2s ease-out forwards";

    // Sweep light streak
    sweepRef.current.style.animation = "sweep 0.9s ease-out 0.2s forwards";

    // Fade-out exit
    const timer = setTimeout(() => {
      containerRef.current.style.animation = "fadeOut 0.5s ease-in forwards";
      setTimeout(() => {
        onComplete && onComplete();
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/98 backdrop-blur-xl flex items-center justify-center z-[9999]"
      style={{ opacity: 0 }}
    >
      {/* Glow ripple */}
      <div
        ref={glowRef}
        className="absolute w-40 h-40 bg-gradient-to-br from-purple-500/60 to-pink-500/60 rounded-full blur-3xl"
        style={{ transform: "scale(0.6)", opacity: 0.8 }}
      />

      {/* Icon */}
      <div
        ref={iconRef}
        className="relative w-28 h-28 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl
                   flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-pink-500/30 overflow-hidden"
        style={{ transform: "scale(0.2) rotate(-20deg)" }}
      >
        ✓

        {/* sweep streak */}
        <div
          ref={sweepRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 blur-md"
          style={{ transform: "translateX(-50%)", opacity: 0 }}
        />
      </div>

      {/* Success text */}
      <p className="absolute bottom-28 text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent tracking-wide">
        Welcome Back
      </p>

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes popIn {
          0% { transform: scale(0.2) rotate(-20deg); }
          60% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes glowPulse {
          from { transform: scale(0.6); opacity: 0.8; }
          to { transform: scale(2.2); opacity: 0; }
        }

        @keyframes sweep {
          0% { transform: translateX(-50%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(150%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoginSuccessAnimation;
