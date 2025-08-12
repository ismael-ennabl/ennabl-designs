import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ]
  ,
  // Ensure TS path aliases from `tsconfig.json` (e.g., `@/*`) work in stories
  async viteFinal(config) {
    // Preserve any plugins Storybook already added and include tsconfig-based path mapping
    const withTsconfigPaths = { ...config, plugins: [...(config.plugins ?? []), tsconfigPaths()] };

    // Explicitly set up commonly used aliases and dependency optimization for packages
    // that are imported directly in stories/components to avoid resolution issues.
    // __dirname is not available in ESM; derive it from import.meta.url
    const __dirnameESM = path.dirname(fileURLToPath(import.meta.url));

    return mergeConfig(withTsconfigPaths, {
      resolve: {
        alias: {
          "@": path.resolve(__dirnameESM, "../src"),
        },
        // Avoid multiple React copies if any dependency brings its own
        dedupe: ["react", "react-dom"],
      },
      optimizeDeps: {
        include: [
          "@radix-ui/react-alert-dialog",
          "@radix-ui/react-aspect-ratio",
        ],
      },
    });
  }
};
export default config;