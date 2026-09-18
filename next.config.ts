import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  async redirects() {
    return [
      {
        source: "/demo/genre-tree",
        destination: BASE_PATH,
        permanent: true,
        basePath: false,
      },
      {
        source: "/demo/genre-tree/:path*",
        destination: `${BASE_PATH}/:path*`,
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
