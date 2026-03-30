import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Arthur James Galleries",
  description: "Enquire about specific works, arrange a private viewing, or discuss our bespoke advisory services. Based in London and Kent.",
};

export default function ContactPage() {
  return <ContactClient />;
}
