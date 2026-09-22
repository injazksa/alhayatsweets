import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Facebook } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '../data/company';
import { scrollToId } from '../utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <header
        data-testid="nav-container"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF8F5]/85 shadow-[0_1px_0_#EDE7DE,0_14px_34px_-22px_rgba(32,26,23,0.35)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? 'py-2' : 'py-4'
          }`}
        >
          <a href="#home" onClick={go('home')} data-testid="nav-logo-link" aria-label={COMPANY.nameAr}>
            <img
              src="/assets/logo/alhayat-logo.png"
              alt={COMPANY.nameAr}
              className={`${scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'} w-auto transition-all duration-300`}
            />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="القائمة الرئيسية">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                data-testid={`nav-link-${l.id}`}
                className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors xl:px-4 xl:text-sm ${
                  active === l.id ? 'text-[#ED1B26]' : 'text-[#5c544e] hover:text-[#201a17]'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={go('contact')}
              data-testid="nav-contact-cta"
              className="hidden rounded-full bg-[#ED1B26] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#C4121B] hover:text-white sm:inline-flex"
            >
              تواصل معنا
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="فتح القائمة"
              data-testid="nav-menu-open"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#201a17] shadow-md lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#FAF8F5] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <img src="/assets/logo/alhayat-logo.png" alt={COMPANY.nameAr} className="h-11 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق القائمة"
                data-testid="nav-menu-close"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#201a17] shadow-md"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="قائمة الجوال">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  data-testid={`mobile-nav-link-${l.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl px-4 py-4 font-display text-3xl leading-none text-[#201a17] transition-colors hover:bg-[#FFF0F3] hover:text-[#ED1B26]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-3 px-6 pb-10">
              <a
                href={COMPANY.phoneHref}
                data-testid="mobile-menu-call-cta"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ED1B26] px-5 py-3.5 text-sm font-bold text-white"
              >
                <Phone size={16} />
                <span className="num-ltr">{COMPANY.phoneDisplay}</span>
              </a>
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="صفحة الفيسبوك"
                data-testid="mobile-menu-facebook-link"
                className="grid h-12 w-12 place-items-center rounded-full border border-[#E7E0D8] bg-white text-[#201a17]"
              >
                <Facebook size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
