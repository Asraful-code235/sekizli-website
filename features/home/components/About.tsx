"use client";

import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import ImageSlider from "../../../components/shared/slider/slider";
import Link from "next/link";

interface AboutProps {
  title?: string;
  description?: string; // You can make this an array if needed
  image?: {
    asset?: {
      _ref: string;
    };
  };
  sliderImages?: string[]; // NEW → dynamic slider images
}

export function About({
  title = "Precision and balance expert",
  description = `Since 1987, Sekizli has been leading the industry with production of various types of lifting machines and cranes ranging from 500 kilograms to 200 tons capacity. Operating in a 10,000 square meter closed area factory, Sekizli continues to grow and gain experience day by day, pioneering the sector. 
  
  Our company aims to produce high-quality and reliable machinery that can meet the evolving needs of Turkey's growing industry. With a strong technical team and highly flexible manufacturing capacity, we are committed to addressing the changing demands of the industry.`,
  image,
  sliderImages,
}: AboutProps) {
  const images = sliderImages?.length
    ? sliderImages
    : ["/mark.jpg", "/mark.jpg", "/mark.jpg"];

  const mainImage = image?.asset?._ref ? urlFor(image).url() : null;

  return (
    <section className=" bg-white pb-3">
      <div className="max-w-[1600px] mx-auto ">
        <div className="bg-[#ededed] rounded-3xl py-4 px-4 lg:px-16">
          <div className="px-4 sm:px-6 lg:px-8 pt-6 mb-3">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2">
              <Link
                href="/about"
                className="border-b-4 border-brand-primary font-semibold text-[10px] sm:text-base whitespace-nowrap hover:text-brand-primary transition-all"
              >
                About Us
              </Link>
              <Link
                href="/vision-mission"
                className="text-gray-600  hover:border-b-4 border-brand-primary  text-[10px] sm:text-base whitespace-nowrap  hover:text-brand-primary transition-all"
              >
                Vision, Mission
              </Link>
              <Link
                href="/quality-policy"
                className=" text-gray-600  hover:border-b-4 border-brand-primary  text-[10px] sm:text-base whitespace-nowrap  hover:text-brand-primary transition-all"
              >
                Quality Policy & Documents
              </Link>
              <Link
                href="/r-and-d"
                className=" text-gray-600  hover:border-b-4 border-brand-primary text-[10px] sm:text-base whitespace-nowrap  hover:text-brand-primary transition-all"
              >
                R&D
              </Link>
            </div>
          </div>

          {/* ---------- CONTENT ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-14 px-6 sm:p-8">
            {/* IMAGE COLUMN */}
            <div className="relative w-full order-2 lg:order-1">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={title}
                  className="
                    w-full rounded-lg object-cover
                    h-64 sm:h-80 md:h-96 lg:h-[500px]
                    lg:absolute lg:top-0 lg:left-0 lg:right-0
                    lg:translate-y-[-20%]
                  "
                />
              ) : (
                <ImageSlider
                  images={images}
                  className="
                  relative
                  h-80 sm:h-80 md:h-[500px] lg:h-[500px]
                  lg:absolute lg:top-0 lg:left-0 lg:right-0
                  lg:translate-y-[-10%] translate-y-[20%]
                  overflow-visible z-10
                "
                />
              )}
            </div>

            {/* TEXT COLUMN */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-3xl sm:text-[35px] mb-6 max-w-[290px]">
                {title}
              </h2>

              {Array.isArray(description) ? (
                description.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm text-gray-700 mb-4 leading-relaxed"
                  >
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                  {description} <br />
                  Our company aims to produce high-quality and reliable
                  machinery that can meet the evolving needs of Turkey's growing
                  industry. With a strong technical team and highly flexible
                  manufacturing capacity, we are committed to addressing the
                  changing demands of the industry.
                </p>
              )}

              <button className="flex items-center space-x-3 text-sm text-gray-600 hover:text-teal-700 transition-colors group">
                <span className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </span>
                <span className="font-semibold leading-tight">
                  Browse <br /> Details
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
