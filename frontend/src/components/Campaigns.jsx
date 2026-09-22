import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { CAMPAIGNS } from '../data/catalog';
import { CandyCurve } from './Decor';

const GAP = 20;

export default function Campaigns() {
  const [idx, setIdx] = useState(1);
  const [m, setM] = useState({ vw: 1200, sw: 640 });
  const vpRef = useRef(null);
  const slideRef = useRef(null);
  const x = useMotionValue(0);

  const total = CAMPAIGNS.length;
  const snapX = (i) => m.vw / 2 - m.sw / 2 - i * (m.sw + GAP);

  useEffect(() => {
    const measure = () => {
      const vw = vpRef.current ? vpRef.current.offsetWidth : window.innerWidth;
      const ratio = vw >= 1024 ? 0.44 : vw >= 640 ? 0.58 : 0.82;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, m]);

  const go = (d) => setIdx((a) => Math.min(total - 1, Math.max(0, a + d)));
  const onDragEnd = (e, info) => {
    const projected = x.get() + info.velocity.x * 0.22;
    const next = Math.round((snapX(0) - projected) / (m.sw + GAP));
    setIdx(Math.min(total - 1, Math.max(0, next)));
  };

  return (
    <section id="ads" data-testid="campaigns-section" className="relative bg-white pb-28 pt-20 lg:pt-24">
      <CandyCurve fill="#ffffff" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              من إبداعاتنا الدعائية لمنتجاتنا — اسحب وشوف الحملة اللي بتعجبك.
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
                className="grid h-12 w-12 place-items-center rounded-full bg-[#FAF8F5] text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="الحملة السابقة"
                data-testid="campaigns-prev-button"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#FAF8F5] text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={vpRef} dir="ltr" className="relative mt-10 cursor-grab overflow-hidden active:cursor-grabbing">
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
                ref={i === 0 ? slideRef : undefined}
                dir="rtl"
                style={{ width: m.sw || undefined }}
                className={`shrink-0 ${isActive ? '' : 'cursor-pointer'}`}
                onClick={() => !isActive && setIdx(i)}
                data-testid={`campaign-card-${c.id}`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.55 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className="overflow-hidden rounded-[30px] p-4 shadow-[0_30px_60px_-36px_rgba(32,26,23,0.5)]"
                  style={{ background: c.tint }}
                >
                  <SmartImage
                    img={c.img}
                    alt={`الحملة الإعلانية: ${c.name} — ${c.note}`}
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 44vw"
                    className="rounded-[20px]"
                    eager={i >= 1 && i <= 3}
                  />
                  <div className="flex items-center justify-between gap-3 px-2 pb-1.5 pt-3">
                    <span className="font-display text-lg leading-none text-[#201a17]">{c.name}</span>
                    <span className="text-[11px] font-semibold text-[#8a8178]">{c.note}</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* progress bar */}
      <div className="mx-auto mt-8 h-1 w-40 max-w-[60%] overflow-hidden rounded-full bg-[#EDE7DE]">
        <motion.div
          className="h-full rounded-full bg-[#ED1B26]"
          animate={{ width: `${((idx + 1) / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          data-testid="campaigns-progress"
        />
      </div>
    </section>
  );
}
