import { HomeData } from "@/lib/api/types";
import { SanityImageAsset } from "@/lib/api/types";

export interface HomeProps {
  data: HomeData | null;
  isLoading: boolean;
  error: Error | null;
}

export interface HeroSlide {
  _key: string;
  mediaType: "image" | "video";
  image?: {
    asset: SanityImageAsset;
    alt: string;
  };
  video?: {
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
    };
  };
  videoPoster?: {
    asset: SanityImageAsset;
  };
}

export interface HeroSectionData {
  _type: "heroSection";
  _key: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  slides: HeroSlide[];
}

export interface PageSEO {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    asset: SanityImageAsset;
    alt?: string;
  };
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
}

export interface CategoryListItem {
  _key: string;
  title: string;
  link: string;
  image?: {
    asset: SanityImageAsset;
    alt?: string;
  };
}

export interface CategoryCard {
  _key: string;
  highlight: string;
  title: string;
  bgColor: string;
  image: {
    asset: SanityImageAsset;
    alt: string;
  };
  position: "left" | "right";
  listItems: CategoryListItem[];
  descriptions?: string[];
}

export interface CategorySectionData {
  _type: "categorySection";
  _key: string;
  categories: CategoryCard[];
}

export interface AboutNavLink {
  _key: string;
  title: string;
  link: string;
  isDefault?: boolean;
}

export interface AboutSectionData {
  _type: "aboutSection";
  _key: string;
  title: string;
  description: any[]; // PortableText content
  displayType: "single" | "slider";
  image?: {
    asset: SanityImageAsset;
    alt: string;
  };
  sliderImages?: {
    _key: string;
    asset: SanityImageAsset;
    alt: string;
  }[];
  navLinks: AboutNavLink[];
  ctaText?: string;
  ctaLink?: string;
}

export interface StatsSectionData {
  _type: "statsSection";
  _key: string;
  bgImage?: {
    asset: SanityImageAsset;
    alt?: string;
  };
  image: {
    asset: SanityImageAsset;
    alt: string;
  };
  title: string[];
  paragraphs: string[];
  ctaText?: string;
  ctaLink?: string;
}

export interface PageData {
  _id: string;
  _type: "page";
  language: string;
  pageKey: string;
  pageTitle: string;
  sections: (
    | HeroSectionData
    | CategorySectionData
    | AboutSectionData
    | StatsSectionData
  )[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    asset: SanityImageAsset;
    alt?: string;
  };
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
}
