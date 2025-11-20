import { defineField, defineType } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";

export const statsSectionType = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "object",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "image",
      description: "Background pattern/texture image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      description: "Main display image (left side)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title Lines",
      type: "array",
      description: "Title split into multiple lines for better formatting",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: "paragraphs",
      title: "Description Paragraphs",
      type: "array",
      description: "Content paragraphs",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the call-to-action button (e.g., 'Crane Details')",
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
      description: "URL or path for the CTA button",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const ctaText = (context.parent as any)?.ctaText;
          if (ctaText && !value) {
            return "CTA link is required when CTA text is provided";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
    },
    prepare({ title, image }) {
      const titleText = Array.isArray(title) ? title.join(" ") : "No title";
      return {
        title: "Stats Section",
        subtitle: titleText,
        media: image,
      };
    },
  },
});
