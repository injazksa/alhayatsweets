import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import SmartImage from './SmartImage';
import { COMPANY } from '../data/company';
import { CAT_STYLE } from '../data/catalog';

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-[#201a17]/45 p-4 backdrop-blur-sm"
          onClick={onClose}
          data-testid="product-modal-backdrop"
        >
          <motion.div
            key="panel"
            initial={{ scale: 0.9, y: 26, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 14, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="product-modal"
            className="relative grid w-full max-w-3xl gap-0 overflow-hidden rounded-[32px] bg-white shadow-2xl md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              data-testid="product-modal-close"
              className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#201a17] shadow transition hover:bg-[#ED1B26] hover:text-white"
            >
              <X size={18} />
            </button>

            <div
              className="grid place-items-center p-8 sm:p-10"
              style={{ background: (CAT_STYLE[product.category] || ['#fff0f3'])[0] }}
            >
              <SmartImage
                img={product.img}
                alt={product.name}
                sizes="(max-width: 768px) 90vw, 320px"
                className="w-full max-w-[300px] rounded-3xl"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: (CAT_STYLE[product.category] || ['#fff0f3'])[0],
                    color: (CAT_STYLE[product.category] || ['#fff0f3', '#e11d48'])[1],
                  }}
                >
                  {product.category}
                </span>
              </div>
              <h3 className="font-display text-3xl leading-snug text-[#201a17] sm:text-4xl">
                {product.name}
              </h3>
              {product.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <li key={t} className="rounded-full border border-[#E7E0D8] bg-[#FAF8F5] px-3 py-1 text-xs font-semibold text-[#5c544e]">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm leading-relaxed text-[#5c544e]">
                من تشكيلة شركة الحياة للاستيراد والتسويق — متوفرة لدى محلات ومعارض فلسطين عبر مندوبينا.
              </p>
              <a
                href={COMPANY.phoneHref}
                data-testid="product-modal-call-cta"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ED1B26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#C4121B]"
              >
                <Phone size={16} />
                استفسر عن المنتج
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
