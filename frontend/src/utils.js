export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.1 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// prefetch optimized image derivatives so product interactions feel instant
const _prefetched = new Set();
export const prefetchImage = (imgEntry, size = '480') => {
  const url = imgEntry && imgEntry.webp && imgEntry.webp[size];
  if (!url || _prefetched.has(url)) return;
  _prefetched.add(url);
  const im = new Image();
  im.decoding = 'async';
  im.src = url;
};

export const prefetchAround = (list, index, size = '480') => {
  [index - 1, index + 1].forEach((i) => {
    const item = list[i];
    if (item && item.img) prefetchImage(item.img, size);
  });
};
