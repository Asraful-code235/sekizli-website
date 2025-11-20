"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { ThemeColors, themeQuery } from "@/sanity/queries/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { useEffect } from "react";

interface ProviderProps extends ThemeProviderProps {
  themeData?: ThemeColors | null;
}

export function ThemeProvider({
  children,
  themeData: initialThemeData,
  ...props
}: ProviderProps) {
  const { data: themeData } = useQuery({
    queryKey: ["theme"],
    queryFn: async () => {
      return (await client.fetch(
        themeQuery,
        {},
        {
          filterResponse: false,
          useCdn: true,
        }
      )) as ThemeColors;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    placeholderData: initialThemeData || undefined,
  });

  useEffect(() => {
    if (themeData?.primaryColor?.hex) {
      const primary = themeData.primaryColor.hex;

      document.documentElement.style.setProperty("--primary-brand", primary);
      try {
        localStorage.setItem("site-theme-primary", primary);
      } catch (e) {}
    }

    if (themeData?.secondaryColor?.hex) {
      const secondary = themeData.secondaryColor.hex;
      document.documentElement.style.setProperty(
        "--secondary-brand",
        secondary
      );
      try {
        localStorage.setItem("site-theme-secondary", secondary);
      } catch (e) {}
    }
  }, [themeData]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
