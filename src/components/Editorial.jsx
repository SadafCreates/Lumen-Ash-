import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import './Editorial.css';

export default function Editorial() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelectorAll('.eyebrow, blockquote, cite'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="editorial" ref={rootRef}>
      <div className="eyebrow" style={{ justifyContent: 'center' }}>
        In Review
      </div>
      <blockquote>
        "It doesn't smell like one thing. It smells like the ten minutes after a candle is blown out — smoke
        still deciding whether to become light."
      </blockquote>
      <cite>— Olfactive Review, No. 14</cite>
    </section>
  );
}
