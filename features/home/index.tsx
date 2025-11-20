import { About } from "./components/About";
import { CategorySection } from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { StatsSection } from "./components/StatsSection";
import {
  PageData,
  HeroSectionData,
  CategorySectionData,
  AboutSectionData,
  StatsSectionData,
  NewsSectionData,
} from "./types";

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

  const aboutSection = pageData?.sections?.find(
    (section) => section._type === "aboutSection"
  ) as AboutSectionData | undefined;

  const statsSection = pageData?.sections?.find(
    (section) => section._type === "statsSection"
  ) as StatsSectionData | undefined;

  const newsSection = pageData?.sections?.find(
    (section) => section._type === "newsSection"
  ) as NewsSectionData | undefined;

  return (
    <>
      {heroSection && <HeroSection data={heroSection} />}
      {categorySection && <CategorySection data={categorySection} />}
      {aboutSection && <About data={aboutSection} />}
      {statsSection && <StatsSection data={statsSection} />}
      {newsSection && <NewsSection data={newsSection} />}
    </>
  );
};
