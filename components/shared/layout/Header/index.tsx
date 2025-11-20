import { HeaderData } from "@/sanity/queries/header/types";
import { Logo } from "./Logo";
import { LanguageDropdown } from "./LanguageDropdown";
import { NavLinks } from "./NavLinks";
import { PhoneButton } from "./PhoneButton";
import { SocialLinks } from "./SocialLinks";
import Menubar from "./Menubar";

interface HeaderProps {
  data: HeaderData;
  locale: string;
}

export function Header({ data, locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-60 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-1">
        <div className="flex items-center justify-between h-16 md:h-24">
          <Logo logo={data.logo} locale={locale} />
          <div className="flex items-center flex-row-reverse md:flex-row h-full gap-3 xl:gap-5">
            <div className="h-full">
              <Menubar data={data} />
              <LanguageDropdown availableLanguages={data.languages} />
            </div>
            <NavLinks items={data.navigationItems} locale={locale} />
            <PhoneButton callCta={data.callCta} />
            <SocialLinks links={data.socialLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
