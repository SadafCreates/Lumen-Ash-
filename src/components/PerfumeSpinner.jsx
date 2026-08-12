import { useEffect, useRef, useState } from 'react';
import './PerfumeSpinner.css';

/**
 * A 360° product turntable for a single cut-out (transparent background)
 * bottle photo.
 *
 * - Auto-rotates continuously using a real CSS 3D transform (rotateY) on a
 *   perspective stage, so the browser handles the foreshortening itself.
 * - Drag/swipe to spin manually — grabbing pauses the autoplay and lets you
 *   fling it to a stop.
 * - If `src` is missing or fails to load, renders `fallback` instead (still
 *   inside the same rotating stage) so the layout never breaks while real
 *   photography is being added.
 *
 * Usage once you have a photo:
 *   <PerfumeSpinner src="/bottles/ash-edition.png" alt="Ash Édition" />
 *
 * Image guidelines: transparent PNG/WEBP, bottle roughly centred and
 * upright, tall aspect ratio (e.g. 1200×1600) works best.
 */
export default function PerfumeSpinner({ src, alt = '', speed = 14, fallback = null }) {
  const stageRef = useRef(null);
  const wheelRef = useRef(null);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const wheel = wheelRef.current;
    if (!stage || !wheel) return;

    const onPointerDown = (e) => {
      draggingRef.current = true;
      lastXRef.current = e.clientX;
      wheel.style.animationPlayState = 'paused';
      wheel.style.transform = `rotateY(${angleRef.current}deg)`;
      stage.setPointerCapture?.(e.pointerId);
      stage.classList.add('is-dragging');
    };
    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      angleRef.current += dx * 0.6;
      wheel.style.transform = `rotateY(${angleRef.current}deg)`;
    };
    const endDrag = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      stage.classList.remove('is-dragging');
      wheel.style.animationPlayState = 'running';
    };

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    return () => {
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  const showImage = Boolean(src) && !imgError;

  return (
    <div className="spinner-stage" ref={stageRef} data-cursor-hover>
      <div className="spinner-wheel" ref={wheelRef} style={{ animationDuration: `${speed}s` }}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="spinner-image"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="spinner-fallback">{fallback}</div>
        )}
      </div>
      <div className="spinner-shadow" />
      <span className="spinner-hint">Drag to rotate</span>
    </div>
  );
}
