import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SmartImage from './SmartImage';
import { CAMPAIGNS } from '../data/catalog';
import { CandyCurve } from './Decor';
import { prefetchAround } from '../utils';

const GAP = 20;

export default function Campaigns() {
  const [idx, setIdx] = useState(1);
  const [m, setM] = useState({ vw: 1200, sw: 640 });
  const [zoom, setZoom] = useState(null);
  const vpRef = useRef(null);
  const x = useMotionValue(0);

  const total = CAMPAIGNS.length;
  const snapX = (i) => m.vw / 2 - m.sw / 2 - i * (m.sw + GAP);

  useEffect(() => {
    const measure = () => {
      const vw = vpRef.current ? vpRef.current.offsetWidth : window.innerWidth;
      const ratio = vw >= 1024 ? 0.56 : vw >= 640 ? 0.72 : 0.86;
      setM({ vw, sw: Math.round(vw * ratio) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    x.set(snapX(idx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    animate(x, snapX(idx), { type: 'spring', stiffness: 190, damping: 30 });
    prefetchAround(CAMPAIGNS, idx, '640');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, m]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === 'Escape' && setZoom(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom]);

  const go = (d) => setIdx((a) => Math.min(total - 1, Math.max(0, a + d)));
  const onDragEnd = (e, info) => {
    const projected = x.get() + info.velocity.x * 0.22;
    const next = Math.round((snapX(0) - projected) / (m.sw + GAP));
    setIdx(Math.min(total - 1, Math.max(0, next)));
  };

  const activeTint = CAMPAIGNS[idx].tint;

  return (
    <section id="ads" data-testid="campaigns-section" className="relative overflow-hidden bg-white pb-20 pt-14 lg:pt-24">
      <CandyCurve fill="#ffffff" className="absolute -top-1 left-0 right-0" />
      {/* ambient glow influenced by the active campaign color */}
      <motion.div
        aria-hidden="true"
        animate={{ backgroundColor: activeTint }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="pointer-events-none absolute left-1/2 top-[46%] h-[560px] w-[120vw] -translate-x-1/2 rounded-full opacity-45 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#ED1B26]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ED1B26]" />
              إعلاناتنا
            </p>
            <h2 className="font-display text-3xl leading-tight text-[#201a17] sm:text-4xl lg:text-5xl">
              حملات صرخت بالألوان
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#5c544e]">
              من إبداعاتنا الدعائية لمنتجاتنا — اسحب، واضغط على الحملة لتشوفها بالكامل.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display num-ltr text-lg text-[#5c544e]" data-testid="campaigns-counter">
              {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="الحملة التالية"
                data-testid="campaigns-next-button"
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="الحملة السابقة"
                data-testid="campaigns-prev-button"
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={vpRef} dir="ltr" className="relative mt-6 cursor-grab overflow-hidden active:cursor-grabbing sm:mt-10">
        <motion.div
          drag="x"
          style={{ x }}
          onDragEnd={onDragEnd}
          dragConstraints={{ left: snapX(total - 1) - 80, right: snapX(0) + 80 }}
          dragElastic={0.09}
          className="flex w-max gap-5 px-6"
          data-testid="campaigns-track"
        >
          {CAMPAIGNS.map((c, i) => {
            const isActive = i === idx;
            return (
              <div
                key={c.id}
                dir="rtl"
                style={{ width: m.sw || undefined }}
                className={`shrink-0 ${isActive ? 'cursor-zoom-in' : 'cursor-pointer'}`}
                onClick={() => (isActive ? setZoom(c) : setIdx(i))}
                data-testid={`campaign-card-${c.id}`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1 : 0.94, opacity: isActive ? 1 : 0.6 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className="overflow-hidden rounded-[30px] p-2.5 shadow-[0_40px_80px_-44px_rgba(32,26,23,0.55)] sm:p-4"
                  style={{ background: c.tint }}
                >
                  <SmartImage
                    img={c.img}
                    alt={`الحملة الإعلانية: ${c.name} — ${c.note}`}
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 72vw, 56vw"
                    className="rounded-[20px]"
                    eager={i >= 1 && i <= 3}
                  />
                  <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-2.5 sm:pt-3.5">
                    <span className="font-display text-base leading-none text-[#201a17] sm:text-xl">{c.name}</span>
                    <span className="text-[10px] font-semibold text-[#8a8178] sm:text-[11px]">{c.note}</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* progress bar */}
      <div className="relative mx-auto mt-8 h-1 w-40 max-w-[60%] overflow-hidden rounded-full bg-white shadow-sm">
        <motion.div
          className="h-full rounded-full bg-[#ED1B26]"
          animate={{ width: `${((idx + 1) / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          data-testid="campaigns-progress"
        />
      </div>

      {/* immersive lightbox — the campaign expands to full presentation */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-[#201a17]/92 p-4 backdrop-blur-sm"
            onClick={() => setZoom(null)}
            data-testid="campaign-lightbox"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="relative w-[94vw] max-w-md rounded-[24px] bg-[#241a19] p-2.5 shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
              data-testid="campaign-lightbox-panel"
            >
              <button
                type="button"
                onClick={() => setZoom(null)}
                aria-label="إغلاق العرض"
                data-testid="campaign-lightbox-close"
                className="absolute left-3.5 top-3.5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-[#ED1B26]"
              >
                <X size={18} />
              </button>
              <SmartImage
                img={zoom.img}
                alt={`الحملة الإعلانية: ${zoom.name}`}
                sizes="90vw"
                eager
                natural
                className="rounded-[18px]"
                imgClassName="mx-auto max-h-[64vh] w-auto max-w-full rounded-[14px]"
                style={{ background: 'transparent' }}
              />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-2.5 text-white">
                <span className="font-display text-lg leading-none">{zoom.name}</span>
                <span className="text-[10px] text-white/75 sm:text-xs">{zoom.note}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
