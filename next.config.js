/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gms.parcoil.com',
      },
      {
        protocol: 'https',
        hostname: 'site.imsglobal.org',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.accounts.dev',
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', '@clerk/nextjs'],
  },
}

module.exports = nextConfig
