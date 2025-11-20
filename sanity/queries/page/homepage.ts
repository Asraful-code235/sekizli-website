import { SanityAPI } from "@/lib/api";
import { PageData } from "@/features/home/types";

/**
 * GROQ query to fetch homepage data by language
 */
export const homepageQuery = `*[_type == "page" && pageKey == "homepage" && language == $language][0]{
  _id,
  _type,
  language,
  pageKey,
  pageTitle,
  sections[]{
    _type,
    _key,
    _type == "heroSection" => {
      title,
      subtitle,
      ctaText,
      ctaLink,
      slides[]{
        _key,
        mediaType,
        image{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions{
                width,
                height,
                aspectRatio
              }
            }
          },
          alt
        },
        video{
          asset->{
            _id,
            url
          }
        },
        videoPoster{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions{
                width,
                height,
                aspectRatio
              }
            }
          }
        }
      }
    }
  },
  seoTitle,
  seoDescription,
  seoKeywords,
  ogTitle,
  ogDescription,
  ogImage{
    asset->{
      _id,
      url,
      metadata{
        lqip,
        dimensions{
          width,
          height,
          aspectRatio
        }
      }
    },
    alt
  },
  twitterCard,
  noIndex,
  noFollow,
  canonicalUrl
}`;

/**
 * Fetch homepage data for a specific language
 */
export async function getHomepageData(
  locale: string
): Promise<PageData | null> {
  try {
    const data = await SanityAPI.fetch<PageData>(
      homepageQuery,
      { language: locale },
      {
        useCdn: false, // Use fresh data for better control
        revalidate: 3600, // 1 hour
        tags: ["page", "homepage", `homepage-${locale}`],
      }
    );

    return data;
  } catch (error) {
    console.error(
      `[getHomepageData] Failed to fetch homepage for locale ${locale}:`,
      error
    );
    return null;
  }
}
