const ITEMS = ['جيلي', 'مارشميلو', 'توفي', 'شوكولاتة', 'علكة', 'نعناع', 'مصاصات', 'حلوى فواكه'];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 -my-2 -rotate-1 overflow-hidden bg-[#ED1B26] py-3.5" data-testid="marquee-band" aria-hidden="true">
      <div className="marquee-track flex w-max flex-row-reverse items-center">
        {row.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display text-xl leading-none text-[#FAF8F5]">
            <span className="px-6">{it}</span>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FAF8F5]/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
