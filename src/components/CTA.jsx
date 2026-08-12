import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import './CTA.css';

export default function CTA() {
  const rootRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelectorAll('.eyebrow, h2, p, .magnetic-btn'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="cta" id="contact" ref={rootRef}>
      <div className="cta-glow" />
      <div className="eyebrow" style={{ justifyContent: 'center', position: 'relative' }}>
        Join The Maison
      </div>
      <h2 style={{ marginTop: 18 }}>
        Find your <span className="grad-text italic">pour.</span>
      </h2>
      <p>First access to new editions, atelier notes, and a complimentary discovery vial with your first order.</p>
      <a href="#" className="magnetic-btn" ref={btnRef} data-cursor-hover>
        <span>Shop The Collection</span>
      </a>
    </section>
  );
}
