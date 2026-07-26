import HOME_QUERY from "./home.graphql?raw";

export async function getHomeData(locale) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");
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

  const payload = await response.json();
  return payload.data?.home;
}
