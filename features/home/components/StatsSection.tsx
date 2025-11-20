'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const statsData = {
  bgImage: "/bg.png",
  hoverBg: "#0f766e",
  image: "/leftInt.png",

  title: [
    "Thousands of",
    "customers, tons of",
    "cargo, millions of",
    "hours of",
    "operational time",
  ],

  paragraphs: [
    "At Sekizli Crane, with nearly half a century of manufacturing experience, our expert R&D and production team provides systems that carry tons of cargo to thousands of customers.",
    "With our 15,000 m² production facility, advanced technological infrastructure, and extensive machinery park, we proudly represent our country worldwide.",
  ],

  button: {
    labelLine1: "Crane",
    labelLine2: "Details",
    href: "#", // link from sanity
  },
};

export function StatsSection() {
  return (
    <section className='py-0 md:py-10 sm:py-0 lg:py-0'>
      <div className='container mx-auto px-4'>
        <div
          className='rounded-3xl p-12 text-white relative overflow-hidden bg-[#393939] bg-cover bg-center transition-all duration-400 ease-in hover:bg-brand-primary/80'
          style={{
            backgroundImage: `url('${statsData.bgImage}')`,
          }}
        >
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-12 items-start'>
            {/* LEFT IMAGE */}
            <div className='relative'>
              <div className='relative z-10 pt-12'>
                <Image
                  src={statsData.image}
                  alt='stats image'
                  width={400}
                  height={400}
                  className='w-full'
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* Dynamic Title */}
              <h2 className='text-3xl lg:text-4xl font-bold mb-8 leading-tight'>
                {statsData.title.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>

              {/* Dynamic Paragraphs */}
              {statsData.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className='text-sm text-gray-300 mb-4 leading-relaxed'
                >
                  {text}
                </p>
              ))}

              {/* Dynamic Button */}
              <a
                href={statsData.button.href}
                className='inline-flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors group mt-4'
              >
                <span className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center group-hover:bg-brand-primary/80 transition-colors'>
                  <ArrowRight size={18} />
                </span>

                <span className='font-semibold'>
                  {statsData.button.labelLine1}
                  <br />
                  {statsData.button.labelLine2}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

