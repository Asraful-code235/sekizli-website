import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterData } from "@/sanity/queries/footer/types";

const iconMap: Record<string, any> = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
};

interface FooterProps {
  data?: FooterData | null;
}

function Footer({ data }: FooterProps) {
  if (!data) return null;
  const sectionsWithLinks = data.sections?.filter((s) => s.links?.length) || [];
  const sectionsWithoutLinks =
    data.sections?.filter((s) => !s.links?.length) || [];

  return (
    <footer className='bg-white border-t border-gray-300 pb-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[300px_1fr] gap-16 md:gap-12 lg:gap-28'>
          {/* LEFT COLUMN */}
          <div className='flex flex-col items-start relative'>
            {data.logo?.asset?.url && (
              <Image
                src={data.logo.asset.url}
                width={240}
                height={70}
                alt='Logo'
              />
            )}

            {data.craneImage?.asset?.url && (
              <Image
                src={data.craneImage.asset.url}
                width={120}
                height={120}
                alt='Crane'
                className='absolute top-0 lg:-right-25 right-0'
              />
            )}

            {data.copyrightText && (
              <p className='text-xs text-gray-600 leading-relaxed max-w-[240px] mt-4'>
                {data.copyrightText}
              </p>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className='flex flex-col'>
            {/* TOP SOCIAL + SUPPORT */}
            <div className='border-y md:border-y-0 md:border-b border-gray-300 relative py-4 mb-10'>
              <div className='flex items-center justify-between'>
                {/* SOCIALS */}

                <div
                  className="flex flex-col lg:flex-row items-center gap-5 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[25px] before:h-[4px] before:bg-[#00524d] after:content-[''] 
  after:absolute 
  after:left-0 
  after:bottom-0 
  after:w-[25px] 
  after:h-[4px] 
  after:bg-[#00524d]"
                >
                  <h4 className='text-xs font-bold text-teal-900'>
                    Sekizli Social Media Accounts
                  </h4>

                  <div className='flex items-center gap-2 md:gap-3'>
                    {data.socialLinks?.map((item, i) => {
                      const Icon = item.icon
                        ? iconMap[item.icon.toLowerCase()]
                        : null;
                      if (!Icon) return null;
                      return (
                        <Link
                          key={i}
                          href={item.url}
                          className='w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/70'
                        >
                          <Icon size={16} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* SUPPORT PHONE */}
                {data.supportPhone && (
                  <div
                    className="text-right flex flex-col lg:flex-row items-center gap-5 relative before:content-[''] before:absolute before:left-0 before:-top-4.5 before:w-[25px] before:h-[4px] before:bg-[#00524d] after:absolute 
  after:left-0 
  after:-bottom-4.5 
  after:w-[25px] 
  after:h-[4px] 
  after:bg-[#00524d]"
                  >
                    <h4 className='text-xs font-bold text-teal-900'>
                      Sekizli Support Line
                    </h4>

                    <Link
                      href={`tel:${data.supportPhone}`}
                      className='flex items-center justify-end gap-2'
                    >
                      <Phone className='text-teal-700' size={20} />
                      <span className='lg:text-lg font-bold text-teal-900'>
                        {data.supportPhone}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* LOWER MENU SECTIONS */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
              {/* SECTIONS WITH LINKS */}
              {sectionsWithLinks.map((section, i) => (
                <div key={i}>
                  {i === 3 && sectionsWithoutLinks.length > 0 && (
                    <div className=''>
                      <ul className='space-y-1 text-xs text-gray-700'>
                        {sectionsWithoutLinks.map((s, index) => (
                          <li key={index}>{s.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <span className='text-xs text-gray-700 font-bold'>
                    {section.title}
                  </span>

                  <ul className='space-y-1 text-xs text-gray-700 mt-1'>
                    {section.links?.map((link, j) => (
                      <li key={j}>
                        <Link
                          href={link.url || "#"}
                          className='hover:text-teal-700'
                        >
                          › {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* CONTACT COLUMN */}
              <div>
                <h4 className='font-bold text-sm mb-3'>Contact</h4>

                <div className='text-xs text-gray-700 leading-relaxed mb-4'>
                  <p className='whitespace-pre-line'>{data.contact?.address}</p>
                </div>

                <div className='text-xs'>
                  {data.contact?.phones?.map((phone, i) => (
                    <div key={i}>
                      <Link
                        href={`tel:${phone}`}
                        className='text-teal-900 font-bold'
                      >
                        {phone}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-300 text-center text-xs text-gray-500'>
          Web Design & Software | INVIVA
        </div>
      </div>
    </footer>
  );
}

export default Footer;
