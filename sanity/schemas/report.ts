import { defineField, defineType } from "sanity";

export const report = defineType({
  name: "report",
  title: "Market Insight / Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pdfFile",
      title: "PDF Report",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "gated",
      title: "Gated Content",
      description: "Requires email capture to download",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
