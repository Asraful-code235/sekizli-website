import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const aboutSectionType = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main title for the about section",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "Rich text content for the about section",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "string",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayType",
      title: "Display Type",
      type: "string",
      description: "Choose between single image or image slider",
      options: {
        list: [
          { title: "Single Image", value: "single" },
          { title: "Image Slider", value: "slider" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "slider",
    }),
    defineField({
      name: "image",
      title: "Single Image",
      type: "image",
      description: "Main image (used when Display Type is 'Single Image')",
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
      hidden: ({ parent }) => parent?.displayType !== "single",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const displayType = (context.parent as any)?.displayType;
          if (displayType === "single" && !value) {
            return "Image is required when display type is single image";
          }
          return true;
        }),
    }),
    defineField({
      name: "sliderImages",
      title: "Slider Images",
      type: "array",
      description:
        "Multiple images for the slider (used when Display Type is 'Image Slider')",
      of: [
        {
          type: "image",
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
        },
      ],
      hidden: ({ parent }) => parent?.displayType !== "slider",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const displayType = (context.parent as any)?.displayType;
          if (displayType === "slider" && (!value || value.length === 0)) {
            return "At least one slider image is required when display type is slider";
          }
          return true;
        }).max(10),
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      description: "Navigation tabs for the about section",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Navigation Link",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Link text (e.g., 'About Us')",
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description: "URL or path (e.g., /about)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isDefault",
              title: "Default Active",
              type: "boolean",
              description: "Set this link as the default active tab",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              link: "link",
              isDefault: "isDefault",
            },
            prepare({ title, link, isDefault }) {
              return {
                title: title || "Untitled Link",
                subtitle: `${link || "No link"}${isDefault ? " (Default)" : ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .max(6)
          .custom((links) => {
            if (!links || links.length === 0) return true;
            const defaultLinks = links.filter((link: any) => link.isDefault);
            if (defaultLinks.length > 1) {
              return "Only one link can be set as default active";
            }
            return true;
          }),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description:
        "Text for the call-to-action button (e.g., 'Browse Details')",
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
      description: "URL or path for the CTA button (e.g., /about)",
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
      sliderImages: "sliderImages",
      displayType: "displayType",
    },
    prepare({ title, image, sliderImages, displayType }) {
      const media = displayType === "single" ? image : sliderImages?.[0];
      return {
        title: "About Section",
        subtitle: title || "No title set",
        media: media,
      };
    },
  },
});
