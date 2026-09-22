import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { COMPANY, repHref } from '../data/company';
import { scrollToId } from '../utils';
import { CandyCurve } from './Decor';

const DOTS = ['#FF4D6D', '#0284C7', '#16A34A', '#CA8A04'];

export default function Business() {
  return (
    <section id="merchants" data-testid="merchants-section" className="relative bg-[#FAF8F5] pb-20 pt-14 lg:pt-24">
      <CandyCurve fill="#FAF8F5" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FFF0F3] px-4 py-1.5 text-sm font-bold text-[#ED1B26]">
            للتجار والموزعين
          </p>
          <h2 className="font-display text-3xl leading-snug text-[#201a17] sm:text-4xl lg:text-[2.8rem]">
            شريككم لتوريد الحلويات بالجملة
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#5c544e] sm:text-lg">
            تشكيلة منتجات متنوعة — جيلي، توفي، شوكولاتة، مارشميلو، علكة ونعناع — مع فريق مندوبين
            يغطي مدن فلسطين. تواصل معنا لطلب مخزون معرضك أو متجرك.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              data-testid="merchants-contact-cta"
              className="rounded-full bg-[#ED1B26] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C4121B] hover:text-white sm:text-base"
            >
              تواصل معنا
            </button>
            <a
              href={COMPANY.phoneHref}
              data-testid="merchants-call-cta"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#201a17]/15 bg-white px-7 py-3.5 text-sm font-bold text-[#201a17] transition-all hover:-translate-y-0.5 hover:border-[#ED1B26] hover:text-[#ED1B26] sm:text-base"
            >
              <Phone size={16} />
              <span className="num-ltr">{COMPANY.phoneDisplay}</span>
            </a>
          </div>
        </motion.div>

        {/* reps */}
        <div className="grid gap-3.5" data-testid="merchants-reps-list">
          {COMPANY.reps.map((r, i) => (
            <motion.a
              key={r.id}
              href={repHref(r.phone)}
              data-testid={`merchant-rep-${r.id}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group flex items-center justify-between gap-4 rounded-[24px] border border-[#EFE9E0] bg-white px-4 py-3.5 shadow-[0_16px_30px_-26px_rgba(32,26,23,0.4)] transition-colors hover:border-[#ED1B26]/40 sm:px-6"
            >
              <div className="flex items-center gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
                  style={{ background: DOTS[i % DOTS.length] }}
                >
                  <Phone size={17} />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-[#8a8178]">مندوب المنطقة</p>
                  <p className="text-sm font-bold text-[#201a17] sm:text-base">{r.region}</p>
                </div>
              </div>
              <span className="font-display num-ltr text-xl text-[#201a17] transition-colors group-hover:text-[#ED1B26] sm:text-2xl">
                {r.phone}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
