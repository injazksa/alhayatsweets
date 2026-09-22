import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Facebook, Mail } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '../data/company';
import { scrollToId } from '../utils';

const DOT_COLORS = ['#ED1B26', '#FF4D6D', '#0284C7', '#16A34A', '#CA8A04', '#9333EA'];

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 220 : 0);
  };

  return (
    <>
      <header
        data-testid="nav-container"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled && !open
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
            {/* animated hamburger — morphs into an X */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={open}
              data-testid="nav-menu-toggle"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-[#201a17] shadow-md lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? 'rotate-45' : '-translate-y-[5px]'
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? 'rotate-[-45deg]' : 'translate-y-[5px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* confectionery package panel — unfolds like a candy wrapper */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="candy-menu"
            initial={{ clipPath: 'circle(0% at 8% 5%)' }}
            animate={{ clipPath: 'circle(150% at 8% 5%)' }}
            exit={{ clipPath: 'circle(0% at 8% 5%)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#FAF8F5] lg:hidden"
            data-testid="mobile-menu"
          >
            {/* soft candy decoration */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-20 right-[-15%] h-72 w-72 rounded-full bg-[#FFF0F3]" />
              <div className="absolute bottom-[-10%] left-[-12%] h-80 w-80 rounded-full bg-[#FEF9EC]" />
              <span className="absolute right-[16%] top-[38%] h-3 w-3 rounded-full bg-[#0284C7]/50" />
              <span className="absolute left-[14%] top-[30%] h-2.5 w-6 rounded-full bg-[#16A34A]/40" style={{ transform: 'rotate(-20deg)' }} />
              <span className="absolute right-[10%] bottom-[24%] h-2.5 w-2.5 rounded-full bg-[#ED1B26]/40" />
            </div>

            <div className="relative flex items-center justify-between px-4 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق القائمة"
                data-testid="mobile-menu-close-btn"
                className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-[#201a17] shadow-md"
              >
                <span className="absolute h-[2px] w-5 rotate-45 rounded-full bg-current" />
                <span className="absolute h-[2px] w-5 rotate-[-45deg] rounded-full bg-current" />
              </button>
              <img src="/assets/logo/alhayat-logo.png" alt={COMPANY.nameAr} className="h-11 w-auto" />
              <span className="h-11 w-11" aria-hidden="true" />
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-7" aria-label="قائمة الجوال">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  data-testid={`mobile-nav-link-${l.id}`}
                  initial={{ opacity: 0, x: 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 font-display text-[2rem] leading-none transition-colors ${
                    active === l.id ? 'text-[#ED1B26]' : 'text-[#201a17] hover:text-[#ED1B26]'
                  }`}
                >
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-full transition-colors"
                    style={{ background: active === l.id ? '#ED1B26' : DOT_COLORS[i % DOT_COLORS.length] + '55' }}
                    aria-hidden="true"
                  />
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-2.5 px-7 pb-10"
            >
              <a
                href={COMPANY.phoneHref}
                data-testid="mobile-menu-call-cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ED1B26] px-5 py-3.5 text-sm font-bold text-white"
              >
                <Phone size={16} />
                اتصل بنا
                <span className="num-ltr">{COMPANY.phoneDisplay}</span>
              </a>
              <div className="flex gap-2.5">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="mobile-menu-facebook-link"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E7E0D8] bg-white px-4 py-3 text-xs font-bold text-[#201a17]"
                >
                  <Facebook size={15} />
                  فيسبوك
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  data-testid="mobile-menu-email-link"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E7E0D8] bg-white px-4 py-3 text-xs font-bold text-[#201a17]"
                >
                  <Mail size={15} />
                  <span className="num-ltr">{COMPANY.email}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
