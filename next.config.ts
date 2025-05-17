// // import type { NextConfig } from "next";

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         port: '',
//         pathname: '/u/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from 'next';
import type { Configuration } from 'webpack'; // Import Webpack Configuration type

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https'/*'''*/,
        hostname: 'avatars.githubusercontent.com'/*'''*/,
        port: ''/*'''*/,
        pathname: '/u/**'/*'''*/,
      },
    ],
  },
  webpack: (config: Configuration, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module = config.module || {}; // Ensure module exists
    config.module.rules = config.module.rules || []; // Ensure rules array exists

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader']
    });
    return config;
  },
};

export default nextConfig; 