import { createClient } from "next-sanity";
import { env } from "@/lib/env";

export const client = createClient({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: "2024-03-19",
  useCdn: false,
});
