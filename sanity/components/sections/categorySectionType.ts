import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const categorySectionType = defineType({
  name: "categorySection",
  title: "Category Section",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      description: "Add category cards to display",
      of: [
        {
          type: "object",
          name: "categoryCard",
          title: "Category Card",
          fields: [
            defineField({
              name: "highlight",
              title: "Highlighted Text",
              type: "string",
              description:
                "The highlighted part of the title (e.g., 'Electric')",
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Main title text (e.g., 'Crane Systems')",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "bgColor",
              title: "Background Color",
              type: "string",
              description:
                "Tailwind CSS class for background color (e.g., 'bg-brand-primary')",
              validation: (Rule) => Rule.required(),
              initialValue: "bg-brand-primary",
            }),
            defineField({
              name: "image",
              title: "Main Image",
              type: "image",
              description: "Main display image for the category",
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
              name: "position",
              title: "Image Position",
              type: "string",
              description: "Position of the image relative to content",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
              initialValue: "right",
            }),
            defineField({
              name: "listItems",
              title: "List Items",
              type: "array",
              description: "Category items with links and images",
              of: [
                {
                  type: "object",
                  name: "listItem",
                  title: "List Item",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                      description:
                        "Item title (e.g., 'OVERHEAD TRAVELING CRANES')",
                      validation: (Rule) => Rule.required().max(100),
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "string",
                      description:
                        "URL or path for this item (e.g., /products/overhead-cranes)",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "image",
                      title: "Hover Image",
                      type: "image",
                      description:
                        "Image to display when hovering over this item",
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
                  ],
                  preview: {
                    select: {
                      title: "title",
                      media: "image",
                    },
                    prepare({ title, media }) {
                      return {
                        title: title || "Untitled Item",
                        media: media,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(10),
            }),
            defineField({
              name: "descriptions",
              title: "Descriptions",
              type: "array",
              description: "List of description points",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(10),
            }),
          ],
          preview: {
            select: {
              highlight: "highlight",
              title: "title",
              image: "image",
            },
            prepare({ highlight, title, image }) {
              return {
                title: `${highlight} ${title}`,
                media: image,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      categories: "categories",
    },
    prepare({ categories }) {
      const count = categories?.length || 0;
      return {
        title: "Category Section",
        subtitle: `${count} ${count === 1 ? "category" : "categories"}`,
      };
    },
  },
});
