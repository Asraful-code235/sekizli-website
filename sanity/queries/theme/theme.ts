import { SanityAPI } from "@/lib/api";

export interface ThemeColors {
  primaryColor?: {
    hex: string;
  };
  secondaryColor?: {
    hex: string;
  };
  favicon?: {
    asset: {
      url: string;
    };
  };
}

export const themeQuery = `
*[_type == "theme"][0]{
  primaryColor{
    hex
  },
  secondaryColor{
    hex
  },
  favicon{
    asset->{
      url
    }
  }
}
`;

export async function getThemeData() {
  return SanityAPI.fetch(
    themeQuery,
    {},
    {
      useCdn: true,
      revalidate: 3600, // 1 hour
      tags: ["theme"],
    }
  );
}
