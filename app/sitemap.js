import { MetadataRoute } from 'next'

export default function sitemap(){
  // Add logic to dynamically generate URLs (e.g., from a CMS or API)
  return [
    {
      url: 'https://parsanalitik.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Include additional dynamic URLs
  ];
}
