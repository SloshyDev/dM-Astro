import NEWS_QUERY from "./news.graphql?raw";

export async function getNewsData(locale) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");
  const response = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: NEWS_QUERY,
      variables: {
        locale,
      },
    }),
  });

  const payload = await response.json();
  return payload.data?.newsGallery;
}
