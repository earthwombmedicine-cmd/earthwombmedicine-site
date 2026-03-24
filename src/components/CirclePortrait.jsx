import React from 'react';
import { motion } from 'motion/react';

const CirclePortrait = ({ src, name, className = "", blank = false }) => {
  const initial = name ? name.charAt(0) : "";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`relative flex-shrink-0 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] rounded-full border-2 border-gold shadow-[0_0_12px_rgba(212,175,100,0.3)] overflow-hidden bg-forest flex items-center justify-center ${className}`}
    >
      {src && !blank ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      {!blank && (
        <div 
          className={`w-full h-full flex items-center justify-center font-heading text-gold text-xl md:text-2xl ${src ? 'hidden' : 'flex'}`}
        >
          {initial}
        </div>
      )}
    </motion.div>
  );
};

export default CirclePortrait;
