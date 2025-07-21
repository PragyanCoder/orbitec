/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.clerk.dev', 'img.clerk.com'],
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
  // Disable strict mode to prevent double rendering in development
  reactStrictMode: false,
  // Add output configuration for static export if needed
  output: 'standalone',
  // Suppress all Edge Runtime warnings
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Fix webpack configuration to suppress warnings
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Suppress specific warnings
    config.ignoreWarnings = [
      /A Node\.js API is used/,
      /setImmediate/,
      /MessageChannel/,
      /MessageEvent/,
      /scheduler/,
    ];
    
    return config;
  },
  // Suppress ESLint warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Suppress other warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig