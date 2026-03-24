import React from 'react';

const JaguarBorder = ({ color = "currentColor", opacity = 0.35, height = 56, className = "" }) => {
  // Rosette pattern: central oval + 5 petals
  const Rosette = ({ x, y }) => (
    <g transform={`translate(${x}, ${y})`}>
      {/* Central oval */}
      <ellipse cx="0" cy="0" rx="8" ry="6" fill={color} transform="rotate(15)" />
      {/* Petals */}
      <ellipse cx="0" cy="-12" rx="5" ry="3.5" fill={color} transform="rotate(-10)" />
      <ellipse cx="12" cy="-5" rx="5" ry="3.5" fill={color} transform="rotate(45)" />
      <ellipse cx="10" cy="10" rx="5" ry="3.5" fill={color} transform="rotate(-30)" />
      <ellipse cx="-10" cy="10" rx="5" ry="3.5" fill={color} transform="rotate(30)" />
      <ellipse cx="-12" cy="-5" rx="5" ry="3.5" fill={color} transform="rotate(-45)" />
    </g>
  );

  const spacing = 80;
  const repeats = Math.ceil(800 / spacing) + 1;

  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 800 56"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Center Line */}
      <line x1="0" y1="28" x2="800" y2="28" stroke={color} strokeWidth="1" opacity="0.2" />
      
      {[...Array(repeats)].map((_, i) => (
        <React.Fragment key={i}>
          <Rosette x={spacing * i} y={28} />
          <circle cx={spacing * i + spacing / 2} cy={28} r="3" fill={color} />
        </React.Fragment>
      ))}
    </svg>
  );
};

export default JaguarBorder;
