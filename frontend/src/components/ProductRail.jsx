import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { PRODUCTS, CAT_STYLE } from '../data/catalog';
import { CandyCurve } from './Decor';

const CARD_W = 224;
const GAP = 24;

export default function ProductRail() {
  const [active, setActive] = useState(5);
  const [vw, setVw] = useState(1200);
  const vpRef = useRef(null);
  const x = useMotionValue(0);
  const step = CARD_W + GAP;
  const total = PRODUCTS.length;

  const snapX = (i) => vw / 2 - CARD_W / 2 - i * step;

  useEffect(() => {
    const measure = () => setVw(vpRef.current ? vpRef.current.offsetWidth : window.innerWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    x.set(snapX(active));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    animate(x, snapX(active), { type: 'spring', stiffness: 200, damping: 30 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, vw]);

  const go = (d) => setActive((a) => Math.min(total - 1, Math.max(0, a + d)));
  const onDragEnd = (e, info) => {
    const projected = x.get() + info.velocity.x * 0.18;
    const idx = Math.round((snapX(0) - projected) / step);
    setActive(Math.min(total - 1, Math.max(0, idx)));
  };

  const cur = PRODUCTS[active];
  const curStyle = CAT_STYLE[cur.category] || ['#fff0f3', '#e11d48'];

  return (
    <section id="discovery" data-testid="product-rail-section" className="relative bg-[#F3EFE9] pb-24 pt-20 lg:pb-28 lg:pt-24">
      <CandyCurve fill="#F3EFE9" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#ED1B26]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ED1B26]" />
              منتجاتنا
            </p>
            <h2 className="font-display text-3xl leading-tight text-[#201a17] sm:text-4xl lg:text-5xl">
              اكتشف التشكيلة قطعة قطعة
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="المنتج التالي"
              data-testid="rail-next-button"
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="المنتج السابق"
              data-testid="rail-prev-button"
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div ref={vpRef} dir="ltr" className="relative mt-10 cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.div
          drag="x"
          style={{ x }}
          onDragEnd={onDragEnd}
          dragConstraints={{ left: snapX(total - 1) - 60, right: snapX(0) + 60 }}
          dragElastic={0.08}
          className="flex w-max gap-6 px-6"
          data-testid="product-rail-track"
        >
          {PRODUCTS.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                data-testid={`rail-product-${p.id}`}
                animate={{
                  scale: isActive ? 1.09 : 0.92,
                  opacity: isActive ? 1 : 0.55,
                  y: isActive ? -8 : 0,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                className="relative w-56 shrink-0 rounded-[28px] bg-white p-3 text-right shadow-[0_18px_36px_-26px_rgba(32,26,23,0.35)]"
                style={{ zIndex: isActive ? 10 : 1 }}
              >
                <div className="rounded-[20px] p-3" style={{ background: (CAT_STYLE[p.category] || ['#fff0f3'])[0] }}>
                  <SmartImage img={p.img} alt={p.name} sizes="224px" />
                </div>
                <div className="flex items-center justify-between gap-2 px-1.5 pb-1.5 pt-3">
                  <span className="text-sm font-bold text-[#201a17]">{p.name}</span>
                  <span className="text-[10px] font-bold" style={{ color: (CAT_STYLE[p.category] || ['#fff0f3', '#e11d48'])[1] }}>
                    {p.category}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center"
            data-testid="rail-active-product"
          >
            <span className="font-display text-2xl text-[#201a17] sm:text-3xl">{cur.name}</span>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: curStyle[0], color: curStyle[1] }}>
              {cur.category}
            </span>
            {cur.tags.map((t) => (
              <span key={t} className="rounded-full border border-[#E2DCD3] bg-white px-3 py-1 text-xs font-semibold text-[#5c544e]">
                {t}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
