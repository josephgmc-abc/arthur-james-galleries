import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kcvm5a8w";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStructure = (S: any) =>
  S.list()
    .title("Gallery Management")
    .items([
      S.listItem()
        .title("1. The Viewing Room")
        .child(
          S.list()
            .title("The Viewing Room")
            .items([
              S.documentTypeListItem("artwork").title("All Artworks"),
              S.documentTypeListItem("artist").title("Represented Artists"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("2. Editorial & Insights")
        .child(
          S.list()
            .title("Editorial")
            .items([
              S.documentTypeListItem("report").title("Market Reports"),
              S.documentTypeListItem("exhibition").title("Events & Exhibitions"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("contact").title("3. Client Inquiries"),
    ]);

export default defineConfig({
  name: "arthur-james-galleries",
  title: "Arthur James Galleries",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  theme: buildLegacyTheme({
    /* Custom Theme Overrides for Luxury Aesthetic */
    "--black": "#1A1A1A",
    "--white": "#FFFFFF",
    "--gray": "#666666",
    "--gray-base": "#666666",
    "--component-bg": "#002244", // Navy
    "--component-text-color": "#F9F6F0", // Beige
    "--default-button-primary-color": "#C5A059", // Gold
    "--focus-color": "#C5A059",
    "--brand-primary": "#C5A059",
  }),

  studio: {
    components: {
      logo: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
          <span style={{ 
            fontFamily: 'var(--font-cormorant), serif', 
            fontSize: '1.2rem', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#C5A059'
          }}>
            Arthur James
          </span>
        </div>
      )
    }
  }
});
