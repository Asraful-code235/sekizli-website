# Homepage Dynamic Content Setup

This document explains the new dynamic homepage system using Sanity CMS with multi-language support, SEO optimization, and performance best practices.

## Overview

The homepage is now fully dynamic and managed through Sanity Studio. You can create multiple homepage versions for different languages, each with customizable sections, content, and SEO metadata.

## Architecture

### 1. Sanity Schemas

#### Page Document (`pageDocumentType.ts`)

- **Purpose**: Main document type for all pages with multi-language support
- **Key Features**:
  - Multi-language support (similar to header/footer)
  - Page identification via `pageKey` (e.g., "homepage", "about")
  - Comprehensive SEO fields (title, description, keywords, OG tags)
  - Sections array for modular content
  - Twitter Card support
  - Canonical URL support
  - NoIndex/NoFollow controls

#### Hero Section (`heroSectionType.ts`)

- **Purpose**: Object type for hero carousels with image/video support
- **Key Features**:
  - Title and subtitle with support for line breaks (`\n`)
  - Optional CTA button (text + link)
  - Slides array with conditional image/video fields
  - Video poster images for LCP optimization
  - Alt text for accessibility
  - Smart validation (ensures media matches media type)

### 2. Database Structure

**Pages are organized in Sanity Studio:**

```
Pages/
  └── Homepage/
      ├── Homepage (en)
      ├── Homepage (tr)
      ├── Homepage (ar)
      └── Homepage (ru)
```

Each homepage version has:

- Language identifier
- Page metadata (title, key)
- Sections (Hero, About, Stats, etc.)
- SEO configuration

### 3. Query Layer

**File**: `sanity/queries/page/homepage.ts`

The GROQ query fetches:

- Page metadata
- All sections with their content
- Hero slides with image metadata (blur placeholders, dimensions)
- Video assets with URLs
- Complete SEO data

**Features**:

- Language-specific filtering
- Revalidation every 1 hour
- Tagged for cache invalidation
- Optimized for performance

### 4. Component Architecture

#### Server Components

- `app/[locale]/page.tsx`: Fetches data, generates metadata, passes to HomePage
- Implements ISR (Incremental Static Regeneration)
- Server-side SEO metadata generation

#### Client Components

- `HeroSection.tsx`: Displays hero carousel with auto-advance
- Optimized for LCP (Largest Contentful Paint)
- ARIA attributes for accessibility

## Usage Guide

### Creating a Homepage in Sanity Studio

1. **Navigate to Pages > Homepage**

2. **Click "Create" and fill in:**
   - **Language**: Select language (auto-filled, read-only)
   - **Page Key**: `homepage` (auto-filled, read-only)
   - **Page Title**: Internal reference name (e.g., "Homepage EN")

3. **Add Hero Section:**
   - Click "+ Add item" under Sections
   - Select "Hero Section"
   - Fill in:
     - **Title**: Main heading (use `\n` for line breaks)
     - **Subtitle**: Optional subheading
     - **CTA Text**: Button text (optional)
     - **CTA Link**: Button destination (required if text is set)
     - **Slides**:
       - Select "Image" or "Video"
       - For images: Upload image + add alt text
       - For videos: Upload video + optional poster image

4. **Configure SEO (Optional but Recommended):**
   - **SEO Title**: Page title for search engines (50-60 chars)
   - **SEO Description**: Meta description (150-160 chars)
   - **SEO Keywords**: Comma-separated keywords
   - **OG Title**: Social media title (defaults to SEO title)
   - **OG Description**: Social media description
   - **OG Image**: Social sharing image (1200x630px recommended)
   - **Twitter Card**: Card type (summary or large image)
   - **No Index**: Prevent search engine indexing
   - **No Follow**: Prevent link following
   - **Canonical URL**: Specify canonical URL if needed

### Adding More Sections

To add new section types (e.g., About Section, Services Section):

1. **Create Section Schema**:

   ```typescript
   // sanity/components/sections/aboutSectionType.ts
   export const aboutSectionType = defineType({
     name: "aboutSection",
     title: "About Section",
     type: "object",
     fields: [
       // Define your fields
     ],
   });
   ```

2. **Register Schema**:

   ```typescript
   // sanity/schemaTypes/index.ts
   import { aboutSectionType } from "../components/sections/aboutSectionType";

   export const schema = {
     types: [
       // ... existing types
       aboutSectionType,
     ],
   };
   ```

3. **Add to Page Document**:

   ```typescript
   // sanity/components/documents/pageDocumentType.ts
   defineField({
     name: "sections",
     of: [
       { type: "heroSection" },
       { type: "aboutSection" }, // Add new section
     ],
   });
   ```

4. **Create Component**:

   ```typescript
   // features/home/components/AboutSection.tsx
   export function AboutSection({ data }: { data: AboutSectionData }) {
     // Render section
   }
   ```

5. **Update Homepage**:

   ```typescript
   // features/home/index.tsx
   const aboutSection = pageData?.sections?.find(
     (section) => section._type === 'aboutSection'
   )

   return (
     <>
       {/* ... */}
       {aboutSection && <AboutSection data={aboutSection} />}
     </>
   )
   ```

## Performance Optimization

### LCP (Largest Contentful Paint)

- ✅ Only first hero image has `priority={true}`
- ✅ Blur placeholders generated from LQIP (Low Quality Image Placeholder)
- ✅ Video posters shown until video loads
- ✅ Proper image sizing with `sizes` attribute

### Accessibility

- ✅ ARIA labels on all interactive elements
- ✅ `aria-level` on headings
- ✅ `aria-hidden` on decorative elements
- ✅ Proper role attributes for tabs/navigation
- ✅ Alt text required for all images

### SEO

- ✅ Server-side metadata generation
- ✅ Open Graph tags for social sharing
- ✅ Twitter Cards
- ✅ Structured data ready
- ✅ Canonical URLs
- ✅ Keywords meta tag
- ✅ NoIndex/NoFollow controls

### Caching Strategy

- **Revalidation**: 1 hour (3600 seconds)
- **Tags**: `['page', 'homepage', 'homepage-{locale}']`
- **CDN**: Disabled for homepage (fresh content)
- **Client Hydration**: Using TanStack Query

## Best Practices

### Content

1. **Hero Images**: Use high-quality images (1920x1080px minimum)
2. **Videos**: Keep under 50MB, use MP4 format
3. **Alt Text**: Always provide descriptive alt text
4. **Line Breaks**: Use `\n` in titles/subtitles for controlled breaks
5. **CTA Links**: Use relative paths (e.g., `/contact`) for internal links

### Development

1. **Type Safety**: All data is fully typed with TypeScript
2. **Error Handling**: Gracefully handles missing data
3. **Server-First**: Fetch data server-side when possible
4. **Client Interactivity**: Only use client components when needed
5. **Code Splitting**: Each section is a separate component

### SEO

1. **Unique Titles**: Each language version should have unique SEO titles
2. **Description Length**: Keep under 160 characters
3. **OG Images**: Use 1200x630px for optimal social sharing
4. **Keywords**: Use 5-10 relevant keywords
5. **Alt Text**: Required for accessibility and SEO

## File Structure

```
├── app/[locale]/page.tsx           # Server component, data fetching, metadata
├── features/home/
│   ├── index.tsx                   # HomePage orchestrator
│   ├── types.ts                    # TypeScript types
│   ├── components/
│   │   ├── HeroSection.tsx         # Hero carousel component
│   │   ├── About.tsx               # About section
│   │   └── ...                     # Other sections
├── sanity/
│   ├── components/
│   │   ├── documents/
│   │   │   └── pageDocumentType.ts # Page document schema
│   │   └── sections/
│   │       └── heroSectionType.ts  # Hero section schema
│   ├── queries/page/
│   │   └── homepage.ts             # GROQ queries
│   └── structure.ts                # Sanity Studio structure
└── lib/
    └── api/types.ts                # Shared API types
```

## Troubleshooting

### Hero section not showing

- Check that homepage exists for the current locale in Sanity
- Verify `pageKey` is set to "homepage"
- Ensure at least one hero section is added to sections array
- Check browser console for errors

### Images not loading

- Verify images are uploaded in Sanity
- Check that alt text is provided
- Ensure CORS is configured in Sanity project settings
- Check network tab for 404 errors

### SEO metadata not updating

- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check revalidation settings
- Verify data is being fetched correctly

### Videos not playing

- Ensure video format is MP4
- Check file size (keep under 50MB)
- Verify video URL is accessible
- Check browser console for errors
- Add `muted` attribute (required for autoplay)

## Future Enhancements

Potential improvements to consider:

1. **Image Optimization**
   - WebP/AVIF format support
   - Responsive image srcsets
   - Lazy loading for below-fold images

2. **Additional Sections**
   - About section with Sanity CMS
   - Services/Features section
   - Testimonials section
   - FAQ section

3. **Analytics**
   - Click tracking on CTA buttons
   - Slide view analytics
   - User engagement metrics

4. **A/B Testing**
   - Multiple hero variations
   - Performance comparison
   - Conversion tracking

5. **Animations**
   - Framer Motion integration
   - Scroll-triggered animations
   - Page transitions

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Sanity GROQ Query Language](https://www.sanity.io/docs/groq)
- [Web Vitals](https://web.dev/vitals/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
