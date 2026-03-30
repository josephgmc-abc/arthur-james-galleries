/**
 * Environment Variable Validation
 * This utility ensures that the application has all required configuration
 * before it attempts to perform sensitive operations.
 */

export const env = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kcvm5a8w",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_TOKEN,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};

/**
 * Validates that critical keys are present.
 * Should be called in API routes or server components that depend on these services.
 */
export function validateEnv() {
  const missing = [];

  if (!env.sanity.token) missing.push("SANITY_API_TOKEN");
  if (!env.resend.apiKey || env.resend.apiKey.startsWith("re_dummy")) missing.push("RESEND_API_KEY");

  if (missing.length > 0) {
    throw new Error(
      `CRITICAL CONFIGURATION ERROR: Missing or invalid environment variables: ${missing.join(", ")}. ` +
      `Please check your .env.local file or deployment settings.`
    );
  }
}
