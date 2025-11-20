import { About } from "./components/About";
import { CategorySection } from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { StatsSection } from "./components/StatsSection";
import { PageData, HeroSectionData } from "./types";

interface HomePageProps {
  pageData?: PageData | null;
}

export const HomePage = ({ pageData }: HomePageProps) => {
  const heroSection = pageData?.sections?.find(
    (section) => section._type === "heroSection"
  ) as HeroSectionData | undefined;

  return (
    <>
      {heroSection && <HeroSection data={heroSection} />}
      <CategorySection />
      <About />
      <StatsSection />
      <NewsSection />
    </>
  );
};
