import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

const JaguarEyes = ({ 
  size = "md", 
  interactive = false, 
  variant = "forest", 
  className = "",
  opacity = 1 
}) => {
  const [hasWoken, setHasWoken] = useState(false);
  const containerRef = useRef(null);
  
  const leftEyeControls = useAnimation();
  const rightEyeControls = useAnimation();
  const pupilControls = useAnimation();

  // Size mapping
  const sizes = {
    sm: { width: 20, height: 10, gap: 8 },
    md: { width: 36, height: 18, gap: 12 },
    lg: { width: 56, height: 28, gap: 20 },
    huge: { width: 'min(220px, 25vw)', height: 'min(110px, 12.5vw)', gap: 'min(80px, 8vw)' }
  };
  
  // Support legacy numeric size if passed
  let currentSize;
  if (typeof size === 'number') {
    if (size < 50) currentSize = sizes.sm;
    else if (size < 150) currentSize = sizes.md;
    else if (size < 300) currentSize = sizes.lg;
    else currentSize = sizes.huge;
  } else {
    currentSize = sizes[size] || sizes.md;
  }

  // Passive Blink Logic
  useEffect(() => {
    let timer;

    const blink = async () => {
      // Start both at the same time
      await Promise.all([
        leftEyeControls.start({
          scaleY: [1, 0.05, 1],
          transition: { duration: 0.18, ease: "easeInOut" }
        }),
        rightEyeControls.start({
          scaleY: [1, 0.05, 1],
          transition: { duration: 0.18, ease: "easeInOut" }
        })
      ]);
    };

    const scheduleBlink = () => {
      const delay = Math.random() * 1000 + 2500; // 2.5-3.5 seconds (avg 3s)
      timer = setTimeout(() => {
        blink();
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();

    return () => clearTimeout(timer);
  }, [leftEyeControls, rightEyeControls]);

  // Scroll Blink Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasWoken) {
          triggerWakeBlink();
          setHasWoken(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasWoken]);

  const triggerWakeBlink = async () => {
    // Both eyes blink together
    const blinkPromise = Promise.all([
      leftEyeControls.start({
        scaleY: [1, 0.05, 1],
        transition: { duration: 0.18, ease: "easeInOut" }
      }),
      rightEyeControls.start({
        scaleY: [1, 0.05, 1],
        transition: { duration: 0.18, ease: "easeInOut" }
      })
    ]);
    
    // Pupils dilate
    const pupilPromise = pupilControls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.4, ease: "easeOut" }
    });

    await Promise.all([blinkPromise, pupilPromise]);
  };

  const id = React.useId().replace(/:/g, '');

  return (
    <div 
      ref={containerRef}
      className={`flex flex-row items-center justify-center whitespace-nowrap ${className}`}
      style={{ gap: currentSize.gap, opacity }}
    >
      <Eye 
        id={`${id}-left`}
        controls={leftEyeControls} 
        pupilControls={pupilControls}
        size={currentSize}
        interactive={interactive}
        variant={variant}
      />
      <Eye 
        id={`${id}-right`}
        controls={rightEyeControls} 
        pupilControls={pupilControls}
        size={currentSize}
        interactive={interactive}
        variant={variant}
      />
    </div>
  );
};

const Eye = ({ id, controls, pupilControls, size, interactive, variant }) => {
  const isForest = variant === "forest";

  return (
    <div
      className="relative"
      style={{
        width: size.width,
        height: size.height,
      }}
      onMouseEnter={() => {
        if (interactive) {
          pupilControls.start({
            scale: 1.15,
            transition: { duration: 0.6 }
          });
        }
      }}
      onMouseLeave={() => {
        if (interactive) {
          pupilControls.start({
            scale: 1,
            transition: { duration: 0.6 }
          });
        }
      }}
    >
      {/* Glow for interactive state */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gold/30 blur-md -z-10"
          animate={{
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <motion.svg
        viewBox="0 0 100 50"
        className={`w-full h-full overflow-visible ${isForest ? 'drop-shadow-[0_0_8px_rgba(212,175,100,0.6)]' : 'drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]'}`}
        animate={controls}
      >
        <defs>
          <radialGradient id={`iris-grad-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF64" />
            <stop offset="100%" stopColor="#C17F24" />
          </radialGradient>
        </defs>

        {/* Eye Shape / Iris */}
        <path
          d="M0 25C20 0 80 0 100 25C80 50 20 50 0 25Z"
          fill={`url(#iris-grad-${id})`}
          stroke="#D4AF64"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />

        {/* Pupil */}
        <motion.ellipse
          cx="50"
          cy="25"
          rx="4"
          ry="15"
          fill="#050505"
          animate={pupilControls}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    </div>
  );
};

export default JaguarEyes;
