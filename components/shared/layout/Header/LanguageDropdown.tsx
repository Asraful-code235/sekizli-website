"use client";

import { useState } from "react";
import { useLocale } from "@/lib/use-locale";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageDropdownProps {
  availableLanguages: string[];
}

export function LanguageDropdown({
  availableLanguages,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale, switchLocale } = useLocale();

  // Filter languages based on what's available from Sanity
  const filteredLanguages = Object.entries(SUPPORTED_LANGUAGES)
    .filter(([code]) => availableLanguages.includes(code))
    .map(([langCode, config]) => ({
      langCode: langCode as LanguageCode,
      ...config,
    }));

  const handleLanguageSwitch = (langCode: LanguageCode) => {
    switchLocale(langCode);
    setIsOpen(false);
  };

  return (
    <div
      className="relative bottom-0 bg-brand-primary hover:bg-brand-primary/90 transition-colors"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-2 px-2 py-2"
        aria-label="Select language"
      >
        <div className="flex flex-col gap-1 text-white">
          <Globe className="size-3 sm:size-6" />
        </div>

        <span className="text-xs sm:text-sm font-medium uppercase text-white">
          {currentLocale}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 bg-brand-primary  shadow-lg py-1 z-50 text-white transition-colors duration-300 ease-in-out">
          {filteredLanguages.map(({ langCode, nativeLabel }) => (
            <button
              key={langCode}
              onClick={() => handleLanguageSwitch(langCode)}
              className={`w-full text-center cursor-pointer px-4 py-2 outline-none text-xs sm:text-sm hover:bg-brand-primary/90 transition-colors duration-300 ease-in-out ${
                langCode === currentLocale
                  ? " font-medium bg-brand-secondary"
                  : "hover:bg-brand-secondary"
              }`}
            >
              <span className="uppercase text-xs sm:text-sm md:mr-2 ">
                {langCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
