"use client";
import CategoryNavItem from "@/components/shared/layout/Header/CategoryNavItem";
import Image from "next/image";
import { useState } from "react";

export interface CategoryListItemProps {
  title: string;
  link: string;
  image?: string;
}

export interface CategoryCardProps {
  highlight: string;
  title: string;
  bgColor: string;
  bgImage?: string;
  image: string;
  listItems?: CategoryListItemProps[];
  descriptions?: string[];
  position?: "left" | "right";
}

export function CategoryCard({
  highlight,
  title,
  bgColor = "bg-[#0f766e]",
  bgImage = "/rightBg.png",
  image,
  listItems = [],
  descriptions = [],
  position = "right",
}: CategoryCardProps) {
  const isLeft = position === "left";
  const [hoveredImage, setHoveredImage] = useState<string>(image);
  const displayImage = hoveredImage;

  const handleMouseEnter = (itemImage?: string) => {
    if (itemImage) {
      setHoveredImage(itemImage);
    }
  };

  return (
    <div
      className={`
        ${
          isLeft
            ? "rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl max-sm:mr-4"
            : "rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl max-sm:ml-4"
        }

        p-4 md:p-10 text-white relative overflow-hidden
        hover:shadow-2xl transition-shadow 
        ${bgColor} bg-[url('/rightBg.png')] bg-cover bg-center
      `}
    >
      <div
        className={`
          flex items-start gap-10 relative z-10
          ${isLeft ? "flex-row ml-auto max-w-[650px] w-full" : "flex-row-reverse max-w-[650px] mr-auto w-full"}
        `}
      >
        {/* LEFT HALF — Content + List */}
        <div className="w-1/3">
          <h2
            className={`text-[13px] xl:text-[17px] font-bold mb-2 ${isLeft ? "text-left" : "text-right xl:mr-10"}`}
          >
            <span className="text-brand-secondary">{highlight}</span>
            <br />
            {title}
          </h2>

          <div
            className={`w-16 h-[2px] bg-brand-secondary/90 mb-8 ${
              isLeft ? "" : "ml-auto xl:mr-10 "
            }`}
          />

          {listItems.length > 0 && (
            <ul
              className={`space-y-3 text-xs font-medium tracking-wider ${
                isLeft ? "text-left" : "text-right"
              }`}
            >
              {listItems.map((item: CategoryListItemProps, idx: number) => (
                <li key={idx} onMouseEnter={() => handleMouseEnter(item.image)}>
                  <CategoryNavItem
                    label={item.title}
                    href={item.link}
                    position={position}
                  />
                </li>
              ))}
            </ul>
          )}

          <div
            className={`
               text-xs text-gray-100 max-sm:hidden mt-36
              ${isLeft ? "text-right hidden" : "text-right"}
            `}
          >
            {isLeft
              ? descriptions.map((text: string, i: number) => (
                  <p key={i}>▸ {text}</p>
                ))
              : descriptions.map((text: string, i: number) => (
                  <p key={i}>▸ {text}</p>
                ))}
          </div>
        </div>

        {/* RIGHT HALF — Image + Background Icon + Description */}
        <div
          className={`w-1/2 relative ${isLeft ? "text-left" : "text-right"}`}
        >
          {/* BACKGROUND ICON */}
          <div
            className={`
              absolute w-full h-full top-10 opacity-30 group-hover:opacity-50 transition-opacity
              ${isLeft ? "left-0" : "right-0"}
            `}
          >
            <Image
              src="/favicon.svg"
              alt="icon"
              width={120}
              height={120}
              className="opacity-20 w-16 sm:w-20 md:w-28 h-auto"
              priority
            />
          </div>

          {/* MAIN IMAGE */}
          <div
            className={`relative w-full ${
              isLeft ? "justify-start" : "justify-end"
            } aspect-4/3 overflow-hidden`}
          >
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-contain opacity-95"
            />
          </div>

          {/* DESCRIPTION */}
          <div
            className={`
              mt-12 text-xs text-gray-100 max-sm:hidden
              ${isLeft ? "text-right" : "hidden"}
            `}
          >
            {isLeft
              ? descriptions.map((text: string, i: number) => (
                  <p key={i}>▸ {text}</p>
                ))
              : descriptions.map((text: string, i: number) => (
                  <p key={i}>{text}◂</p>
                ))}
          </div>
        </div>
      </div>
      <div
        className={`
               text-xs text-gray-100 mt-6 sm:hidden
              ${isLeft ? "text-right " : "text-right"}
            `}
      >
        {isLeft
          ? descriptions.map((text: string, i: number) => (
              <p key={i}>▸ {text}</p>
            ))
          : descriptions.map((text: string, i: number) => (
              <p key={i}>▸ {text}</p>
            ))}
      </div>
    </div>
  );
}
