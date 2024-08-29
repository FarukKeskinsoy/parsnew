/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/:id-',
        destination: '/api/redirect?id=:id', // Redirect to the custom API route
        permanent: true,
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
