import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Inquiries",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject of Inquiry",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Resolved', value: 'resolved' }
        ]
      },
      initialValue: 'new'
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'email',
      date: 'submittedAt'
    },
    prepare(selection) {
      const { title, subtitle, date } = selection;
      return {
        title: title || 'New Inquiry',
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()}`
      }
    }
  }
});
