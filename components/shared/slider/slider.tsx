"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImageSlider({
  images,
  className,
  imageClassName,
  indicator = true,
  onSlideChange,
}: {
  images: string[];
  className: string;
  imageClassName?: string;
  indicator?: boolean;
  onSlideChange?: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (onSlideChange) onSlideChange(currentIndex);
  }, [currentIndex]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full rounded-lg overflow-hidden ${className}`}>
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="slide"
          fill
          className={`transition-opacity duration-700 absolute inset-0 z-0
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
            ${imageClassName || "object-contain"}
          `}
        />
      ))}

      {indicator && (
        <div className="absolute bottom-6 right-0 transform -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onSlideChange?.(index);
              }}
              className={` rounded-full transition-all duration-300 
                ${
                  index === currentIndex
                    ? "bg-white scale-110 w-5 h-[5px]"
                    : "bg-gray-400 hover:bg-gray-500 w-[5px] h-[5px]"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSlider;
