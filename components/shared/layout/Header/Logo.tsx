import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  logo: {
    asset: {
      _id: string
      url: string
      metadata: {
        lqip?: string
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  locale: string
}

export function Logo({ logo, locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} className="flex items-center">
      <Image
        src={logo.asset.url}
        alt="Sekizli Logo"
        width={logo.asset.metadata.dimensions.width}
        height={logo.asset.metadata.dimensions.height}
        className="h-12 w-auto"
        priority
        placeholder={logo.asset.metadata.lqip ? 'blur' : 'empty'}
        blurDataURL={logo.asset.metadata.lqip}
      />
    </Link>
  )
}
