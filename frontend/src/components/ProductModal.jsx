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
            className="flex max-h-[88vh] w-full max-w-[330px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl sm:max-w-md md:grid md:max-w-3xl md:grid-cols-2"
          >
            {/* header: category chip + clear close */}
            <div className="flex shrink-0 items-center justify-between px-4 pt-3.5 md:px-6 md:pt-4">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold sm:text-xs"
                style={{
                  background: (CAT_STYLE[product.category] || ['#fff0f3'])[0],
                  color: (CAT_STYLE[product.category] || ['#fff0f3', '#e11d48'])[1],
                }}
                data-testid="product-modal-category"
              >
                {product.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                data-testid="product-modal-close"
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#201a17] shadow-md ring-1 ring-black/10 transition hover:bg-[#ED1B26] hover:text-white sm:h-10 sm:w-10"
              >
                <X size={17} />
              </button>
            </div>

            <div className="grid flex-1 overflow-y-auto md:grid-cols-2 md:overflow-visible">
              <div
                className="flex h-[21vh] items-center justify-center p-3 md:h-auto md:p-8"
                style={{ background: (CAT_STYLE[product.category] || ['#fff0f3'])[0] }}
              >
                <SmartImage
                  img={product.img}
                  alt={product.name}
                  eager
                  natural
                  sizes="260px"
                  className="max-h-[19vh] rounded-xl md:max-h-[300px]"
                  imgClassName="mx-auto block max-h-[19vh] w-auto md:max-h-[300px]"
                  style={{ background: 'transparent' }}
                />
              </div>

              <div className="flex flex-col gap-2.5 px-4 pb-4 pt-2.5 md:justify-center md:gap-4 md:px-8 md:pb-8 md:pt-1">
                <h3 className="font-display text-xl leading-snug text-[#201a17] sm:text-2xl md:text-4xl">
                  {product.name}
                </h3>
                {product.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {product.tags.map((t) => (
                      <li key={t} className="rounded-full border border-[#E7E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#5c544e] sm:text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-[13px] leading-relaxed text-[#5c544e] sm:text-sm">
                  من تشكيلة شركة الحياة للاستيراد والتسويق — متوفرة لدى محلات ومعارض فلسطين عبر مندوبينا.
                </p>
                <a
                  href={COMPANY.phoneHref}
                  data-testid="product-modal-call-cta"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ED1B26] px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#C4121B] sm:py-3 sm:text-sm"
                >
                  <Phone size={15} />
                  استفسر عن المنتج
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
