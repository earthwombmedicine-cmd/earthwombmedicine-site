import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { submitForm } from '../lib/submitForm';
import SectionReveal from '../components/SectionReveal';
import ClaySealButton from '../components/ClaySealButton';
import JaguarPrintField from '../components/JaguarPrintField';
import JaguarBorder from '../components/JaguarBorder';
import JaguarEyes from '../components/JaguarEyes';
import Logo from '../components/Logo';

export default function YogaResetPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ name: '', email: '', whatsapp: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await submitForm('leads', {
        name: formState.name,
        email: formState.email,
        phone: formState.whatsapp,
        tag: 'yoga',
        message: 'Yoga Reset Access Request'
      });

      if (result.success) {
        navigate('/yoga-reset-video');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen selection:bg-gold/30 relative">
      <Helmet>
        <title>Yoga Reset | Earth Womb Medicine</title>
        <meta name="description" content="Arrive here. In your body. In your breath. Access Shama's free 75-minute yoga session." />
      </Helmet>

      {/* HERO SECTION - DARK FOREST */}
      <section className="bg-forest min-h-[60vh] flex flex-col relative overflow-hidden">
        <JaguarPrintField variant="forest" count={8} opacity={0.3} />
        
        {/* MINIMAL TOP BAR */}
        <div className="pt-8 flex justify-center items-center px-6 relative z-20">
          <Logo variant="hero" light={true} />
        </div>

        <div className="max-w-[800px] mx-auto px-6 pb-20 relative z-10 flex-grow flex flex-col justify-center">
          <div className={isMobile ? 'text-left' : 'text-center'}>
            <SectionReveal>
              <div className="flex justify-center mb-8">
                <JaguarEyes size="lg" variant="forest" opacity={0.3} />
              </div>
              <p className="font-heading text-xs tracking-[3px] text-gold uppercase mb-6">A FREE 75-MINUTE PRACTICE</p>
              <h1 className="font-heading text-4xl md:text-6xl text-parchment mb-8 leading-tight">
                Arrive Here.<br />
                In Your Body.<br />
                In Your Breath.
              </h1>
              <div className="space-y-6 font-body text-lg md:text-xl text-parchment/80 leading-relaxed max-w-2xl mx-auto">
                <p>
                  Most of us are moving through life slightly ahead of ourselves — 
                  thinking the next thing will finally settle us. 
                  But the body doesn't arrive there. It arrives here.
                </p>
                <p>
                  This is a free 75-minute online session — a somatic return. 
                  We ground, we open, we flow with breath and energy. 
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FORM SECTION - LIGHT PARCHMENT */}
      <section className="bg-parchment py-24 px-6 relative overflow-hidden">
        <JaguarPrintField variant="parchment" count={4} opacity={0.3} />
        <div className="max-w-[640px] mx-auto relative z-10">
          <div className={`py-16 bg-forest/5 rounded-3xl p-8 md:p-12 border border-gold/10 ${isMobile ? 'text-left' : 'text-center'}`}>
            <SectionReveal>
              <h2 className="font-heading text-2xl md:text-4xl text-forest mb-4">
                If your body is asking for this, you'll know.
              </h2>
              <p className="font-body text-sm text-forest/60 mb-10">
                Leave your details below and receive immediate access to the session.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-md mx-auto">
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-heading text-[10px] tracking-widest text-gold uppercase">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="bg-transparent border-b border-forest/20 py-4 px-2 focus:border-gold outline-none transition-colors font-body text-forest"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-heading text-[10px] tracking-widest text-gold uppercase">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="bg-transparent border-b border-forest/20 py-4 px-2 focus:border-gold outline-none transition-colors font-body text-forest"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="font-heading text-[10px] tracking-widest text-gold uppercase">WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="Include country code (e.g. +91)"
                    required
                    className="bg-transparent border-b border-forest/20 py-4 px-2 focus:border-gold outline-none transition-colors font-body text-forest"
                    value={formState.whatsapp}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-8 flex flex-col items-center">
                  <ClaySealButton 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                  >
                    {status === 'loading' ? 'Sending...' : 'Enter the Practice'}
                  </ClaySealButton>
                  
                  {status === 'error' && (
                    <p className="text-red-500 font-body mt-4 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

