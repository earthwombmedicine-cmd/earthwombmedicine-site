import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const JaguarRosette = ({ 
  size = 60, 
  centerColor = "rgba(212,175,100,0.15)", 
  markColor = "rgba(212,175,100,0.25)", 
  opacity = 1,
  animate = false,
  duration = 5,
  animationDelay,
  className = "" 
}) => {
  // Random delay for independent pulsing if not provided
  const pulseDelay = useMemo(() => animationDelay !== undefined ? animationDelay : Math.random() * 4, [animationDelay]);

  // Irregular blob path generator helper (simplified organic shape)
  const getBlobPath = (cx, cy, rx, ry) => {
    // A simple 4-point bezier loop to create an irregular oval
    return `
      M ${cx} ${cy - ry}
      C ${cx + rx * 1.2} ${cy - ry * 0.8}, ${cx + rx * 0.8} ${cy + ry * 1.2}, ${cx} ${cy + ry}
      C ${cx - rx * 0.8} ${cy + ry * 1.2}, ${cx - rx * 1.2} ${cy - ry * 0.8}, ${cx} ${cy - ry}
      Z
    `;
  };

  const marks = [
    { cx: 30, cy: 14, rx: 5, ry: 3.5, rotate: 10 },
    { cx: 43, cy: 20, rx: 4.5, ry: 3, rotate: 35 },
    { cx: 47, cy: 32, rx: 4, ry: 3, rotate: 80 },
    { cx: 41, cy: 44, rx: 4.5, ry: 3, rotate: -30 },
    { cx: 29, cy: 48, rx: 5, ry: 3.5, rotate: 5 },
    { cx: 15, cy: 32, rx: 4, ry: 3, rotate: -70 },
    { cx: 19, cy: 19, rx: 4.5, ry: 3, rotate: -40 },
  ];

  const animationProps = animate ? {
    animate: {
      scale: [1, 1.06, 1],
    },
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: pulseDelay
    }
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        opacity,
        willChange: animate ? 'transform' : 'auto'
      }}
      aria-hidden="true"
      {...animationProps}
    >
      {/* Center Oval */}
      <ellipse 
        cx="30" 
        cy="30" 
        rx="7" 
        ry="5" 
        fill={centerColor} 
        transform="rotate(-15 30 30)" 
      />

      {/* Outer Marks */}
      {marks.map((mark, i) => (
        <path
          key={i}
          d={getBlobPath(mark.cx, mark.cy, mark.rx, mark.ry)}
          fill={markColor}
          transform={`rotate(${mark.rotate} ${mark.cx} ${mark.cy})`}
        />
      ))}
    </motion.svg>
  );
};

export default JaguarRosette;
