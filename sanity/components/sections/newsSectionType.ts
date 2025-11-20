import { defineField, defineType } from "sanity";
import { BellIcon } from "@sanity/icons";

export const newsSectionType = defineType({
  name: "newsSection",
  title: "News Section",
  type: "object",
  icon: BellIcon,
  fields: [
    // Card 1: News & Announcements
    defineField({
      name: "newsCard",
      title: "News & Announcements Card",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "News & Announcements",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          initialValue: "#",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "sliderItems",
          title: "Slider Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    // Card 2: Sekizli Slider
    defineField({
      name: "sekizliCard",
      title: "Sekizli Card",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Those Who Prefer Sekizli",
        }),
        defineField({
          name: "mainImage",
          title: "Main Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        }),
      ],
    }),
    // Card 3: Accordion
    defineField({
      name: "accordionCard",
      title: "Accordion Card",
      type: "object",
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "items",
          title: "Accordion Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "News Section",
      };
    },
  },
});
