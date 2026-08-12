import './JewelOrb.css';

/**
 * A "living" jewel sphere: layered radial gradient core, a soft specular
 * highlight that breathes, and a few orbiting light motes. Used for the
 * hero atmosphere and the big note-panel spheres.
 */
export default function JewelOrb({
  bright,
  core,
  size = 320,
  responsive = false,
  className = '',
  style = {},
  motes = 3,
  duration = 8,
  delay = 0,
}) {
  const sizing = responsive
    ? { width: '100%', height: '100%', aspectRatio: '1' }
    : { width: size, height: size };

  return (
    <div
      className={`jewel-orb ${className}`}
      style={{
        '--orb-bright': bright,
        '--orb-core': core,
        ...sizing,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <div className="jewel-orb__core" />
      <div className="jewel-orb__highlight" />
      <div className="jewel-orb__rim" />
      {Array.from({ length: motes }).map((_, i) => (
        <span
          key={i}
          className="jewel-orb__mote"
          style={{
            animationDuration: `${5 + i * 2.4}s`,
            animationDelay: `${i * 1.1}s`,
            '--mote-radius': `${size * (0.34 + i * 0.09)}px`,
          }}
        />
      ))}
    </div>
  );
}
