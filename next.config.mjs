/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
      missingSuspenseWithCSRBailout: false,
  },
  images: {
      domains: ['storage.googleapis.com'],
  },
  productionBrowserSourceMaps: true, // Enable source maps in production

  // 🔥 Sitemap için URL yönlendirme ekliyoruz
  async rewrites() {
      return [
          {
              source: "/sitemap.xml",
              destination: "/api/sitemap", // Din.amik sitemap route'una yönlendirme
          },
      ];
  },
};

export default nextConfig;
