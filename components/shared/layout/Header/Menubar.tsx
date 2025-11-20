import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  Youtube,
} from "lucide-react";
import { Logo } from "./Logo";
import { HeaderData } from "@/sanity/queries/header/types";
import { XIcon } from "lucide-react";
import Link from "next/link";
import HeaderCategoryCard from "./HeaderCategory";
import { DialogTitle } from "@/components/ui/dialog";

interface LogoProps {
  logo: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        lqip?: string;
        dimensions: { width: number; height: number };
      };
    };
  };
  locale: string;
}
function Menubar({ logo, locale }: LogoProps) {
  return (
    <div className="w-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="
            bg-brand-primary 
            border-b-4 border-b-brand-secondary
            rounded-none 
            w-full
            h-16
            sm:h-16
            md:h-24
            lg:h-24
            flex items-center justify-center
            hover:bg-brand-primary/90
            "
          >
            <Menu
              color="white"
              className="
              w-4 h-4
              sm:w-6 sm:h-6
              md:w-7 md:h-7
              lg:w-8 lg:h-8
            "
            />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="top"
          className="overflow-y-auto max-h-full bg-[linear-gradient(256deg,#00524d_23%,#05413e_75%)]"
        >
          <div className="container mx-auto text-white px-3">
            <SheetHeader className="px-0">
              <SheetTitle></SheetTitle>
              <div className="flex justify-between items-center border-b border-gray-500 pb-4">
                <Logo logo={logo} locale={locale} />
                <SheetClose className="p-3 rounded-full">
                  <XIcon className="size-6" />
                </SheetClose>
              </div>
            </SheetHeader>
            <div className="flex justify-between items-center border-b border-gray-500 pb-4">
              <div className="flex items-center text-white/90">
                <div className="flex items-center gap-3 lg:text-lg sm:text-sm text-xs">
                  <Phone size={28} className="text-white/90" />
                  <div>
                    <div className="lg:text-xl sm:text-md text-xs font-semibold">
                      444 75 95
                    </div>
                    <div className="text-white/60">Customer Service</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 lg:text-lg sm:text-sm text-xs">
                <div className="flex items-center md:gap-4 gap-2 text-white">
                  <span>Sekizli Social</span>
                  <div className="flex items-center gap-2 lg:pl-4 pl-2 border-l border-gray-500">
                    <a
                      href="#"
                      aria-label="facebook"
                      className="p-1 rounded-full bg-white"
                    >
                      <Facebook
                        className="size-4 sm:size-5 md:size-6 lg:size-7"
                        fill="black"
                      />
                    </a>
                    <a
                      href="#"
                      aria-label="instagram"
                      className="p-1 rounded-full bg-white"
                    >
                      <Instagram
                        className="size-4 sm:size-5 md:size-6 lg:size-7"
                        fill="black"
                      />
                    </a>
                    <a
                      href="#"
                      aria-label="linkedin"
                      className="p-1 rounded-full bg-white"
                    >
                      <Linkedin
                        className="size-4 sm:size-5 md:size-6 lg:size-7"
                        fill="black"
                      />
                    </a>
                    <a
                      href="#"
                      aria-label="youtube"
                      className="p-1 rounded-full bg-white"
                    >
                      <Youtube
                        className="size-4 sm:size-5 md:size-6 lg:size-7"
                        fill="black"
                      />
                    </a>
                  </div>

                  <span className="pl-4 border-l border-gray-500">
                    Sekizli Location
                  </span>
                  <Link
                    href="https://maps.app.goo.gl/qZGqnad27oDwKGz59"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin
                      size={22}
                      className="transition-colors hover:stroke-brand-secondary"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row sm:flex-col-reverse flex-col-reverse gap-5 mt-4">
              <aside className="w-full lg:max-w-xs text-white py-4 space-y-6 border-t-2 sm:border-r-2 sm:border-t-0 border-gray-500 lg:border-r ">
                <nav className="space-y-4">
                  {/* Top Level Links */}
                  <div className="space-y-2 font-semibold">
                    <Link className="block hover:text-brand-secondary" href="#">
                      Corporate
                    </Link>
                    <Link className="block hover:text-brand-secondary" href="#">
                      Production
                    </Link>
                    <Link className="block hover:text-brand-secondary" href="#">
                      Quality
                    </Link>
                    <Link className="block hover:text-brand-secondary" href="#">
                      Get a Quote
                    </Link>
                  </div>
                  {/* Products */}
                  <div className="space-y-2">
                    <Link
                      href="#"
                      className="font-semibold block hover:text-brand-secondary"
                    >
                      Products
                    </Link>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Electric Crane Systems
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Electric Load Carrying Platform
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Spare Parts
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Other Sections */}
                  <div className="space-y-2 font-semibold">
                    <Link className="block hover:text-brand-secondary" href="#">
                      Those Who Prefer Sekizli
                    </Link>
                    <Link className="block hover:text-brand-secondary" href="#">
                      News & Announcements
                    </Link>
                  </div>
                  {/* Media */}
                  <div className="space-y-2">
                    <Link
                      href="#"
                      className="font-semibold block hover:text-brand-secondary"
                    >
                      Media
                    </Link>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Online Catalog
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Trade Shows
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Photo Gallery
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Video Gallery
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Service */}
                  <div>
                    <Link
                      className="font-semibold hover:text-brand-secondary block"
                      href="#"
                    >
                      Service
                    </Link>
                  </div>
                  {/* Contact */}
                  <div>
                    <Link
                      href="#"
                      className="font-semibold block hover:text-brand-secondary mb-2"
                    >
                      Contact
                    </Link>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link href="#" className="hover:text-brand-secondary">
                          » Location and Contact Information
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </aside>
              <HeaderCategoryCard
                highlight="Electric"
                title="Crane Systems"
                image="/elektirik.png"
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
              <HeaderCategoryCard
                highlight="Spare"
                title="Parts"
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
            <SheetFooter className="px-0">
              <p className="border-t border-gray-500 pt-3 text-sm">
                All rights reserved. All content and images used on our website
                belong to Sekizli Vinc and unauthorized use is subject to legal
                action.
              </p>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
export default Menubar;
