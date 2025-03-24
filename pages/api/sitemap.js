import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default async function handler(req, res) {
  try {
    const collections = [
      { name: "Blogs", path: "blog/" },
      { name: "ProductGroups", path: "urun-gruplari/" },
      { name: "Products", path: "urunler/" },
      { name: "Sectors", path: "sektorler/" },
      { name: "Applications", path: "uygulamalar/" },
    ];

    let sitemapEntries = [];

    for (const col of collections) {
      const snapshot = await getDocs(collection(db, col.name));

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data?.url) {
          sitemapEntries.push(`
            <url>
              <loc>https://www.parsanalitik.com/${col.path}${data.url}-${doc.id}</loc>
              <changefreq>weekly</changefreq>
              <priority>1</priority>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `);
        }
      });
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapEntries.join("\n")}
      </urlset>
    `;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemapXml);
  } catch (error) {
    console.error("Sitemap oluşturulurken hata:", error);
    res.status(500).json({ error: "Sitemap oluşturulamadı" });
  }
}
