import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const FORMAT_ORDER = ["thumbnail", "small", "medium", "large"];

const getSlides = (carrousel) =>
  carrousel.flatMap((item, itemIndex) => {
    if (item.Image?.formats) {
      return [{ id: `image-${itemIndex}`, formats: item.Image.formats, alt: `Banner ${itemIndex + 1}` }];
    }

    return (item.data_contents || [])
      .filter((content) => content.Banner?.formats)
      .map((content, contentIndex) => ({
        id: `content-${itemIndex}-${contentIndex}`,
        formats: content.Banner.formats,
        alt: content.Slug?.replaceAll("_", " ") || `Banner ${itemIndex + 1}`,
      }));
  });

const CarrouselBanners = ({ data }) => {
  const slides = getSlides(data?.Carrousel || []);

  if (!slides.length) return null;

  return (
    <Splide aria-label="Banners destacados" options={{ type: "loop", perPage: 1, perMove: 1 }}>
      {slides.map(({ alt, formats, id }, index) => {
        const sources = FORMAT_ORDER.map((name) => formats[name]).filter((format) => format?.url && format.width);
        const fallback = sources.at(-1) || sources[0];
        const srcSet = sources.map((format) => `${format.url} ${format.width}w`).join(", ");

        if (!fallback) return null;

        return (
          <SplideSlide key={id}>
            <img
              src={fallback.url}
              srcSet={srcSet}
              sizes="100vw"
              width={fallback.width}
              height={fallback.height}
              alt={alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="aspect-[2.7/1] h-auto w-full object-cover"
            />
          </SplideSlide>
        );
      })}
      </Splide>
  );
};

export default CarrouselBanners;
