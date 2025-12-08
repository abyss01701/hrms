import React, { useState, useEffect, useRef } from 'react';
import { Crown, Zap, Shield, Lock, Sparkles, TrendingUp, Award, Star } from 'lucide-react';

const WelcomeAnimation = ({ onComplete }) => {
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const orbitRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const ringsRef = useRef(null);
  const shimmerRef = useRef(null);

  useEffect(() => {
    if (window.anime) {
      setAnimeLoaded(true);
      startAnimation();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.async = true;
    script.onload = () => {
      setAnimeLoaded(true);
      startAnimation();
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const startAnimation = () => {
    const anime = window.anime;
    if (!anime) return;

    // Master timeline
    const masterTimeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    // 1. Expanding rings entrance
    masterTimeline.add({
      targets: ringsRef.current?.querySelectorAll('.ring'),
      scale: [0, 1],
      opacity: [0, 1],
      rotate: ['180deg', '0deg'],
      duration: 1400,
      delay: anime.stagger(150, { from: 'center' }),
      easing: 'spring(1, 80, 10, 0)'
    }, 0);

    // 2. Logo entrance with bounce
    masterTimeline.add({
      targets: logoRef.current,
      scale: [0, 1.2, 1],
      rotate: ['720deg', '0deg'],
      opacity: [0, 1],
      duration: 1800,
      easing: 'easeOutElastic(1, .6)'
    }, 300);

    // 3. Logo glow pulse
    masterTimeline.add({
      targets: logoRef.current?.querySelector('.logo-glow'),
      scale: [1, 1.4, 1],
      opacity: [0, 0.8, 0],
      duration: 1200,
      easing: 'easeInOutQuad',
      loop: 2
    }, 800);

    // 4. Orbiting particles
    masterTimeline.add({
      targets: orbitRef.current?.querySelectorAll('.orbit-particle'),
      translateX: (el, i) => {
        const angle = (i * 360) / 8;
        return Math.cos((angle * Math.PI) / 180) * 100;
      },
      translateY: (el, i) => {
        const angle = (i * 360) / 8;
        return Math.sin((angle * Math.PI) / 180) * 100;
      },
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(80),
      easing: 'easeOutExpo'
    }, 600);

    // Keep orbiting
    anime({
      targets: orbitRef.current?.querySelectorAll('.orbit-particle'),
      rotate: '360deg',
      duration: 20000,
      loop: true,
      easing: 'linear'
    });

    // 5. Title reveal with split animation
    masterTimeline.add({
      targets: titleRef.current?.querySelectorAll('.title-word'),
      translateY: [100, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      rotateX: [90, 0],
      duration: 1000,
      delay: anime.stagger(120),
      easing: 'easeOutExpo'
    }, 1200);

    // 6. Shimmer sweep effect
    masterTimeline.add({
      targets: shimmerRef.current,
      translateX: ['-100%', '200%'],
      duration: 1200,
      easing: 'easeInOutQuad'
    }, 1400);

    // 7. Subtitle fade in
    masterTimeline.add({
      targets: subtitleRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad'
    }, 1800);

    // 8. Stats cards cascade
    masterTimeline.add({
      targets: statsRef.current?.querySelectorAll('.stat-card'),
      translateY: [80, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      rotateY: [45, 0],
      duration: 900,
      delay: anime.stagger(100, { from: 'center' }),
      easing: 'easeOutExpo'
    }, 2200);

    // 9. Stat numbers count up
    statsRef.current?.querySelectorAll('.stat-number').forEach((el, i) => {
      const endValue = el.getAttribute('data-value');
      anime({
        targets: el,
        innerHTML: [0, endValue],
        duration: 2000,
        delay: 2400 + (i * 100),
        round: 1,
        easing: 'easeOutExpo'
      });
    });

    // 10. Exit sequence
    anime({
      targets: containerRef.current,
      scale: [1, 1.05],
      duration: 400,
      delay: 5000,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: containerRef.current,
          opacity: [1, 0],
          scale: [1.05, 0.98],
          filter: ['blur(0px)', 'blur(10px)'],
          duration: 600,
          easing: 'easeInQuad',
          complete: () => {
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 100);
          }
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000]">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 via-transparent to-amber-900/20 animate-pulse" 
             style={{ animationDuration: '3s' }} />
        
        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Sophisticated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(239,68,68,0.5) 1px, transparent 1px),
            linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 50px 50px',
          backgroundPosition: '0 0, 0 0, 0 0'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        
        {/* Expanding rings */}
        <div ref={ringsRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                borderColor: `rgba(239, 68, 68, ${0.2 - i * 0.04})`,
                borderWidth: '2px'
              }}
            />
          ))}
        </div>

        {/* Logo with orbiting particles */}
        <div className="relative mb-12">
          {/* Orbit container */}
          <div ref={orbitRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="orbit-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-amber-500 rounded-full shadow-lg shadow-red-500/50" />
              </div>
            ))}
          </div>

          {/* Main logo */}
          <div ref={logoRef} className="relative opacity-0">
            <div className="logo-glow absolute inset-0 bg-gradient-to-br from-red-600 to-amber-600 rounded-3xl blur-3xl opacity-0" 
                 style={{ transform: 'scale(1.5)' }} />
            
            <div className="relative w-40 h-40 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-red-500/30 backdrop-blur-xl">
              {/* Inner glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-red-500/20 to-transparent rounded-2xl" />
              
              <Crown className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
              
              {/* Corner accents */}
              <div className="absolute top-2 right-2">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div className="absolute bottom-2 left-2">
                <Star className="w-5 h-5 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Title with shimmer effect */}
        <div className="relative mb-6 overflow-hidden">
          <div ref={titleRef} className="flex gap-4 relative z-10">
            {['Executive', 'Access'].map((word, i) => (
              <span
                key={i}
                className="title-word text-6xl md:text-8xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent opacity-0"
                style={{
                  textShadow: '0 0 80px rgba(239,68,68,0.3)',
                  fontWeight: 900
                }}
              >
                {word}
              </span>
            ))}
          </div>
          
          {/* Shimmer sweep */}
          <div ref={shimmerRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 pointer-events-none" 
               style={{ width: '100%', transform: 'skewX(-20deg)' }} />
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-16 text-center opacity-0">
          <p className="text-2xl md:text-3xl text-red-400 font-semibold flex items-center justify-center gap-3 mb-2">
            <Shield className="w-7 h-7 text-red-500" />
            Premium Dashboard Portal
            <Lock className="w-7 h-7 text-amber-500" />
          </p>
          <p className="text-gray-500 text-lg">Establishing secure connection...</p>
        </div>

        {/* Stats cards */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl">
          {[
            { icon: TrendingUp, label: 'Active Users', value: '2847', color: 'from-red-600 to-red-700', iconColor: 'text-red-400' },
            { icon: Award, label: 'Premium Tier', value: '99', suffix: '%', color: 'from-amber-600 to-amber-700', iconColor: 'text-amber-400' },
            { icon: Zap, label: 'Uptime', value: '99.9', suffix: '%', color: 'from-red-700 to-red-800', iconColor: 'text-red-300' },
            { icon: Star, label: 'Rating', value: '4.9', suffix: '/5', color: 'from-amber-700 to-red-700', iconColor: 'text-amber-300' }
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-card opacity-0 relative group"
            >
              {/* Card glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-red-900/30 shadow-2xl hover:border-red-600/50 transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg border border-red-800/30 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} strokeWidth={2} />
                </div>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span 
                    className="stat-number text-3xl font-bold text-white"
                    data-value={stat.value}
                  >
                    0
                  </span>
                  {stat.suffix && (
                    <span className="text-xl text-gray-400">{stat.suffix}</span>
                  )}
                </div>
                
                <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading progress bar */}
        <div className="mt-16 w-80 h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-full shadow-lg relative"
            style={{
              animation: 'premiumLoad 5.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              boxShadow: '0 0 30px rgba(239,68,68,0.8), inset 0 0 10px rgba(255,255,255,0.3)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes premiumLoad {
          0% { width: 0%; }
          15% { width: 25%; }
          35% { width: 45%; }
          55% { width: 65%; }
          75% { width: 85%; }
          90% { width: 95%; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, 5px); }
          75% { transform: translate(15px, 10px); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;