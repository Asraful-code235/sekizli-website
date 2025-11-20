import { defineField, defineType } from "sanity";

export const themeType = defineType({
  name: "theme",
  title: "Theme Configuration",
  type: "document",
  fields: [
    defineField({
      name: "primaryColor",
      title: "Primary Brand Color",
      type: "color",
      description: "The main color used for buttons, links, and accents.",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Brand Color",
      type: "color",
      description: "Secondary color for contrast elements.",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description:
        "Site favicon (recommended: 32x32 or 64x64 pixels, .ico, .png, or .svg)",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Theme Configuration",
      };
    },
  },
});
