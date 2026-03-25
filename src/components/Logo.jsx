import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", variant = "navbar", onClick, light = false }) => {
  const isFooter = variant === "footer";
  const isHero = variant === "hero";
  const isStacked = isFooter || isHero;
  
  const containerStyle = isHero
    ? "flex flex-col items-center gap-0"
    : isFooter 
      ? "flex flex-col items-center md:items-start gap-0" 
      : "flex items-center gap-1.5";

  // Use the ImageKit URL for the logo
  const logoSrc = "https://ik.imagekit.io/eufixlduid/logo-text.png";
  
  const logoHeight = isStacked 
    ? "h-12 md:h-16 lg:h-20" 
    : "h-10 md:h-8 lg:h-10";

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
