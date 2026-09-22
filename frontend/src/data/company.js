export const COMPANY = {
  nameAr: 'شركة الحياة للاستيراد والتسويق',
  nameEn: 'Al-Hayat Co. For Sweets, Import and Marketing',
  short: 'الحياة',
  line: 'نستورد ون سوّق الحلويات والشوكولاتة، ونوصلها عبر مندوبينا إلى كل المدن الفلسطينية.',
  phoneDisplay: '+972 4 250 3432',
  phoneHref: 'tel:+97242503432',
  address: 'جنين – شارع حيفا، بجانب بئر السعادة',
  region: 'فلسطين',
  facebook: 'https://www.facebook.com/profile.php?id=100064555247536',
  facebookHandle: 'alhayat_company24',
  email: 'Info@alhayatsweets.com',
  reps: [
    { id: 'hebron', region: 'الخليل', phone: '0598850425' },
    { id: 'tulkarm', region: 'طولكرم وقلقيلية وسلفيت', phone: '0592850416' },
    { id: 'ramallah', region: 'رام الله وقراها', phone: '0592850435' },
    { id: 'nablus', region: 'نابلس وجنين', phone: '0598850418' },
  ],
};

export const repHref = (phone) => `tel:+970${phone}`;

export const NAV_LINKS = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'من نحن' },
  { id: 'products', label: 'منتجاتنا' },
  { id: 'ads', label: 'إعلاناتنا' },
  { id: 'merchants', label: 'للتجار والموزعين' },
  { id: 'contact', label: 'تواصل معنا' },
];

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('شركة الحياة للاستيراد والتسويق جنين شارع حيفا');
