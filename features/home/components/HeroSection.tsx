"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const heroDummyData = {
    title: "Hassasiyet\ndenge ve\ngüvenin adresi;",
    subtitle: "1987'den beri\nSekizli Vinç",
    cta: {
      text: "İletişime Geçin",
      href: "/contact",
    },
    slides: [
      {
        type: "image" as const,
        src: "/hero-bg.jpg",
      },
      {
        type: "video" as const,
        src: "/hero-video.mp4",
      },
    ],
  };

  return (
    <section
      className="relative h-[calc(100vh-5rem)] flex flex-col justify-end overflow-hidden bg-black"
      onMouseEnter={() =>
        setCurrent((prev) => (prev + 1) % heroDummyData.slides.length)
      }
    >
      {/* BACKGROUND SLIDE */}
      <div className="absolute inset-0 z-0">
        {heroDummyData.slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt="Hero background"
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            {/* Darker overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 md:px-12 mb-8 md:mb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg whitespace-pre-line">
              {heroDummyData.title}
            </h1>
            {heroDummyData.subtitle && (
              <p className="text-xl md:text-2xl text-white/90 font-light drop-shadow-md whitespace-pre-line">
                {heroDummyData.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
