import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { Sprinkles, Blob, CandyCurve } from './Decor';
import { HERO } from '../data/catalog';
import { COMPANY } from '../data/company';

const CHAPTERS = [
  { n: '٠١', t: 'استيراد', d: 'نختار تشكيلة حلويات وشوكولاتة من علامات عالمية معروفة ونستوردها إلى فلسطين.' },
  { n: '٠٢', t: 'تسويق', d: 'نسوّق المنتجات بحملات إعلانية ملوّنة وقريبة من الأسرة الفلسطينية.' },
  { n: '٠٣', t: 'توزيع', d: 'مندوبونا يغطون الخليل، طولكرم وقلقيلية وسلفيت، رام الله وقراها، ونابلس وجنين.' },
];

const SPRINKLES = [
  { t: '8%', l: '4%', w: 16, shape: 'dot', anim: 8 },
  { t: '86%', l: '40%', w: 20, h: 8, shape: 'pill', anim: 7 },
  { t: '14%', r: '6%', w: 14, h: 14, shape: 'arc', anim: 9 },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative bg-white pb-24 pt-20 lg:pb-32 lg:pt-24">
      <CandyCurve fill="#ffffff" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* copy */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FFF0F3] px-4 py-1.5 text-sm font-bold text-[#ED1B26]">
              من نحن
            </p>
            <h2 className="font-display text-3xl leading-snug text-[#201a17] sm:text-4xl lg:text-[2.8rem]">
              شركة الحياة للاستيراد والتسويق
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#5c544e] sm:text-lg">
              من جنين – شارع حيفا بجانب بئر السعادة، نستورد ون سوّق الحلويات والشوكولاتة،
              ونوصلها عبر مندوبينا إلى المحلات والمعارض في كل المدن الفلسطينية.
            </p>
          </motion.div>

          <div className="mt-10">
            {CHAPTERS.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5 border-t border-[#F0EAE1] py-5 last:border-b"
                data-testid={`about-chapter-${i + 1}`}
              >
                <span className="font-display text-3xl leading-none text-[#ED1B26] sm:text-4xl">{c.n}</span>
                <div>
                  <h3 className="font-display text-xl leading-none text-[#201a17]">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c544e]">{c.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* visual composition */}
        <div className="relative order-1 lg:order-2 lg:col-span-6">
          <Sprinkles items={SPRINKLES} />
          <Blob color="#FFF0F3" className="absolute -top-10 right-[-6%] w-[70%] opacity-90" />
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto w-[86%] overflow-hidden rounded-[36px] bg-[#FAF8F5] p-4 shadow-[0_36px_70px_-40px_rgba(32,26,23,0.45)]"
            data-testid="about-visual-main"
          >
            <SmartImage img={HERO.about} alt="تشكيلة حلويات الحياة" sizes="(max-width: 1024px) 90vw, 460px" className="rounded-[24px]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 left-[2%] z-20 w-36 rounded-[26px] bg-white p-2.5 shadow-[0_26px_50px_-26px_rgba(32,26,23,0.5)] sm:w-44"
            data-testid="about-visual-card"
          >
            <SmartImage img={HERO.aboutCard} alt="بوفي مارشميلو" sizes="176px" className="rounded-[18px]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute -top-6 left-[8%] z-20 rounded-full bg-white p-3 shadow-[0_20px_40px_-22px_rgba(32,26,23,0.5)]"
            data-testid="about-visual-logo"
          >
            <img src="/assets/logo/alhayat-logo.png" alt={COMPANY.nameAr} className="h-14 w-auto sm:h-16" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
