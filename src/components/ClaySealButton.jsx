import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

/**
 * ClaySealButton
 * A specialized button component with a "wax seal" aesthetic
 * and a "gold-leaf radial" hover effect.
 */
export default function ClaySealButton({ 
  children, 
  onClick, 
  type = "button", 
  className = "", 
  href,
  variant = 'primary', // 'primary' | 'secondary'
}) {
  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      className={`
        relative overflow-hidden group
        font-heading tracking-[2px] md:tracking-[3px] uppercase text-[11px] md:text-sm
        px-5 py-2 md:px-10 md:py-4 rounded-full border-2 border-gold/40
        min-h-[40px] md:min-h-[44px] whitespace-nowrap
        transition-all duration-500
        ${variant === 'primary' 
          ? 'bg-earth text-parchment' 
          : 'bg-forest text-parchment'}
        ${className}
      `}
    >
      {/* Button Text */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      );
    }
    return (
      <Link to={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}
