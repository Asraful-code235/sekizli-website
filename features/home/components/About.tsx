'use client';

import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import ImageSlider from "../../../components/shared/slider/slider";
import Link from "next/link";

interface AboutProps {
  title?: string;
  description?: string; // You can make this an array if needed
  image?: {
    asset?: {
      _ref: string;
    };
  };
  sliderImages?: string[]; // NEW → dynamic slider images
}

export function About({
  title = "Precision and balance expert",
  description = `Since 1987, Sekizli has been leading the industry with production of various types of lifting machines and cranes ranging from 500 kilograms to 200 tons capacity. Operating in a 10,000 square meter closed area factory, Sekizli continues to grow and gain experience day by day, pioneering the sector. 
  
  Our company aims to produce high-quality and reliable machinery that can meet the evolving needs of Turkey's growing industry. With a strong technical team and highly flexible manufacturing capacity, we are committed to addressing the changing demands of the industry.`,
  image,
  sliderImages,
}: AboutProps) {
  const images = sliderImages?.length
    ? sliderImages
    : ["/elektirik.png", "/kancablokları.png", "/favicon.svg"];

  const mainImage = image?.asset?._ref ? urlFor(image).url() : null;

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='bg-gray-100 rounded-lg overflow-hidden py-4'>
          {/* ---------- TABS ---------- */}
          <div className='px-4 sm:px-6 lg:px-8 pt-6'>
            <div className='flex space-x-6 sm:space-x-10 overflow-x-auto no-scrollbar pb-2'>
              <Link
                href='/about'
                className='pb-3 border-b-2 border-teal-700 font-semibold text-sm whitespace-nowrap'
              >
                About Us
              </Link>
              <Link
                href='/vision-mission'
                className='pb-3 text-gray-600 hover:text-gray-900 hover:border-b-2 border-teal-700 transition-all text-sm whitespace-nowrap'
              >
                Vision, Mission
              </Link>
              <Link
                href='/quality-policy'
                className='pb-3 text-gray-600 hover:text-gray-900 hover:border-b-2 border-teal-700 transition-all text-sm whitespace-nowrap'
              >
                Quality Policy & Documents
              </Link>
              <Link
                href='/r-and-d'
                className='pb-3 text-gray-600 hover:text-gray-900 hover:border-b-2 border-teal-700 transition-all text-sm whitespace-nowrap'
              >
                R&D
              </Link>
            </div>
          </div>

          {/* ---------- CONTENT ---------- */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-8'>
            {/* IMAGE COLUMN */}
            <div className='w-full'>
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={title}
                  className='w-full rounded-lg object-cover h-64 sm:h-80 md:h-96 lg:h-full'
                />
              ) : (
                <ImageSlider
                  images={images}
                  className='h-64 sm:h-80 md:h-96 lg:h-full'
                />
              )}
            </div>

            {/* TEXT COLUMN */}
            <div className='flex flex-col justify-center'>
              <h2 className='text-3xl sm:text-4xl font-bold mb-6 leading-tight'>
                {title}
              </h2>

              {/* If description contains multiple paragraphs */}
              {Array.isArray(description) ? (
                description.map((p, i) => (
                  <p
                    key={i}
                    className='text-sm text-gray-700 mb-4 leading-relaxed'
                  >
                    {p}
                  </p>
                ))
              ) : (
                <p className='text-sm text-gray-700 mb-8 leading-relaxed'>
                  {description}
                </p>
              )}

              <button className='flex items-center space-x-3 text-sm text-gray-600 hover:text-teal-700 transition-colors group'>
                <span className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors'>
                  <ArrowRight size={18} />
                </span>
                <span className='font-semibold leading-tight'>
                  Browse <br /> Details
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
