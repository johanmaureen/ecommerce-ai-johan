/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

import { loadEnvConfig } from "@next/env";

// Load .env.local for Sanity CLI
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const organizationId = process.env.NEXT_PUBLIC_SANITY_ORG_ID;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

if (!organizationId || !projectId || !dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_ORG_ID, NEXT_PUBLIC_SANITY_PROJECT_ID, or NEXT_PUBLIC_SANITY_DATASET is not set",
  );
}

// For deployed apps, use the full URL; for local dev, use the file path
const entry =
  vercelUrl && vercelUrl !== "localhost"
    ? `https://${vercelUrl}/admin`
    : "./app/(admin)/admin/page.tsx";

export default defineCliConfig({
  app: {
    organizationId,
    entry,
  },
  api: { projectId, dataset },
});
