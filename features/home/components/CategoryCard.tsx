"use client";
import CategoryNavItem from "@/components/shared/layout/Header/CategoryNavItem";
import Image from "next/image";
import { useState } from "react";

export interface CategoryCardProps {
  highlight: string;
  title: string;
  bgColor: string;
  bgImage?: string;
  image: string;
  list?: string[];
  listImages?: string[];
  description?: string[];
  position?: "left" | "right";
}

export function CategoryCard({
  highlight,
  title,
  bgColor = "bg-[#0f766e]",
  bgImage = "/rightBg.png",
  image,
  list = [],
  listImages = [],
  description = [],
  position = "right",
}: CategoryCardProps) {
  const isLeft = position === "left";
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // final displayed image
  const displayImage = hoveredImage || image;
  return (
    <div
      className={`
        ${
          isLeft
            ? "rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl pl-4 sm:pl-10 md:pl-54"
            : "rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl pr-4 sm:pr-10 md:pr-54"
        }

        p-10 text-white relative overflow-hidden
        hover:shadow-2xl transition-shadow 
        ${bgColor} bg-[url('/rightBg.png')] bg-cover bg-center
      `}
    >
      <div
        className={`
          flex items-start gap-10 relative z-10
          ${isLeft ? "flex-row" : "flex-row-reverse"}
        `}
      >
        {/* LEFT HALF — Content + List */}
        <div className='w-1/2'>
          <h2
            className={`text-3xl font-bold mb-2 ${isLeft ? "text-left" : "text-right"}`}
          >
            <span className='text-yellow-400'>{highlight}</span>
            <br />
            {title}
          </h2>

          <div
            className={`w-16 h-[2px] bg-yellow-300 mb-8 ${
              isLeft ? "" : "ml-auto"
            }`}
          />

          {list.length > 0 && (
            <ul
              className={`space-y-3 text-xs font-medium tracking-wider ${
                isLeft ? "text-left" : "text-right"
              }`}
            >
              {list.map((item, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setHoveredImage(listImages[idx] || null)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <CategoryNavItem
                    label={item}
                    href={`/your-route/${item.toLowerCase().replace(/ /g, "-")}`}
                    position={position}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT HALF — Image + Background Icon + Description */}
        <div
          className={`w-1/2 relative ${isLeft ? "text-left" : "text-right"}` }
        >
          {/* BACKGROUND ICON */}
          <div
            className={`
              absolute top-10 opacity-30 group-hover:opacity-50 transition-opacity
              ${isLeft ? "left-0" : "right-0"}
            `}
          >
            <Image
              src='/favicon.svg'
              alt='icon'
              width={120}
              height={120}
              className='opacity-20 w-16 sm:w-20 md:w-28 h-auto'
              priority
            />
          </div>

          {/* MAIN IMAGE */}
          <div
            className={`
              relative w-full flex 
              ${isLeft ? "justify-start" : "justify-end"}
            `}
          >
            <Image
              src={displayImage}
              alt={title}
              width={400}
              height={300}
              className='max-w-full h-auto opacity-95 aspect-auto'
            />
          </div>

          {/* DESCRIPTION */}
          <div
            className={`
              mt-12 text-xs space-y-2 text-gray-100 
              ${isLeft ? "text-left" : "text-right"}
            `}
          >
            {isLeft
              ? description.map((text, i) => <p key={i}>▸ {text}</p>)
              : description.map((text, i) => <p key={i}>{text}◂</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}
