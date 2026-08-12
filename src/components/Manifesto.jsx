import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup';
import './Manifesto.css';

const LINES = [
  'Fragrance begins as residue — smoke, ember, the dark leftover of something that burned.',
  'We refuse to leave it there.',
  "Every bottle is an act of turning ash back into light, one jewel-toned accord at a time.",
];

export default function Manifesto() {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.w');
      words.forEach((w) => {
        ScrollTrigger.create({
          trigger: w,
          start: 'top 85%',
          end: 'top 55%',
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0.5) {
              w.classList.add('lit');
              if (w.dataset.gold === 'true') w.classList.add('gold');
            } else {
              w.classList.remove('lit');
              w.classList.remove('gold');
            }
          },
        });
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto">
      <p ref={textRef}>
        {LINES.map((line, li) => (
          <span key={li} className="manifesto-line">
            {line.split(' ').map((word, wi) => (
              <span
                className="w"
                key={wi}
                data-gold={/refuse|light|jewel-toned/i.test(word) ? 'true' : 'false'}
              >
                {word}{' '}
              </span>
            ))}
            <br />
            <br />
          </span>
        ))}
      </p>
    </section>
  );
}
