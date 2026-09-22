import manifest from './data_images.json';

const P = manifest.products;
const C = manifest.campaigns;
const img = (map, key) => ({ key, ...map[key] });

// tint pairs per category: [background, chip text color]
export const CAT_STYLE = {
  'جيلي': ['#fff0f3', '#e11d48'],
  'توفي': ['#fff7e8', '#c97b1d'],
  'شوكولاتة': ['#f7efe6', '#7c4a21'],
  'مارشميلو': ['#faf5ff', '#9333ea'],
  'علكة': ['#f0f9ff', '#0284c7'],
  'حلوى ونعناع': ['#f0fdf4', '#15803d'],
  'مصاصات': ['#fefce8', '#a16207'],
  'زينة كيك': ['#fdf2f8', '#db2777'],
};

export const CATEGORIES = [
  'الكل',
  'جيلي',
  'توفي',
  'شوكولاتة',
  'مارشميلو',
  'علكة',
  'حلوى ونعناع',
  'مصاصات',
  'زينة كيك',
];

export const PRODUCTS = [
  { id: 'yupo-piton', name: 'يوبو بيتون', category: 'جيلي', tags: ['بعصير فواكه', 'بدون جلوتين'], img: img(P, 'yupo-piton') },
  { id: 'ulker-toffee', name: 'أولكر توفي', category: 'توفي', tags: ['كاراميل'], img: img(P, 'ulker-toffee') },
  { id: 'yupo-worms', name: 'يوبو وورمز', category: 'جيلي', tags: ['بعصير فواكه'], img: img(P, 'yupo-worms') },
  { id: 'povi-marshmallow', name: 'بوفي مارشميلو', category: 'مارشميلو', tags: ['بدون جلوتين'], img: img(P, 'povi-marshmallow') },
  { id: 'bucuria-toffee', name: 'بوكوريا توفي', category: 'توفي', tags: ['بحشوة فواكه'], img: img(P, 'bucuria-toffee') },
  { id: 'yupo-meter', name: 'يوبو ميتر', category: 'جيلي', tags: ['نكهات متعددة'], img: img(P, 'yupo-meter') },
  { id: 'oneo-gum', name: 'أونيو علكة', category: 'علكة', tags: ['نكهات متعددة'], img: img(P, 'oneo-gum') },
  { id: 'oneo-bubble', name: 'أونيو بابل ميلك شيك', category: 'علكة', tags: ['فراولة وموز'], img: img(P, 'oneo-bubble') },
  { id: 'ofresh', name: 'أوفريش', category: 'حلوى ونعناع', tags: ['طبقات فواكه'], img: img(P, 'ofresh') },
  { id: 'pops-lollipops', name: "مصاصات POP'S", category: 'مصاصات', tags: ['نكهات مشكّلة'], img: img(P, 'pops-lollipops') },
  { id: 'yupo-sour-meter', name: 'يوبو ساور ميتر', category: 'جيلي', tags: ['نكهة حامضة'], img: img(P, 'yupo-sour-meter') },
  { id: 'cake-sprinkles', name: 'زينة الكيك', category: 'زينة كيك', tags: ['ألوان زاهية'], img: img(P, 'cake-sprinkles') },
  { id: 'choco-pako', name: 'شوكو باكو فول سوداني', category: 'شوكولاتة', tags: ['فول سوداني'], img: img(P, 'choco-pako') },
  { id: 'yupo-tubs', name: 'يوبو هابي ميكس', category: 'جيلي', tags: ['بعصير فواكه'], img: img(P, 'yupo-tubs') },
  { id: 'cool-mint', name: 'كول مينت بدون سكر', category: 'حلوى ونعناع', tags: ['بدون سكر'], img: img(P, 'cool-mint') },
  { id: 'choco-waffle', name: 'شوكو وافل بندق', category: 'شوكولاتة', tags: ['بندق'], img: img(P, 'choco-waffle') },
  { id: 'drops-bon', name: 'دروبس بون', category: 'شوكولاتة', tags: ['شوكولاتة مغلفة'], img: img(P, 'drops-bon') },
  { id: 'yupo-rencils', name: 'يوبو رينسيلز', category: 'جيلي', tags: ['أصابع فواكه'], img: img(P, 'yupo-rencils') },
  { id: 'sarar-chocolate', name: 'سارار شوكولاتة', category: 'شوكولاتة', tags: ['شوكولاتة'], img: img(P, 'sarar-chocolate') },
];

const CAMPAIGN_TINTS = ['#fff0f3', '#f0f9ff', '#f0fdf4', '#fefce8', '#faf5ff', '#fff7e8'];

export const CAMPAIGNS = [
  { id: 'jellopy-fruit', name: 'جيلوبي فروت', note: 'بعصير الفواكه – بدون جلوتين', img: img(C, 'jellopy-fruit') },
  { id: 'riny-popping', name: 'ريني بوبينج كاندي', note: 'حلوى بطعم لذيذ ولحظات من المرح والفرقعة', img: img(C, 'riny-popping') },
  { id: 'rosyl-biscuits', name: 'روزي بسكويت', note: 'ثلاث نكهات.. طعمك المفضل، متعة ما بتنمل', img: img(C, 'rosyl-biscuits') },
  { id: 'jellopy-watermelon', name: 'جيلوبي بطيخ', note: 'بطيخ منعش – بدون سكر', img: img(C, 'jellopy-watermelon') },
  { id: 'daka-smallpie', name: 'دكا سمول باي', note: 'اختار نكهتك.. لأن كل مزاج إله نكهة', img: img(C, 'daka-smallpie') },
  { id: 'spring-cotton', name: 'سبرينغ كوتون كاندي', note: 'حلاوة المارشميلو اللذيذ ولعبة بتكمل الفرحة', img: img(C, 'spring-cotton') },
  { id: 'surprised-makeup', name: 'سبرايزد ميك أب كاندي', note: 'مفاجآت ترفيه للأطفال مع لمسات تزيين ممتعة', img: img(C, 'surprised-makeup') },
  { id: 'jellopy-bears', name: 'جيلوبي هابي بيرز', note: 'دبدوب الجيلي – بدون سكر', img: img(C, 'jellopy-bears') },
  { id: 'ice-cream-lollipop', name: 'مصاصات الآيس كريم', note: 'نكهات بتفرح ومصاص بيحليها', img: img(C, 'ice-cream-lollipop') },
  { id: 'jellopy-worms', name: 'جيلوبي وورمز', note: 'ديدان الجيلي – بعصير الفواكه', img: img(C, 'jellopy-worms') },
  { id: 'dinosaur-sticky', name: 'ديناصور ستيكي توي', note: 'مش بس حلوى.. تجربة مليانة مرح!', img: img(C, 'dinosaur-sticky') },
  { id: 'jellopy-mix', name: 'تشكيلة جيلوبي', note: 'بنكهات كتير.. اختار النكهة واستمتع', img: img(C, 'jellopy-mix') },
  { id: 'jellopy-cola', name: 'جيلوبي كولا', note: 'نكهة الكولا الغنية', img: img(C, 'jellopy-cola') },
  { id: 'jellopy-berries', name: 'جيلوبي بيريز', note: 'بنكهة التوت البري', img: img(C, 'jellopy-berries') },
  { id: 'pizza-gummi', name: 'بيتزا غومي', note: 'فانتزي الليزنزا.. متعة بكل قطعة', img: img(C, 'pizza-gummi') },
  { id: 'mints-2go', name: 'مينتس 2GO زيرو', note: '٣ نكهات.. ومنعش واد منعش', img: img(C, 'mints-2go') },
  { id: 'hazelnut-biscuits', name: 'بسكويت هازلنوت شوكولاتة', note: 'طعم غنى.. وقرمشة ما بتقاوم', img: img(C, 'hazelnut-biscuits') },
].map((c, i) => ({ ...c, tint: CAMPAIGN_TINTS[i % CAMPAIGN_TINTS.length] }));

export const HERO = {
  main: img(P, 'yupo-meter'),
  floatA: img(P, 'povi-marshmallow'),
  floatB: img(P, 'pops-lollipops'),
  about: img(C, 'jellopy-mix'),
  aboutCard: img(P, 'povi-marshmallow'),
};
