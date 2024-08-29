/** @type {import('next').NextConfig} */

const nextConfig = {
  
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    
    images: {
        domains: ['storage.googleapis.com'],
      },
      productionBrowserSourceMaps: true, // Enable source maps in production

};

export default nextConfig;
