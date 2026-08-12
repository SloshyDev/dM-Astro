const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL?.replace(/\/$/, "");
const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "");

export const getAbsoluteUrl = (url) => {
  if (!url || /^https?:\/\//i.test(url)) return url;
  if (!strapiUrl) return url;

  return new URL(url, strapiUrl).toString();
};

export const getImageSrcSet = (image) => {
  const isSvg = image?.mime === "image/svg+xml" || /\.svg(?:$|[?#])/i.test(image?.url ?? "");

  if (isSvg) return "";

  const formats = Object.values(image?.formats ?? {})
    .filter((format) => format?.url && format.width)
    .map((format) => `${getAbsoluteUrl(format.url)} ${format.width}w`);

  if (image?.url && image.width) {
    formats.push(`${getAbsoluteUrl(image.url)} ${image.width}w`);
  }

  return formats.join(", ");
};

export const getLink = (link, type) => {
  if (!link) return "";

  if (type === "ExternalLink" || /^(https?:)?\/\/|^(mailto:|tel:)/i.test(link)) {
    return link;
  }

  const normalizedLink = link.replace(/^\/+/, "");
  const path = type === "dataContent" ? `/datacontent/${normalizedLink}` : `/${normalizedLink}`;
  return baseUrl ? `${baseUrl}${path}` : path;
};
