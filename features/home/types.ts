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

export interface PageData {
  _id: string;
  _type: "page";
  language: string;
  pageKey: string;
  pageTitle: string;
  sections: HeroSectionData[];
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
