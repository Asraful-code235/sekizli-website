"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { StatsSectionData } from "../types";

interface StatsSectionProps {
  data?: StatsSectionData;
}

export function StatsSection({ data }: StatsSectionProps) {
  if (!data) {
    return null;
  }

  const { bgImage, image, title, paragraphs, ctaText, ctaLink } = data;

  // Get image URLs
  const bgImageUrl = bgImage?.asset ? urlFor(bgImage.asset)?.url() : null;
  const mainImageUrl = image?.asset ? urlFor(image.asset)?.url() : "";

  return (
    <section className="pt-12 md:py-10 sm:py-0 lg:py-0">
      <div className="max-w-[1500px] mx-auto px-4">
        <div
          className="rounded-3xl px-6 pb-6 pt-28 sm:p-12 text-white relative overflow-hidden bg-[#393939] bg-cover bg-center transition-all duration-400 ease-in hover:bg-brand-primary/80"
          style={{
            backgroundImage: bgImageUrl ? `url('${bgImageUrl}')` : undefined,
          }}
        >
          <div className="grid lg:grid-cols-2 grid-cols-2 gap-4 lg:gap-12 items-start">
            {/* LEFT IMAGE */}
            <div className="relative col-start-2 row-start-1 lg:col-auto lg:row-auto">
              <div className="relative z-10 pt-2 lg:pt-12">
                <Image
                  src={mainImageUrl}
                  alt={image.alt || "Stats image"}
                  width={400}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="contents lg:block">
              {/* Dynamic Title */}
              {title && title.length > 0 && (
                <h2 className="col-start-1 row-start-1 lg:col-auto lg:row-auto text-[13px] sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-8 leading-tight">
                  {title.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
              )}

              {/* Dynamic Paragraphs */}
              {paragraphs &&
                paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className="col-span-2 lg:col-auto text-[10px] sm:text-sm text-gray-300 leading-relaxed"
                  >
                    {text}
                  </p>
                ))}

              {/* Dynamic Button */}
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="col-span-2 lg:col-auto inline-flex items-center space-x-3 text-[10px] sm:text-sm text-gray-300 hover:text-white transition-colors group mt-4"
                >
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-500 flex items-center justify-center group-hover:bg-brand-primary/80 transition-colors">
                    <ArrowRight
                      size={18}
                      className="w-3 h-3 sm:w-auto sm:h-auto"
                    />
                  </span>
                  <span className="font-semibold">{ctaText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
