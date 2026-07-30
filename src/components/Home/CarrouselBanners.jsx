import React from "react";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "../Link";
import { getAbsoluteUrl, getImageSrcSet, getLink } from "../../utils/media";

const getBannerHref = ({ link, typeOfLink }) => getLink(link, typeOfLink);

const CarrouselBanners = ({ carrousel }) => {
  const splides = [];

  carrousel?.forEach((banner) => {
    banner.Image
      ? splides.push({
          link: banner.Link,
          typeOfLink: banner.TypeOfLink,
          title: banner.Title,
          url: getAbsoluteUrl(banner.Image.url),
          width: banner.Image.width,
          height: banner.Image.height,
          formats: banner.Image.formats,
          hash: banner.Image.hash,
        })
      : banner.data_contents?.forEach((banner) => {
          splides.push({
            link: banner.Slug,
            typeOfLink: "dataContent",
            title: banner.Title,
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
        const href = getBannerHref(splide);

        return (
          <SplideSlide className="h-full" key={splide.hash || splide.url}>
            <Link
              href={href}
              className="block h-full"
              {...(splide.typeOfLink === "ExternalLink" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <img
                className="block h-full w-full rounded-xl object-cover"
                loading="lazy"
                sizes="100vw"
                src={splide.url}
                srcSet={srcSet || undefined}
                alt={splide.title}
              />
            </Link>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default CarrouselBanners;
