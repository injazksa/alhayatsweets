import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SmartImage from './SmartImage';
import ProductModal from './ProductModal';
import { PRODUCTS, CATEGORIES, CAT_STYLE } from '../data/catalog';
import { CandyCurve } from './Decor';
import { prefetchAround } from '../utils';

const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  'lg:row-span-2',
  '',
  'lg:col-span-2',
  '',
  '',
  'lg:col-span-2',
  '',
  '',
  '',
];

export default function Catalog() {
  const [cat, setCat] = useState('الكل');
  const [modal, setModal] = useState(null);

  const filtered = useMemo(
    () => (cat === 'الكل' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat]
  );

  const openProduct = (p, i) => {
    prefetchAround(filtered, i, '640');
    setModal(p);
  };

  return (
    <section id="products" data-testid="category-filter-section" className="relative bg-[#F6F1EA] pb-20 pt-14 lg:pt-24">
      <CandyCurve fill="#F6F1EA" className="absolute -top-1 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#ED1B26]">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ED1B26]" />
            التشكيلة الكاملة
          </p>
          <h2 className="font-display text-3xl leading-tight text-[#201a17] sm:text-4xl lg:text-5xl">
            منوّعين للحلو.. لكل الأذواق
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#5c544e]">
            جيلي، توفي، شوكولاتة، مارشميلو، علكة، نعناع ومصاصات — كلها متوفرة عبر مندوبينا في فلسطين.
          </p>
        </div>

        {/* category chips — candy pills */}
        <div dir="rtl" className="no-bar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" data-testid="category-chips-row">
          {CATEGORIES.map((c) => {
            const isActive = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                data-testid={`category-btn-${c.replace(/\s/g, '-')}`}
                className={`whitespace-nowrap rounded-full border text-xs font-bold transition-all sm:text-sm ${
                  isActive
                    ? 'border-transparent bg-[#ED1B26] px-4 py-2 text-white shadow-[0_12px_24px_-12px_rgba(237,27,38,0.6)] sm:px-5 sm:py-2.5'
                    : 'border-[#E5DED4] bg-white text-[#5c544e] hover:border-[#ED1B26] hover:text-[#ED1B26]'
                }`}
                style={!isActive ? { padding: '6px 14px' } : undefined}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* editorial shelf — product imagery first, chrome minimal */}
        <motion.div
          layout
          className="mt-7 grid auto-rows-[minmax(185px,auto)] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:auto-rows-[minmax(260px,auto)]"
          data-testid="products-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const tint = CAT_STYLE[p.category] || ['#fff0f3', '#e11d48'];
              const span = cat === 'الكل' ? SPANS[i % SPANS.length] : '';
              return (
                <motion.button
                  layout
                  key={p.id}
                  type="button"
                  onClick={() => openProduct(p, i)}
                  data-testid={`product-card-${p.id}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -7 }}
                  className={`group flex flex-col overflow-hidden rounded-[28px] text-right shadow-[0_20px_40px_-30px_rgba(32,26,23,0.45)] ${span}`}
                  style={{ background: '#fff' }}
                >
                  <div className="relative flex-1 overflow-hidden p-2" style={{ background: tint[0] }}>
                    <SmartImage
                      img={p.img}
                      alt={p.name}
                      sizes="(max-width: 768px) 46vw, 320px"
                      className="rounded-[20px]"
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute right-3.5 top-3.5 rounded-full px-3 py-1 text-[10px] font-bold"
                      style={{ background: '#ffffffee', color: tint[1] }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <div className="px-4 pb-3.5 pt-3">
                    <span className="text-sm font-bold text-[#201a17] sm:text-base">{p.name}</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
