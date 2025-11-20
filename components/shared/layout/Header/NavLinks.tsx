"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/sanity/queries/header/types";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import IntroFeatureSection from "./IntroFeatureSection";
import { CategoryCard } from "@/features/home/components/CategoryCard";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  items: NavigationItem[];
  locale: string;
}

export function NavLinks({ items, locale }: NavLinksProps) {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState<null | "corporate" | "products">(
    null
  );

  const handleHover = (title: string) => {
    const normalized = title.toLowerCase();
    if (normalized.includes("corporate")) {
      setOpenSheet("corporate");
    } else if (normalized.includes("products")) {
      setOpenSheet("products");
    }
  };

  return (
    <div
      className="hidden lg:flex items-center gap-3 xl:gap-5 relative"
      onMouseLeave={() => setOpenSheet(null)}
    >
      <nav className="flex items-center gap-3 xl:gap-5 z-40">
        {items.map((item, index) => {
          const href = item.link.startsWith("/")
            ? `/${locale}${item.link}`
            : item.link;

          const isHomePage = pathname === `/${locale}` || pathname === "/";
          const isActive = pathname === href || (isHomePage && index === 0);

          const title = item.title || "";
          const isSheetTrigger =
            title.toLowerCase().includes("corporate") ||
            title.toLowerCase().includes("product");

          return (
            <Link
              key={index}
              href={href}
              onMouseEnter={
                isSheetTrigger ? () => handleHover(title) : undefined
              }
              className={`relative group xl:text-[13px] text-[9px] font-semibold border-r border-gray-500 text-brand-primary pr-1 xl:pr-3`}
            >
              {/* animated top line */}
              <span
                className="
                absolute left-0 -top-2
                h-0.75 w-full
                origin-right scale-x-0
                bg-brand-secondary
                group-hover:scale-x-100
                group-hover:bg-brand-primary
                transition-all duration-300
              "
              ></span>
              <span
                className={cn(
                  "absolute left-0 -top-2 h-0.75 w-full origin-left scale-x-40 bg-brand-secondary  group-hover:scale-x-0  opacity-0  group-hover:opacity-100  transition-all duration-500",
                  isActive ? "opacity-100" : ""
                )}
              ></span>
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Sheet
        open={!!openSheet}
        onOpenChange={(open) => {
          if (!open) setOpenSheet(null);
        }}
      >
        <SheetContent
          side="left"
          className="min-w-screen h-screen p-8 bg-gray-100 flex items-center justify-center"
        >
          <SheetHeader className="px-0">
            <SheetTitle></SheetTitle>
          </SheetHeader>
          {openSheet === "corporate" && (
            <div className="">
              <IntroFeatureSection
                title="Expert in High Precision and Balance"
                subtitle="Millions of Hours of Experience, Customer Satisfaction"
                image="/leftInt.png"
                items={[
                  { label: "About Us", href: "/about" },
                  { label: "Our Quality Policy", href: "/quality" },
                  { label: "Collaboration Projects", href: "/projects" },
                  { label: "Machinery Fleet", href: "/machinery" },
                  { label: "Get a Quote", href: "/quote" },
                  { label: "Vision & Mission", href: "/vision" },
                  { label: "R&D", href: "/rnd" },
                  { label: "Quality Certificates", href: "/certificates" },
                  { label: "Service", href: "/service" },
                ]}
              />
            </div>
          )}
          {openSheet === "products" && (
            <div className="flex flex-col lg:flex-row gap-10">
              <CategoryCard
                highlight="Electric"
                title="Crane Systems"
                bgColor="bg-[#3f3f3f]"
                image="/elektirik.png"
                position="left"
                list={[
                  "OVERHEAD TRAVELING CRANES",
                  "LIFTING GROUPS",
                  "GANTRY CRANES",
                  "JIB CRANES",
                  "SPECIAL PROCESS CRANES",
                  "CABIN CRANES",
                ]}
                listImages={[
                  "/elektirik.png",
                  "/kancablokları.png",
                  "/elektirik.png",
                  "/kancablokları.png",
                  "/elektirik.png",
                  "/kancablokları.png",
                ]}
                description={[
                  "Strong carrying capacity,",
                  "Horizontal and vertical maneuverability,",
                  "Electric and manual operation option,",
                  "User-friendly electric crane systems offering easy",
                  "operation with remote control",
                ]}
              />

              {/* Section 2 */}
              <CategoryCard
                highlight="Spare"
                title="Parts"
                bgColor="bg-[#3f3f3f]"
                image="/kancablokları.png"
                list={["CRANE SPARE PARTS"]}
                listImages={["/elektirik.png"]}
                description={[
                  "Strong Durability",
                  "Adaptability in All Directions,",
                  "High Performance,",
                  "5,000+ Spare Parts",
                  "Easy Installation and Use Crane Spare Parts",
                ]}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
