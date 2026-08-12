import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const fillRef = useRef(null);
  const rootRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPct(Math.round(counter.v));
        gsap.set(fillRef.current, { width: counter.v + '%' });
      },
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.15,
          onComplete: () => {
            setHidden(true);
            onComplete?.();
          },
        });
      },
    });
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader" ref={rootRef}>
      <div className="pre-mark">
        Lumen <span className="pre-amp">&amp;</span> Ash
      </div>
      <div className="pre-bar">
        <div className="pre-fill" ref={fillRef} />
      </div>
      <div className="pre-pct">{String(pct).padStart(2, '0')}%</div>
    </div>
  );
}
