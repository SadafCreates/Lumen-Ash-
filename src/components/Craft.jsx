import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import './Craft.css';

const CARDS = [
  { ci: 'Raw Material', title: 'Rare Distillates', copy: "Sourced in small lots from growers we've worked with for over a decade — no accord repeats a harvest." },
  { ci: 'Method', title: 'Cold Infusion', copy: 'Petals and resins steep for weeks at low temperature, preserving notes that heat would otherwise burn away.' },
  { ci: 'Standard', title: 'Hand-Blended', copy: 'Every batch is nosed and adjusted by hand before it\u2019s approved to become Lumen & Ash.' },
  { ci: 'Vessel', title: 'Cast Glass', copy: 'Bottles are cast, not molded — each one carries faint asymmetries that catch the light differently.' },
  { ci: 'Longevity', title: '12-Hour Wear', copy: 'Built in three acts so the fragrance changes across the day instead of fading flat.' },
  { ci: 'Ethics', title: 'Cruelty-Free', copy: 'Never tested on animals, and every botanical is traceable to source.' },
];

export default function Craft() {
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.from(gridRef.current.querySelectorAll('.craft-card'), {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="craft" id="craft">
      <div className="craft-head" ref={headRef}>
        <h2>
          Every accord is <span className="grad-text italic">alchemy</span>, measured twice, burned once.
        </h2>
        <p className="eyebrow" style={{ opacity: 1 }}>
          The Atelier — Grasse, France
        </p>
      </div>
      <div className="craft-grid" ref={gridRef}>
        {CARDS.map((c) => (
          <div className="craft-card" key={c.title} data-cursor-hover>
            <div className="dot" />
            <div className="ci">{c.ci}</div>
            <h4>{c.title}</h4>
            <p>{c.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
