import { motion } from 'framer-motion';
import { Phone, Facebook, MapPin, Mail } from 'lucide-react';
import { COMPANY, MAPS_URL } from '../data/company';
import { CandyCurve } from './Decor';

export default function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="relative bg-[#ED1B26] pb-16 pt-14 lg:pt-24">
      <CandyCurve fill="#ED1B26" className="absolute -top-1 left-0 right-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#C4121B]/60" />
        <span className="absolute left-[12%] top-[22%] h-4 w-4 rounded-full bg-white/40" />
        <span className="absolute right-[18%] top-[64%] h-3 w-3 rounded-full bg-white/30" />
        <span className="absolute right-[42%] top-[12%] h-5 w-8 rounded-full bg-white/25" style={{ transform: 'rotate(-24deg)' }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-bold tracking-wide text-white/80">تواصل معنا</p>
          <h2 className="font-display text-[1.95rem] leading-snug text-white sm:text-5xl">
            جاهزين نخدمك.. ومذاقنا بيوصلك
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
            {COMPANY.nameAr} — للاستفسار عن المنتجات أو الطلبات بالجملة، إتصل أو زورنا في جنين.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={COMPANY.phoneHref}
            data-testid="contact-call-cta"
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#ED1B26] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#FFF0F3] sm:px-8 sm:py-4 sm:text-base"
          >
            <Phone size={18} />
            اتصل بنا
            <span className="num-ltr text-sm font-bold text-[#201a17]">{COMPANY.phoneDisplay}</span>
          </a>
          <a
            href={COMPANY.facebook}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-facebook-cta"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-white/60 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#ED1B26] sm:px-7 sm:py-4 sm:text-base"
          >
            <Facebook size={18} />
            صفحتنا على فيسبوك
          </a>
          {!COMPANY.email ? (
            <span
              title="سيتم تفعيل البريد الإلكتروني قريباً بعد تفعيل بريد نطاق الشركة"
              data-testid="contact-email-placeholder"
              className="inline-flex cursor-default items-center gap-2.5 rounded-full border-2 border-dashed border-white/45 px-7 py-4 text-sm font-semibold text-white/75"
            >
              <Mail size={17} />
              البريد الإلكتروني — قريباً
            </span>
          ) : (
            <a
              href={`mailto:${COMPANY.email}`}
              data-testid="contact-email-cta"
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-white/60 px-6 py-3.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#ED1B26] sm:px-7 sm:py-4 sm:text-base"
            >
              <Mail size={17} />
              راسلنا بالبريد
              <span className="num-ltr text-xs font-bold sm:text-sm">{COMPANY.email}</span>
            </a>
          )}
        </motion.div>

        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="contact-address-card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-3xl bg-white/10 px-5 py-4 text-white transition-colors hover:bg-white/15 sm:px-7 sm:py-5"
        >
          <MapPin size={20} className="shrink-0" />
          <span className="text-base font-bold">{COMPANY.address}</span>
          <span className="text-xs text-white/75">— عرض على الخريطة</span>
        </motion.a>
      </div>
    </section>
  );
}
