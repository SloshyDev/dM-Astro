const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL?.replace(/\/$/, "");

export const getAbsoluteUrl = (url) => {
  if (!url || /^https?:\/\//i.test(url)) return url;
  if (!strapiUrl) return url;

  return new URL(url, strapiUrl).toString();
};

export const getImageSrcSet = (image) => {
  const formats = Object.values(image?.formats ?? {})
    .filter((format) => format?.url && format.width)
    .map((format) => `${getAbsoluteUrl(format.url)} ${format.width}w`);

  if (image?.url && image.width) {
    formats.push(`${getAbsoluteUrl(image.url)} ${image.width}w`);
  }

  return formats.join(", ");
};
