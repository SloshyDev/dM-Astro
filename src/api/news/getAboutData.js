import NEWS_QUERY from "./news.graphql?raw";
import { fetchStrapiData } from "../fetchStrapiData";

export async function getNewsData(locale) {
  const data = await fetchStrapiData(NEWS_QUERY, { locale });
  return data?.newsGallery;
}
