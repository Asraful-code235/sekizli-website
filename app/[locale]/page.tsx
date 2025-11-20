import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getHomepageData } from "@/sanity/queries/page/homepage";
import { Suspense } from "react";
import { HomePage } from "@/features/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homepageData = await getHomepageData(locale);

  if (!homepageData) {
    return generatePageMetadata({
      title: "Home",
      description: "Welcome to our website",
      path: `/${locale}`,
    });
  }

  // Use SEO fields from page document, with fallbacks
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
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch homepage data server-side
  const homepageData = await getHomepageData(locale);

  const { QueryClient, dehydrate } = await import("@tanstack/react-query");
  const queryClient = new QueryClient();

  // Prefetch homepage data for client-side hydration
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
