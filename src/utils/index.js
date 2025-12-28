export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const createPageUrl = (page) => {
  if (!page) {
    return '/';
  }

  if (page.startsWith('http')) {
    return page;
  }

  if (page.startsWith('/')) {
    return page;
  }

  const normalized = page.toLowerCase();
  if (normalized === 'home') {
    return '/';
  }

  return `/${normalized}`;
};
