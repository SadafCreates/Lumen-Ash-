import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsapSetup';

import Cursor from './components/Cursor';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import PrismPour from './components/PrismPour';
import Notes from './components/Notes';
import Craft from './components/Craft';
import Editions from './components/Editions';
import Editorial from './components/Editorial';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const [heroPlay, setHeroPlay] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '200px top',
      onEnter: () =>
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(11,10,13,0.75)',
          backdropFilter: 'blur(10px)',
          duration: 0.4,
        }),
      onLeaveBack: () =>
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(11,10,13,0)',
          backdropFilter: 'blur(0px)',
          duration: 0.4,
        }),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <GrainOverlay />
      <Cursor />
      <Preloader onComplete={() => setHeroPlay(true)} />

      <Header ref={headerRef} />

      <main>
        <Hero play={heroPlay} headerRef={headerRef} />
        <Manifesto />
        <PrismPour />
        <Notes />
        <Craft />
        <Editions />
        <Editorial />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
