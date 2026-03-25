{/*
  HOW IT WORKS - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
*/}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import SectionReveal from '../components/SectionReveal';
import PortalImage from '../components/PortalImage';
import ParchmentCard from '../components/ParchmentCard';
import ClaySealButton from '../components/ClaySealButton';
import JaguarPrintField from '../components/JaguarPrintField';
import JaguarStrip from '../components/JaguarStrip';
import useGrainFilter from '../hooks/useGrainFilter';
import VineDivider from '../components/VineDivider';

const BrainwaveDiagram = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 space-y-12">
      {[
        { label: "Beta", desc: "Your normal waking state", freq: 20, color: "text-parchment/30" },
        { label: "Alpha", desc: "Relaxed focus", freq: 10, color: "text-parchment/50" },
        { label: "Theta", desc: "Deep rest where healing happens", freq: 4, color: "text-gold", active: true }
      ].map((wave, i) => (
        <SectionReveal key={wave.label} delay={i * 0.2}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/3 h-16 relative overflow-hidden">
              <svg viewBox="0 0 400 60" className={`w-full h-full ${wave.color} fill-none stroke-current stroke-2`}>
                <motion.path
                  d={`M 0 30 ${Array.from({ length: 20 }).map((_, j) => `Q ${j * 20 + 10} ${j % 2 === 0 ? 10 : 50} ${j * 20 + 20} 30`).join(' ')}`}
                  animate={{ x: [-40, 0] }}
                  transition={{ duration: 2 / (wave.freq / 4), repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h4 className={`font-heading text-xl md:text-2xl ${wave.active ? 'text-gold' : 'text-parchment/60'}`}>{wave.label}</h4>
              <p className="font-body text-clay/70">{wave.desc}</p>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
};

export default function HowItWorks() {
  const [activeComparison, setActiveComparison] = useState('ccb'); // 'ccb' | 'pranayama'
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Apply the grain filter hook
  useGrainFilter(0.65, 0.04);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>How It Works | Earth Womb Medicine | Breathwork & Somatics</title>
        <meta name="description" content="Understand the science and spirit of Conscious Connected Breathwork, Yoga, and Shamanic Practices." />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center text-center pt-24 md:pt-28 pb-12 md:pb-16 px-5">
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: `url('https://picsum.photos/seed/science/1920/1080?blur=2')`,
          }}
        >
          <div className="absolute inset-0 bg-forest/80" />
        </div>

        <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto">
          <SectionReveal delay={0.2}>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-parchment mb-4 leading-tight hero-title">
              The Body Remembers
            </h1>
            <p className="font-body italic text-clay text-[17px] md:text-2xl">
              Simple practices. Ancient intelligence. Your own body doing what it has always known how to do.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 2: THE BODY MAP */}
      <VineDivider variant="forest" />
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={8} edgeBias={true} opacity={0.9} />
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-[1]">
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center">
            <PortalImage 
              src="https://ik.imagekit.io/eufixlduid/IMG_9488.JPG"
              alt="Contemplative portrait reflecting somatic awareness"
              shape="portrait"
              className="w-full max-w-md aspect-[2/3]"
              objectFit="cover"
            />
          </div>
          
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-left">
            <SectionReveal>
              <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-8 text-left">
                {"Where the Body Keeps Our Stories".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.1 + i * (isMobile ? 0.02 : 0.03), 
                      duration: 0.06, 
                      ease: 'easeOut' 
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              <div className="font-body text-forest/80 text-[17px] md:text-lg lg:text-xl space-y-6 leading-loose max-w-none text-left">
                <p>
                  Every experience we move through leaves a trace. Not only in memory.
                </p>
                <p>
                  But within the body itself... in the muscles, and in the deeper layers of tissue that quietly hold our stories. The heart can carry grief.
                </p>
                <p>
                  The solar plexus, that familiar tightening in the stomach, can hold fear, doubt, and the things we never quite found words for. The throat can hold the voice we once learned to quiet.
                </p>
                <p>
                  When these places hold for too long, something within us begins to drift. We feel ungrounded. As though we are only partly here.
                </p>
                <p>
                  The body speaks in its own language. A tightening across the chest. A breath that grows shallow. Shoulders that slowly learn to carry more than they were ever meant to hold.
                </p>
                <p>
                  The body remembers what the mind tries to move past. And when we lose connection with the body, we often begin to feel distant from life itself.
                </p>
                <p>
                  Nothing here needs to be forced. Nothing needs to be fixed from the outside. The body already knows the way. How to soften. How to release. How to find its way back into balance.
                </p>
                <p>
                  The work is simply to create the space where the body feels safe enough to let go. Safe enough to root again in the ground of being.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <VineDivider variant="parchment" />
      {/* SECTION 5: WHERE HEALING HAPPENS */}
      <section className="bg-forest py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <SectionReveal className="max-w-xl md:max-w-2xl mx-auto">
            <h3 className="font-heading text-xl sm:text-3xl md:text-4xl text-parchment mb-8">Where Healing Happens</h3>
            <p className="font-body italic text-parchment text-[17px] md:text-lg lg:text-xl mb-10">
              In our normal waking state, the mind is busy. In Theta, it finally rests. And in that rest, the body begins to remember what it has been trying to release.
            </p>
            <BrainwaveDiagram />
            <p className="font-body text-clay text-[15px] md:text-lg lg:text-xl mt-8 leading-loose">
              Theta is the doorway to the subconscious. It is the state where the critical mind steps aside, allowing the body to process and integrate what has been suppressed. In this space, profound healing becomes possible.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 3: BREATHWORK */}
      <section id="breathwork" className="bg-[#f5ecd7] py-12 md:py-28 lg:py-40 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-5/12 order-1 lg:order-2">
            <SectionReveal delay={0.2}>
              <PortalImage 
                src="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/DSC08718%20(1).webp"
                alt="Serene person practicing deep breathwork"
                shape="portrait"
                className="w-full max-w-md mx-auto aspect-[3/4] shadow-2xl"
                objectFit="cover"
              />
            </SectionReveal>
          </div>

          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            <SectionReveal className="text-left ml-0 mr-0 text-base">
              <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-2">Breathwork</h2>
              <p className="font-body italic text-forest text-[17px] md:text-xl mb-12">The simplest bridge back to the body.</p>
              
              <div className="font-body text-forest text-[17px] md:text-lg lg:text-xl space-y-8 leading-loose">
                <p>
                  The breath is a living current. A continuous, circular rhythm that becomes a quiet portal back into the body.
                </p>
                <p>
                  As the breath deepens, the nervous system begins to soften and the body slowly remembers its own wisdom. The mind grows quieter, and awareness settles into a deeper place - a threshold where healing can begin to unfold. What has been held in muscle, fascia, and feeling over the years slowly begins to loosen and rise.
                </p>
                <p>
                  This is deeply energetic work. As the breath moves, energy that has been held or stagnant begins to flow again through the body.
                </p>
                <p>
                  Sometimes it comes as tears. Sometimes as warmth, trembling, tingling, or deep stillness. Nothing here needs to be forced.
                </p>
                <p>
                  The breath simply opens the space where the body can continue what it has long been trying to do: soften, release, and return to life.
                </p>
                <p className="text-forest italic text-xl md:text-2xl text-center mt-12">
                  "Follow the breath. It knows the way home."
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <VineDivider variant="forest" />
      {/* SECTION 4: A DIFFERENT KIND OF BREATH */}
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={14} opacity={0.9} />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <SectionReveal className="max-w-xl md:max-w-2xl mx-auto text-center mb-12">
            <h3 className="font-heading text-xl md:text-3xl text-forest mb-6">A Different Kind of Breath</h3>
            <p className="font-body text-forest text-[15px] md:text-lg lg:text-xl leading-loose mb-10">
              Breathwork as practised here is not Pranayama. The difference matters, and it is worth understanding before you begin.
            </p>
          </SectionReveal>
          <SectionReveal>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-forest/10 shadow-xl">
              <table className="w-full border-collapse font-body text-[15px] md:text-lg">
                <thead>
                  <tr className="bg-forest text-parchment">
                    <th className="p-6 text-left font-heading">Feature</th>
                    <th className="p-6 text-left font-heading">CCB</th>
                    <th className="p-6 text-left font-heading">Pranayama</th>
                  </tr>
                </thead>
                <tbody className="text-forest">
                  {[
                    ["Breath Control", "None circular, free", "Counted, structured"],
                    ["Position", "Lying down", "Seated"],
                    ["Duration", "40–45 min continuous", "Variable, typically shorter"],
                    ["Intensity", "Intense, somatic", "Gentle to moderate"],
                    ["Intention", "Somatic release, emotional processing", "Energy regulation, focus, calm"],
                    ["Brain State", "Theta (deep rest)", "Alpha/Beta regulation"]
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-clay/10' : 'bg-transparent'}>
                      <td className="p-6 font-heading text-earth border-b border-earth/10">{row[0]}</td>
                      <td className="p-6 border-b border-earth/10">{row[1]}</td>
                      <td className="p-6 border-b border-earth/10">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden flex gap-2 mb-8 p-1 bg-forest/5 rounded-full border border-forest/10">
              <button 
                onClick={() => setActiveComparison('ccb')}
                className={`flex-1 py-2 rounded-full font-heading text-xs transition-all duration-300 ${activeComparison === 'ccb' ? 'bg-forest text-parchment shadow-[0_0_16px_rgba(212,175,100,0.45)]' : 'text-forest/60'}`}
              >
                CCB
              </button>
              <button 
                onClick={() => setActiveComparison('pranayama')}
                className={`flex-1 py-2 rounded-full font-heading text-xs transition-all duration-300 ${activeComparison === 'pranayama' ? 'bg-forest text-parchment shadow-[0_0_16px_rgba(212,175,100,0.45)]' : 'text-forest/60'}`}
              >
                Pranayama
              </button>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {[
                ["Breath Control", "None circular, free", "Counted, structured"],
                ["Position", "Lying down", "Seated"],
                ["Duration", "40–45 min continuous", "Variable, typically shorter"],
                ["Intensity", "Intense, somatic", "Gentle to moderate"],
                ["Intention", "Somatic release, emotional processing", "Energy regulation, focus, calm"],
                ["Brain State", "Theta (deep rest)", "Alpha/Beta regulation"]
              ].map((row, i) => (
                <ParchmentCard key={i} className="p-6">
                  <h4 className="font-heading text-gold text-lg mb-4 border-b border-gold/20 pb-2">{row[0]}</h4>
                  <div className="space-y-4">
                    {activeComparison === 'ccb' ? (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-gold block mb-1">CCB</span>
                        <p className="font-body text-forest/80 text-sm">{row[1]}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs uppercase tracking-widest text-forest/40 block mb-1">Pranayama</span>
                        <p className="font-body text-forest/80 text-sm">{row[2]}</p>
                      </div>
                    )}
                  </div>
                </ParchmentCard>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <VineDivider variant="parchment" className="pl-[25px] mt-0 mb-0" svgClassName="-mb-[42px]" />

      <VineDivider variant="forest" className="my-10" svgClassName="-mb-[40px]" />
      {/* SECTION 6: YOGA */}
      <section id="yoga" className="bg-[#f5ecd7] py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            <SectionReveal delay={0.3} className="max-w-xl md:max-w-2xl mx-auto lg:mx-0">
              <span className="font-body italic text-earth uppercase tracking-widest text-sm mb-4 block">
                Yoga
              </span>
              <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-forest mb-8">Yoga</h2>
              <div className="font-body text-forest/80 text-[17px] md:text-lg lg:text-xl space-y-6 leading-[1.7]">
                <p>
                  Yog is the path of union, where breath, body, mind, and spirit return to relationship with one another.
                </p>
                <p>
                  After more than 15 years of practice and teaching, this work has become a deeply embodied approach to yoga that honours the real body, a body that changes, evolves, and carries the imprint of life.
                </p>
                <p>
                  Through grounded movement using your own body weight, the practice builds stability in the hips, spine, and legs, strengthening the body from its foundation. While all energetic centres of the body are essential and interconnected, this work begins by restoring strength and stability in the lower centres: the root and sacral, where our sense of safety, vitality, and belonging are first established.
                </p>
                <p>
                  Yoga here is not only movement. Asana becomes the doorway through which breath, awareness, and energy begin to move more freely through the body. Through pranayama, chakra awareness, bandhas, tantra meditation, moon wisdom, kriya practices, and yoga nidra, the practice expands beyond posture into a deeper relationship with the inner landscape.
                </p>
                <p>
                  Groundedness is not an idea. It is a state the body learns to inhabit.
                </p>
                <p>
                  This practice invites you to meet your body exactly as it is, and to rediscover strength, steadiness, and presence from the inside out.
                </p>
                <p className="text-forest italic text-xl md:text-2xl text-center mt-12">
                  "Where prana moves, awareness follows."
                </p>
              </div>
            </SectionReveal>
          </div>

          <div className="w-full lg:w-5/12 order-1 lg:order-2">
            <SectionReveal>
              <PortalImage 
                src="https://ik.imagekit.io/eufixlduid/IMG_4418.jpg" 
                alt="Grounded yoga practice reflecting stability and union" 
                className="w-full max-w-md mx-auto aspect-[3/4] shadow-2xl"
                loading="lazy"
                shape="portrait"
                objectFit="cover"
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      <VineDivider variant="parchment" />
      {/* SECTION 7: SHAMANIC PRACTICES */}
      <section id="shamanic-practices" className="bg-forest py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="hero" count={14} edgeBias={false} opacity={0.8} />
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-[1]">
          <div className="w-full lg:w-5/12 order-1">
            <SectionReveal>
              <PortalImage 
                src="https://ik.imagekit.io/eufixlduid/IMG_2203.PNG" 
                alt="Mystical forest reflecting shamanic connection to nature" 
                className="w-full max-w-md mx-auto aspect-[3/4] shadow-2xl"
                loading="lazy"
                shape="portrait"
                objectFit="cover"
              />
            </SectionReveal>
          </div>

          <div className="w-full lg:w-7/12 order-2">
            <SectionReveal delay={0.3} className="max-w-xl md:max-w-2xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <JaguarStrip variant="forest" className="mb-8" />
                <p className="font-body italic text-gold text-[10px] md:text-xs tracking-widest mb-8 uppercase text-center lg:text-left">
                  THE JAGUAR WALKS WHERE OTHERS WILL NOT
                </p>
                <h2 className="font-heading text-xl sm:text-3xl md:text-4xl text-parchment mb-8 text-center lg:text-left">Shamanic Practices</h2>
                <div className="font-body text-clay text-[17px] md:text-lg lg:text-xl space-y-8 leading-[1.7] text-left">
                  <p>
                    There are paths that invite comfort, and there are paths that invite truth.
                  </p>
                  <p>
                    Shamanism is a way of remembering our relationship with the living world, not as something separate from us, but as a living web of which we are a part. It is the slow return to relationship with the body, with the Earth, with the unseen forces that shape our lives, and with the deeper intelligence moving through all things.
                  </p>
                  <p>
                    Through ritual, plant intelligence, ancestral healing, and the guidance of power animals, we begin to listen again. We learn to turn gently toward the places within us that have been hidden, rejected, or silenced - the grief that was never given space, the anger that was taught to stay quiet, the parts of ourselves we learned to abandon in order to belong.
                  </p>
                  <p>
                    This work is not about fixing what is broken. It is about remembering what has always been whole.
                  </p>
                  <p>
                    There is a kind of courage that awakens when we stop running from our own depths. In that meeting, what once felt like darkness begins to reveal its wisdom. Grief finds its voice. Anger reveals its truth. Love returns to the places that once felt unworthy of it. Integration begins.
                  </p>
                  <p>
                    As these parts are welcomed back into the circle of the self, the body softens, the heart opens, and a deeper freedom becomes possible: the freedom that comes from no longer needing to hide from your own life.
                  </p>
                  <p>
                    This is the work of embodiment. To live fully in your body. To honour your emotions as messengers. To reclaim the gifts that were hidden inside the wounds.
                  </p>
                  <p>
                    Through this remembering, we do not become someone new. We become more fully who we have always been.
                  </p>
                  <p className="text-gold italic text-xl md:text-2xl text-center mt-12">
                    "In meeting the depths, the light reveals itself."
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <VineDivider variant="forest" />
      {/* SECTION 8: CTA */}
      <section className="bg-deep py-12 md:py-32 lg:py-48 px-5 md:px-8 lg:px-12 text-center relative z-10 overflow-hidden">
        <JaguarPrintField variant="forest" count={6} edgeBias={true} opacity={1.0} />
        <div className="max-w-xl md:max-w-2xl mx-auto relative z-[1]">
          <SectionReveal>
            <h3 className="font-heading text-xl md:text-3xl text-parchment mb-6">Curious About the Work?</h3>
            <div className="font-body text-parchment text-[15px] md:text-lg lg:text-xl leading-loose mb-10">
              <p>If any of this resonates, the simplest next step is a conversation.</p>
            </div>
            <ClaySealButton href="/connect">
              Begin the Conversation
            </ClaySealButton>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
