/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/:id-',
        destination: '/blog/:id-:id',
        permanent: true, // Indicates a 301 permanent redirect
      },
    ];
  },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    
    images: {
        domains: ['storage.googleapis.com'],
      },
      productionBrowserSourceMaps: true, // Enable source maps in production

};

export default nextConfig;
