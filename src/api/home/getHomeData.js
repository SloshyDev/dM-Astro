import HOME_QUERY from "./home.graphql?raw";

const withAbsoluteUrls = (media, strapiUrl) => {
  if (!media?.formats) return media;

  const formats = Object.fromEntries(
    Object.entries(media.formats).map(([name, format]) => [
      name,
      {
        ...format,
        url: format.url ? new URL(format.url, `${strapiUrl}/`).toString() : null,
      },
    ]),
  );

  return { ...media, formats };
};

const normalizeCarousel = (items, strapiUrl) =>
  items.map((item) => ({
    ...item,
    Image: withAbsoluteUrls(item.Image, strapiUrl),
    data_contents: item.data_contents?.map((content) => ({
      ...content,
      Banner: withAbsoluteUrls(content.Banner, strapiUrl),
    })),
  }));

export async function getHomeData(locale) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");

  if (!strapiUrl) {
    throw new Error("STRAPI_URL no está configurada");
  }

  if (!locale) {
    throw new Error("El locale es obligatorio");
  }

  const response = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: HOME_QUERY,
      variables: {
        locale,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Strapi respondió con ${response.status}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    const message = payload.errors.map((error) => error.message).join(", ");
    throw new Error(message);
  }

  const home = payload.data?.home;

  if (!home) return null;

  return {
    ...home,
    Carrousel: normalizeCarousel(home.Carrousel || [], strapiUrl),
  };
}
