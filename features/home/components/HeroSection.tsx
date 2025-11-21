"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeroSectionData } from "@/features/home/types";

interface HeroSectionProps {
  data: HeroSectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  if (!data) return null;

  return (
    <section
      className="relative lg:h-[85vh] md:h-[60vh] h-[50vh] flex flex-col justify-end bg-black"
      onMouseEnter={() => setCurrent((prev) => (prev + 1) % data.slides.length)}
    >
      <div className="absolute inset-0 z-0">
        {data.slides.map((slide, i) => (
          <div
            key={slide._key}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.mediaType === "image" && slide.image ? (
              <Image
                src={slide.image.asset.url || ""}
                alt={slide.image.alt || "Hero background"}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            ) : slide.mediaType === "video" && slide.video ? (
              <video
                src={slide.video.asset.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : null}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            {/* Darker overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-[1500px] mx-auto px-4 md:px-12">
          <div className="max-w-[130px] md:max-w-[210px]">
            <h1 className="text-xs md:text-[2em] font-bold text-white drop-shadow-lg whitespace-pre-line leading-none">
              {data.title}
            </h1>
            {data.subtitle && (
              <p className="text-sm md:text-[1.5em] text-white/90 font-semibold drop-shadow-md whitespace-pre-line leading-none mt-2">
                {data.subtitle}
              </p>
            )}
            <div className="relative lg:-bottom-20 md:-bottom-14 -bottom-10 left-7 md:left-10 lg:left-14 flex gap-1 sm:gap-2 ">
              {data.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[5px] rounded-full transition-all ${
                    current === i
                      ? "bg-brand-primary w-3 max-sm:h-[4px] md:w-4 h-[5px] scale-125"
                      : "bg-gray-300 w-[5px]"
                  }`}
                />
              ))}
            </div>
            <Link
              href={"#"}
              className="relative lg:-bottom-7 -bottom-3.5 md:-bottom-5 left-0 md:p-3 p-0.5 sm:p-1 bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition  w-5 h-[30px] md:w-[30px] md:h-[40px] lg:w-12 lg:h-[60px] shadow-lg"
            >
              <ChevronRight size={20} className="size-5! md:size-20!" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
