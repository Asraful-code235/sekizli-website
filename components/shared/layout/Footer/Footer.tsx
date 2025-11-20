import { Facebook, Linkedin, Instagram, Youtube, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerData = {
  logo: "/logo.svg",
  craneImage: "/vinc.png",

  socials: [
    {
      icon: Facebook,
      href: "https://www.facebook.com/SekizliMakVincAs/?locale=tr_TR",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sekizligroup/",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/sekizli-makine-&-vinc-a-s/",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UCGdRwPlRFUxULWGODmLNyiA",
    },
  ],

  supportPhone: "444 75 95",

  sections: [
    {
      title: "Corporate",
      items: [
        "About Us",
        "Vision & Mission",
        "Our Quality Policy",
        "R&D",
        "Collaboration Projects",
        "Quality Certificates",
        "Machinery Fleet",
        "Service",
      ],
    },
    {
      title: "Products",
      items: [
        "Electric Crane Systems",
        "Electric Load Carrying Platform",
        "Spare Parts",
      ],
    },
    {
      title: "Multimedia",
      items: ["Trade Shows", "Photo Gallery", "Video Gallery", "Catalogs"],
    },
    {
      title: "",
      items: ["Production", "Quality", "Service", "References"],
      childTitle: "PDPL",
      childItems: [
        "Protection of Personal Data",
        "Privacy and Cookie Policy",
        "KVK-Sekizli Foreign Trade Ltd. Co.",
      ],
    },
  ],

  contact: {
    address: [
      "Fevziçakmak Mahallesi Büsan 3",
      "Organize Sanayi 10650 Sokak No: 3",
      "Karatay / KONYA / TÜRKİYE",
    ],
    phones: ["+90 332 444 75 95", "+90 332 444 59 93"],
  },
};

function Footer() {
  return (
    <footer className='bg-white border-t border-gray-300 pb-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[300px_1fr] gap-16 md:gap-12 lg:gap-28'>
          {/* LEFT COLUMN */}
          <div className='flex flex-col items-start relative'>
            <Image src={footerData.logo} width={240} height={70} alt='Logo' />

            <Image
              src={footerData.craneImage}
              width={120}
              height={120}
              alt='Crane'
              className='absolute top-0 lg:-right-25 right-0'
            />

            <p className='text-xs text-gray-600 leading-relaxed max-w-[240px] mt-4'>
              ©2024 Sekizli Machine & Crane Co. All rights reserved. All text
              and images on our website are protected by copyright law. They may
              not be used without permission and proper attribution.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className='flex flex-col'>
            {/* TOP SOCIAL + SUPPORT */}
            <div className='border-b border-gray-300 py-4 mb-10'>
              <div className='flex items-center justify-between'>
                {/* SOCIALS */}
                <div className='flex flex-col lg:flex-row items-center gap-5'>
                  <h4 className='text-xs font-bold text-teal-900'>
                    Sekizli Social Media Accounts
                  </h4>

                  <div className='flex items-center gap-2 md:gap-3'>
                    {footerData.socials.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          className='w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center hover:bg-teal-800'
                        >
                          <Icon size={16} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* SUPPORT PHONE */}
                <div className='text-right flex flex-col lg:flex-row items-center gap-5'>
                  <h4 className='text-xs font-bold text-teal-900'>
                    Sekizli Support Line
                  </h4>

                  <Link
                    href={`tel:${footerData.supportPhone}`}
                    className='flex items-center justify-end gap-2'
                  >
                    <Phone className='text-teal-700' size={20} />
                    <span className='lg:text-lg font-bold text-teal-900'>
                      {footerData.supportPhone}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* LOWER MENU SECTIONS */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
              {footerData.sections.map((section, i) => (
                <div key={i}>
                  <Link
                    href='#'
                    className='hover:text-teal-700 text-xs text-gray-700 font-bold'
                  >
                    {section.title}
                  </Link>

                  <ul className='space-y-1 text-xs text-gray-700 mt-1'>
                    {section.items.map((item, j) => (
                      <li key={j}>
                        <Link href='#' className='hover:text-teal-700'>
                          {section.title && '›'} {item}
                        </Link>
                      </li>
                    ))}

                    {/* CHILD ITEMS */}
                    {section.childTitle && (
                      <li className='mt-1 font-bold'>{section.childTitle}</li>
                    )}

                    {section.childItems && (
                      <ul className='ml-2 mt-1 space-y-1 font-normal'>
                        {section.childItems.map((child, k) => (
                          <li key={k}>
                            <Link href='#' className='hover:text-teal-700'>
                              › {child}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </div>
              ))}

              {/* CONTACT COLUMN */}
              <div>
                <h4 className='font-bold text-sm mb-3'>Contact</h4>

                <div className='text-xs text-gray-700 leading-relaxed mb-4'>
                  {footerData.contact.address.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className='text-xs'>
                  {footerData.contact.phones.map((phone, i) => (
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
