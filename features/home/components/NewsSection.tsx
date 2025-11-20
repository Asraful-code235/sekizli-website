"use client";
import DynamicSlider from "@/components/shared/layout/Navigation/DynamicSlider";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import ImageSlider from "@/components/shared/slider/slider";
import { useState } from "react";
import { NewsSectionData } from "../types";

export function NewsSection({ data }: { data: NewsSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) return null;

  const { newsCard, sekizliCard, accordionCard } = data;

  const logos =
    sekizliCard?.logos
      ?.map((logo) => logo.asset.url)
      .filter((url): url is string => !!url) || [];
  const accordianItems =
    accordionCard?.items
      ?.map((item) => ({
        title: item.title,
        image: item.image.asset.url,
      }))
      .filter(
        (item): item is { title: string; image: string } => !!item.image
      ) || [];

  const sliderImages =
    newsCard?.sliderItems
      ?.map((item) => item.image.asset.url)
      .filter((url): url is string => !!url) || [];
  const sliderTitles = newsCard?.sliderItems?.map((item) => item.title) || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* 1st card */}
          <div className="relative">
            {/* Background Layer */}
            <div
              className="absolute inset-0 bg-[#f2f2f2] bg-cover bg-center opacity-40 rounded-3xl"
              style={{
                backgroundImage: newsCard?.backgroundImage
                  ? `url(${newsCard.backgroundImage.asset.url})`
                  : "url('/nav-bg.png')",
              }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 p-6">
              <div className="rounded-lg">
                <div className="flex items-center justify-between mb-10">
                  <Link className="" href={newsCard?.link || "#"}>
                    {newsCard?.title || "News & Announcements"}
                  </Link>
                  <div className="flex space-x-1">
                    <span className="w-5 h-2 bg-brand-primary rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                  </div>
                </div>

                <div className="overflow-hidden cursor-pointer bg-white px-4 py-10 shadow rounded-lg">
                  <ImageSlider
                    images={sliderImages}
                    className="h-72"
                    indicator={false}
                    onSlideChange={setActiveIndex}
                  />

                  <div className="flex gap-5 py-3">
                    <Image
                      src={"/n-icon.png"}
                      alt={"icon"}
                      width={20}
                      height={20}
                      className="object-contain p-0.5"
                    />

                    <p className="text-sm font-semibold text-brand-primary">
                      {sliderTitles[activeIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd card */}
          <div>
            <DynamicSlider
              title={sekizliCard?.title || "Those Who Prefer Sekizli"}
              logos={logos}
              image={sekizliCard?.mainImage?.asset?.url || "/tercih.jpg"}
              visibleCount={3}
              interval={3000}
              autoPlay={true}
            />
          </div>

          {/* 3rd card */}
          <div className="relative">
            {/* Background Layer */}
            <div
              className="absolute inset-0 bg-[#f2f2f2] bg-cover bg-center opacity-40 rounded-3xl"
              style={{
                backgroundImage: accordionCard?.backgroundImage
                  ? `url(${accordionCard.backgroundImage.asset.url})`
                  : "url('/nav-bg.png')",
              }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 p-6">
              <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-xl"
                defaultValue="item-1"
              >
                {accordianItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className="px-4"
                  >
                    <AccordionTrigger className="text-left">
                      {item.title}
                    </AccordionTrigger>

                    <AccordionContent className="flex items-center justify-center py-6">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        className="w-full rounded-lg object-cover"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
