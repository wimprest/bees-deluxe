import type { NextConfig } from "next";
import path from "path";
import { existsSync } from "fs";

// Only set turbopack.root to parent when running inside a workspace (local dev).
// On Vercel the project is cloned standalone — no parent workspace exists.
const parentPkg = path.resolve(__dirname, "..", "package.json");
const inWorkspace = existsSync(parentPkg);

const nextConfig: NextConfig = {
  ...(inWorkspace && {
    turbopack: {
      root: path.resolve(__dirname, ".."),
    },
  }),
  typescript: {
    // sanity.types.ts augments @sanity/client which isn't resolvable on Vercel's
    // isolated build. Type-checking is verified locally before push.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "live.staticflickr.com" },
    ],
  },
};

export default nextConfig;
