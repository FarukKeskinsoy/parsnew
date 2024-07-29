/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    images: {
        domains: ['storage.googleapis.com'],
      },
};

export default nextConfig;
