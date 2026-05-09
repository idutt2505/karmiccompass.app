import type { NextConfig } from "next";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  async rewrites() {
    return [
      { source: "/privacy", destination: "/privacy.html" },
      { source: "/terms",   destination: "/terms.html"   },
    ];
  },
};

export default nextConfig;
