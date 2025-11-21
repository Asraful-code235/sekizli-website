"use client";

import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import ImageSlider from "../../../components/shared/slider/slider";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { AboutSectionData } from "../types";

interface AboutProps {
  data?: AboutSectionData;
}

export function About({ data }: AboutProps) {
  if (!data) {
    return null;
  }

  const {
    title,
    description,
    displayType,
    image,
    sliderImages,
    navLinks,
    ctaText,
    ctaLink,
  } = data;

  const sliderImageUrls =
    displayType === "slider" && sliderImages
      ? sliderImages.map((img) => urlFor(img.asset)?.url() || "")
      : [];

  const mainImageUrl =
    displayType === "single" && image?.asset
      ? urlFor(image.asset)?.url()
      : null;

  const defaultLink = navLinks?.find((link) => link.isDefault);

  return (
    <section className="bg-white pb-3">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#ededed] rounded-3xl py-4 px-4 lg:px-16">
          {navLinks && navLinks.length > 0 && (
            <div className=" sm:px-6 lg:px-8 pt-6 mb-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:gap-6 sm:overflow-x-auto sm:no-scrollbar sm:pb-2">
                {navLinks.map((navLink) => (
                  <Link
                    key={navLink._key}
                    href={navLink.link}
                    className={`${
                      navLink.isDefault || navLink._key === defaultLink?._key
                        ? "border-b-2 md:border-b-4 border-brand-primary font-semibold"
                        : "text-gray-600 hover:border-b-2 md:hover:border-b-4 border-brand-primary"
                    } text-[10px] sm:text-base whitespace-nowrap hover:text-brand-primary transition-all`}
                  >
                    {navLink.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-14 sm:p-8">
            {/* Image Column */}
            <div className="relative w-full order-2 lg:order-1">
              {displayType === "single" && mainImageUrl ? (
                <img
                  src={mainImageUrl}
                  alt={image?.alt || title}
                  className="
                    w-full rounded-lg object-cover
                    h-64 sm:h-80 md:h-96 lg:h-[500px]
                    lg:absolute lg:top-0 lg:left-0 lg:right-0
                    lg:translate-y-[-20%]
                  "
                />
              ) : displayType === "slider" && sliderImageUrls.length > 0 ? (
                <ImageSlider
                  images={sliderImageUrls}
                  className="
                    relative
                    h-44 sm:h-80 md:h-[500px] lg:h-[500px]
                    lg:absolute lg:top-0 lg:left-0 lg:right-0
                    lg:translate-y-[10%] translate-y-0
                    -mb-40 lg:mb-0
                    z-20 rounded-3xl
                  "
                  imageClassName="object-cover"
                />
              ) : null}
            </div>

            {/* Text Column */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-base sm:text-[35px] mb-6 max-w-[290px]">
                {title}
              </h2>

              {description && (
                <div className="mb-8 prose max-sm:prose-p:text-[10px] text-gray-700">
                  <PortableText value={description} />
                </div>
              )}

              {ctaText && ctaLink && (
                <Link href={ctaLink}>
                  <button className="flex items-center space-x-3 text-[10px] sm:text-sm text-gray-600 hover:text-brand-primary transition-colors group">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <ArrowRight
                        size={18}
                        className="text-[10px] sm:text-sm"
                      />
                    </span>
                    <span className="font-semibold leading-tight">
                      {ctaText}
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
