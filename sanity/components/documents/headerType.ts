import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: CogIcon,
  fields: [
    // Language field - required for document internationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    // Logo field - can be an image
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload your site logo',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Languages to display in language switcher
    defineField({
      name: 'languages',
      title: 'Available Languages',
      type: 'array',
      description: 'Select which languages to show in the language switcher',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Turkish', value: 'tr'},
          {title: 'Spanish', value: 'es'},
          {title: 'Arabic', value: 'ar'},
          {title: 'Russian', value: 'ru'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    // Navigation menu items
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      description: 'Add navigation menu items',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL or path (e.g., /about, /products)',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Call to action (CTA) section
    defineField({
      name: 'callCta',
      title: 'Call CTA',
      type: 'object',
      description: 'Call to action section with icon and phone number',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'image',
          description: 'Upload an icon for the call button',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Phone number to display',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Social media links
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Add social media links',
      of: [
        {
          type: 'object',
          name: 'socialItem',
          title: 'Social Link',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Upload social media icon',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Full URL to your social media profile',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'link',
              media: 'icon',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'language',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: `Header (${title?.toUpperCase() || 'No Language'})`,
        media,
      }
    },
  },
})
