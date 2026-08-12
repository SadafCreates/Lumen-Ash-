import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import './Bottle.css';

/**
 * Animated jewel-tone flacon.
 *
 * - Exposes liquid/gradient DOM nodes via ref so parent components (e.g. the
 *   scroll-scrubbed Prism Pour) can drive the fill level & colour imperatively
 *   with GSAP, without React re-renders on every scroll tick.
 * - Ships its own idle animation (rising bubbles, a slow glint sweep, a
 *   breathing specular highlight) built with SMIL so it stays "alive" even
 *   when nothing is scrubbing it — used as-is on the Editions cards.
 */
const Bottle = forwardRef(function Bottle(
  {
    stops = ['#12805c', '#2a4fcc', '#7a3fb0'],
    capColor = '#17151c',
    fillPercent = 78,
    idleFloat = true,
    glow = true,
    className = '',
  },
  ref
) {
  const uid = useId().replace(/[:]/g, '');
  const liquidRectRef = useRef(null);
  const stopARef = useRef(null);
  const stopBRef = useRef(null);
  const stopCRef = useRef(null);
  const surfaceRef = useRef(null);

  useImperativeHandle(ref, () => ({
    liquidRect: liquidRectRef.current,
    surface: surfaceRef.current,
    stops: { a: stopARef.current, b: stopBRef.current, c: stopCRef.current },
  }));

  // liquid geometry: bottle interior spans roughly y=60..414
  const top = 414 - (394 * fillPercent) / 100;

  return (
    <div className={`bottle-visual ${idleFloat ? 'bottle-float' : ''} ${className}`}>
      <svg viewBox="0 0 200 430" className={glow ? 'bottle-glow' : ''}>
        <defs>
          <linearGradient id={`liquid-${uid}`} x1="0" y1="1" x2="0.3" y2="0">
            <stop ref={stopARef} offset="0%" stopColor={stops[0]} />
            <stop ref={stopBRef} offset="50%" stopColor={stops[1]} />
            <stop ref={stopCRef} offset="100%" stopColor={stops[2]} />
          </linearGradient>
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#efc373" />
            <stop offset="45%" stopColor={capColor} />
            <stop offset="100%" stopColor="#efc373" />
          </linearGradient>
          <clipPath id={`clip-${uid}`}>
            <path d="M78 40 H122 V78 C148 92 168 118 168 156 V372 C168 398 148 414 122 414 H78 C52 414 32 398 32 372 V156 C32 118 52 92 78 78 V40 Z" />
          </clipPath>
          <linearGradient id={`glint-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* glass body base tint */}
        <path
          d="M78 40 H122 V78 C148 92 168 118 168 156 V372 C168 398 148 414 122 414 H78 C52 414 32 398 32 372 V156 C32 118 52 92 78 78 V40 Z"
          fill={`url(#glass-${uid})`}
        />

        {/* clipped contents: liquid, bubbles, glint */}
        <g clipPath={`url(#clip-${uid})`}>
          <rect
            ref={liquidRectRef}
            x="20"
            y={top}
            width="160"
            height={414 - top}
            fill={`url(#liquid-${uid})`}
          />
          <ellipse
            ref={surfaceRef}
            cx="100"
            cy={top}
            rx="66"
            ry="4"
            fill="#ffffff"
            opacity="0.18"
          >
            {idleFloat && (
              <animate attributeName="rx" values="60;68;60" dur="4s" repeatCount="indefinite" />
            )}
          </ellipse>

          {idleFloat &&
            [0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r={2.4 - i * 0.2} fill="#ffffff" opacity="0.35" cx={60 + i * 22}>
                <animate
                  attributeName="cy"
                  values={`405;${top + 6}`}
                  dur={`${3.4 + i * 0.6}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.45;0"
                  dur={`${3.4 + i * 0.6}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

          {idleFloat && (
            <rect x="-60" y="0" width="40" height="430" fill={`url(#glint-${uid})`} transform="rotate(18 100 215)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-40 0; 260 0"
                dur="6s"
                begin="1s"
                repeatCount="indefinite"
                additive="sum"
              />
            </rect>
          )}
        </g>

        {/* outline */}
        <path
          d="M78 40 H122 V78 C148 92 168 118 168 156 V372 C168 398 148 414 122 414 H78 C52 414 32 398 32 372 V156 C32 118 52 92 78 78 V40 Z"
          fill="none"
          stroke="#f3eee4"
          strokeWidth="1.4"
          opacity="0.75"
        />

        {/* neck + cap */}
        <rect x="72" y="14" width="56" height="30" rx="4" fill="none" stroke="#f3eee4" strokeWidth="1.4" opacity="0.75" />
        <rect x="64" y="0" width="72" height="17" rx="6" fill={`url(#cap-${uid})`} stroke="#f3eee4" strokeWidth="1" opacity="0.95" />
        <rect x="64" y="0" width="72" height="5" rx="3" fill="#ffffff" opacity="0.18" />
      </svg>
    </div>
  );
});

export default Bottle;
