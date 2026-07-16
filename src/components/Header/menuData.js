/**
 * @typedef {"en" | "es"} SupportedLanguage
 */

/**
 * @typedef {Object} RawMenuItem
 * @property {string} id Stable identifier shared by the localized versions of a page.
 * @property {string | Partial<Record<SupportedLanguage, string>>} label Visible label, either shared or localized.
 * @property {string | Partial<Record<SupportedLanguage, string>>} [page] Route slug, either shared or localized.
 * @property {string} [scientificName] Optional scientific name displayed next to the label.
 * @property {RawMenuItem[]} [children] Nested menu entries.
 */

/**
 * @typedef {Object} LocalizedMenuItem
 * @property {string} id Stable menu identifier.
 * @property {string} label Label resolved for the requested language.
 * @property {string | undefined} page Absolute localized path.
 * @property {string} slug Localized route slug.
 * @property {string | undefined} scientificName Optional scientific name.
 * @property {LocalizedMenuItem[] | undefined} submenu Localized child entries.
 */

/**
 * @typedef {Object} MenuPage
 * @property {string} id Stable menu identifier.
 * @property {string} slug Localized route slug.
 * @property {string} label Localized page label.
 * @property {string | undefined} section Immediate parent label.
 * @property {string | undefined} scientificName Optional scientific name.
 * @property {string} path Absolute localized path.
 */

const rawMenu = [
  {
    id: "about",
    label: { en: "About", es: "Sobre nosotros" },
    page: { en: "about", es: "sobre-nosotros" },
  },
  {
    id: "news",
    label: { en: "News", es: "Noticias" },
    page: { en: "news", es: "noticias" },
  },
  {
    id: "datapedia",
    label: "dataPedia",
    children: [
      {
        id: "datagrams",
        label: { en: "dataGrams", es: "dataGramas" },
        page: { en: "datagrams", es: "datagramas" },
      },
      {
        id: "datagraphics",
        label: { en: "dataGraphics", es: "dataGráficos" },
        page: { en: "datagraphics", es: "datagraficos" },
      },
      { id: "datapics", label: "dataPics", page: "datapics" },
      { id: "dataposters", label: "dataPosters", page: "dataposters" },
      {
        id: "stories",
        label: { en: "Stories", es: "Historias" },
        page: { en: "stories", es: "historias" },
      },
    ],
  },
  { id: "datakids", label: "dataKids", page: "datakids" },
  {
    id: "biodiversity",
    label: { en: "Biodiversity", es: "Biodiversidad" },
    children: [
      {
        id: "day-for-oceans",
        label: { en: "A day for the oceans", es: "Un día por los mares" },
        children: [
          {
            id: "day-for-oceans-2024",
            label: { en: "A day for the oceans 2024", es: "Un día por los mares 2024" },
            page: { en: "a-day-for-the-oceans-2024", es: "un-dia-por-los-mares-2024" },
          },
          {
            id: "day-for-oceans-2025",
            label: { en: "A day for the oceans 2025", es: "Un día por los mares 2025" },
            page: { en: "a-day-for-the-oceans-2025", es: "un-dia-por-los-mares-2025" },
          },
        ],
      },
      { id: "dive-atlas", label: "Dive Atlas", page: "dive-atlas" },
      { id: "ecological-monitoring", label: "Ecological Monitoring", page: "ecological-monitoring" },
      {
        id: "natural-protected-areas",
        label: { en: "Natural Protected Areas", es: "Áreas Naturales Protegidas" },
        children: [{ id: "cabo-pulmo", label: "Cabo Pulmo National Park", page: "cabo-pulmo-national-park" }],
      },
    ],
  },
  {
    id: "species-profile",
    label: { es: "Perfil de especie" },
    children: [
      {
        id: "cabrilla-sardinera",
        label: { es: "Cabrilla Sardinera" },
        page: { es: "cabrilla-sardinera" },
        scientificName: "Mycteroperca rosacea",
      },
      {
        id: "curvina-golfina",
        label: { es: "Curvina Golfina" },
        page: { es: "curvina-golfina" },
        scientificName: "Cynoscion othonopterus",
      },
      {
        id: "jaiba",
        label: { es: "Jaiba" },
        page: { es: "jaiba" },
        scientificName: "Callinectes spp",
      },
      {
        id: "jurel-de-castilla",
        label: { es: "Jurel de Castilla" },
        page: { es: "jurel-de-castilla" },
        scientificName: "Seriola dorsalis",
      },
      {
        id: "pargo-amarillo",
        label: { es: "Pargo Amarillo" },
        page: { es: "pargo-amarillo" },
        scientificName: "Lutjanus argentiventris",
      },
      {
        id: "totoaba",
        label: { es: "Totoaba" },
        page: { es: "totoaba" },
        scientificName: "Totoaba macdonaldi",
      },
      {
        id: "verdillo",
        label: { es: "Verdillo" },
        page: { es: "verdillo" },
        scientificName: "Paralabrax nebulifer",
      },
    ],
  },
  {
    id: "marine-prosperity-areas",
    label: { en: "Marine Prosperity Areas", es: "Áreas de Prosperidad Marítima" },
    page: { en: "marine-prosperity-areas", es: "areas-de-prosperidad-maritima" },
  },
];

/**
 * Resolves a shared or localized menu field.
 *
 * @param {string | Partial<Record<SupportedLanguage, string>> | undefined} value Field to resolve.
 * @param {SupportedLanguage} lang Requested language.
 * @returns {string} The shared value, localized value, or an empty string when unavailable.
 */
const getLocalizedValue = (value, lang) => {
  if (typeof value === "string") return value;
  return value?.[lang] ?? "";
};

/**
 * Builds an absolute path for a localized slug.
 *
 * @param {string | undefined} slug Localized slug without a leading locale segment.
 * @param {SupportedLanguage} lang Requested language.
 * @returns {string | undefined} `/slug` for English, `/es/slug` for Spanish, or `undefined` without a slug.
 */
const buildPath = (slug, lang) => {
  if (!slug) return undefined;
  return lang === "es" ? `/es/${slug}` : `/${slug}`;
};

/**
 * Recursively converts raw menu data into the navigation tree for one language.
 * Entries that have neither a localized page nor localized children are removed.
 *
 * @param {SupportedLanguage} [lang="en"] Language used to resolve labels and paths.
 * @param {RawMenuItem[]} [items=rawMenu] Menu branch to localize; primarily useful for recursion and tests.
 * @returns {LocalizedMenuItem[]} Localized navigation tree.
 * @throws {TypeError} If `items` is not an array-like value that supports `map`.
 */
export const getLocalizedMenu = (lang = "en", items = rawMenu) =>
  items
    .map((item) => {
      const label = getLocalizedValue(item.label, lang);
      const slug = getLocalizedValue(item.page, lang);
      const submenu = item.children ? getLocalizedMenu(lang, item.children) : undefined;

      if (!label) return null;
      if (!slug && !submenu?.length) return null;

      return {
        id: item.id,
        label,
        page: buildPath(slug, lang),
        slug,
        scientificName: item.scientificName,
        submenu,
      };
    })
    .filter(Boolean);

/**
 * Flattens all routable entries for one language into static-page descriptors.
 *
 * @param {SupportedLanguage} [lang="en"] Language used to resolve labels and paths.
 * @param {RawMenuItem[]} [items=rawMenu] Menu branch to flatten.
 * @param {string[]} [parentLabels=[]] Ancestor labels accumulated during recursion.
 * @returns {MenuPage[]} Flat list consumed by Astro's dynamic route generators.
 * @throws {TypeError} If `items` does not support `flatMap` or `parentLabels` is not iterable.
 */
export const getMenuPages = (lang = "en", items = rawMenu, parentLabels = []) =>
  items.flatMap((item) => {
    const label = getLocalizedValue(item.label, lang);
    const slug = getLocalizedValue(item.page, lang);
    const section = parentLabels.at(-1);
    const currentLabels = label ? [...parentLabels, label] : parentLabels;
    const children = item.children ? getMenuPages(lang, item.children, currentLabels) : [];

    if (!label || !slug) return children;

    return [
      {
        id: item.id,
        slug,
        label,
        section,
        scientificName: item.scientificName,
        path: buildPath(slug, lang),
      },
      ...children,
    ];
  });

/**
 * Resolves the English and Spanish equivalents of the current route.
 * Pages are paired by their stable menu `id`; unknown routes fall back to each locale's home page.
 *
 * @param {string} [currentPath="/"] Current pathname, with or without a trailing slash.
 * @returns {{en: string, es: string}} Equivalent paths keyed by supported language.
 * @throws {TypeError} If `currentPath` is not a string.
 */
export const getLanguageLinks = (currentPath = "/") => {
  const normalizedPath = currentPath.replace(/\/$/, "") || "/";
  const pages = ["en", "es"].flatMap((lang) =>
    getMenuPages(lang).map((page) => ({
      id: page.id,
      lang,
      path: page.path,
    })),
  );
  const current = pages.find((page) => page.path === normalizedPath);

  return {
    en: current ? (pages.find((page) => page.id === current.id && page.lang === "en")?.path ?? "/") : "/",
    es: current ? (pages.find((page) => page.id === current.id && page.lang === "es")?.path ?? "/es") : "/es",
  };
};
