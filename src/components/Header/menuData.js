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

const getLocalizedValue = (value, lang) => {
  if (typeof value === "string") return value;
  return value?.[lang] ?? "";
};

const buildPath = (slug, lang) => {
  if (!slug) return undefined;
  return lang === "es" ? `/es/${slug}` : `/${slug}`;
};

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
