import { db } from '@/lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap() {
  const collections = ['Blogs', 'Products','Sectors','Brands','ProductGroups']; // Array of collection names
  const allPaths = [];

  for (const collectionName of collections) {
    const col = collection(db, collectionName);
    const snapshot = await getDocs(col);

    const paths = snapshot.docs.map(doc => {
      const data = doc.data();
      let basePath;

      // Define the base path based on collection name
      if (collectionName === 'Blogs') {
        basePath = '/blog';
      } else if (collectionName === 'Products') {
        basePath = '/urunler';
      } else if (collectionName === 'Sectors') {
        basePath = '/sektorler';
      }else if (collectionName === 'Brands') {
        basePath = '/temsilcilikler';
      }else if (collectionName === 'ProductGroups') {
        basePath = '/urun-gruplari';
      }

      return {
        url: `${basePath}/${data?.url}-${data?.id}`, // Construct the URL
        lastModified: new Date(), // Modify based on your data
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });

    allPaths.push(...paths);
  }

  // Include the homepage
  allPaths.push({
    url: 'https://parsanalitik.com',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  return allPaths;
}
