import ABOUT_QUERY from "./about.graphql?raw";

export async function getAboutData(locale) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");
  const response = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ABOUT_QUERY,
      variables: {
        locale,
      },
    }),
  });

  const payload = await response.json();
  return payload.data?.about;
}
