import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getHomeData } from "@/sanity/queries/home/home";
import { Suspense } from "react";
import { HomePage } from "@/features/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homeData = await getHomeData();

  if (!homeData?.seo) {
    return generatePageMetadata({
      title: "Home",
      description: "Welcome to our website",
      path: `/${locale}`,
    });
  }

  return generatePageMetadata({
    title: homeData.seo.title || "Home",
    description: homeData.seo.description || "Welcome to our website",
    path: `/${locale}`,
    keywords: homeData.seo.keywords,
    ogImage: homeData.seo.ogImage?.asset._ref,
    noIndex: homeData.seo.noIndex,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const { QueryClient, dehydrate } = await import("@tanstack/react-query");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return getHomeData();
    },
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage />
      </HydrationBoundary>
    </Suspense>
  );
}
