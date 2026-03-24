import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  groups: [
    { name: "details", title: "General Details" },
    { name: "physical", title: "Physical Attributes" },
    { name: "valuation", title: "Valuation & Status" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      group: "details",
      to: [{ type: "artist" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      group: "details",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "physical",
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      group: "physical",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      group: "physical",
    }),
    defineField({
      name: "provenance",
      title: "Provenance",
      type: "array",
      group: "physical",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "estimate",
      title: "Estimate",
      type: "string",
      group: "valuation",
      description: "e.g. 'USD 150,000 - 200,000' or 'Price Upon Request'",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "valuation",
      options: {
        list: [
          { title: "Available", value: "Available" },
          { title: "Reserved", value: "Reserved" },
          { title: "Sold", value: "Sold" },
          { title: "Private", value: "Private" },
        ],
      },
      initialValue: "Available",
    }),
    defineField({
      name: "featured",
      title: "Featured Artwork",
      type: "boolean",
      initialValue: false,
      group: "valuation",
    }),
  ],
});
