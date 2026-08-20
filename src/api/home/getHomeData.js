import HOME_QUERY from "./home.graphql?raw";
import { fetchStrapiData } from "../fetchStrapiData";

export async function getHomeData(locale) {
  const data = await fetchStrapiData(HOME_QUERY, { locale });
  return data?.home;
}
