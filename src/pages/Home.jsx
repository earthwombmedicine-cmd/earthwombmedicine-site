{/*
  HOME PAGE - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
  
  OPEN TODOs:
  1. Replace hero background image (Section 1) with Shama's atmospheric photo or video
  2. Replace PortalImage src in Section 5 (About) with Shama's actual photo
  3. Replace gallery placeholders in Section 9 with actual photos/videos
  4. Replace FORMSPREE_ID_PLACEHOLDER with real Formspree endpoint ID
  5. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env
*/}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { submitForm } from '../lib/submitForm';
import SectionReveal from '../components/SectionReveal';
import PortalImage from '../components/PortalImage';
import ParchmentCard from '../components/ParchmentCard';
import ClaySealButton from '../components/ClaySealButton';
import JaguarEyes from '../components/JaguarEyes';
import JaguarBorder from '../components/JaguarBorder';
import JaguarRosette from '../components/JaguarRosette';
import JaguarPrintField from '../components/JaguarPrintField';
import CirclePortrait from '../components/CirclePortrait';
import GrainOverlay from '../components/GrainOverlay';
import useGrainFilter from '../hooks/useGrainFilter';
import VineDivider from '../components/VineDivider';

export default function Home() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', sacred_intent: '', message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); 
  // idle | loading | success | error

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const leadFormRef = useRef(null);

  // Apply the grain filter hook
  useGrainFilter(0.65, 0.04);

  const scrollToForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    const result = await submitForm('leads', {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      sacred_intent: formState.sacred_intent,
      message: formState.message,
    });

    if (result.success) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Earth Womb Medicine | Breathwork, Yoga & Shamanic Practices</title>
        <meta name="description" content="A space for somatic healing, breathwork, and returning to the body. Guided by Shama Igatpuriwala in Mumbai." />
        <meta property="og:title" content="Earth Womb Medicine | Somatic Healing" />
        <meta property="og:description" content="Land back into your body. Breathwork, Yoga, and Shamanic Practices for deep release and reconnection." />
        <meta property="og:image" content="https://picsum.photos/seed/forest-mist/1200/630" />
      </Helmet>

      {/* SECTION 1: HERO - "Arrival & Soft Landing" */}
      <section 
        className="relative flex items-center justify-center text-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80')`,
          }}
        >
          {/* Deep Amazon Green Overlays for "Jaguar Eyes in the Dark" effect */}
          <div className="absolute inset-0 bg-forest/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.85)_100%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] pt-[56px] md:pt-[72px] pb-16 px-5">
          <SectionReveal delay={0.3} className="flex flex-col items-center">
            <img 
              src="https://ik.imagekit.io/eufixlduid/logo-icon%20(1).png" 
              alt="Earth Womb Medicine Icon" 
              className="h-20 md:h-28 w-auto object-contain mb-8 mx-auto opacity-80"
              referrerPolicy="no-referrer"
            />

            <span className="font-body text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 block">
              YOGA · BREATHWORK · SHAMANIC PRACTICES
            </span>

            <h1 className="font-heading text-parchment text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8 hero-title">
              The earth beneath you is alive.. it senses you as you arrive
            </h1>
            
            <div className="font-body text-parchment text-[17px] md:text-xl lg:text-2xl leading-snug mb-10 max-w-xl md:max-w-2xl mx-auto">
              <p className="mb-2">Something in you may have brought you here.</p>
              <p className="mb-2">Curiosity.</p>
              <p className="mb-2">A quiet restlessness.</p>
              <p className="mb-2">Or simply the feeling that life holds more depth<br />than the pace we are used to living in.</p>
              <p className="mb-2">Whatever it is,<br />I’m glad you followed it.</p>
              <p className="mb-2">Earth Womb Medicine is a space to slow down.</p>
              <p className="mb-2">To return to yourself.</p>
              <p className="mb-0">To begin sensing the deeper pulse of life<br />already moving within you.</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 2: SANCTUARY - "Safety as a Highlight" */}
      <section 
        className="bg-[#EBE3CE] pt-[60px] md:pt-[80px] pb-[40px] md:pb-[60px] px-5 md:px-8 lg:px-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            {/* LEFT column (45% on desktop) */}
            <SectionReveal className="w-full md:w-[50%] order-1 md:order-none">
              <div className="relative group">
                {/* Decorative background element */}
                <div className="absolute -inset-4 bg-parchment/30 rounded-[40px] blur-2xl group-hover:bg-parchment/40 transition-all duration-1000" />
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="relative overflow-hidden rounded-[32px] shadow-2xl"
                >
                  <img 
                    src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/A51A2795-2.webp" 
                    alt="Earth Womb Medicine Sanctuary" 
                    className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </SectionReveal>

            {/* RIGHT column (50% on desktop) */}
            <div className="w-full md:w-[50%] text-center md:text-left order-2 md:order-none flex flex-col justify-center px-6 md:px-0">
              <h2 
                className="font-heading text-forest text-2xl sm:text-4xl md:text-5xl mb-6 md:mb-10"
                style={{ fontFamily: "'IM Fell English SC', serif" }}
              >
                {"A Safe Space to Land.".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.1 + i * (isMobile ? 0.025 : 0.04), 
                      duration: 0.06, 
                      ease: 'easeOut' 
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-body text-forest text-[15px] md:text-[17px] leading-[1.8] max-w-[560px] mx-auto md:mx-0"
                style={{ fontFamily: 'Alegreya, serif' }}
              >
                <p className="italic mb-6 text-[#8c6a56] text-[20px] font-normal text-left no-underline">
                  Healing often begins in a simple place.<br />
                  When the body finally feels safe enough<br />
                  to soften its guard.
                </p>
                <p className="mb-4">
                  Here we honour the unhurried pace.<br />
                  The nervous system is allowed to breathe.
                </p>
                <p className="mb-4">
                  You are not a problem to be solved here.<br />
                  You are a living being whose body carries intelligence.<br />
                  A place where the noise of the world can fade<br />
                  and the quiet wisdom of your body can begin to speak again.
                </p>
                <p className="mb-4">
                  Whether you arrive with grief, exhaustion,<br />
                  or simply a quiet longing for something more,<br />
                  you are welcome here.<br />
                  Exactly as you are.
                </p>
                <p className="mb-8">
                  No performance.<br />
                  No expectations.<br />
                  Just a space to land.
                </p>

                <ClaySealButton onClick={scrollToForm} variant="secondary">
                  Begin Your Journey
                </ClaySealButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PATHWAYS - "Gentle Invitation" */}
      <VineDivider variant="forest" className="my-0" />
      <section className="bg-clay pt-[60px] md:pt-[80px] pb-12 md:pb-28 lg:pb-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto text-center mb-16">
          <SectionReveal>
            <span className="font-body italic text-earth uppercase tracking-widest text-sm mb-4 block">
              Ways to Step Closer
            </span>
            <h2 className="font-heading text-forest text-xl sm:text-3xl md:text-4xl mb-6">
              {"Pathways".split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.1 + i * (isMobile ? 0.025 : 0.04), 
                    duration: 0.06, 
                    ease: 'easeOut' 
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>
            <div className="font-body text-forest text-[17px] md:text-xl lg:text-2xl leading-loose max-w-xl md:max-w-2xl mx-auto">
              <p className="mb-4">There are many ways to begin.</p>
              <p className="mb-4">Each path eventually leads to the same place back into the body, back into yourself.</p>
              <p>Take your time. There is no rush here.</p>
            </div>
          </SectionReveal>
        </div>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SectionReveal delay={0}>
            <motion.div whileHover="hover" whileTap="hover" initial="initial" className="h-full">
              <motion.div
                variants={{
                  hover: { y: -6, boxShadow: "0 0 16px rgba(212,175,100,0.45)" }
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ParchmentCard className="h-full flex flex-col shadow-md overflow-hidden p-0">
                  <div className="relative overflow-hidden rounded-b-none rounded-t-[32px]">
                    <img 
                      src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/DSC08782.webp" 
                      alt="Breathwork session" 
                      className="w-full h-[300px] object-cover transition-transform duration-[2s] hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="mb-6 text-forest">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 4c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                        <path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                      </svg>
                    </div>
                    <h3 className="font-heading text-forest text-xl mb-4">Breathwork</h3>
                    <div className="font-body text-forest leading-loose text-base mb-4 flex-1">
                      <p className="mb-4">The breath is a quiet passage back into the body.</p>
                      <p className="mb-4">Through continuous, connected breathing, the body settles into a deeper state of rest.</p>
                      <p className="mb-4">In that rest, what has been held begins to soften and gently move.</p>
                    </div>
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <motion.div 
                        className="absolute inset-0 bg-gold/15"
                        variants={{
                          initial: { x: "-100%" },
                          hover: { x: 0 }
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <p className="relative z-10 font-body italic text-earth text-sm p-2">
                        Stress · Anger · Burn out · Release · Nervous System Reset
                      </p>
                    </div>
                    
                    <div className="w-full h-px bg-gold/30 mb-6" />

                    <Link to="/how-it-works#breathwork" className="font-body text-forest text-sm underline hover:text-gold transition-colors flex items-center gap-1 group">
                      Explore this pathway 
                      <motion.span
                        variants={{
                          hover: { x: 4 }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </ParchmentCard>
              </motion.div>
            </motion.div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <motion.div whileHover="hover" whileTap="hover" initial="initial" className="h-full">
              <motion.div
                variants={{
                  hover: { y: -6, boxShadow: "0 0 16px rgba(212,175,100,0.45)" }
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ParchmentCard className="h-full flex flex-col shadow-md overflow-hidden p-0">
                  <div className="relative overflow-hidden rounded-b-none rounded-t-[32px]">
                    <img 
                      src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/IMG_2341.webp" 
                      alt="Yoga practice" 
                      className="w-full h-[300px] object-cover transition-transform duration-[2s] hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="mb-6 text-forest">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8C6A56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3c-1.5 3-4 6-4 9 0 3 2.5 5 4 7 1.5-2 4-4 4-7 0-3-2.5-6-4-9Z" />
                        <path d="M12 12c-3-1-6-1-8 2 0 3 3 5 8 7" />
                        <path d="M12 12c3-1 6-1 8 2 0 3-3 5-8 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-forest text-xl mb-4">Yoga</h3>
                    <p className="font-body text-forest leading-loose text-base mb-4 flex-1">
                      The ancient path of union where body, breath, mind, and spirit return to wholeness. Through asana, pranayama, meditation, tantra, and somatic practices, we gently come back into the body, meeting ourselves exactly where we are.
                    </p>
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <motion.div 
                        className="absolute inset-0 bg-gold/15"
                        variants={{
                          initial: { x: "-100%" },
                          hover: { x: 0 }
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <p className="relative z-10 font-body italic text-earth text-sm p-2">
                        For stability · somatic movement · presence · reconnection · grounding
                      </p>
                    </div>

                    <div className="w-full h-px bg-gold/30 mb-6" />

                    <Link to="/how-it-works#yoga" className="font-body text-forest text-sm underline hover:text-gold transition-colors flex items-center gap-1 group">
                      Explore this pathway 
                      <motion.span
                        variants={{
                          hover: { x: 4 }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </ParchmentCard>
              </motion.div>
            </motion.div>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <motion.div whileHover="hover" whileTap="hover" initial="initial" className="h-full">
              <motion.div
                variants={{
                  hover: { y: -6, boxShadow: "0 0 16px rgba(212,175,100,0.45)" }
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ParchmentCard className="h-full flex flex-col shadow-md overflow-hidden p-0">
                  <div className="relative overflow-hidden rounded-b-none rounded-t-[32px]">
                    <img 
                      src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/IMG_2556.webp" 
                      alt="Shamanic Practices" 
                      className="w-full h-[300px] object-cover transition-transform duration-[2s] hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="mb-6 text-forest">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8C6A56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                        <line x1="16" y1="8" x2="2" y2="22" />
                        <line x1="17.5" y1="15" x2="9" y2="15" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-forest text-xl mb-4">Shamanic Practices</h3>
                    <p className="font-body text-forest leading-loose text-base mb-4 flex-1">
                      A way of remembering our relationship with the living world. Through ritual, ancestral healing, plant intelligence, and the guidance of power animals, we begin to restore connection with the body, the earth, and the deeper intelligence that moves through all life.
                    </p>
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <motion.div 
                        className="absolute inset-0 bg-gold/15"
                        variants={{
                          initial: { x: "-100%" },
                          hover: { x: 0 }
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                      <p className="relative z-10 font-body italic text-earth text-sm p-2">
                        For self-love · integration · embodiment · grief · inner freedom
                      </p>
                    </div>

                    <div className="w-full h-px bg-gold/30 mb-6" />

                    <Link to="/how-it-works#shamanic-practices" className="font-body text-forest text-sm underline hover:text-gold transition-colors flex items-center gap-1 group">
                      Explore this pathway 
                      <motion.span
                        variants={{
                          hover: { x: 4 }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </ParchmentCard>
              </motion.div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 3: THE SHIFT - "Recognition" (Work Begins Here) */}
      <section className="bg-[#EBE3CE] py-12 md:py-16 lg:py-[64px] px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-[900px] mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-[64px]">
            <SectionReveal>
              <span className="font-body italic text-earth text-[28px] md:text-[38px] uppercase tracking-widest block mb-10">
                {"The Work Begins Here".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.1 + i * (isMobile ? 0.025 : 0.04), 
                      duration: 0.06, 
                      ease: 'easeOut' 
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              
              <div className="font-body text-forest text-[15px] md:text-lg lg:text-xl leading-loose max-w-2xl mx-auto">
                <p className="mb-8">Over time, many of us learn to live mostly in our heads.</p>
                <p className="mb-8">Thinking.</p>
                <p className="mb-8">Planning.</p>
                <p className="mb-8">Managing life.</p>
                <p className="mb-8">But our bodies carry a deeper intelligence.</p>
                <p className="mb-8">When awareness returns to the body, something begins to change.</p>
                <p className="mb-8">Breath deepens.</p>
                <p className="mb-8">Presence expands.</p>
                <p className="mb-8">Life begins to feel fuller.</p>
                <p className="mb-8">This is where the work of Earth Womb Medicine begins.</p>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.4} className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Image 1 */}
              <motion.div whileHover="hover" whileTap="hover" initial="initial" className="h-full">
                <motion.div
                  variants={{
                    hover: { y: -6, boxShadow: "0 0 16px rgba(212,175,100,0.45)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ParchmentCard className="h-full flex flex-col shadow-md overflow-hidden p-0">
                    <div className="relative overflow-hidden rounded-b-none rounded-t-[32px]">
                      <img 
                        src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/IMG_9451.webp" 
                        alt="Hands returning to the earth, the work of presence" 
                        className="w-full h-[300px] object-cover transition-transform duration-[2s] hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1 text-center">
                      <p className="font-body italic text-forest text-sm md:text-base leading-relaxed">
                        Hands returning to the earth, the work of presence
                      </p>
                    </div>
                  </ParchmentCard>
                </motion.div>
              </motion.div>

              {/* Image 2 */}
              <motion.div whileHover="hover" whileTap="hover" initial="initial" className="h-full">
                <motion.div
                  variants={{
                    hover: { y: -6, boxShadow: "0 0 16px rgba(212,175,100,0.45)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ParchmentCard className="h-full flex flex-col shadow-md overflow-hidden p-0">
                    <div className="relative overflow-hidden rounded-b-none rounded-t-[32px]">
                      <img 
                        src="https://ik.imagekit.io/eufixlduid/IMG_9486.jpg" 
                        alt="The breath as a doorway back into the body" 
                        className="w-full h-[300px] object-cover transition-transform duration-[2s] hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1 text-center">
                      <p className="font-body italic text-forest text-sm md:text-base leading-relaxed">
                        The breath as a doorway back into the body
                      </p>
                    </div>
                  </ParchmentCard>
                </motion.div>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 4.5: VOICES - "Transformation Stories" */}
      <VineDivider variant="parchment" />
      <section className="bg-[#F5ECD7] py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={10} opacity={0.6} avoidCenter={true} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-forest text-2xl sm:text-4xl md:text-5xl mb-6">
              {"Voices of the Journey".split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.1 + i * (isMobile ? 0.025 : 0.04), 
                    duration: 0.06, 
                    ease: 'easeOut' 
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>
            <p className="font-body italic text-earth text-lg md:text-xl">Real stories of shift, release, and returning.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Shantanu Mandal",
                role: "Breathwork · 3 Sessions",
                quote: "After a few breathwork sessions with Shama, my urge to smoke started reducing naturally. Today, I've gone from fifteen cigarettes a day to just two.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
              },
              {
                name: "Pallavi Chawla",
                role: "Breathwork · Multiple Sessions",
                quote: "In the space Shama held, I felt safe enough to finally acknowledge something I had kept buried for years. That moment alone felt incredibly healing.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              },
              {
                name: "Aishwarya Walkar",
                role: "Moon Ceremony · Group Session",
                quote: "As the session unfolded, I felt my mind gradually settling into a deep sense of focus and stillness. Everything came together into a single point of awareness.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
              }
            ].map((testimonial, i) => (
              <SectionReveal key={i} delay={0.2 + i * 0.1}>
                <ParchmentCard className="h-full p-8 flex flex-col">
                  <div className="flex-1">
                    <p className="font-body text-forest/80 text-base md:text-lg leading-relaxed italic mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-forest/10">
                    <CirclePortrait src={testimonial.image} name={testimonial.name} className="w-12 h-12" blank={true} />
                    <div>
                      <h4 className="font-heading text-forest text-base">{testimonial.name}</h4>
                      <p className="font-body text-earth text-xs uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>
                </ParchmentCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.5} className="text-center mt-16">
            <Link 
              to="/transformation-stories" 
              className="font-body text-gold hover:text-earth transition-colors uppercase tracking-[0.2em] text-sm border-b border-gold/30 pb-1"
            >
              Read More Stories
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 5: YOUR GUIDE - "Human Connection" */}
      <section className="bg-clay py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={12} avoidCenter={true} />

        <div className="max-w-6xl mx-auto px-5 relative z-10 text-center mb-12 md:mb-16">
          <SectionReveal className="flex flex-col items-center">
            <JaguarEyes 
              size={isMobile ? "lg" : "huge"} 
              variant="parchment" 
              opacity={0.2}
              className="mb-6 md:mb-8 blur-[1px]" 
            />
          </SectionReveal>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-6xl mx-auto px-5 relative z-10">
          <SectionReveal className="w-full md:w-[40%] order-1 md:order-none">
            <PortalImage 
              src="https://ik.imagekit.io/eufixlduid/IMG_2160.jpg" 
              alt="Shama Igatpuriwala" 
              className="w-full h-[320px] md:h-[480px]"
              shape="portrait"
            />
          </SectionReveal>
          <SectionReveal delay={0.2} className="w-full md:w-[60%] text-center md:text-left order-2 md:order-none">
            <div className="font-body text-forest text-lg md:text-xl leading-loose mb-10" style={{ fontSize: '1.1em' }}>
              <p className="mb-8">My role here is simply to hold the space for this work.</p>
              <p className="mb-8">Over the years I've been shaped by practices that bring awareness back into the body and reconnect us with the deeper intelligence of life.</p>
              <p className="mb-8">Earth Womb Medicine grew from that journey.</p>
              <p className="mb-8">But the work itself doesn't belong to me.</p>
              <p className="mb-8">It belongs to something much older that lives within all of us.</p>
              <p className="mb-8">I'm simply here to help create the space where it can be remembered.</p>
            </div>
            <ClaySealButton href="/my-story" variant="secondary">
              Learn More
            </ClaySealButton>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 8: CONTACT FORM - "Begin Here" */}
      <VineDivider variant="parchment" />
      <section 
        ref={leadFormRef}
        className="bg-forest py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden"
      >
        <JaguarPrintField variant="forest" count={14} avoidCenter={true} opacity={1.0} />
        <div className="max-w-lg md:max-w-xl mx-auto text-center px-4 md:px-0 relative z-10">
          <SectionReveal>
            <span className="font-body text-gold uppercase tracking-widest text-sm mb-4 block">
              Begin the Conversation
            </span>
            <h2 className="font-heading text-parchment text-xl sm:text-3xl md:text-4xl mb-6">
              {"You Are Welcome Here.".split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.1 + i * (isMobile ? 0.025 : 0.04), 
                    duration: 0.06, 
                    ease: 'easeOut' 
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>
            <div className="font-body text-parchment text-[17px] md:text-lg leading-loose mb-10">
              <p className="mb-6">If something here has resonated with you and you'd like to find out more, leave your details below.</p>
              <p className="mb-6">Shama reads every message personally and will reach out to you directly.</p>
              <p className="mb-6">There is no commitment in writing. Only a conversation waiting to begin.</p>
            </div>

            {submitStatus === 'success' ? (
              <div className="relative z-10" style={{ textAlign: 'center', padding: '32px 0' }}>
                <h3 style={{ fontFamily: "'IM Fell English SC', serif", color: '#F5ECD7',
                  fontSize: '1.5rem', marginBottom: '16px' }}>
                  Thank you.
                </h3>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5', lineHeight: 1.8 }}>
                  Your message is on its way to Shama.
                </p>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5', lineHeight: 1.8 }}>
                  She will reach out to you on WhatsApp within 24 hours.
                </p>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5', lineHeight: 1.8, fontStyle: 'italic' }}>
                  In the meantime, breathe.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-6 text-left relative z-10">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#FFF5EB]/[0.12] border border-gold/30 text-parchment p-3 md:p-4 rounded-xl font-body text-base focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all placeholder:text-parchment/50 relative z-10"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#FFF5EB]/[0.12] border border-gold/30 text-parchment p-3 md:p-4 rounded-xl font-body text-base focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all placeholder:text-parchment/50 relative z-10"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="WhatsApp number (with country code)"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-[#FFF5EB]/[0.12] border border-gold/30 text-parchment p-3 md:p-4 rounded-xl font-body text-base focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all placeholder:text-parchment/50 relative z-10"
                />
                <div className="relative z-10">
                  <select
                    required
                    name="sacred_intent"
                    value={formState.sacred_intent}
                    onChange={e => setFormState(p => ({ ...p, sacred_intent: e.target.value }))}
                    className="w-full bg-[#FFF5EB]/[0.12] border border-gold/30 text-parchment p-3 md:p-4 rounded-xl font-body text-base focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all appearance-none"
                  >
                    <option value="" disabled>What brings you here?</option>
                    <option value="Anxiety / restlessness">Anxiety / restlessness</option>
                    <option value="Stress or fatigue">Stress or fatigue</option>
                    <option value="Burning out / exhaustion">Burning out / exhaustion</option>
                    <option value="Anger or emotional overwhelm">Anger or emotional overwhelm</option>
                    <option value="Grief / loss">Grief / loss</option>
                    <option value="A pattern I keep repeating">A pattern I keep repeating</option>
                    <option value="Spiritual curiosity">Spiritual curiosity</option>
                    <option value="Something I don't have words for yet">
                      Something I don't have words for yet
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4L6 8L10 4" />
                    </svg>
                  </div>
                </div>
                <textarea
                  name="message"
                  placeholder="Anxiety, restlessness, stress, burnout, grief, a pattern repeating, spiritual curiosity, or something you don't yet have words for; all of it is welcome here."
                  rows={3}
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#FFF5EB]/[0.12] border border-gold/30 text-parchment p-3 md:p-4 rounded-xl font-body text-base focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all placeholder:text-parchment/50 resize-none min-h-[100px] relative z-10"
                />
                <ClaySealButton 
                  type="submit" 
                  disabled={submitStatus === 'loading'} 
                  className="w-full md:w-auto min-w-[200px] mt-4 relative z-10"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Step Closer'}
                </ClaySealButton>
                {submitStatus === 'error' && (
                  <p style={{ color: '#D4AF37', fontFamily: 'Alegreya', marginTop: '12px' }} className="text-center">
                    Something didn't go through. Please try again or reach out directly on WhatsApp.
                  </p>
                )}
              </form>
            )}
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
