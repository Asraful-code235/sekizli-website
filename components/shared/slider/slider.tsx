"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImageSlider({
  images,
  className,
  indicator = true,
  onSlideChange,
}: {
  images: string[];
  className: string;
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
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full rounded-lg overflow-hidden ${className}`}>
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt='slide'
          fill
          className={`object-contain transition-opacity duration-700 absolute inset-0 z-0
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      {indicator && (
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onSlideChange?.(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === currentIndex
                  ? "bg-teal-600 scale-110"
                  : "bg-black/50 hover:bg-black/70"
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
