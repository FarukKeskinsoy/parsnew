// next-sitemap.config.js

const { collection, getDocs } = require("firebase/firestore");
const { db } = require("./lib/firebase/firebase");

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.parsanalitik.com',
  generateRobotsTxt: true,
  async transform(config, path) {
    if (path === '/') {
      // Custom logic for the homepage
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    }

    if (path.startsWith('/blog')) {
      // Fetch all blog posts from Firestore
      const blogsCollection = collection(db, 'Blogs');
      const snapshot = await getDocs(blogsCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/blog/${data.url}-${data.id}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    if (path.startsWith('/hakkimizda')) {
      // Fetch all blog posts from Firestore
      const pagesCollection = collection(db, 'Pages');
      const snapshot = await getDocs(pagesCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/${data.url}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    if (path.startsWith('/urun-gruplari')) {
      // Fetch all blog posts from Firestore
      const blogsCollection = collection(db, 'ProductGroups');
      const snapshot = await getDocs(blogsCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/urun-gruplari/${data.url}-${data.id}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    if (path.startsWith('/urunler')) {
      // Fetch all blog posts from Firestore
      const blogsCollection = collection(db, 'Products');
      const snapshot = await getDocs(blogsCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/urunler/${data.url}-${data.id}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    if (path.startsWith('/sektorler')) {
      // Fetch all blog posts from Firestore
      const blogsCollection = collection(db, 'Sectors');
      const snapshot = await getDocs(blogsCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/sektorler/${data.url}-${data.id}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    if (path.startsWith('/uygulamalar')) {
      // Fetch all blog posts from Firestore
      const blogsCollection = collection(db, 'Applications');
      const snapshot = await getDocs(blogsCollection);
      const paths = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          loc: `/uygulamalar/${data.url}-${data.id}`, // Your blog URL structure
          changefreq: 'weekly',
          priority: 0.8,
        };
      });

      return paths;
    }
    // Default transformation for other paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
};
