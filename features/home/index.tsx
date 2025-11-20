import { About } from "./components/About";
import { CategorySection } from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { StatsSection } from "./components/StatsSection";
import { PageData, HeroSectionData, CategorySectionData } from "./types";

interface HomePageProps {
  pageData?: PageData | null;
}

export const HomePage = ({ pageData }: HomePageProps) => {
  const heroSection = pageData?.sections?.find(
    (section) => section._type === "heroSection"
  ) as HeroSectionData | undefined;

  const categorySection = pageData?.sections?.find(
    (section) => section._type === "categorySection"
  ) as CategorySectionData | undefined;

  return (
    <>
      {heroSection && <HeroSection data={heroSection} />}
      {categorySection && <CategorySection data={categorySection} />}
      <About />
      <StatsSection />
      <NewsSection />
    </>
  );
};
