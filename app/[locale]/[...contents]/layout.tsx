import ContentHero from '@/components/shared/layout/ContentHero/ContentHero'
import Footer from '@/components/shared/layout/Footer/Footer'
import SideNavigation from '@/components/shared/layout/Navigation/SideNavigation'
import { getLanguageDirection, isValidLanguageCode } from '@/lib/i18n'
import { notFound } from 'next/navigation'

interface ContentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string, contents: string[] }>;
}

export default async function ContentLayout({
  children,
  params,
}: Readonly<ContentLayoutProps>) {
  const {locale, contents} = await params
  console.log(locale, contents);
  if (!isValidLanguageCode(locale)) {
      notFound();
    }

  const dir = getLanguageDirection(locale);
  return (
    <>
      <div lang={locale} className={dir === "rtl" ? "text-direction-rtl" : ""}>
        <ContentHero />
        <div className='flex max-w-[1500px] mx-auto gap-10 py-14'>
          <SideNavigation
            locale={locale}
            items={[
              { label: "Corporate", href: "/corporate" },
              { label: "Products", href: "/products" },
              { label: "Multimedia", href: "/multimedia" },
              { label: "Get a Quote", href: "/get-a-quote" },
              { label: "Production", href: "/production" },
              { label: "Quality", href: "/quality" },
              { label: "Service", href: "/service" },
              { label: "References", href: "/references" },
              { label: "PDPL", href: "/pdpl" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
