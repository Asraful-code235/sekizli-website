import { About } from "./components/About";
import { CategorySection } from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { StatsSection } from "./components/StatsSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <About />
      <StatsSection />
      <NewsSection />
    </>
  );
};
