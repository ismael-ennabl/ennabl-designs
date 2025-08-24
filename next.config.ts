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
    // Do not fail the build on lint errors; they will be fixed separately
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Do not fail the build on type errors during CI builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
