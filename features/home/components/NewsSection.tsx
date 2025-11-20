"use client"
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

export function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const logos = [
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
  ];
  const accordianItems = [
    {
      title: "Trade Shows",
      image: "/elektirik.png",
    },
    {
      title: "Photo Gallery",
      image: "/elektirik.png",
    },
    {
      title: "Online Catalog",
      image: "/elektirik.png",
    },
  ];
  const sliderData = [
    { image: "/logo.svg", title: "HKN Automation 2019" },
    { image: "/elektirik.png", title: "HKN Expo 2022" },
    { image: "/logo.svg", title: "Smart Factory Summit" },
  ];

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* 1st card */}
          <div className='relative'>
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[#f2f2f2] bg-[url('/nav-bg.png')] bg-cover bg-center opacity-40 rounded-3xl"></div>

            {/* Content Layer */}
            <div className='relative z-10 p-6'>
              <div className='rounded-lg'>
                <div className='flex items-center justify-between mb-10'>
                  <Link className='' href={"#"}>
                    News & Announcements
                  </Link>
                  <div className='flex space-x-1'>
                    <span className='w-2 h-2 bg-teal-700 rounded-full'></span>
                    <span className='w-2 h-2 bg-gray-300 rounded-full'></span>
                    <span className='w-2 h-2 bg-gray-300 rounded-full'></span>
                    <span className='w-2 h-2 bg-gray-300 rounded-full'></span>
                  </div>
                </div>

                <div className='overflow-hidden cursor-pointer bg-white px-4 py-10 shadow rounded-lg'>
                  <ImageSlider
                    images={sliderData.map((item) => item.image)}
                    className='h-48'
                    indicator={false}
                    onSlideChange={setActiveIndex}
                  />

                  <div className='flex gap-5 py-3'>
                    <Image
                      src={"/n-icon.png"}
                      alt={"icon"}
                      width={20}
                      height={20}
                      className='object-contain p-0.5'
                    />

                    <p className='text-sm font-semibold'>
                      {sliderData[activeIndex]?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd card */}
          <div>
            <DynamicSlider
              title='Those Who Prefer Sekizli'
              logos={logos}
              image='/tercih.jpg'
              visibleCount={3}
              interval={3000}
              autoPlay={true}
            />
          </div>

          {/* 3rd card */}
          <div className='relative'>
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[#f2f2f2] bg-[url('/nav-bg.png')] bg-cover bg-center opacity-40 rounded-3xl"></div>

            {/* Content Layer */}
            <div className='relative z-10 p-6'>
              <Accordion
                type='single'
                collapsible
                className='w-full bg-white rounded-xl'
                defaultValue='item-1'
              >
                {accordianItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className='px-4'
                  >
                    <AccordionTrigger className='text-left'>
                      {item.title}
                    </AccordionTrigger>

                    <AccordionContent className='flex items-center justify-center py-6'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        className='w-full rounded-lg object-cover'
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

