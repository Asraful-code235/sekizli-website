import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getHomepageData } from "@/sanity/queries/page/homepage";
import { getThemeData, ThemeColors } from "@/sanity/queries/theme/theme";
import { Suspense } from "react";
import { HomePage } from "@/features/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [homepageData, themeData] = await Promise.all([
    getHomepageData(locale),
    getThemeData() as Promise<ThemeColors | null>,
  ]);

  if (!homepageData) {
    return generatePageMetadata({
      title: "Home",
      description: "Welcome to our website",
      path: `/${locale}`,
      favicon: themeData?.favicon?.asset?.url,
    });
  }

  const seoTitle = homepageData.seoTitle || homepageData.pageTitle || "Home";
  const seoDescription =
    homepageData.seoDescription || "Welcome to our website";

  return generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/${locale}`,
    keywords: homepageData.seoKeywords,
    ogImage: homepageData.ogImage?.asset?.url,
    noIndex: homepageData.noIndex,
    favicon: themeData?.favicon?.asset?.url,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const homepageData = await getHomepageData(locale);

  const { QueryClient, dehydrate } = await import("@tanstack/react-query");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["homepage", locale],
    queryFn: async () => {
      return homepageData;
    },
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage pageData={homepageData} />
      </HydrationBoundary>
    </Suspense>
  );
}
