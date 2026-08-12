import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import JewelOrb from './JewelOrb';
import './Hero.css';

const WORDS = ['LUMEN', '&', 'ASH'];

export default function Hero({ play, headerRef }) {
  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);
  const orbsWrapRef = useRef(null);

  useEffect(() => {
    if (!play) return;
    const ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll('.char');
      // Set the starting position with GSAP itself (not via a CSS class).
      // GSAP's yPercent tracks its own internal transform cache — if the
      // starting position is instead set with a plain CSS `transform:
      // translateY(115%)`, the browser resolves that to a pixel-based
      // matrix by the time GSAP reads it, so GSAP has no record of a
      // "yPercent" to animate away from and a `yPercent: 0` tween becomes
      // a no-op, leaving the text permanently hidden below its line.
      gsap.set(chars, { yPercent: 115 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(kickerRef.current, { opacity: 1, duration: 0.8 }, '-=0.6')
        .to(chars, { yPercent: 0, stagger: 0.02, duration: 1.1 }, '-=0.5')
        .to(subRef.current, { opacity: 1, duration: 1 }, '-=0.6')
        .to(scrollRef.current, { opacity: 1, duration: 0.8 }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  useEffect(() => {
    const wrap = orbsWrapRef.current;
    if (!wrap) return;
    const orbs = wrap.querySelectorAll('.hero-orb-pos');
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = e.clientX / w - 0.5;
      const ny = e.clientY / h - 0.5;
      orbs.forEach((o, i) => {
        const depth = (i + 1) * 22;
        gsap.to(o, { x: nx * depth, y: ny * depth, duration: 1.2, ease: 'power2.out' });
      });
    };
    wrap.addEventListener('mousemove', onMove);
    return () => wrap.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-orbs" ref={orbsWrapRef}>
        <div className="hero-orb-pos pos-1">
          <JewelOrb bright="#1fb383" core="#0e4a37" size={420} duration={9} />
        </div>
        <div className="hero-orb-pos pos-2">
          <JewelOrb bright="#5c7cf0" core="#1c2c66" size={340} duration={7.5} delay={0.8} />
        </div>
        <div className="hero-orb-pos pos-3">
          <JewelOrb bright="#a468e0" core="#3a1c58" size={480} duration={10.5} delay={1.4} motes={4} />
        </div>
      </div>

      <div className="eyebrow hero-kicker" ref={kickerRef}>
        Parfum Maison — Est. In Colour
      </div>

      <h1 className="hero-title">
        {WORDS.map((word, wi) => (
          <span className="word" key={wi}>
            {[...word].map((ch, ci) => (
              <span className="char" key={ci}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p className="hero-sub" ref={subRef}>
        Fragrance built at the point where ember cools into pigment — three jewel accords, poured from a single flame.
      </p>

      <div className="hero-scroll" ref={scrollRef}>
        <span>Scroll</span>
        <div className="line" />
      </div>
    </section>
  );
}
