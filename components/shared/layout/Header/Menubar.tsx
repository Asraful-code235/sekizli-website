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

interface MenubarProps {
  data: HeaderData;
}

function Menubar({ data }: MenubarProps) {
  const { logo, language, socialLinks, expandedMenu } = data;

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
          className="overflow-y-auto max-h-full bg-[linear-gradient(256deg,#00524d_23%,#05413e_75%)] z-60"
        >
          <div className="max-w-[1500px] mx-auto text-white px-3">
            <SheetHeader className="px-0">
              <SheetTitle></SheetTitle>
              <div className="flex justify-between items-center border-b border-gray-500 pb-4">
                <Logo logo={logo} locale={language} />
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
                      {expandedMenu?.customerService?.phone || "444 75 95"}
                    </div>
                    <div className="text-white/60">
                      {expandedMenu?.customerService?.label ||
                        "Customer Service"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 lg:text-lg sm:text-sm text-xs">
                <div className="flex items-center md:gap-4 gap-2 text-white">
                  <span>Sekizli Social</span>
                  <div className="flex items-center gap-2 lg:pl-4 pl-2 border-l border-gray-500">
                    {socialLinks?.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full bg-white"
                      >
                        {social.icon?.asset?.url && (
                          <img
                            src={social.icon.asset.url}
                            alt="social icon"
                            className="size-4 sm:size-5 md:size-6 lg:size-7 p-0.5"
                          />
                        )}
                      </a>
                    ))}
                  </div>

                  <span className="pl-4 border-l border-gray-500">
                    {expandedMenu?.location?.label || "Sekizli Location"}
                  </span>
                  {expandedMenu?.location?.mapLink && (
                    <Link
                      href={expandedMenu.location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin
                        size={22}
                        className="transition-colors hover:stroke-brand-secondary"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row sm:flex-col-reverse flex-col-reverse gap-5 mt-4">
              <aside className="w-full lg:max-w-xs text-white py-4 space-y-6 border-t-2 sm:border-r-2 sm:border-t-0 border-gray-500 lg:border-r ">
                <nav className="space-y-4">
                  {expandedMenu?.menuGroups?.map((group, i) => (
                    <div key={i} className="space-y-2">
                      {group.url ? (
                        <Link
                          href={group.url}
                          className="font-semibold block hover:text-brand-secondary"
                        >
                          {group.title}
                        </Link>
                      ) : (
                        <div className="font-semibold block text-white">
                          {group.title}
                        </div>
                      )}

                      {group.links && group.links.length > 0 && (
                        <ul className="text-sm space-y-2">
                          {group.links.map((link, j) => (
                            <li key={j}>
                              <Link
                                href={link.url}
                                className="hover:text-brand-secondary"
                              >
                                » {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
              </aside>

              {expandedMenu?.featuredCategories?.map((category, i) => (
                <HeaderCategoryCard
                  key={i}
                  highlight={category.highlight}
                  title={category.title}
                  image={category.image?.asset?.url || ""}
                  list={category.list || []}
                  listImages={Array(category.list?.length || 0).fill(
                    category.image?.asset?.url || ""
                  )}
                  description={category.description || []}
                />
              ))}
            </div>
            <SheetFooter className="px-0">
              <p className="border-t border-gray-500 pt-3 text-sm">
                {expandedMenu?.copyrightText ||
                  "All rights reserved. All content and images used on our website belong to Sekizli Vinc and unauthorized use is subject to legal action."}
              </p>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Menubar;
