import React from 'react';
import { motion } from 'motion/react';
import JaguarRosette from './JaguarRosette';

const VineDivider = ({ variant = 'forest', className = "my-10", svgClassName = "" }) => {
  const isForest = variant === 'forest';
  const opacity = isForest ? 0.6 : 0.4;
  const color = "#D4AF64";

  const rosetteColors = isForest ? {
    center: "rgba(212,175,100,0.12)",
    mark: "rgba(212,175,100,0.22)"
  } : {
    center: "rgba(92,52,20,0.08)",
    mark: "rgba(92,52,20,0.15)"
  };

  // SVG Path for the vine
  const vinePath = "M0 20 C 100 10, 200 30, 300 20 S 500 10, 600 20";

  // Leaf motifs
  const leftLeaf = "M145 20 L135 10 M145 20 L130 20 M145 20 L135 30";
  const rightLeaf = "M455 20 L465 10 M455 20 L470 20 M455 20 L465 30";

  return (
    <div className={`w-full flex justify-center px-6 relative ${className}`}>
      <div className="relative w-full max-w-[280px] md:max-w-[600px]">
        <motion.svg
          viewBox="0 0 600 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto overflow-visible ${svgClassName}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Vine Path */}
          <motion.path
            d={vinePath}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={opacity}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: opacity,
                transition: { duration: 1.4, ease: "easeOut" }
              }
            }}
          />

          {/* Left Leaf */}
          <motion.path
            d={leftLeaf}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={opacity}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: opacity,
                transition: { delay: 1.4, duration: 0.3 }
              }
            }}
          />

          {/* Right Leaf */}
          <motion.path
            d={rightLeaf}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={opacity}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: opacity,
                transition: { delay: 1.4, duration: 0.3 }
              }
            }}
          />

          {/* Center Rosette */}
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: opacity, 
                scale: 1,
                transition: { delay: 1.4, duration: 0.3 }
              }
            }}
            style={{ originX: "300px", originY: "20px" }}
          >
            {/* Central spot */}
            <circle cx="300" cy="20" r="3" fill={color} fillOpacity={opacity} />
            {/* Surrounding spots */}
            <circle cx="300" cy="12" r="1.5" fill={color} fillOpacity={opacity} />
            <circle cx="300" cy="28" r="1.5" fill={color} fillOpacity={opacity} />
            <circle cx="292" cy="16" r="1.5" fill={color} fillOpacity={opacity} />
            <circle cx="308" cy="16" r="1.5" fill={color} fillOpacity={opacity} />
            <circle cx="292" cy="24" r="1.5" fill={color} fillOpacity={opacity} />
            <circle cx="308" cy="24" r="1.5" fill={color} fillOpacity={opacity} />
          </motion.g>
        </motion.svg>

        {/* Flanking Jaguar Rosettes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Flanking Rosette */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: 'calc(50% - 80px)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 1.4, duration: 0.5 }
            }}
            viewport={{ once: true }}
          >
            <JaguarRosette 
              size={28}
              centerColor={rosetteColors.center}
              markColor={rosetteColors.mark}
              animate={true}
              animationDelay={0.5}
              className="-translate-x-1/2"
            />
          </motion.div>

          {/* Right Flanking Rosette */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: 'calc(50% + 80px)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 1.4, duration: 0.5 }
            }}
            viewport={{ once: true }}
          >
            <JaguarRosette 
              size={28}
              centerColor={rosetteColors.center}
              markColor={rosetteColors.mark}
              animate={true}
              animationDelay={1.2}
              className="-translate-x-1/2"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VineDivider;
