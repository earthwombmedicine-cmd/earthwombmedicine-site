import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ClaySealButton from './ClaySealButton';
import JaguarEyes from './JaguarEyes';
import JaguarRosette from './JaguarRosette';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // Scroll and Resize detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollPos > 10);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { to: '/my-story', label: 'My Story' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/transformation-stories', label: 'Transformation Stories' },
    { to: '/offerings', label: 'Offerings' },
    { to: '/connect', label: 'Connect' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? (isMobile ? 'rgba(1, 26, 20, 0.4)' : 'rgba(1, 26, 20, 0.96)') : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          paddingTop: 'env(safe-area-inset-top)',
        }}
        className="h-auto"
      >
        <div 
          className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[64px] md:h-[64px] lg:h-[72px] gap-6 relative"
        >
          {/* Subtle Jaguar Accents (Scrolled state only) */}
          {scrolled && (
            <>
              <div className="hidden md:block absolute left-[50px] top-1/2 -translate-y-1/2 pointer-events-none">
                <JaguarRosette 
                  size={18} 
                  centerColor="rgba(212,175,100,0.12)" 
                  markColor="rgba(212,175,100,0.22)" 
                  opacity={0.15}
                  animate={true} 
                  duration={2} 
                />
              </div>
              <div className="hidden md:block absolute right-[200px] top-1/2 -translate-y-1/2 pointer-events-none">
                <JaguarRosette 
                  size={18} 
                  centerColor="rgba(212,175,100,0.12)" 
                  markColor="rgba(212,175,100,0.22)" 
                  opacity={0.15}
                  animate={true} 
                  duration={2} 
                />
              </div>
            </>
          )}

          {/* LOGO - LEFT SIDE */}
          <Logo variant="navbar" light={true} />

          {/* Center Nav Links - CENTER (desktop only) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 flex-1 justify-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "'Alegreya', serif",
                  fontSize: '16px',
                  fontWeight: 500,
                  color: location.pathname === to ? '#D4AF37' : 'rgba(245, 236, 215, 0.85)',
                  whiteSpace: 'nowrap',
                  textDecorationLine: location.pathname === to ? 'underline' : 'none',
                  textDecorationColor: '#D4AF37',
                  textUnderlineOffset: '4px',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                onMouseLeave={e => {
                  if (location.pathname !== to) {
                    e.currentTarget.style.color = 'rgba(245, 236, 215, 0.85)';
                  }
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - RIGHT SIDE */}
          <a 
            href="https://calendly.com/earthwombmedicine/15min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f5ecd7&primary_color=8c6a56"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
            style={{
              fontFamily: "'IM Fell English SC', serif",
              fontSize: '0.85rem',
              color: '#F5ECD7',
              background: '#8C6A56',
              border: '1.5px solid #D4AF37',
              borderRadius: '50px',
              padding: '10px 22px',
              whiteSpace: 'nowrap',
              textDecorationLine: 'none',
              letterSpacing: '0.08em',
              transition: 'none',
              flexShrink: 0,
            }}
          >
            Book a Session
          </a>

          {/* Mobile Hamburger - RIGHT SIDE (below md) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-[#F5ECD7] rounded-full" />
            <span className="block w-6 h-[1.5px] bg-[#F5ECD7] rounded-full" />
            <span className="block w-5 h-[1.5px] bg-[#F5ECD7] rounded-full" />
          </button>
        </div>

        {/* Mobile Full-Screen Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex flex-col"
              style={{ 
                background: '#011A14',
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)'
              }}
            >
              {/* Top bar: logo left, close right */}
              <div className="relative z-10 flex items-center justify-between px-6 h-[64px]">
                <Logo variant="navbar" onClick={() => setMenuOpen(false)} light={true} />
                <button 
                  onClick={() => setMenuOpen(false)} 
                  aria-label="Close menu"
                  className="w-11 h-11 flex items-center justify-center"
                  style={{ color: '#F5ECD7', fontSize: '2rem', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>

              {/* Nav Links - centered vertically in remaining space */}
              <nav className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="group relative py-2"
                    style={{
                      fontFamily: "'IM Fell English SC', serif",
                      fontSize: '24px',
                      color: '#F5ECD7',
                      textDecorationLine: 'none',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {label}
                    {/* Slow gold underline sweep */}
                    <div className="absolute bottom-0 left-0 h-[1.5px] bg-gold w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
                  </Link>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="relative z-10 flex justify-center pb-16">
                <ClaySealButton 
                  href="https://calendly.com/earthwombmedicine/15min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f5ecd7&primary_color=8c6a56"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Book a Session
                </ClaySealButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
