import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import Bottle from './Bottle';
import AccordReveal from './AccordReveal';
import './PrismPour.css';

const JEWEL_STOPS = [
  { a: '#12805c', b: '#2a4fcc', c: '#7a3fb0' },
  { a: '#1fb383', b: '#5c7cf0', c: '#a468e0' },
  { a: '#efc373', b: '#1fb383', c: '#5c7cf0' },
];

export default function PrismPour() {
  const sectionRef = useRef(null);
  const bottleWrapRef = useRef(null);
  const bottleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const beam1Ref = useRef(null);
  const beam2Ref = useRef(null);
  const beam3Ref = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const { liquidRect, stops } = bottleRef.current;
      const reveal = revealRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      // 1. liquid rises
      tl.to(
        liquidRect,
        {
          attr: { y: 60, height: 344 },
          duration: 1,
          ease: 'none',
        },
        0
      );

      // 2. colour morph pass 1: ash-jewel -> bright jewel
      tl.to(
        { t: 0 },
        {
          t: 1,
          duration: 0.4,
          onUpdate: function () {
            const t = this.targets()[0].t;
            stops.a.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[0].a, JEWEL_STOPS[1].a, t));
            stops.b.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[0].b, JEWEL_STOPS[1].b, t));
            stops.c.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[0].c, JEWEL_STOPS[1].c, t));
          },
        },
        0.15
      );

      // 3. colour morph pass 2: bright jewel -> gold/emerald/sapphire finale
      tl.to(
        { t: 0 },
        {
          t: 1,
          duration: 0.4,
          onUpdate: function () {
            const t = this.targets()[0].t;
            stops.a.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[1].a, JEWEL_STOPS[2].a, t));
            stops.b.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[1].b, JEWEL_STOPS[2].b, t));
            stops.c.setAttribute('stop-color', gsap.utils.interpolate(JEWEL_STOPS[1].c, JEWEL_STOPS[2].c, t));
          },
        },
        0.55
      );

      tl.to(bottleWrapRef.current, { scale: 1.15, duration: 0.5 }, 0.6);
      tl.to(eyebrowRef.current, { opacity: 0, duration: 0.2 }, 0.55);

      // 4. beams burst outward
      tl.to(
        [beam1Ref.current, beam2Ref.current, beam3Ref.current],
        { width: '46vw', height: '3px', opacity: 0.9, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
        0.62
      );
      tl.to(beam1Ref.current, { rotate: -32, x: '-24vw', duration: 0.6 }, 0.62);
      tl.to(beam2Ref.current, { rotate: 0, x: '0vw', width: '2px', height: '2px', opacity: 0, duration: 0.5 }, 0.62);
      tl.to(beam3Ref.current, { rotate: 32, x: '24vw', duration: 0.6 }, 0.62);

      tl.to(bottleWrapRef.current, { opacity: 0, scale: 0.8, duration: 0.3 }, 0.72);

      // 5. accord reveal panel
      tl.to(reveal.root, { opacity: 1, duration: 0.4 }, 0.78);
      tl.to(reveal.divider, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0.8);
      tl.to(
        reveal.chips,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.6)' },
        0.86
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="prism-section" ref={sectionRef}>
      <div className="prism-pin">
        <div className="prism-bg" />
        <div className="eyebrow prism-eyebrow" ref={eyebrowRef}>
          The Prism Pour
        </div>

        <div className="bottle-wrap" ref={bottleWrapRef}>
          <Bottle ref={bottleRef} stops={['#12805c', '#2a4fcc', '#7a3fb0']} fillPercent={0} idleFloat={false} />
        </div>

        <div className="beam beam-emerald" ref={beam1Ref} />
        <div className="beam beam-sapphire" ref={beam2Ref} />
        <div className="beam beam-amethyst" ref={beam3Ref} />

        <AccordReveal ref={revealRef} />
      </div>
    </section>
  );
}
