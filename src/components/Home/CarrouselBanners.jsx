import React from "react";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const toAbsoluteUrl = (url, strapiUrl) => {
  if (!url || url.startsWith("http")) return url;
  return new URL(url, strapiUrl).toString();
};

const CarrouselBanners = ({ data, strapiUrl }) => {
  const splides = [];

  data?.Carrousel?.forEach((banner) => {
    banner.Image
      ? splides.push({
          url: toAbsoluteUrl(banner.Image.url, strapiUrl),
          width: banner.Image.width,
          height: banner.Image.height,
          formats: banner.Image.formats,
          hash: banner.Image.hash,
        })
      : banner.data_contents?.forEach((banner) => {
          splides.push({
            url: toAbsoluteUrl(banner.Banner.url, strapiUrl),
            width: banner.Banner.width,
            height: banner.Banner.height,
            formats: banner.Banner.formats,
            hash: banner.Banner.hash,
          });
        });
  });

  const heightRatio = Math.max(...splides.map((splide) => splide.height / splide.width).filter(Number.isFinite));

  return (
    <Splide className="w-[73%]" options={heightRatio ? { heightRatio } : undefined} aria-label="My Favorite Images">
      {splides.map((splide) => {
        const srcSet = Object.values(splide.formats || {})
          .filter((format) => format?.url && format.width)
          .map((format) => `${toAbsoluteUrl(format.url, strapiUrl)} ${format.width}w`)
          .concat(splide.url && splide.width ? `${splide.url} ${splide.width}w` : [])
          .join(", ");

        return (
          <SplideSlide className="h-full" key={splide.hash || splide.url}>
            <img
              className="block h-full w-full rounded-xl object-cover"
              loading="lazy"
              sizes="100vw"
              src={splide.url}
              srcSet={srcSet || undefined}
              alt="Image in large container"
            />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default CarrouselBanners;
