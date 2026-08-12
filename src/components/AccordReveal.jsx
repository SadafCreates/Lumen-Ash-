import { forwardRef, useImperativeHandle, useRef } from 'react';
import './AccordReveal.css';

const STATS = [
  { label: '3 Accords', icon: 'gem' },
  { label: '12H Wear', icon: 'drop' },
  { label: 'Grasse, FR', icon: 'flame' },
];

function Icon({ name }) {
  if (name === 'gem') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M4 9L12 3l8 6-8 12z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M4 9h16M8 9l4 12M16 9l-4 12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    );
  }
  if (name === 'drop') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path
          d="M12 3c4 5 7 8.4 7 12a7 7 0 1 1-14 0c0-3.6 3-7 7-12z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path
        d="M12 2c1 3-2 4-2 7a4 4 0 1 0 8 0c0-1.5-1-2-1-3 2 1 3 3 3 5.5A6 6 0 1 1 8 11.5C8 8 12 5 12 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

const AccordReveal = forwardRef(function AccordReveal(_, ref) {
  const rootRef = useRef(null);
  const dividerRef = useRef(null);
  const chipsRef = useRef([]);

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    divider: dividerRef.current,
    chips: chipsRef.current,
  }));

  return (
    <div className="accord-reveal" ref={rootRef}>
      <div className="accord-reveal__ring" aria-hidden="true" />
      <div className="accord-reveal__panel">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          The Signature Pour
        </div>
        <h3>
          Ash gives it structure.
          <br />
          <span className="italic grad-text">Light gives it colour.</span>
        </h3>
        <svg className="accord-reveal__divider" viewBox="0 0 220 2" preserveAspectRatio="none">
          <line ref={dividerRef} x1="0" y1="1" x2="220" y2="1" stroke="url(#divider-gradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="divider-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1fb383" />
              <stop offset="50%" stopColor="#5c7cf0" />
              <stop offset="100%" stopColor="#a468e0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="accord-reveal__stats">
          {STATS.map((s, i) => (
            <div
              className="accord-chip"
              key={s.label}
              ref={(el) => (chipsRef.current[i] = el)}
            >
              <Icon name={s.icon} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default AccordReveal;
