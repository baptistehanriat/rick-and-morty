/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
