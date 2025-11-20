"use client";
import Image from "next/image";

import { useState } from "react";
import CategoryNavItem from "./CategoryNavItem";

export interface HeaderCategoryCardProps {
  highlight: string;
  title: string;
  image: string;
  list?: string[];
  listImages?: string[];
  description?: string[];
  position?: "left" | "right";
}

export default function HeaderCategoryCard({
  highlight,
  title,
  image,
  list = [],
  listImages = [],
  position = "left",
}: HeaderCategoryCardProps) {
  const isLeft = position === "left";
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // final displayed image
  const displayImage = hoveredImage || image;
  return (
    <div
      className={`
        text-white relative overflow-hidden transition-shadow py-5
      `}
    >
      <div
        className={`
          flex items-start gap-10 relative z-10
          ${isLeft ? "flex-row" : "flex-row-reverse"}
        `}
      >
        {/* LEFT HALF — Content + List */}
        <div className="w-2/5">
          <h2
            className={`text-3xl font-bold mb-2 ${isLeft ? "text-left" : "text-right"}`}
          >
            <span className="text-yellow-400">{highlight}</span>
            <br />
            {title}
          </h2>

          <div
            className={`w-16 h-[2px] bg-brand-secondary mb-8 ${
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

        <div
          className={`
    w-3/5 relative flex flex-col items-center justify-center
    ${isLeft ? "text-left" : "text-right"}
  `}
        >
          <div
            className={`
              absolute top-10 opacity-30 group-hover:opacity-50 transition-opacity
              ${isLeft ? "left-0" : "right-0"}
            `}
          >
            <Image
              src="/favicon.svg"
              alt="icon"
              width={120}
              height={120}
              className="opacity-50 w-16 sm:w-20 md:w-28 h-auto"
              priority
            />
          </div>

          {/* MAIN IMAGE */}
          <div className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96`}>
            <Image
              src={displayImage}
              alt={title}
              width={400}
              height={400}
              className="object-contain opacity-95 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
