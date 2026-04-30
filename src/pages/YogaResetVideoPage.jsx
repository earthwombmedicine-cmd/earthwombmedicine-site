import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import SectionReveal from '../components/SectionReveal';
import ClaySealButton from '../components/ClaySealButton';
import ParchmentCard from '../components/ParchmentCard';
import Logo from '../components/Logo';

const CTABlock = ({ title, body, buttonText, link }) => (
  <ParchmentCard className="flex flex-col h-full bg-parchment/10 backdrop-blur-sm border border-gold/10 hover:border-gold/30 transition-all duration-500 group">
    <div className="p-8 flex flex-col h-full items-center text-center">
      <h3 className="font-heading text-xl md:text-2xl text-parchment mb-4 group-hover:text-gold transition-colors">{title}</h3>
      <p className="font-body text-parchment/70 mb-8 flex-grow leading-relaxed">{body}</p>
      <ClaySealButton 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs tracking-widest w-full"
      >
        {buttonText}
      </ClaySealButton>
    </div>
  </ParchmentCard>
);

export default function YogaResetVideoPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen text-forest selection:bg-gold/30 relative overflow-hidden bg-forest">
      <Helmet>
        <title>Yoga Reset Practice | Earth Womb Medicine</title>
        <meta name="description" content="Your 75-minute yoga practice is ready. Arrive fully, without rushing." />
      </Helmet>

      {/* MINIMAL TOP BAR */}
      <div className="pt-4 md:pt-6 flex justify-center items-center px-6 relative z-20">
        <Logo variant="hero" light={true} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 text-center pb-32 relative z-10">
        <SectionReveal>
          <h1 className="font-heading text-4xl md:text-6xl text-gold mb-8 leading-tight">
            Your practice is ready.
          </h1>
          <p className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-12">
            Take a breath before you press play.
          </p>
          
          <div className="relative pt-[56.25%] w-full rounded-sm overflow-hidden shadow-2xl border border-gold/30 p-[1px] bg-gold/20">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Do2qOet8sgE"
              title="Yoga Reset Practice"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </SectionReveal>

        <div className="mt-24 max-w-xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-heading text-2xl md:text-3xl text-gold mb-12">Before you begin</h2>
            <ul className="space-y-6 text-left inline-block">
              {[
                "Find a quiet space where you won't be interrupted.",
                "Have your mat, a blanket, and water nearby.",
                "Turn your phone to silent — this time is yours.",
                "There is nothing to achieve here. Only to arrive."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 font-body text-lg text-parchment/80">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-left">
          <SectionReveal delay={0.1}>
            <CTABlock 
              title="Join the Community"
              body="Receive free practices, moon circle invitations, and gentle guidance in Shama's WhatsApp group."
              buttonText="Join WhatsApp"
              link="https://chat.whatsapp.com/FtrHbLPKl192TDujyR9dPa?mode=gi_t"
            />
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <CTABlock 
              title="Work With Shama"
              body="If you are ready to create a consistent practice and go deeper into your body's wisdom."
              buttonText="Explore 1:1"
              link="https://earthwombmedicine.com/connect"
            />
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <CTABlock 
              title="Daily Practices"
              body="Follow along for daily practices, breath cues, and moments of grounding."
              buttonText="Follow Instagram"
              link="https://www.instagram.com/earthwombmedicine"
            />
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}

