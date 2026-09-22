/**
 * Candy visual language: blobs, sprinkles, squiggles and section-curve
 * separators — all derived from the brand's candy shapes, pure SVG/CSS.
 */

const SPRINKLE_COLORS = ['#ED1B26', '#FF4D6D', '#16A34A', '#0284C7', '#F5B301', '#9333EA'];

export function Sprinkles({ items, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            top: s.t,
            right: s.r ?? 'auto',
            left: s.l ?? 'auto',
            width: s.w,
            height: s.h ?? s.w,
            background: s.c ?? SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
            borderRadius:
              s.shape === 'pill' ? '999px' : s.shape === 'dot' ? '50%' : s.shape === 'arc' ? '50% 50% 0 0' : '40% 60% 55% 45% / 50% 45% 55% 50%',
            transform: `rotate(${s.rot || 0}deg)`,
            opacity: s.o ?? 0.85,
            animation: s.anim ? `floaty ${s.anim}s ease-in-out ${i * 0.4}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  );
}

export function Blob({ color = '#FF4D6D', className = '', style }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <path
        fill={color}
        d="M43.9,-63.2C56.4,-55.5,65.8,-42.4,70.7,-27.8C75.6,-13.2,76,2.9,71.4,17.3C66.8,31.6,57.2,44.2,44.9,53.9C32.6,63.6,17.6,70.4,1.6,68.4C-14.4,66.4,-31.2,55.6,-44.7,43C-58.2,30.4,-68.4,16,-69.4,0.9C-70.4,-14.2,-62.2,-30.9,-50.3,-39.1C-38.4,-47.3,-22.8,-47,-7.7,-52.1C7.4,-57.2,15,-69.9,43.9,-63.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** Curved "melted candy" separator placed at the top of a section. */
export function CandyCurve({ fill = '#ffffff', flip = false, className = '' }) {
  return (
    <div className={`relative w-full leading-[0] ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[46px] w-full sm:h-[70px]"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path
          fill={fill}
          d="M0,64 C90,26 180,88 300,58 C420,28 500,80 620,62 C740,44 820,86 950,60 C1080,34 1160,84 1280,64 C1360,50 1410,58 1440,50 L1440,90 L0,90 Z"
        />
        <circle cx="120" cy="18" r="9" fill={fill} />
        <circle cx="705" cy="14" r="7" fill={fill} />
        <circle cx="1240" cy="22" r="10" fill={fill} />
      </svg>
    </div>
  );
}

/** Curved dashed guide line (editorial decoration). */
export function Squiggle({ color = '#ED1B26', className = '', style }) {
  return (
    <svg viewBox="0 0 120 30" className={className} style={style} aria-hidden="true">
      <path
        d="M2 22 Q 16 4, 30 16 T 58 16 T 86 16 T 114 12"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
    </svg>
  );
}

/** Round candy chip used as indicator / selector atom. */
export function CandyDot({ active = false, color = '#ED1B26', onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-testid={label ? `candy-dot-${label}` : undefined}
      onClick={onClick}
      className="grid h-4 w-4 place-items-center rounded-full transition-transform duration-300 hover:scale-125"
      style={{ background: active ? color : '#E2DCD3' }}
    />
  );
}
