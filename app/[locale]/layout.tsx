import { notFound } from "next/navigation";
import { isValidLanguageCode, getLanguageDirection } from "@/lib/i18n";
import { getHeaderData } from "@/sanity/queries/header/header";
import { HeaderData } from "@/sanity/queries/header/types";
import { getFooterData } from "@/sanity/queries/footer/footer";
import { FooterData } from "@/sanity/queries/footer/types";
import { Header } from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const headerData = (await getHeaderData(locale)) as HeaderData | null;
  const footerData = (await getFooterData(locale)) as FooterData | null;

  if (!isValidLanguageCode(locale)) {
    notFound();
  }

  const dir = getLanguageDirection(locale);
  return (
    <div lang={locale} className={dir === "rtl" ? "text-direction-rtl" : ""}>
      {headerData && <Header data={headerData} locale={locale} />}
      <div>{children}</div>
      {footerData && <Footer data={footerData} />}
    </div>
  );
}

export async function generateStaticParams() {
  const { getSupportedLanguageCodes } = await import("@/lib/i18n");
  const locales = getSupportedLanguageCodes();

  return locales.map((locale) => ({
    locale: locale,
  }));
}
