const MAX_ATTEMPTS = 2;
const REQUEST_TIMEOUT_MS = 8_000;
const RETRY_DELAY_MS = 1_000;
const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function fetchStrapiData(query, variables) {
  const strapiUrl = import.meta.env.STRAPI_URL?.replace(/\/$/, "");

  if (!strapiUrl) {
    throw new Error("STRAPI_URL no está configurada.");
  }

  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    let response;

    try {
      response = await fetch(`${strapiUrl}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      if (!(error instanceof TypeError) && error?.name !== "TimeoutError") throw error;
      lastError = error;
    }

    if (response) {
      if (response.ok) {
        const payload = await response.json();

        if (payload.errors?.length) {
          throw new Error(`Strapi GraphQL: ${payload.errors[0].message}`);
        }

        return payload.data;
      }

      lastError = new Error(`Strapi respondió con HTTP ${response.status}.`);
      if (!RETRYABLE_STATUSES.has(response.status)) throw lastError;
    }

    if (attempt < MAX_ATTEMPTS) await wait(RETRY_DELAY_MS);
  }

  throw new Error(`No se pudo obtener contenido de Strapi después de ${MAX_ATTEMPTS} intentos.`, {
    cause: lastError,
  });
}
