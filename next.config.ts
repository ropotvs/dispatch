import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Safari buffers gzip-compressed response streams instead of delivering
  // chunks progressively, which swallows the streamed Suspense fallbacks; in
  // a real deployment the CDN/proxy layer compresses with proper flush-through.
  compress: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
