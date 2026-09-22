import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion';
import SmartImage from './SmartImage';
import ProductModal from './ProductModal';
import { PRODUCTS, CAT_STYLE } from '../data/catalog';
import { CandyCurve } from './Decor';
import { prefetchAround } from '../utils';

const IDS = ['yupo-meter', 'povi-marshmallow', 'pops-lollipops', 'cool-mint', 'choco-pako', 'yupo-worms', 'oneo-bubble', 'yupo-rencils'];
const ITEMS = IDS.map((id) => PRODUCTS.find((p) => p.id === id));

function OrbitItem({ idx, angle, size, pausedRef, selected, onSelect, onOpen }) {
  const R = size / 2 - 62;
  const step = (Math.PI * 2) / ITEMS.length;
  const offset = -idx * step;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    if (selected || pausedRef.current) return;
    const a = angle.get() + offset;
    x.set(Math.cos(a) * R);
    y.set(Math.sin(a) * R * 0.92);
  });

  useEffect(() => {
    if (selected) {
      x.set(0);
      y.set(0);
    }
  }, [selected, x, y]);

  const item = ITEMS[idx];
  const ringColor = (CAT_STYLE[item.category] || ['#fff0f3', '#e11d48'])[0];

  return (
    <motion.button
      type="button"
      data-testid={`orbit-product-${item.id}`}
      onClick={() => (selected ? onOpen(item, idx) : onSelect(idx))}
      onMouseEnter={() => onSelect(idx)}
      style={{ x, y, zIndex: selected ? 30 : Math.round(y.get()) + 10 }}
      className="absolute left-1/2 top-1/2 -ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-white p-1.5 shadow-[0_18px_36px_-20px_rgba(32,26,23,0.45)] transition-transform duration-300 hover:scale-110"
      aria-label={item.name}
    >
      <div className="grid h-full w-full place-items-center overflow-hidden rounded-full" style={{ border: `3px solid ${ringColor}` }}>
        <SmartImage img={item.img} alt={item.name} sizes="88px" className="rounded-full" />
      </div>
    </motion.button>
  );
}

function OrbitDesk({ onOpen }) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState(540);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const angle = useMotionValue(0);
  const pausedRef = useRef(false);
  const reduce = useReducedMotion();

  useAnimationFrame((t, delta) => {
    if (selected !== null || pausedRef.current || reduce) return;
    angle.set(angle.get() + delta * 0.00011);
  });

  useEffect(() => {
    const measure = () => setSize(Math.min(wrapRef.current ? wrapRef.current.offsetWidth : 540, 560));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (selected !== null) prefetchAround(ITEMS, selected, '640');
  }, [selected]);

  const cur = selected !== null ? ITEMS[selected] : null;

  return (
    <div ref={wrapRef} className="relative mx-auto hidden aspect-square w-full max-w-[560px] lg:block" data-testid="orbit-desktop">
      {/* orbit path */}
      <div className="absolute inset-10 rounded-full border-2 border-dashed border-[#E7DFD3]" aria-hidden="true" />

      <div
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => {
          pausedRef.current = false;
          setSelected(null);
        }}
        className="absolute inset-0 grid place-items-center"
      >
        {/* center */}
        <AnimatePresence mode="wait">
          {cur ? (
            <motion.div
              key={cur.id}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="z-20 flex w-64 flex-col items-center gap-2 text-center"
              data-testid="orbit-center-product"
            >
              <div
                className="w-32 rounded-[24px] p-2 shadow-lg"
                style={{ background: (CAT_STYLE[cur.category] || ['#fff0f3'])[0] }}
              >
                <SmartImage img={cur.img} alt={cur.name} sizes="128px" className="rounded-2xl" />
              </div>
              <span className="font-display text-2xl leading-none text-[#201a17]">{cur.name}</span>
              <span
                className="rounded-full px-3 py-0.5 text-[11px] font-bold"
                style={{ background: (CAT_STYLE[cur.category] || ['#fff0f3'])[0], color: (CAT_STYLE[cur.category] || ['#fff0f3', '#e11d48'])[1] }}
              >
                {cur.category}
              </span>
              <button
                type="button"
                onClick={() => onOpen(cur, selected)}
                data-testid="orbit-open-product"
                className="mt-1 rounded-full bg-[#ED1B26] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#C4121B]"
              >
                شاهد المنتج
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="hub"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="z-10 grid h-44 w-44 place-items-center rounded-full bg-[#ED1B26] text-center shadow-[0_26px_50px_-22px_rgba(237,27,38,0.6)]"
              data-testid="orbit-hub"
            >
              <div>
                <img src="/assets/logo/alhayat-logo.png" alt="" className="mx-auto h-12 w-auto rounded-xl bg-white p-1" />
                <p className="font-display mt-1.5 text-2xl leading-none text-white">اكتشف عالم الحياة</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {ITEMS.map((p, i) => (
        <OrbitItem
          key={p.id}
          idx={i}
          angle={angle}
          size={size}
          pausedRef={pausedRef}
          selected={selected === i}
          onSelect={setSelected}
          onOpen={onOpen}
        />
      ))}

      <ProductModal product={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function OrbitMobile({ onOpen }) {
  return (
    <div dir="ltr" className="no-bar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 pt-2 lg:hidden" data-testid="orbit-mobile-rail">
      {ITEMS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onOpen(p, ITEMS.indexOf(p))}
          data-testid={`orbit-mobile-product-${p.id}`}
          className="w-48 shrink-0 snap-center rounded-[26px] bg-white p-3 text-right shadow-[0_18px_36px_-26px_rgba(32,26,23,0.4)]"
        >
          <div className="rounded-[18px] p-2.5" style={{ background: (CAT_STYLE[p.category] || ['#fff0f3'])[0] }}>
            <SmartImage img={p.img} alt={p.name} sizes="176px" />
          </div>
          <div className="flex items-center justify-between px-1.5 pb-1 pt-2.5">
            <span className="text-sm font-bold text-[#201a17]">{p.name}</span>
            <span className="text-[10px] font-bold" style={{ color: (CAT_STYLE[p.category] || ['#fff0f3', '#e11d48'])[1] }}>
              {p.category}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function ProductOrbit() {
  const [modal, setModal] = useState(null);
  return (
    <section data-testid="circular-orbit-section" className="relative bg-[#FAF8F5] pb-24 pt-20 lg:pb-28">
      <CandyCurve fill="#FAF8F5" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-[#ED1B26]">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ED1B26]" />
            تجربة تفاعلية
          </p>
          <h2 className="font-display text-3xl leading-tight text-[#201a17] sm:text-4xl lg:text-5xl">
            حرّك الماوس على الحلوى.. وخليها تجي إلك
          </h2>
        </div>
        <div className="mt-12">
          <OrbitDesk onOpen={(p) => setModal(p)} />
          <OrbitMobile onOpen={(p) => setModal(p)} />
        </div>
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
