import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import JaguarRosette from './JaguarRosette';

const JaguarPrintField = ({ 
  count: initialCount = 16, 
  mobileCount,
  variant = "forest", 
  avoidCenter = false,
  edgeBias = false,
  opacity: globalOpacity = 1.0,
  animate = true,
  parallaxY, // Framer Motion value for parallax
  className = "" 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const count = isMobile ? (mobileCount || 8) : initialCount;
  const maxSize = isMobile ? 60 : 90;
  const minSize = 40;

  // Simple deterministic pseudo-random based on seed
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const colorPresets = {
    forest: {
      centerColor: "rgba(212,175,100,0.12)",
      markColor: "rgba(212,175,100,0.22)"
    },
    parchment: {
      centerColor: "rgba(92,52,20,0.08)",
      markColor: "rgba(92,52,20,0.15)"
    },
    hero: {
      centerColor: "rgba(212,175,100,0.3)",
      markColor: "rgba(212,175,100,0.5)"
    }
  };

  const colors = colorPresets[variant] || colorPresets.forest;

  const rosettes = useMemo(() => {
    const items = [];
    const minClearance = 15; // Percentage-based clearance to avoid overlap

    for (let i = 0; i < count; i++) {
      let x, y, size, rotation, opacity, tooClose;
      let attempts = 0;

      do {
        tooClose = false;
        
        if (edgeBias) {
          const biasRoll = seededRandom(i * 999.99 + attempts);
          if (biasRoll < 0.7) {
            // 70% in edges (0-25% or 75-100%)
            const sideRoll = seededRandom(i * 888.88 + attempts);
            if (sideRoll < 0.5) {
              x = seededRandom(i * 123.45 + attempts) * 25;
            } else {
              x = 75 + seededRandom(i * 123.45 + attempts) * 25;
            }
          } else {
            // 30% scatter freely in the center (25-75%)
            x = 25 + seededRandom(i * 123.45 + attempts) * 50;
          }
        } else {
          x = seededRandom(i * 123.45 + attempts) * 100;
        }

        y = seededRandom(i * 678.90 + attempts) * 100;
        
        // If avoidCenter is true, try to keep rosettes away from the middle area
        if (avoidCenter) {
          const centerX = 50;
          const centerY = 50;
          const dx = x - centerX;
          const dy = y - centerY;
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);
          
          // Avoid the central 60% of the container
          if (distFromCenter < 35) {
            tooClose = true;
          }
        }

        if (!tooClose) {
          size = minSize + seededRandom(i * 111.11 + attempts) * (maxSize - minSize);
          rotation = seededRandom(i * 222.22 + attempts) * 360;
          opacity = 0.6 + seededRandom(i * 333.33 + attempts) * 0.4;

          // Check clearance with existing items
          for (const item of items) {
            const dx = x - item.x;
            const dy = y - item.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minClearance) {
              tooClose = true;
              break;
            }
          }
        }
        attempts++;
      } while (tooClose && attempts < 20);

      if (!tooClose || attempts >= 20) {
        items.push({ x, y, size, rotation, opacity });
      }
    }
    return items;
  }, [count, maxSize, avoidCenter, edgeBias]);

  return (
    <motion.div 
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ y: parallaxY }}
    >
      {rosettes.map((r, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            transform: `translate(-50%, -50%) rotate(${r.rotation}deg)`,
          }}
        >
          <JaguarRosette
            size={r.size}
            centerColor={colors.centerColor}
            markColor={colors.markColor}
            opacity={r.opacity * globalOpacity}
            animate={isMobile ? false : animate}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default JaguarPrintField;
