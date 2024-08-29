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

    // Default transformation for other paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
};
