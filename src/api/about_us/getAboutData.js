import ABOUT_QUERY from "./about.graphql?raw";
import { fetchStrapiData } from "../fetchStrapiData";

export async function getAboutData(locale) {
  const data = await fetchStrapiData(ABOUT_QUERY, { locale });
  return data?.about;
}
