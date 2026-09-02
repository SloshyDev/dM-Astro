import REPORT_BY_SLUG_QUERY from "./report.graphql?raw";
import { fetchStrapiData } from "../fetchStrapiData";

export async function getReportBySlug(slug) {
  const data = await fetchStrapiData(REPORT_BY_SLUG_QUERY, { slug });
  return data?.dataContents?.[0] ?? null;
}
