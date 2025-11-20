import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const pageDocumentType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // Language field - required for document internationalization
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      group: "content",
    }),
    // Page identifier (slug or key)
    defineField({
      name: "pageKey",
      title: "Page Key",
      type: "string",
      description: "Select which page this is (e.g., Homepage)",
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "About Us", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Services", value: "services" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "homepage", // Default to homepage for convenience
      group: "content",
    }),
    // Page Title
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Internal page title for reference",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    // Page Sections - this will be filtered based on pageKey
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description: "Add and organize sections for this page",
      of: [
        { type: "heroSection" },
        // Add more section types here as you build them
        // { type: 'aboutSection' },
        // { type: 'servicesSection' },
        // etc.
      ],
      group: "content",
    }),
    // SEO Fields
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description:
        "Title tag for search engines (recommended: 50-60 characters)",
      validation: (Rule) => Rule.max(60),
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description:
        "Meta description for search engines (recommended: 150-160 characters)",
      validation: (Rule) => Rule.max(160),
      group: "seo",
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      description: "Keywords for search engines (optional, comma-separated)",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      group: "seo",
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description:
        "Title for social media sharing (falls back to SEO title if not set)",
      validation: (Rule) => Rule.max(60),
      group: "seo",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      description:
        "Description for social media sharing (falls back to SEO description if not set)",
      validation: (Rule) => Rule.max(200),
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing (recommended: 1200x630px)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Description of the image for accessibility",
        },
      ],
      group: "seo",
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      description: "Type of Twitter card to use",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
        ],
      },
      initialValue: "summary_large_image",
      group: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      description: "Prevent search engines from following links on this page",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Canonical URL for this page (optional, used to prevent duplicate content)",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "pageTitle",
      language: "language",
      pageKey: "pageKey",
    },
    prepare({ title, language, pageKey }) {
      return {
        title: `${title || pageKey || "Untitled"}`,
        subtitle: `${language?.toUpperCase() || "No Language"} | ${pageKey || "No Key"}`,
      };
    },
  },
});
