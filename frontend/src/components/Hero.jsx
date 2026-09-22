import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmartImage from './SmartImage';
import { Sprinkles, Squiggle } from './Decor';
import { scrollToId } from '../utils';
import { HERO } from '../data/catalog';

const lineReveal = {
  hidden: { y: '115%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.14 },
  }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.12 },
  }),
};

const SPRINKLES = [
  { t: '12%', r: '4%', w: 14, shape: 'dot', anim: 7 },
  { t: '20%', l: '3%', w: 22, h: 9, shape: 'pill', anim: 8 },
  { t: '68%', r: '2%', w: 18, h: 18, shape: 'arc', anim: 9 },
  { t: '82%', l: '8%', w: 12, shape: 'dot', anim: 6 },
  { t: '46%', l: '1%', w: 26, h: 10, shape: 'pill', anim: 10 },
  { t: '6%', l: '30%', w: 16, shape: 'arc', anim: 7.5 },
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const yA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 45]);

  return (
    <section id="home" ref={ref} data-testid="hero-section" className="relative overflow-hidden pb-20 pt-24 sm:pt-28 lg:pb-28 lg:pt-36">
      {/* soft organic background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#FFF0F3]" />
        <div className="absolute bottom-[-30%] left-[-12%] h-[520px] w-[520px] rounded-full bg-[#FEF9EC]" />
        <div className="absolute left-[38%] top-[8%] h-40 w-40 rounded-full bg-[#F0F9FF] opacity-80" />
      </div>
      <Sprinkles items={SPRINKLES} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* copy — right side in RTL */}
        <div className="lg:col-span-6">
          <motion.img
            src="/assets/logo/alhayat-logo.png"
            alt="شركة الحياة للاستيراد والتسويق"
            className="h-16 w-auto sm:h-20"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
          />

          <h1 className="font-display mt-6 text-[2.7rem] leading-[1.14] text-[#201a17] sm:text-6xl lg:text-[3.55rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" variants={lineReveal} custom={0} initial="hidden" animate="show">
                الحياة أحلى
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" variants={lineReveal} custom={1} initial="hidden" animate="show">
                <span className="text-[#ED1B26]">مع الحلو</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-md text-base leading-relaxed text-[#5c544e] sm:text-lg"
          >
            شركة الحياة للاستيراد والتسويق – جنين، فلسطين. نستورد ون سوّق الحلويات
            والشوكولاتة، ونوصلها عبر مندوبينا إلى كل المدن الفلسطينية.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show" className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId('products')}
              data-testid="hero-cta-products"
              className="rounded-full bg-[#ED1B26] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_30px_-14px_rgba(237,27,38,0.55)] transition-all hover:-translate-y-0.5 hover:bg-[#C4121B] hover:text-white sm:text-base"
            >
              استكشف منتجاتنا
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              data-testid="hero-cta-contact"
              className="rounded-full border-2 border-[#201a17]/15 bg-white/70 px-7 py-3.5 text-sm font-bold text-[#201a17] transition-all hover:-translate-y-0.5 hover:border-[#ED1B26] hover:text-[#ED1B26] sm:text-base"
            >
              تواصل معنا
            </button>
          </motion.div>
        </div>

        {/* floating product collage */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto h-[430px] max-w-[560px] sm:h-[520px]">
            <motion.div style={{ y: yMain }} className="absolute inset-x-0 top-6 z-10 mx-auto w-[76%]">
              <div className="floaty" style={{ '--dur': '7s' }}>
                <div
                  className="overflow-hidden bg-[#FFF0F3] p-6 shadow-[0_30px_60px_-30px_rgba(32,26,23,0.35)]"
                  style={{ borderRadius: '58% 42% 55% 45% / 48% 52% 48% 52%' }}
                >
                  <SmartImage img={HERO.main} alt="يوبو ميتر – أشرطة الجيلي بنكهات متعددة" eager sizes="(max-width: 1024px) 70vw, 380px" />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: yA }} className="absolute -top-2 right-[2%] z-20 w-32 sm:w-44">
              <div className="floaty rounded-[26px] bg-white p-2.5 shadow-[0_24px_45px_-24px_rgba(32,26,23,0.4)]" style={{ '--tilt': '-5deg', '--dur': '6s' }}>
                <SmartImage img={HERO.floatA} alt="بوفي مارشميلو" eager sizes="(max-width: 1024px) 30vw, 170px" className="rounded-[18px]" />
              </div>
            </motion.div>

            <motion.div style={{ y: yB }} className="absolute bottom-2 left-[2%] z-20 w-28 sm:w-40">
              <div className="floaty rounded-[26px] bg-white p-2.5 shadow-[0_24px_45px_-24px_rgba(32,26,23,0.4)]" style={{ '--tilt': '4deg', '--dur': '8s' }}>
                <SmartImage img={HERO.floatB} alt="مصاصات بنكهات مشكلة" eager sizes="(max-width: 1024px) 28vw, 150px" className="rounded-[18px]" />
              </div>
            </motion.div>

            <Squiggle color="#ED1B26" className="absolute -left-2 top-[6%] w-24 opacity-70 sm:w-32" />
            <Squiggle color="#16A34A" className="absolute bottom-[2%] right-[10%] w-20 rotate-180 opacity-60 sm:w-24" />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        type="button"
        onClick={() => scrollToId('discovery')}
        data-testid="hero-scroll-cue"
        aria-label="اسحب لاكتشاف عالمنا"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-[#5c544e] transition-colors hover:text-[#ED1B26] sm:flex"
      >
        اسحب لاكتشاف عالمنا
        <ChevronDown size={18} className="cue-dip" />
      </button>
    </section>
  );
}
