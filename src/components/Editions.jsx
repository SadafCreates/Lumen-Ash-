import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup';
import Bottle from './Bottle';
import PerfumeSpinner from './PerfumeSpinner';
import './Editions.css';

// Drop your own transparent PNG/WEBP bottle photos into `public/bottles/`
// and set `image` below to the path (e.g. '/bottles/ash-edition.png').
// Leave it `null` and the illustrated SVG bottle is used as a placeholder —
// nothing breaks either way, PerfumeSpinner falls back to it automatically.
const EDITIONS = [
  {
    key: 'ash',
    name: 'Ash Édition',
    copy: 'Bergamot, vetiver, smoked cedar — the coolest of the three.',
    size: '50ML',
    stops: ['#0d3a2a', '#12805c', '#1fb383'],
    bg: 'radial-gradient(120% 100% at 30% 20%, var(--emerald), #0d3a2a 70%)',
    image: 'bottles/green.png', // e.g. '/bottles/ash-edition.png'
  },
  {
    key: 'lumen',
    name: 'Lumen Édition',
    copy: 'Iris, blue lotus, cold musk — the signature pour.',
    size: '50ML',
    stops: ['#142862', '#2a4fcc', '#5c7cf0'],
    bg: 'radial-gradient(120% 100% at 30% 20%, var(--sapphire), #142862 70%)',
    image: 'bottles/blue.png', // e.g. '/bottles/lumen-edition.png'
  },
  {
    key: 'dusk',
    name: 'Dusk Édition',
    copy: 'Oud, amber resin, dark musk — worn after sundown.',
    size: '50ML',
    stops: ['#3a1c58', '#7a3fb0', '#a468e0'],
    bg: 'radial-gradient(120% 100% at 30% 20%, var(--amethyst), #3a1c58 70%)',
    image: 'bottles/purple.png', // e.g. '/bottles/dusk-edition.png'
  },
  {
    key: 'discovery',
    name: 'Discovery Set',
    copy: '10ML of all three editions, cast in miniature glass.',
    size: '3×10ML',
    stops: ['#12805c', '#2a4fcc', '#7a3fb0'],
    bg: 'radial-gradient(120% 100% at 30% 20%, var(--ash-charcoal-2), #0b0a0d 70%)',
    faded: true,
    image: null, // e.g. '/bottles/discovery-set.png'
  },
];

export default function Editions() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.08);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + track.scrollWidth,
          scrub: 0.6,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="editions-section" id="editions" ref={sectionRef}>
      <div className="editions-pin">
        <div className="editions-head">
          <div className="eyebrow" style={{ opacity: 1 }}>
            Three Editions
          </div>
          <h2>One flame, poured three ways.</h2>
        </div>
        <div className="editions-track" ref={trackRef}>
          {EDITIONS.map((ed) => (
            <div className={`edition-card ${ed.faded ? 'is-faded' : ''}`} key={ed.key}>
              <div className="edition-visual" style={{ background: ed.bg }}>
                <PerfumeSpinner
                  src={ed.image}
                  alt={ed.name}
                  fallback={<Bottle stops={ed.stops} fillPercent={82} capColor="#17151c" />}
                />
              </div>
              <div className="edition-meta">
                <div>
                  <h3>{ed.name}</h3>
                  <p>{ed.copy}</p>
                </div>
                <span>{ed.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
