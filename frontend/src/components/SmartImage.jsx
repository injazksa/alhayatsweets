import { useState } from 'react';

/**
 * Responsive, LQIP-backed image with reserved aspect ratio (no layout shift).
 * `img` is a manifest entry: { w, h, webp: {size: url}, lqip }
 * `natural` renders a plain flowing image (for lightboxes) instead of the
 * ratio-reserved fill mode.
 */
export default function SmartImage({
  img,
  alt,
  className = '',
  imgClassName = '',
  fit = 'contain',
  eager = false,
  natural = false,
  sizes = '(max-width: 768px) 92vw, 40vw',
  style,
}) {
  const [loaded, setLoaded] = useState(false);
  const widths = Object.keys(img.webp).map(Number).sort((a, b) => a - b);
  const srcSet = widths.map((s) => `${img.webp[s]} ${s}w`).join(', ');
  const fallback = img.webp[widths[widths.length - 1]];
  const ratio = ((img.h / img.w) * 100).toFixed(2);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${img.lqip})`, backgroundSize: 'cover', ...style }}
      data-testid={`img-${img.key}`}
    >
      {!natural && <div style={{ paddingBottom: `${ratio}%` }} aria-hidden="true" />}
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${natural ? 'block h-auto w-auto' : 'absolute inset-0 h-full w-full'} ${
          fit === 'cover' ? 'object-cover' : 'object-contain'
        } transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}
