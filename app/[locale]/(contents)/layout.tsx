import Footer from '@/components/shared/layout/Footer/Footer'
import { Header } from '@/components/shared/layout/Header'
import SideNavigation from '@/components/shared/layout/Navigation/SideNavigation'
import { getHeaderData } from '@/sanity/queries/header/header'
import { HeaderData } from '@/sanity/queries/header/types'

interface ContentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ContentLayout({
  children,
  params,
}: Readonly<ContentLayoutProps>) {
  const { locale } = await params;
  const headerData = (await getHeaderData(locale)) as HeaderData | null;

  return (
    <>
      {headerData && <Header data={headerData} locale={locale} />}
      <div className='flex max-w-7xl mx-auto gap-10 py-10'>
        <SideNavigation
          items={[
            { label: "Corporate", href: "/corporate" },
            { label: "Products", href: "/products" },
            { label: "Multimedia", href: "/multimedia" },
            { label: "Get a Quote", href: "/quote" },
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
    </>
  );
}
