{/*
  CONNECT - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
*/}

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Leaf } from 'lucide-react';
import { submitForm } from '../lib/submitForm';
import SectionReveal from '../components/SectionReveal.jsx';
import ParchmentCard from '../components/ParchmentCard.jsx';
import ClaySealButton from '../components/ClaySealButton.jsx';
import JaguarPrintField from '../components/JaguarPrintField.jsx';
import useGrainFilter from '../hooks/useGrainFilter';
import VineDivider from '../components/VineDivider';

export default function Connect() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  // Apply the grain filter hook
  useGrainFilter(0.65, 0.04);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(err => console.error("Audio play failed:", err));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    const result = await submitForm('leads', {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      sacred_intent: formState.subject,
      message: formState.message,
    });

    if (result.success) {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Open WhatsApp in a new tab
      const whatsappUrl = "https://wa.me/919820515063?text=Hi%20Shama%2C%20I%20just%20filled%20out%20the%20contact%20form%20on%20your%20website.%20Looking%20forward%20to%20connecting.";
      window.open(whatsappUrl, '_blank');
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Connect | Earth Womb Medicine | Shama Igatpuriwala</title>
        <meta name="description" content="Reach out to Shama for breathwork, yoga, or shamanic practices. Begin with a conversation or write a message." />
      </Helmet>

      <audio ref={audioRef} src="/audio/forest-morning.mp3" />

      {/* Ambient Sound Toggle */}
      <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-[90]">
        <motion.button
          onClick={toggleSound}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 16px rgba(212,175,100,0.45)"
          }}
          whileTap={{ 
            scale: 0.9,
            boxShadow: "0 0 16px rgba(212,175,100,0.45)"
          }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 border border-gold/30 ${
            isMuted ? 'bg-forest/40 text-gold/60' : 'bg-gold text-deep'
          }`}
          title="Forest sounds"
        >
          <Leaf size={24} className={isMuted ? 'opacity-50' : 'opacity-100'} />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 bg-deep text-parchment px-3 py-1 rounded-lg text-sm font-heading opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/20 hidden md:block">
            {isMuted ? 'Play forest sounds' : 'Mute forest sounds'}
          </div>
        </motion.button>
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center text-center pt-24 md:pt-28 pb-12 md:pb-16 px-5 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: `url('https://picsum.photos/seed/forest-deep/1920/1080?blur=2')`,
          }}
        >
          <div className="absolute inset-0 bg-forest/80" />
        </div>

        <JaguarPrintField 
          variant="hero" 
          count={12} 
          edgeBias={false} 
          opacity={0.85}
          className="z-0"
        />

        <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto">
          <SectionReveal delay={0.2}>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-parchment mb-4 leading-tight hero-title">
              You Are Welcome Here.
            </h1>
            <p className="font-body text-parchment/80 text-[17px] md:text-2xl lg:text-3xl italic">
              "There is no right way to arrive. Only the way that feels true."
            </p>
          </SectionReveal>
        </div>
      </section>

      <VineDivider variant="forest" />

      {/* SECTION 3: WRITTEN CONTACT FORM */}
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={12} avoidCenter={true} opacity={1.0} />
        <div className="max-w-screen-xl mx-auto text-center mb-16 relative z-10">
          <SectionReveal>
            <span className="font-body text-gold uppercase tracking-widest text-sm mb-4 block">PREFER TO WRITE?</span>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-forest mb-6">Write to Shama</h2>
            <div className="font-body text-forest/70 text-[15px] md:text-lg lg:text-xl space-y-2">
              <p>Shama reads every message personally.</p>
              <p>Write whatever feels true. There is no wrong way to begin.</p>
            </div>
          </SectionReveal>
        </div>

        <div className="max-w-xl md:max-w-3xl mx-auto">
          <SectionReveal>
            <ParchmentCard className="p-8 md:p-12">
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <h3 className="font-heading text-2xl md:text-3xl text-forest mb-4">Thank you.</h3>
                  <p className="font-body text-forest/70 text-base md:text-lg">
                    Shama will reach out to you personally. You're being redirected to WhatsApp now.
                  </p>
                  <ClaySealButton onClick={() => setSubmitStatus('idle')} className="mt-8">
                    Send Another
                  </ClaySealButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs text-forest/50 uppercase tracking-wider">Name *</label>
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formState.name}
                        onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                        className="bg-forest/5 border-b border-forest/20 p-3 focus:outline-none focus:border-gold transition-colors font-body text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs text-forest/50 uppercase tracking-wider">Email *</label>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formState.email}
                        onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                        className="bg-forest/5 border-b border-forest/20 p-3 focus:outline-none focus:border-gold transition-colors font-body text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs text-forest/50 uppercase tracking-wider">WhatsApp Number</label>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                        className="bg-forest/5 border-b border-forest/20 p-3 focus:outline-none focus:border-gold transition-colors font-body text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs text-forest/50 uppercase tracking-wider">Subject *</label>
                      <select
                        required
                        name="subject"
                        value={formState.subject}
                        onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))}
                        className="bg-forest/5 border-b border-forest/20 p-3 focus:outline-none focus:border-gold transition-colors font-body text-base appearance-none"
                      >
                        <option value="" disabled>What feels closest to why you're reaching out? *</option>
                        <option value="I want to try breathwork">I want to try breathwork</option>
                        <option value="I'm interested in yoga">I'm interested in yoga</option>
                        <option value="I want to understand shamanic practices">I want to understand shamanic practices</option>
                        <option value="Something else">Something else</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs text-forest/50 uppercase tracking-wider">Message *</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                      className="bg-forest/5 border-b border-forest/20 p-3 focus:outline-none focus:border-gold transition-colors font-body text-base resize-none"
                    />
                  </div>

                  <ClaySealButton type="submit" disabled={submitStatus === 'loading'} className="w-full mt-4 min-h-[52px]">
                    {submitStatus === 'loading' ? 'Sending...' : 'Reach Out'}
                  </ClaySealButton>
                  
                  {submitStatus === 'error' && (
                    <p className="text-red-500 font-body text-center mt-4 text-sm">Something went wrong. Please try again or contact Shama via WhatsApp.</p>
                  )}
                </form>
              )}
            </ParchmentCard>
          </SectionReveal>
        </div>
      </section>

    </div>
  );
}
