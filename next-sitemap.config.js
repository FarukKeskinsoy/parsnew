const { collection, getDocs } = require("firebase/firestore");
const { db } = require("./lib/firebase/firebase");

async function getAllSitemapEntries() {
  const sitemapEntries = [];

  // Firestore koleksiyonlarını çek
  const collections = [
    { name: "Blogs", path: "blog/" },
    { name: "ProductGroups", path: "urun-gruplari/" },
    { name: "Products", path: "urunler/" },
    { name: "Sectors", path: "sektorler/" },
    { name: "Applications", path: "uygulamalar/" },
  ];

  for (const col of collections) {
    const snapshot = await getDocs(collection(db, col.name));
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data?.url) {
        sitemapEntries.push({
          loc: `${col.path}${data.url}-${doc.id}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: new Date().toISOString(), // Son değişiklik tarihi ekleme
          "news:news": {
            "news:publication": {
              "news:name": "Pars Analitik",
              "news:language": "tr",
            },
            "news:title": data.title || "Başlık Yok",
            "news:publication_date": new Date().toISOString(),
          },
        });
      }
    });
  }

  return sitemapEntries;
}

module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.parsanalitik.com",
  generateRobotsTxt: true,

  async transform(config, path) {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq || "weekly",
      priority: config.priority || 1,
    };
  },

  async additionalPaths() {
    return await getAllSitemapEntries();
  },
};
