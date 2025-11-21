"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeroSectionData } from "@/features/home/types";

interface ContentHeroProps {
  data: HeroSectionData;
}

export default function ContentHero() {
  const [current, setCurrent] = useState(0);

  const heroDummyData = {
    _type: "heroSection",
    _key: "hero-section-001",
    title: "Over 20,000 Projects",
    subtitle: "in 40 Countries",
    slides: [
      {
        _key: "slide-video-1",
        mediaType: "video",
        video: {
          asset: {
            url: "",
          },
        },
      },
    ],
  };
  if (!heroDummyData) return null;


  return (
    <section
      className='relative lg:h-[40vh] md:h-[40vh] h-[30vh] flex flex-col justify-end bg-black'
      onMouseEnter={() =>
        setCurrent((prev) => (prev + 1) % heroDummyData.slides.length)
      }
    >
      <div className='absolute inset-0 z-0'>
        {heroDummyData.slides.map((slide, i) => (
          <div
            key={slide._key}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* VIDEO ONLY */}
            <video
              src={slide.video?.asset?.url || "/hero-video.mp4"}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover'
            />

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

            <div className='absolute inset-0 bg-black/20' />
          </div>
        ))}
      </div>

      {/* Text + Controls */}
      <div className='relative z-10 w-full'>
        <div className='max-w-[1500px] mx-auto px-4 md:px-12 pb-5'>
          <div className='max-w-[130px] md:max-w-[380px]'>
            <h1 className='text-xl md:text-4xl font-semibold text-white drop-shadow-lg whitespace-pre-line leading-none'>
              {heroDummyData.title}
            </h1>

            {heroDummyData.subtitle && (
              <p className='text-xl md:text-4xl text-white/90 font-semibold drop-shadow-md whitespace-pre-line leading-none mt-2'>
                {heroDummyData.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='absolute bottom-3 right-3 md:-bottom-10 md:right-1/8 z-20'>
        <img
          src='/favicon.svg' 
          alt='Logo'
          className='w-16 md:w-24 lg:w-28 object-contain opacity-90 stroke-yellow-400'
        />
      </div>
    </section>
  );
}
