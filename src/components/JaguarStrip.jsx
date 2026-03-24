import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import JaguarRosette from './JaguarRosette';

const JaguarStrip = ({ variant = "forest", animate = true, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isForest = variant === "forest";
  const isHero = variant === "hero";
  
  const rosetteColors = isHero ? {
    center: "rgba(212,175,100,0.3)",
    mark: "rgba(212,175,100,0.5)"
  } : isForest ? {
    center: "rgba(212,175,100,0.12)",
    mark: "rgba(212,175,100,0.22)"
  } : {
    center: "rgba(92,52,20,0.08)",
    mark: "rgba(92,52,20,0.15)"
  };

  // Full sizes: [24, 30, 36, 44, 36, 30, 24]
  // Delays: [0.9, 0.6, 0.3, 0, 0.3, 0.6, 0.9]
  const allRosettes = [
    { size: 24, delay: 0.9 },
    { size: 30, delay: 0.6 },
    { size: 36, delay: 0.3 },
    { size: 44, delay: 0.0 },
    { size: 36, delay: 0.3 },
    { size: 30, delay: 0.6 },
    { size: 24, delay: 0.9 },
  ];

  // Mobile: remove outermost two (index 0 and 6)
  const displayRosettes = isMobile ? allRosettes.slice(1, 6) : allRosettes;

  return (
    <div className={`w-full h-8 md:h-12 flex items-center justify-center gap-4 pointer-events-none ${className}`}>
      {displayRosettes.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: r.delay, duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        >
          <JaguarRosette
            size={r.size}
            centerColor={rosetteColors.center}
            markColor={rosetteColors.mark}
            animate={animate}
            animationDelay={r.delay}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default JaguarStrip;
