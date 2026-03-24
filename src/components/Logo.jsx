import React from 'react';
import { Link } from 'react-router-dom';
import logoText from '../assets/logo-text.png';

const Logo = ({ className = "", variant = "navbar", onClick, light = false }) => {
  const isFooter = variant === "footer";
  const isHero = variant === "hero";
  const isStacked = isFooter || isHero;
  
  const containerStyle = isHero
    ? "flex flex-col items-center gap-0"
    : isFooter 
      ? "flex flex-col items-center md:items-start gap-0" 
      : "flex items-center gap-1.5";

  // Use the imported image for the logo
  const logoSrc = logoText;
  
  const logoHeight = isStacked 
    ? "h-12 md:h-16 lg:h-20" 
    : "h-6 md:h-8 lg:h-10";

  return (
    <Link 
      to="/" 
      className={`${containerStyle} ${className} no-underline group`}
      onClick={onClick}
    >
      <img 
        src={logoSrc} 
        alt="Earth Womb Medicine" 
        className={`${logoHeight} w-auto object-contain transition-opacity group-hover:opacity-80`}
        referrerPolicy="no-referrer"
      />
    </Link>
  );
};

export default Logo;
