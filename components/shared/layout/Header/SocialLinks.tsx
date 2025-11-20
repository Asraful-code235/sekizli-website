import Image from 'next/image'
import { SocialLink } from '@/sanity/queries/header/types'

interface SocialLinksProps {
  links?: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="flex items-center lg:gap-3 gap-0.5">
      {links.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:w-9 lg:h-9 w-6 h-6 rounded-full bg-gray-200 hover:bg-brand-secondary transition-colors flex items-center justify-center"
          aria-label={`Social link ${index + 1}`}
        >
          <Image
            src={social.icon.asset.url}
            alt="Social icon"
            width={18}
            height={18}
            className="w-4.5 h-4.5"
          />
        </a>
      ))}
    </div>
  )
}
