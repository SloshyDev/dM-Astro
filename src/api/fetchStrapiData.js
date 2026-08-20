const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 1_500;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function fetchStrapiData(query, variables) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");

  if (!strapiUrl) {
    throw new Error("STRAPI_URL no está configurada.");
  }

  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(`${strapiUrl}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        throw new Error(`Strapi respondió con HTTP ${response.status}.`);
      }

      const payload = await response.json();

      if (payload.errors?.length) {
        throw new Error(`Strapi GraphQL: ${payload.errors[0].message}`);
      }

      return payload.data;
    } catch (error) {
      lastError = error;

      if (attempt < MAX_ATTEMPTS) {
        await wait(RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw new Error(`No se pudo obtener contenido de Strapi después de ${MAX_ATTEMPTS} intentos.`, {
    cause: lastError,
  });
}
