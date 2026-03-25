{/*
  TRANSFORMATION STORIES - Earth Womb Medicine
  Revision: Tone + content update per client feedback, March 2026.
  Philosophy: Visitor-first. Spacious. Unhurried. Not self-promotional.
  Emotional arc: Seen → Safe → Curious → Drawn inward → Invited deeper.
*/}

import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import SectionReveal from '../components/SectionReveal.jsx';
import ParchmentCard from '../components/ParchmentCard.jsx';
import ClaySealButton from '../components/ClaySealButton.jsx';
import JaguarRosette from '../components/JaguarRosette.jsx';
import JaguarPrintField from '../components/JaguarPrintField.jsx';
import CirclePortrait from '../components/CirclePortrait.jsx';
import useGrainFilter from '../hooks/useGrainFilter';
import VineDivider from '../components/VineDivider';
import JaguarStrip from '../components/JaguarStrip';

export default function TransformationStories() {
  // Apply the grain filter hook
  useGrainFilter(0.65, 0.04);

  const stories = [
    {
      name: "Shantanu Mandal",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      tags: "Breathwork · Somatic Release · 3 Sessions",
      title: "Finding the Strength to Quit",
      content: [
        "I had been wanting to cut down on smoking for a long time, but somehow I never felt strong enough to actually do it. At one point I was smoking around fifteen cigarettes a day, even though I knew I wanted to change.",
        "After a few breathwork sessions with Shama, along with some deep somatic releases and powerful realisations during the process, something inside me began to shift.",
        "Without forcing it, my urge to smoke started reducing naturally.",
        "Today, I've gone from around fifteen cigarettes a day to just two, and I have intentions to quit completely.",
        "I am deeply grateful to Shama for holding such a supportive and transformative space."
      ]
    },
    {
      name: "Pallavi Chawla",
      portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      tags: "Breathwork · Somatic Awareness · Multiple Sessions",
      title: "Uncovering What Was Ready to Be Seen",
      content: [
        "Having attended several of Shama's sessions over time, each experience seems to open a new layer within me.",
        "During one of the recent sessions, something very deep surfaced: something that had quietly existed between me and my mother for years. It was never easy to look at it fully, and for a long time I had kept it buried beneath the surface.",
        "In the space Shama held, I felt safe enough to finally acknowledge it. Instead of pushing the feeling away, I allowed myself to simply be with it, and surrender to what was arising. That moment alone felt incredibly healing, as if something that had long needed attention was finally seen.",
        "After the session I went home, had lunch, and unexpectedly slept for almost three hours. When I woke up, I noticed something had shifted. The situation that had been on my mind earlier suddenly looked completely different: it felt like my mind had reset, allowing me to see things with a much calmer and clearer perspective.",
        "I am deeply grateful for these experiences. Each session seems to guide me a little closer to understanding myself with more honesty and clarity."
      ]
    },
    {
      name: "Aishwarya Walkar",
      portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      tags: "Full Moon Ceremony · Moon Work · Group Session",
      title: "A Journey Into Stillness",
      content: [
        "Your full moon and new moon sessions are truly beautiful experiences.",
        "There is something deeply magical about the entire journey you create. As the session unfolded, I felt my mind gradually settling into a deep sense of focus and stillness. At one point, it felt as though everything came together into a single point of awareness."
      ]
    },
    {
      name: "Hanisha",
      portrait: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80",
      tags: "Moon Ceremony · Devotional Practice · Group Session",
      title: "Feeling Held in a Sacred Space",
      content: [
        "I woke up feeling so grateful after the session dedicated to Maa Skandamata.",
        "During the experience, my body wanted to move in slow, gentle ways, and I simply allowed myself to follow that inner guidance. The space that Shama held felt incredibly supportive and sacred."
      ]
    },
    {
      name: "Candice",
      portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
      tags: "Full Moon Ceremony · Presence Work · Group Session",
      title: "Returning to Stillness",
      content: [
        "Having attended several of Shama's sessions over time, each experience seems to unfold in its own unique way.",
        "One of the full moon gatherings felt especially beautiful, almost magical in the way the entire journey unfolded. As the session progressed, I could feel myself dropping deeper and deeper into stillness. At one point everything became incredibly simple and clear, as though my mind had settled into a single point of awareness."
      ]
    }
  ];

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Transformation Stories | Earth Womb Medicine | Somatic Shifts</title>
        <meta name="description" content="Real stories of shift and release. How breathwork and shamanic practices help move what has been held." />
        <link rel="canonical" href="https://ais-pre-y4nqyrvkxpky4p2wd33fr2-253709842157.asia-southeast1.run.app/transformation-stories" />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center text-center pt-24 md:pt-28 pb-12 md:pb-16 px-5">
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: `url('https://picsum.photos/seed/landing/1920/1080?blur=2')`,
          }}
        >
          <div className="absolute inset-0 bg-forest/80" />
        </div>

        <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto">
          <SectionReveal delay={0.2}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-parchment mb-4 leading-tight hero-title">
              What Becomes Possible
            </h1>
            <p className="font-body text-parchment/80 text-lg md:text-2xl lg:text-3xl italic">
              "Sometimes the shift is loud. Sometimes it is a quiet settling of the dust."
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Threshold Marker */}
      <JaguarStrip variant="parchment" />

      {/* SECTION 2: THE STORIES */}
      <section className="bg-parchment py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        <JaguarPrintField variant="parchment" count={12} opacity={0.8} />
        <div className="max-w-3xl mx-auto relative z-10 space-y-12 md:space-y-24">
          {stories.map((story, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <ParchmentCard className="w-full !p-8 md:!p-16 flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b border-forest/10 pb-8">
                  <CirclePortrait 
                    src={story.portrait} 
                    name={story.name} 
                    className="w-16 h-16 md:w-24 md:h-24" 
                    blank={true}
                  />
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl text-forest mb-2">
                      {story.title}
                    </h2>
                    <span className="font-body italic text-earth text-xs md:text-sm uppercase tracking-widest">
                      {story.tags}
                    </span>
                  </div>
                </div>
                
                <div className="font-body text-forest/80 text-base md:text-lg lg:text-xl space-y-6 leading-[1.7] mb-10 text-left w-full">
                  {story.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-forest/10 flex justify-end">
                  <p className="font-body italic text-forest/60 text-sm md:text-base">
                    - {story.name}
                  </p>
                </div>
              </ParchmentCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* SECTION 3: CLOSING INVITATION */}
      <VineDivider variant="parchment" />
      <section className="bg-forest py-12 md:py-32 lg:py-48 px-5 md:px-8 lg:px-12 text-center relative z-10 overflow-hidden">
        <JaguarPrintField variant="forest" count={6} edgeBias={true} opacity={0.8} />
        <div className="max-w-xl md:max-w-2xl mx-auto flex flex-col items-center relative z-10">
          <SectionReveal>
            <p className="font-body italic text-gold text-lg md:text-xl lg:text-2xl mb-12">
              If you feel drawn to explore this work, you are welcome to step closer.
            </p>
            <ClaySealButton href="/connect">
              Find Your Way In
            </ClaySealButton>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
