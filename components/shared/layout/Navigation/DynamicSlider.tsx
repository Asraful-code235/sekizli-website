"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DynamicSliderProps {
  title?: string;
  logos?: string[];
  visibleCount?: number;
  autoPlay?: boolean;
  interval?: number;
  image: string;
}

export default function DynamicSlider({
  title = "Logo Slider",
  logos = [],
  visibleCount = 3,
  autoPlay = true,
  interval = 2500,
  image = "/leftInt.png",
}: DynamicSliderProps) {
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, logos.length / visibleCount);

  // Auto slide
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, interval);

    return () => clearInterval(timer);
  }, [maxIndex, autoPlay, interval]);

  return (
    <div className="relative w-full p-6 ">
      {/* Title */}

      <div className="flex items-center justify-between pb-2">
        {title && <h3 className="">{title}</h3>}
        <div className="flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                index === i
                  ? "bg-brand-primary/80 scale-125 w-5 h-2"
                  : "bg-gray-300 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Optional top image */}
      <div>
        <Image
          src={image}
          alt="brand logo"
          width={420}
          height={420}
          className="object-contain w-full py-5"
        />
      </div>

      {/* Slider View */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
            width: `${(logos.length * 100) / visibleCount}%`,
          }}
        >
          {logos.map((src, i) => (
            <div
              key={i}
              className="w-1/3 flex items-center justify-center px-3"
              style={{ width: `${100 / logos.length}%` }}
            >
              <Image
                src={src}
                alt="brand logo"
                width={60}
                height={60}
                className={`object-contain transition pr-2`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicator Dots */}
    </div>
  );
}
