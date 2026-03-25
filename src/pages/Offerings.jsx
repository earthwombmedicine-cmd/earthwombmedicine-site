{/*
  OFFERINGS - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
*/}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Check, X as CloseIcon, ChevronDown } from 'lucide-react';
import { submitForm } from '../lib/submitForm';
import SectionReveal from '../components/SectionReveal';
import PortalImage from '../components/PortalImage';
import ParchmentCard from '../components/ParchmentCard';
import ClaySealButton from '../components/ClaySealButton';
import JaguarPrintField from '../components/JaguarPrintField';
import ForestCanopyShader from '../components/ForestCanopyShader';
import VineDivider from '../components/VineDivider';
import CirclePortrait from '../components/CirclePortrait';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-forest/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group px-4 py-2 rounded-lg transition-all duration-300"
      >
        <h3 className="font-heading text-lg md:text-2xl text-forest group-hover:text-gold transition-colors">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gold"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-forest/80 text-[15px] md:text-lg pt-6 pb-2 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Offerings() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '',
    message: '',
    consent: false
  });
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isFreePracticesModalOpen, setIsFreePracticesModalOpen] = useState(false);
  const [freePracticesForm, setFreePracticesForm] = useState({ name: '', email: '', phone: '' });
  const [freePracticesStatus, setFreePracticesStatus] = useState('idle');
  const registrationRef = useRef(null);
  const heroRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOfferingsSubmit = async (e) => {
    e.preventDefault();
    if (!formState.consent) return;
    setSubmitStatus('loading');

    const result = await submitForm('ceremony_offerings', {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
    });

    setSubmitStatus(result.success ? 'success' : 'error');
  };

  const handleFreePracticesSubmit = async (e) => {
    e.preventDefault();
    setFreePracticesStatus('loading');

    const result = await submitForm('free_practices_leads', {
      ...freePracticesForm,
      tag: 'Free Practices',
      _subject: `Free Practices Request: ${freePracticesForm.name}`
    });

    if (result.success) {
      setFreePracticesStatus('success');
      setTimeout(() => {
        window.location.href = 'https://linktr.ee/earthwombmedicine';
      }, 1500);
    } else {
      setFreePracticesStatus('error');
    }
  };

  const faqs = [
    { q: "Do I need any experience with breathwork or meditation?", a: "None at all. The only requirement is that you lie down and breathe when Shama guides you to. Everything else takes care of itself." },
    { q: "What do I need for the session?", a: "A quiet space where you can lie down flat for 45 minutes. A yoga mat or your bed. Headphones if possible. Water nearby. Wear something comfortable." },
    { q: "Is this safe? I have anxiety. Will this make it worse?", a: "Conscious Connected Breathwork is specifically effective for anxiety because it works at the body level, not the mind level. Shama has worked with clients with severe anxiety and panic disorders. That said, if you have a serious cardiac condition or are pregnant, please reach out before registering so Shama can assess." },
    { q: "What if I cry or feel overwhelmed during the session?", a: "That is the session working. Shama will be holding the space for exactly this. You will not be alone. Tears are release, not breakdown." },
    { q: "Is the session recorded?", a: "No. The live container is sacred and private." },
    { q: "I'm not \"spiritual\": is this still for me?", a: "Especially for you. Earth Womb Medicine is not a religion or a belief system. It is a body-based practice. Your skepticism is welcome here." },
    { q: "I'm not sure I'm ready. Should I wait?", a: "There is never a perfect moment of readiness. The ceremony will meet you exactly where you are. If you feel even a quiet pull toward it, that is enough." }
  ];

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Offerings | Earth Womb Medicine</title>
        <meta name="description" content="Explore our offerings in Conscious Connected Breathwork and somatic healing. A space to land back in your body." />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center pt-24 md:pt-28 pb-12 md:pb-16 px-5 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-deep/80" />
          {/* Radial Vignette */}
          <div 
            className="absolute inset-0" 
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.6) 100%)' }} 
          />
        </div>

        {/* WebGL Shader Layer */}
        <div className="absolute inset-0 -z-5 opacity-40">
          <ForestCanopyShader />
        </div>

        {/* Jaguar Territory Print */}
          <JaguarPrintField 
            variant="hero" 
            count={18} 
            mobileCount={10} 
            edgeBias={false} 
            opacity={1.0}
            className="z-0"
          />

        <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto flex flex-col items-center">
          <SectionReveal delay={0.2} className="flex flex-col items-center">
            <span className="font-body text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 block">
              LIVE · ONLINE · ZOOM
            </span>
          </SectionReveal>
          
          <SectionReveal delay={0.4}>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-parchment mb-4 leading-tight hero-title">
              The work I offer is a weaving
            </h1>
            <h2 className="font-heading text-[17px] md:text-2xl text-earth mb-8">
              Breath.  Body.  Earth wisdom.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <div className="font-body text-parchment text-[17px] md:text-xl lg:text-2xl max-w-xl md:max-w-2xl mx-auto mb-12 leading-loose space-y-4">
              <p>Each session is held live, in presence.</p>
              <p>Through breath, movement, and awareness,<br />
              we follow what the body is ready to open.</p>
              <p>Nothing is forced.<br />
              Nothing is performed.<br />
              What unfolds is led from within.</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION: ANCIENT TEACHINGS */}
      <VineDivider variant="forest" />
      <section className="bg-[#f5ecd7] py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={8} edgeBias={true} opacity={0.6} />
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-[1]">
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center">
            <PortalImage 
              src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/IMG_1972.webp"
              alt="Ancient wisdom and nature"
              shape="portrait"
              className="w-full max-w-md aspect-[2/3]"
              objectFit="cover"
            />
          </div>
          
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-left">
            <SectionReveal>
              <div className="font-body text-forest/80 text-[15px] md:text-lg lg:text-xl space-y-6 leading-loose max-w-none text-left">
                <p className="font-heading text-xl md:text-3xl text-forest mb-6 leading-relaxed">
                  Ancient teachings that have shaped my own path.
                </p>
                <p>
                  Through these practices, I hold spaces where the body can return to its own intelligence.
                </p>
                <p className="italic text-earth">
                  Each offering is an invitation.
                </p>
                <p className="pl-4 border-l border-gold/30">
                  To slow down.<br />
                  To listen.<br />
                  To come back into relationship with yourself.
                </p>
                <p>
                  Remembering our belonging within the living Shakti of the Earth.
                </p>
                <p>
                  My intention is simply to share the grace of these teachings in ways that support a deeper return to yourself.
                </p>
                <p className="italic">
                  Each offering unfolds in its own way.<br />
                  But they all lead to the same return.
                </p>
                <p className="font-heading text-xl text-forest">
                  Back into the body.<br />
                  Back into presence.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO THIS IS FOR */}
      <VineDivider variant="forest" className="mt-[-16px] mb-[-40px] border-0 rounded-none" />
      <section className="bg-clay py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 mt-[-40px]">
        <div className="max-w-screen-xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-16 text-center">You May Recognize Yourself Here</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Ready if... */}
            <SectionReveal delay={0.2}>
              <h3 className="font-heading text-lg md:text-2xl text-forest mb-8">If you feel the pull...</h3>
              <ul className="space-y-6">
                {[
                  "You’ve explored talk therapy, yet something still lives in the body.",
                  "You carry grief or emotions that haven’t fully moved since a loss.",
                  "You’ve reached a point of exhaustion or burnout and feel distant from yourself.",
                  "You’ve tried to change certain habits or patterns, yet find yourself returning to them.",
                  "You meditate but still feel anxious, unsettled, or ungrounded.",
                  "You feel drawn to spiritual exploration, yet sense a longing to reconnect with your body."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start font-body text-[17px] md:text-lg text-forest/90">
                    <div className="mt-1 text-gold shrink-0">
                      <Check size={20} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* You Can Arrive Just As You Are */}
            <SectionReveal delay={0.4}>
              <h3 className="font-heading text-lg md:text-2xl text-forest mb-8">You Can Arrive Just As You Are</h3>
              <ul className="space-y-6">
                {[
                  "No previous experience with yoga, breathwork, or meditation.",
                  "No need to call yourself “spiritual” or believe in anything in particular.",
                  "No expectation to share more than you feel ready for.",
                  "No pressure to perform or do anything “right.”"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start font-body text-[17px] md:text-lg text-forest/90">
                    <div className="mt-1 text-earth shrink-0">
                      <CloseIcon size={20} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* SECTION: OFFERINGS */}
      <VineDivider variant="parchment" />
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-4">Our Offerings</h2>
            <p className="font-body italic text-forest/70 text-[17px] md:text-xl">Spaces designed for your return.</p>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                name: "Breathwork",
                image: "https://ik.imagekit.io/eufixlduid/IMG_3087.JPG",
                desc: "A guided space to return to the intelligence of the breath. Through conscious connected breathing, the body begins to soften, release, and remember what it has been holding.",
                detail: "Private Sessions · Shared Group Journeys",
                link: "https://docs.google.com/forms/d/1_ntztzBn_1RUQhKHxTDfbDrYo4mCJW3K1UVOMsrlCaA/viewform"
              },
              {
                name: "Yoga",
                image: "https://ik.imagekit.io/eufixlduid/IMG_8480.jpg",
                desc: "A slow, embodied practice designed to bring you back into a relationship with your body. Rooted in breath, presence, and the living movement of Shakti within.",
                detail: "Private Sessions · Intimate Group Gatherings",
                link: "https://docs.google.com/forms/d/19sVHI2rye-bC1jOBupnmmya2ebATzka2kI2VUDKyrOE/viewform"
              },
              {
                name: "Sky Rituals",
                image: "https://ik.imagekit.io/eufixlduid/IMG_9456.JPG",
                desc: "Where the moon, the sky, and the body listen together. A monthly gathering held in rhythm with the moon and cosmic alignments. Practices rooted in Tantra and Shamanic wisdom.",
                detail: "Monthly · Shared Presence · Collective Remembering",
                link: "https://docs.google.com/forms/d/1Jwhy_pcu9_MDvCa9v-tQhBOuMf3g4nl-17osG3LWO5k/viewform"
              },
              {
                name: "1:1 Mentorship",
                image: "https://ik.imagekit.io/eufixlduid/IMG_9458.JPG",
                desc: "A space for deeper listening. An intimate container where we move gently with what is alive in you, allowing the body and breath to guide the work. Somatic movement, tantra, and shamanic wisdom.",
                detail: "Intimate Container · Deep Listening · Unfolding",
                onClick: scrollToRegistration
              }
            ].map((offering, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-parchment border border-earth rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img 
                      src={offering.image} 
                      alt={offering.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="font-heading text-lg md:text-2xl text-forest mb-3 leading-tight">
                      {offering.name}
                    </h3>
                    <p className="font-body text-forest/80 text-[13px] md:text-base mb-6 flex-grow">
                      {offering.desc}
                    </p>
                    <div className="mt-auto">
                      <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold mb-6 font-medium">
                        {offering.detail}
                      </p>
                      <ClaySealButton onClick={offering.onClick} href={offering.link} className="w-full text-sm py-2.5 md:py-4">
                        Book Now
                      </ClaySealButton>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <VineDivider variant="parchment" />

      {/* SECTION: TESTIMONIALS */}
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={8} opacity={0.6} />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-4">Voices of the Journey</h2>
            <p className="font-body italic text-forest/70 text-[17px] md:text-xl">Shared experiences of shift and release.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Shantanu Mandal",
                tags: "Breathwork · Somatic Release",
                content: "After a few breathwork sessions with Shama, along with some deep somatic releases and powerful realisations, something inside me began to shift. Without forcing it, my urge to smoke started reducing naturally."
              },
              {
                name: "Pallavi Chawla",
                tags: "Breathwork · Somatic Awareness",
                content: "In the space Shama held, I felt safe enough to finally acknowledge what had been buried for years. After the session, I woke up noticing something had shifted. I could see things with a much calmer and clearer perspective."
              },
              {
                name: "Aishwarya Walkar",
                tags: "Moon Ceremony · Group Session",
                content: "Your full moon and new moon sessions are truly beautiful experiences. There is something deeply magical about the entire journey you create. I felt my mind gradually settling into a deep sense of focus and stillness."
              }
            ].map((testimonial, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <ParchmentCard className="h-full flex flex-col items-center text-center p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow border border-earth/20">
                  <span className="font-body italic text-gold text-[10px] uppercase tracking-widest mb-4 block">
                    {testimonial.tags}
                  </span>
                  <p className="font-body text-forest/80 text-[13px] md:text-base leading-relaxed mb-6 flex-grow italic">
                    "{testimonial.content}"
                  </p>
                  <p className="font-body text-forest/60 text-xs uppercase tracking-widest mt-auto">
                    {testimonial.name}
                  </p>
                </ParchmentCard>
              </SectionReveal>
            ))}
          </div>
          
          <SectionReveal className="text-center mt-16">
            <ClaySealButton href="/transformation-stories" className="text-sm">
              Read More Stories
            </ClaySealButton>
          </SectionReveal>
        </div>
      </section>

      <VineDivider variant="parchment" />

      {/* SECTION: BEGIN HERE (FREE PRACTICES) */}
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={6} opacity={0.4} />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <SectionReveal>
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-forest mb-4 uppercase tracking-wider">BEGIN HERE (FREE PRACTICES)</h2>
              <h3 className="font-heading text-lg md:text-2xl text-forest/80 mb-8 italic">A Gentle Place to Start</h3>
              <div className="font-body text-forest/80 text-[15px] md:text-lg lg:text-xl leading-relaxed space-y-6 mb-10">
                <p>If you are new to this work, you are welcome to begin slowly.</p>
                <p>These free practices are offered as a doorway to reconnect with your breath, body, and inner stillness.</p>
              </div>
            </SectionReveal>
            
            <SectionReveal delay={0.2}>
              <ParchmentCard className="!p-8 md:!p-12 border border-earth/20 bg-white/30 backdrop-blur-sm relative z-20">
                <h4 className="font-heading text-lg md:text-xl text-forest mb-8 uppercase tracking-widest border-b border-forest/10 pb-4">Included:</h4>
                <ul className="space-y-6 mb-12">
                  {[
                    "Sleep Meditation (YouTube)",
                    "Short Breath Practice",
                    "Guided Grounding Meditation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-body text-forest/80 text-base md:text-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ClaySealButton 
                  href="https://linktr.ee/earthwombmedicine"
                  className="w-full"
                >
                  Free Practices
                </ClaySealButton>
              </ParchmentCard>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5.5: THE GUIDE */}
      <VineDivider variant="parchment" />
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={12} opacity={0.8} />
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="w-full lg:w-3/5">
            <SectionReveal>
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-forest mb-8">Your Guide</h2>
              <div className="font-body text-[15px] md:text-lg lg:text-xl text-forest/80 leading-loose space-y-6 text-left font-bold not-italic max-w-[640px]">
                <p>
                  I’m Shama, and Earth Womb Medicine grew from my own path of learning how to be in my body.
                </p>
                <p>
                  Over the years, this path has been shaped by yoga, breathwork, and the teachings of Trika Tantra, along with a deepening relationship with the Earth through simple practices, stillness, and listening.
                </p>
                <p>
                  I also work as a cacao facilitator, within a Peruvian lineage rooted in the Andean cosmovision. Alongside this, I’ve spent time in relationship with plants like rosemary and oak, and have a growing curiosity for mycelium ~ learning slowly, through experience.
                </p>
                <p>
                  My work isn’t separate from the land. It’s shaped by a respect for the body, and for the natural world we’re part of. It’s not something we do alone. It happens in connection with ourselves, with the Earth, and with something deeper that moves through both.
                </p>
                <p>
                  Through breathwork, movement, meditation, and spaces held with care, I support people in meeting themselves more honestly….feeling what’s there, softening what’s been held, and finding their way back to a sense of balance.
                </p>
                <p className="italic text-forest font-medium pt-4 border-t border-forest/10">
                  "When we listen deeply enough, the body remembers how to heal. Earth Womb Medicine exists as a space for that remembering."
                </p>
              </div>
            </SectionReveal>
          </div>
          <div className="w-full lg:w-2/5 flex justify-center">
            <SectionReveal delay={0.2}>
              <div className="relative max-w-md w-full">
                <PortalImage 
                  src="https://ik.imagekit.io/eufixlduid/IMG_7523.jpg" 
                  alt="Shama - Founder of Earth Womb Medicine" 
                  className="aspect-[4/5] shadow-2xl w-[458px]"
                  shape="portrait"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-earth/10 rounded-full blur-3xl -z-10" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: REGISTRATION FORM */}
      <VineDivider variant="parchment" />
      <section 
        ref={registrationRef}
        className="bg-deep py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden"
      >
        <JaguarPrintField variant="forest" count={14} avoidCenter={true} opacity={1.0} />
        <div className="max-w-xl md:max-w-2xl mx-auto text-center flex flex-col items-center relative z-10">
          <SectionReveal className="mb-12 flex flex-col items-center">
            <VineDivider variant="forest" />
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-parchment mb-6">Book an Offering</h2>
            <div className="font-body text-parchment text-[15px] md:text-lg lg:text-xl leading-loose mb-12 space-y-4">
              <p>Leave your details below. You'll receive the Zoom link and a short preparation guide before the session begins.</p>
              <p>There is nothing to prepare. Simply show up and breathe.</p>
            </div>
          </SectionReveal>
 
          <SectionReveal delay={0.2}>
            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h3 style={{ fontFamily: "'IM Fell English SC', serif",
                  color: '#F5ECD7', fontSize: '1.75rem', marginBottom: '20px' }}>
                  You're in.
                </h3>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5', lineHeight: 1.8 }}>
                  Your seat is held.
                </p>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5', lineHeight: 1.8 }}>
                  Watch for a message on WhatsApp: Shama will send the Zoom link
                  and a short preparation guide before the ceremony.
                </p>
                <p style={{ fontFamily: 'Alegreya', color: '#E1C6A5',
                  lineHeight: 1.8, fontStyle: 'italic' }}>
                  In the meantime, rest. There is nothing to do.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOfferingsSubmit} className="flex flex-col gap-4 text-left">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Full Name *"
                  autoComplete="name"
                  value={formState.name}
                  onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-parchment text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  autoComplete="email"
                  value={formState.email}
                  onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-parchment text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="WhatsApp Number * (with country code)"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-parchment text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <textarea
                  name="message"
                  placeholder="Anything Shama should know?"
                  rows={3}
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-parchment text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                />
                <label className="flex gap-3 items-start cursor-pointer group">
                  <div className="mt-1">
                    <input 
                      required 
                      type="checkbox" 
                      checked={formState.consent}
                      onChange={e => setFormState(p => ({ ...p, consent: e.target.checked }))}
                      className="accent-gold w-4 h-4"
                    />
                  </div>
                  <span className="font-body text-clay/80 text-sm group-hover:text-parchment transition-colors leading-tight">
                    I understand this is a live session and I intend to be present.
                  </span>
                </label>
                <ClaySealButton type="submit" disabled={submitStatus === 'loading'} className="w-full mt-4 min-h-[44px] md:min-h-[52px]">
                  {submitStatus === 'loading' ? 'Confirming...' : "I'm Ready"}
                </ClaySealButton>
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center mt-2 font-body">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <VineDivider variant="forest" />
      <section className="bg-clay py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-xl md:max-w-2xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-forest mb-16 text-center">FAQs</h2>
          </SectionReveal>
 
          <SectionReveal delay={0.2}>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FREE PRACTICES MODAL */}
      <AnimatePresence>
        {isFreePracticesModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFreePracticesModalOpen(false)}
              className="absolute inset-0 bg-forest/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-[100000] w-full max-w-lg"
            >
              <ParchmentCard className="!p-8 md:!p-12 shadow-2xl border border-earth/30 relative">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFreePracticesModalOpen(false);
                  }}
                  className="absolute top-4 right-4 text-forest/40 hover:text-forest transition-colors p-2 z-20"
                  aria-label="Close modal"
                >
                  <CloseIcon size={24} />
                </button>

                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl text-forest mb-2">Begin Here</h2>
                  <p className="font-body text-forest/60 italic">Enter your details to receive the free practices.</p>
                </div>

                {freePracticesStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-gold" size={32} />
                    </div>
                    <h3 className="font-heading text-2xl text-forest mb-4">You're in.</h3>
                    <p className="font-body text-forest/80 mb-8">Redirecting you to the practices now...</p>
                  </div>
                ) : (
                  <form 
                    onSubmit={handleFreePracticesSubmit} 
                    className="space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-1">
                      <label className="font-body text-xs uppercase tracking-widest text-forest/60 ml-1">Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Your full name"
                        value={freePracticesForm.name}
                        onChange={e => setFreePracticesForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/50 border border-earth/20 text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-body text-xs uppercase tracking-widest text-forest/60 ml-1">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={freePracticesForm.email}
                        onChange={e => setFreePracticesForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-white/50 border border-earth/20 text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-body text-xs uppercase tracking-widest text-forest/60 ml-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="Your phone number"
                        value={freePracticesForm.phone}
                        onChange={e => setFreePracticesForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white/50 border border-earth/20 text-forest p-4 rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <ClaySealButton 
                        type="submit" 
                        className="w-full"
                        disabled={freePracticesStatus === 'loading'}
                      >
                        {freePracticesStatus === 'loading' ? 'Sending...' : 'Get Free Practices'}
                      </ClaySealButton>
                    </div>
                    
                    {freePracticesStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center mt-4 font-body">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </ParchmentCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
