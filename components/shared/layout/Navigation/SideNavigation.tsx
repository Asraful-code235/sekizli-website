"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicSlider from "./DynamicSlider"

interface SideNavItem {
  label?: string;
  href?: string;
}

interface SideNavProps {
  items?: SideNavItem[];
  locale: string;
}

export default function SideNavigation({ items, locale }: SideNavProps) {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const logos = [
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
  ];

   const maxIndex = logos.length - 3;

   useEffect(() => {
     const timer = setInterval(() => {
       setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
     }, 2500);

     return () => clearInterval(timer);
   }, [maxIndex]);

  return (
    <div className='w-1/4 min-w-[350px]'>
      <div className='relative shadow-md rounded-xl p-6 border border-gray-200 overflow-hidden'>
        {/* Background Image with Light Opacity */}
        <div className="absolute inset-0 bg-[url('/nav-bg.png')] bg-cover bg-center opacity-30" />
        <div className='py-3 relative z-10'>
          <div className='flex items-center gap-4'>
            <h1 className='whitespace-nowrap font-semibold'>
              Sekizli
              <br />
              Machine & Crane
            </h1>

            {/* line */}
            <div className='flex-1 h-px bg-gray-200'></div>
          </div>
        </div>

        {/* Actual Content */}
        <div className='relative'>
          <ul className='space-y-1 p-4 rounded-xl bg-white backdrop-blur-sm'>
            {items?.map((item, idx) => {
              const href = item.href?.startsWith("/")
                ? `/${locale}${item.href}`
                : item.href;
              const isActive = pathname === href;
              return (
                <li key={href ?? idx}>
                  <Link
                    href={href ?? "#"}
                    className={`
                      relative flex items-center text-sm font-medium px-4 py-3 rounded
                      border-b border-gray-200 transition-all group
                      ${isActive ? "bg-teal-700 text-white" : "text-gray-800"}
                    `}
                  >
                    {/* Sliding Hover Background (starts at 70% width) */}
                    {!isActive && (
                      <span
                        className='
                          absolute inset-0 
                          w-full h-full
                          bg-brand-secondary
                          -z-10
                          transform scale-x-[0.0] origin-left
                          group-hover:scale-x-150
                          transition-transform duration-400 ease-in-out
                        '
                      />
                    )}

                    <span className='mr-2 text-lg leading-none'>»</span>
                    {item?.label ?? "Untitled"}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='space-y-10 mt-6'>
        <DynamicSlider
          title='Those Who Prefer Sekizli'
          logos={logos}
          image='/leftInt.png'
          visibleCount={3}
          interval={3000}
          autoPlay={true}
        />

        {/* 2nd section */}
        <div className='bg-gray-100 rounded-xl p-5 relative'>
          <div className='absolute bottom-0 left-0 w-full h-1 bg-brand-secondary/90 rounded-b-xl'></div>

          <div className='flex gap-4'>
            {/* Left Big S Icon */}
            <div className='w-1/3'>
              <Image
                src={"/favicon.svg"}
                alt='brand logo'
                width={80}
                height={80}
                className='object-contain pr-2 w-full h-auto opacity-70'
              />
            </div>

            {/* Right Text */}
            <p className='text-teal-700 text-md leading-relaxed font-semibold w-full mt-10'>
              Thousands of customers, tons of cargo, millions of hours of
              operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
