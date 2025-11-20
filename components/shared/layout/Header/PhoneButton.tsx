import Image from 'next/image'
import { CallCta } from '@/sanity/queries/header/types'

interface PhoneButtonProps {
  callCta: CallCta
}

export function PhoneButton({ callCta }: PhoneButtonProps) {
  // Format phone number for tel: link (remove spaces and special characters)
  const phoneLink = callCta.phone.replace(/\s+/g, '')

  return (
    <a
      href={`tel:${phoneLink}`}
      className='flex items-center gap-2 lg:px-4 px-2 py-2 transition-colors'
    >
      {callCta.icon?.asset && (
        <Image
          src={callCta.icon.asset.url}
          alt='Phone'
          width={20}
          height={20}
          className='w-5 h-5'
        />
      )}
      <span className='font-medium text-xs md:text-base lg:text-sm xl:text-base'>
        {callCta.phone}
      </span>
    </a>
  );
}
