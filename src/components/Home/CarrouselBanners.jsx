import React from "react";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getAbsoluteUrl, getImageSrcSet } from "../../utils/media";

const CarrouselBanners = ({ data }) => {
  const splides = [];

  data?.Carrousel?.forEach((banner) => {
    banner.Image
      ? splides.push({
          url: getAbsoluteUrl(banner.Image.url),
          width: banner.Image.width,
          height: banner.Image.height,
          formats: banner.Image.formats,
          hash: banner.Image.hash,
        })
      : banner.data_contents?.forEach((banner) => {
          splides.push({
            url: getAbsoluteUrl(banner.Banner.url),
            width: banner.Banner.width,
            height: banner.Banner.height,
            formats: banner.Banner.formats,
            hash: banner.Banner.hash,
          });
        });
  });

  const heightRatio = Math.max(...splides.map((splide) => splide.height / splide.width).filter(Number.isFinite));

  return (
    <Splide
      className="w-[73%]"
      options={{
        type: "loop",
        pauseOnHover: true,
        pagination: false,
        autoplay: true,
        duration: 3000,
        arrowPath: "M8 8 17 20 8 32M22 8l9 12-9 12",
        ...(heightRatio ? { heightRatio } : {}),
      }}
      aria-label="Banners Carrousel">
      {splides.map((splide) => {
        const srcSet = getImageSrcSet(splide);

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
