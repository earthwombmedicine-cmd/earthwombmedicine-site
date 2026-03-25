{/*
  MY STORY - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
*/}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import SectionReveal from '../components/SectionReveal';
import PortalImage from '../components/PortalImage';
import ParchmentCard from '../components/ParchmentCard';
import ClaySealButton from '../components/ClaySealButton';
import JaguarPrintField from '../components/JaguarPrintField';
import JaguarEyes from '../components/JaguarEyes';
import useGrainFilter from '../hooks/useGrainFilter';
import VineDivider from '../components/VineDivider';

const NarrativeChapter = ({ 
  title, 
  content, 
  imageSrc, 
  imageLabel, 
  reverse = false, 
  imageAbove = false,
  dark = false,
  printVariant,
  printCount = 10,
  printEdgeBias = false,
  printOpacity = 0.9,
  parallaxPrint = false,
  imageShape = "portrait"
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const printY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-28 lg:py-40 px-5 md:px-8 lg:px-12 relative overflow-hidden ${dark ? 'bg-forest text-parchment' : 'bg-parchment text-forest'}`}
    >
      <JaguarPrintField 
        variant={printVariant || (dark ? "forest" : "parchment")} 
        count={printCount} 
        edgeBias={printEdgeBias}
        opacity={printOpacity}
        parallaxY={parallaxPrint ? printY : undefined}
      />
      <div className={`max-w-screen-xl mx-auto flex flex-col ${imageAbove ? '' : (reverse ? 'md:flex-row-reverse' : 'md:flex-row')} items-center gap-10 md:gap-16 relative z-10`}>
        <div className={`w-full ${imageAbove ? 'md:w-full' : 'md:w-1/2'} flex flex-col items-center order-1 md:order-none`}>
          <motion.div style={{ y }} className="w-full max-w-md">
            <PortalImage 
              src={imageSrc} 
              alt={imageLabel} 
              className="aspect-[4/5] shadow-2xl"
              loading="lazy"
              shape={imageShape}
            />
            {imageLabel && (
              <p className={`mt-4 font-body italic text-center text-sm md:text-base ${dark ? 'text-gold' : 'text-earth'}`}>
                {imageLabel}
              </p>
            )}
          </motion.div>
        </div>
        
        <div className={`w-full ${imageAbove ? 'md:w-full' : 'md:w-1/2'} order-2 md:order-none`}>
          <SectionReveal className="max-w-xl md:max-w-2xl mx-auto">
            {title && <h3 className={`font-heading text-[20px] md:text-2xl lg:text-3xl mb-8 ${dark ? 'text-parchment' : 'text-forest'}`}>{title}</h3>}
            <div className={`font-body text-[17px] md:text-lg leading-loose space-y-6 ${dark ? 'text-clay' : 'text-forest/80'}`}>
              {content}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default function MyStory() {
  // Apply the grain filter hook
  useGrainFilter(0.65, 0.04);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>My Story | Shama Igatpuriwala | Earth Womb Medicine</title>
        <meta name="description" content="A story of returning to the body. Shama's journey through yoga, Trika Tantra, and breathwork." />
        <link rel="canonical" href="https://ais-pre-y4nqyrvkxpky4p2wd33fr2-253709842157.asia-southeast1.run.app/my-story" />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center text-center pt-24 md:pt-28 pb-12 md:pb-16 px-5 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10 scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')`,
          }}
        >
          {/* Deep Amazon Green Overlays for "Jaguar Eyes in the Dark" effect */}
          <div className="absolute inset-0 bg-forest/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.85)_100%)]" />
        </div>

        <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto flex flex-col items-center">
          <SectionReveal delay={0.2} className="flex flex-col items-center">
            <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-parchment mb-6 leading-tight hero-title">
              A Journey Back Into the Body
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* SECTION 2: THE LIFE SCROLL */}
      <NarrativeChapter
        dark
        imageAbove={true}
        imageSrc="https://ik.imagekit.io/eufixlduid/Picflow%20Images%20Mar%2025/A51A3214.webp"
        content={
          <>
            <p>For as long as I can remember, I’ve felt life very deeply. Even when things looked ordinary on the outside, everything inside often felt a little louder ~ emotions, sensations, the quiet movements within the body and heart that many of us don’t quite know how to make sense of.</p>
            <p>For a long time, I didn’t know what to do with that sensitivity. I was simply moving through life like many of us do ~ friendships, work, experiences, while carrying this inner world that felt very alive and at times overwhelming. There was a part of me that didn’t yet know how to listen to it.</p>
            <p>Around that time, yoga began gently weaving its way into my life. Not as something to achieve or master, but as a small space where I could come back to myself. A place where there was no pressure to perform; only breath, body, and the quiet feeling of being present.</p>
            <p>On the mat I could feel something open. A sense of connection. A quiet kind of magic in the body. But for a long time, that experience lived mostly on the mat. I hadn’t yet learned how to let it move through the rest of my life.</p>
            <p>During the stillness of the pandemic, the teachings of Kashmir Shaivism ~ particularly the Trika tradition ~ began appearing along the path. Something in those teachings felt deeply familiar. Not like discovering something new, but like something within me being gently remembered. Breath by breath.</p>
            <p>Life continued to shape the path in its own way. Seasons of burnout, grief, heartbreak, losing loved ones, and anxiety slowly asked me to soften my pace and listen more closely to what my body had been trying to say all along. And somewhere along the way, the breath became the way back. Back into the body. Back into presence. Back into a steadiness that had always lived beneath the noise of everyday life.</p>
            <p>Over time, the path opened in ways I could never have planned. Again and again I found myself drawn to places where the Earth feels unmistakably alive. Places where her presence is felt in the body. Where something within begins to soften. And something ancient remembers. By her oceans. Along her rivers. Among forests. Beneath mountains. Being with these lands awakened a simple but profound remembering within me. That the body is not separate from the Earth. That our bodies carry wisdom. And when we slow down enough to listen, life itself begins to guide us back.</p>
            <p>Earth Womb Medicine grew from this lived remembering. From breath. From body. From walking in quiet relationship with the Earth and the deep feminine intelligence that moves through all of life. And in many ways, the remembering is still unfolding.</p>
          </>
        }
      />

      {/* SECTION 3: CREDENTIALS */}
      <VineDivider variant="parchment" />
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <SectionReveal className="text-center mb-16 flex flex-col items-center">
            <JaguarEyes 
              size="lg" 
              variant="parchment"
              className="mb-4 md:mb-6"
            />
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-forest mb-6">The Path</h2>
            <p className="font-body text-forest/60 text-[15px] md:text-lg">What has shaped this work over the years.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
            {[
              { year: "15+", title: "Yoga", desc: "A lifelong foundation in physical embodiment and discipline." },
              { year: "6", title: "Tantra", desc: "Deep study of non-dual Shaivism under my guru." },
              { year: "CCB", title: "Breathwork Facilitator", desc: "The primary modality used in Earth Womb Medicine sessions." },
              { year: "Somatic", title: "Shamanism", desc: "Integrating the unconscious through body-based processing." }
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <ParchmentCard className="h-full p-6 md:p-10">
                  <span className="font-heading text-xl md:text-3xl text-gold mb-4 block">{item.year}</span>
                  <h3 className="font-heading text-base md:text-xl text-forest mb-2">{item.title}</h3>
                  <p className="font-body text-forest/70 text-[13px] md:text-base leading-relaxed">{item.desc}</p>
                </ParchmentCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <VineDivider variant="parchment" />
      <section className="bg-deep py-12 md:py-32 lg:py-48 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-xl md:max-w-2xl mx-auto text-center">
          <SectionReveal>
            <div className="font-body text-parchment text-[15px] md:text-lg lg:text-xl leading-loose space-y-4 mb-12">
              <p>If you feel drawn to explore this work, you are welcome to reach out.</p>
              <p>There is no pressure, no urgency. Simply follow what feels true.</p>
            </div>
            <ClaySealButton href="/connect">
              Find Your Way In
            </ClaySealButton>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
