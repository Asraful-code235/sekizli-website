import Image from "next/image";
import { SocialLink } from "@/sanity/queries/header/types";

interface SocialLinksProps {
  links?: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center  gap-0.5">
      {links.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="xl:w-9 xl:h-9 w-3.5 h-3.5 sm:w-6 sm:h-6 hover:bg-brand-secondary transition-colors flex items-center justify-center rounded-full"
          aria-label={`Social link ${index + 1}`}
        >
          <Image
            src={social.icon.asset.url}
            alt="Social icon"
            width={18}
            height={18}
            className="w-3.5 h-3.5 md:w-8 md:h-8 invert-social"
          />
        </a>
      ))}
    </div>
  );
}
