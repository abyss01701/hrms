// src/animations/LogoutAnimation.jsx
import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Power, Check } from "lucide-react";

const LogoutAnimation = ({ darkMode = false, onComplete }) => {
  const overlayRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const primaryColor = darkMode ? "#ef4444" : "#3b82f6";
    const secondaryColor = darkMode ? "#dc2626" : "#8b5cf6";

    /* ---------------------------------------------------------
     * PARTICLE EXPLOSION
     * --------------------------------------------------------- */
    const particleCount = 60;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 10 + 4;
      const color = Math.random() > 0.5 ? primaryColor : secondaryColor;

      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        pointer-events: none;
        z-index: 10001;
        box-shadow: 0 0 ${Math.random() * 30 + 10}px ${color};
      `;
      document.body.appendChild(particle);
      particles.push(particle);
    }

    animate(particles, {
      translateX: () => (Math.random() - 0.5) * window.innerWidth,
      translateY: () => (Math.random() - 0.5) * window.innerHeight,
      rotate: () => Math.random() * 360,
      opacity: [1, 0],
      scale: [1, 0],
      duration: 1500,
      delay: stagger(20),
      easing: "easeOutExpo",
      complete: () => particles.forEach((p) => p.remove())
    });

    /* ---------------------------------------------------------
     * OVERLAY FADE IN
     * --------------------------------------------------------- */
    animate(overlayRef.current, {
      opacity: [0, 1],
      duration: 600,
      easing: "easeInOutQuad"
    });

    /* ---------------------------------------------------------
     * RIPPLE WAVES
     * --------------------------------------------------------- */
    animate(".logout-ripple", {
      scale: [0, 50],
      opacity: [0.6, 0],
      duration: 1500,
      delay: stagger(150),
      easing: "easeOutQuart"
    });

    /* ---------------------------------------------------------
     * MAIN CIRCLE POP
     * --------------------------------------------------------- */
    animate(".logout-main-circle", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: 200,
      easing: "easeOutElastic(1, 0.5)"
    });

    /* ---------------------------------------------------------
     * POWER ICON SPIN IN
     * --------------------------------------------------------- */
    animate(".logout-power-icon", {
      rotate: [0, 180],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 900,
      delay: 500,
      easing: "easeOutBack"
    });

    /* ---------------------------------------------------------
     * TRANSITION POWER → CHECKMARK
     * --------------------------------------------------------- */
    setTimeout(() => {
      animate(".logout-power-icon", {
        scale: [1, 0],
        rotate: [180, 360],
        opacity: [1, 0],
        duration: 400,
        easing: "easeInBack"
      });

      animate(".logout-check-icon", {
        scale: [0, 1],
        rotate: [-180, 0],
        opacity: [0, 1],
        duration: 700,
        delay: 200,
        easing: "easeOutElastic(1, 0.6)"
      });
    }, 1200);

    /* ---------------------------------------------------------
     * TEXT SLIDE IN
     * --------------------------------------------------------- */
    animate(".logout-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 700,
      easing: "easeOutExpo"
    });

    animate(".logout-subtitle", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 900,
      easing: "easeOutExpo"
    });

    /* ---------------------------------------------------------
     * PROGRESS BAR FILL
     * --------------------------------------------------------- */
    animate(".logout-progress-bar", {
      scaleX: [0, 1],
      duration: 1600,
      delay: 1100,
      easing: "easeInOutQuad"
    });

    /* ---------------------------------------------------------
     * SHIMMER EFFECT
     * --------------------------------------------------------- */
    animate(".logout-shimmer", {
      translateX: ["-120%", "200%"],
      duration: 1500,
      delay: 1300,
      easing: "easeInOutQuad"
    });

    /* ---------------------------------------------------------
     * EXIT FADE
     * --------------------------------------------------------- */
    setTimeout(() => {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 700,
        easing: "easeInQuad",
        complete: () => onComplete?.()
      });
    }, 2400);
  }, [darkMode, onComplete]);

  /* ---------------------------------------------------------
   * JSX (unchanged visuals)
   * --------------------------------------------------------- */
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #000000 0%, #1a0000 100%)"
          : "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,20,60,0.95) 100%)",
        backdropFilter: "blur(20px)",
        opacity: 0
      }}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="logout-ripple absolute rounded-full"
          style={{
            width: "120px",
            height: "120px",
            border: `3px solid ${darkMode ? "#ef4444" : "#3b82f6"}`
          }}
        />
      ))}

      <div className="relative flex flex-col items-center">
        {/* Main Circle */}
        <div className="logout-main-circle w-48 h-48 rounded-full flex items-center justify-center relative">
          <div
            className="logout-success-ring absolute inset-0 rounded-full"
            style={{
              border: `4px solid ${darkMode ? "#fca5a5" : "#93c5fd"}`,
              opacity: 0
            }}
          />

          <div className="logout-power-icon absolute">
            <Power size={80} color="white" strokeWidth={2.5} />
          </div>

          <div className="logout-check-icon absolute" style={{ opacity: 0 }}>
            <Check size={80} color="white" strokeWidth={3} />
          </div>

          <div
            className="logout-shimmer absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              transform: "translateX(-120%)"
            }}
          />
        </div>

        <div className="mt-10 text-center">
          <h2 className="logout-title text-4xl font-bold text-white opacity-0">
            Logging Out
          </h2>
          <p className="logout-subtitle text-lg text-gray-300 opacity-0 mt-2">
            Securing your session...
          </p>
        </div>

        <div className="mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="logout-progress-bar h-full rounded-full"
            style={{
              background: darkMode
                ? "linear-gradient(90deg, #dc2626, #ef4444, #fca5a5)"
                : "linear-gradient(90deg, #3b82f6, #8b5cf6, #a78bfa)",
              transformOrigin: "left"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutAnimation;
