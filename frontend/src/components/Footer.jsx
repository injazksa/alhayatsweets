import { Phone, Facebook, MapPin, Mail } from 'lucide-react';
import { COMPANY, NAV_LINKS, MAPS_URL } from '../data/company';
import { scrollToId } from '../utils';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="footer-section" className="bg-[#1B1310] pb-10 pt-16 text-[#EDE7DE]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }} data-testid="footer-logo-link" aria-label={COMPANY.nameAr}>
            <img src="/assets/logo/alhayat-logo.png" alt={COMPANY.nameAr} className="h-20 w-auto rounded-2xl bg-white p-2.5" />
          </a>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="روابط الفوتر">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                data-testid={`footer-link-${l.id}`}
                className="text-sm font-semibold text-[#EDE7DE]/85 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-sm">
            <a href={COMPANY.phoneHref} data-testid="footer-call-link" className="inline-flex items-center gap-2.5 font-semibold transition-colors hover:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Phone size={14} /></span>
              <span className="num-ltr">{COMPANY.phoneDisplay}</span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" data-testid="footer-address-link" className="inline-flex items-center gap-2.5 text-[#EDE7DE]/85 transition-colors hover:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><MapPin size={14} /></span>
              {COMPANY.address}
            </a>
            <a href={`mailto:${COMPANY.email}`} data-testid="footer-email-link" className="inline-flex items-center gap-2.5 text-[#EDE7DE]/85 transition-colors hover:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Mail size={14} /></span>
              <span className="num-ltr">{COMPANY.email}</span>
            </a>
            <a href={COMPANY.facebook} target="_blank" rel="noreferrer" data-testid="footer-facebook-link" className="inline-flex items-center gap-2.5 text-[#EDE7DE]/85 transition-colors hover:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Facebook size={14} /></span>
              صفحة الفيسبوك
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#EDE7DE]/60">
          <span data-testid="footer-copyright">© {year} شركة الحياة للاستيراد والتسويق — جميع الحقوق محفوظة</span>
          <span>جنين، فلسطين</span>
        </div>
      </div>
    </footer>
  );
}
