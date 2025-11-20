import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { generatePageMetadata, baseViewport } from "@/lib/metadata";
import { ThemeProvider } from "@/components/theme-provider";
import { getThemeData, ThemeColors } from "@/sanity/queries/theme/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generatePageMetadata({
  title: 'Sekizli',
  description: 'High-performance web application built with Next.js and Sanity',
  path: '/',
});

export const viewport: Viewport = baseViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeData = (await getThemeData()) as ThemeColors | null;

  // Generate CSS variables for server-side injection
  const cssVariables = {
    ...(themeData?.primaryColor?.hex && { '--primary-brand': themeData.primaryColor.hex }),
    ...(themeData?.secondaryColor?.hex && { '--secondary-brand': themeData.secondaryColor.hex }),
  } as React.CSSProperties;

  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black`}
        suppressHydrationWarning
        style={cssVariables}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themeData={themeData}
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
