import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Limit linting to app code; exclude Storybook stories
    dirs: [
      "src/app",
      "src/components",
      "src/hooks",
      "src/lib",
      "src/playground",
    ],
  },
};

export default nextConfig;
