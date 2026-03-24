import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Artist",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
