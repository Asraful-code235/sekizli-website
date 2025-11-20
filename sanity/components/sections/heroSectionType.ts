import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      description: "Main title for the hero section. Use \\n for line breaks.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      description: "Subtitle for the hero section. Use \\n for line breaks.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the call-to-action button",
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
      description: "URL or path for the CTA button (e.g., /contact, /about)",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const ctaText = (context.parent as any)?.ctaText;
          if (ctaText && !value) {
            return "CTA link is required when CTA text is provided";
          }
          return true;
        }),
    }),
    defineField({
      name: "slides",
      title: "Hero Slides",
      type: "array",
      description: "Add images or videos for the hero carousel",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Hero Slide",
          fields: [
            defineField({
              name: "mediaType",
              title: "Media Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
              initialValue: "image",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Upload a high-quality image (recommended: 1920x1080px or larger)",
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
              hidden: ({ parent }) => parent?.mediaType !== "image",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const mediaType = (context.parent as any)?.mediaType;
                  if (mediaType === "image" && !value) {
                    return "Image is required when media type is image";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "video",
              title: "Video",
              type: "file",
              description:
                "Upload a video file (recommended: MP4 format, max 50MB)",
              options: {
                accept: "video/*",
              },
              hidden: ({ parent }) => parent?.mediaType !== "video",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const mediaType = (context.parent as any)?.mediaType;
                  if (mediaType === "video" && !value) {
                    return "Video is required when media type is video";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "videoPoster",
              title: "Video Poster Image",
              type: "image",
              description:
                "Thumbnail image shown before video loads (recommended for LCP optimization)",
              options: {
                hotspot: true,
              },
              hidden: ({ parent }) => parent?.mediaType !== "video",
            }),
          ],
          preview: {
            select: {
              mediaType: "mediaType",
              image: "image",
              videoPoster: "videoPoster",
            },
            prepare({ mediaType, image, videoPoster }) {
              return {
                title: mediaType === "image" ? "Image Slide" : "Video Slide",
                media: mediaType === "image" ? image : videoPoster,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slides: "slides",
    },
    prepare({ title, slides }) {
      return {
        title: "Hero Section",
        subtitle: title || "No title set",
        media: slides?.[0]?.image || slides?.[0]?.videoPoster,
      };
    },
  },
});
