import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup';
import JewelOrb from './JewelOrb';
import './Notes.css';

const NOTES = [
  {
    key: 'top',
    eyebrow: '01 — Top',
    title: ['Ember', 'Bergamot'],
    copy: "The first light. A struck match of citrus and green pepper, burning off in under an hour to reveal what's underneath.",
    tags: ['Bergamot', 'Pink Pepper', 'Cardamom'],
    bright: '#1fb383',
    core: '#0e4a37',
    speed: 0.4,
  },
  {
    key: 'heart',
    eyebrow: '02 — Heart',
    title: ['Cathedral', 'Iris'],
    copy: 'Cool stone and wet violet. The sapphire hour — where the fragrance stops performing and starts breathing.',
    tags: ['Iris Root', 'Violet Leaf', 'Blue Lotus'],
    bright: '#5c7cf0',
    core: '#1c2c66',
    speed: -0.3,
  },
  {
    key: 'base',
    eyebrow: '03 — Base',
    title: ['Velvet', 'Amber'],
    copy: 'What remains after the flame is gone. Amethyst-dark resins, oud, and skin musk that sit for days, not hours.',
    tags: ['Oud', 'Amber Resin', 'Dark Musk'],
    bright: '#a468e0',
    core: '#3a1c58',
    speed: 0.5,
  },
];

export default function Notes() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rootRef.current.querySelectorAll('.note-panel').forEach((panel) => {
        const copy = panel.querySelector('.note-copy');
        const orb = panel.querySelector('.note-big-orb');
        const speed = parseFloat(orb.dataset.speed);

        gsap.from(copy.children, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: copy, start: 'top 78%' },
        });

        gsap.fromTo(
          orb,
          { y: -120 * speed * 2 },
          {
            y: 120 * speed * 2,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
        gsap.fromTo(
          orb,
          { scale: 0.85, opacity: 0.5 },
          {
            scale: 1.05,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 30%', scrub: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="notes-section" id="notes" ref={rootRef}>
      {NOTES.map((note) => (
        <div className={`note-panel ${note.key}`} key={note.key}>
          <div className="note-copy">
            <div className="eyebrow">{note.eyebrow}</div>
            <h3>
              {note.title[0]}
              <br />
              {note.title[1]}
            </h3>
            <p>{note.copy}</p>
            <div className="note-list">
              {note.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="note-big-orb" data-speed={note.speed}>
            <JewelOrb bright={note.bright} core={note.core} size={420} responsive duration={8} motes={3} />
          </div>
        </div>
      ))}
    </section>
  );
}
