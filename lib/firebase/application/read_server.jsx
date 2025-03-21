import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"


export const getAllBlogs=async()=>{
    return await getDocs(collection(db,"Blogs")).then((snaps)=>snaps.docs.map((d=>d.data())))
}

export const getOneApplicationServer= async(id)=>{
    return await getDoc(doc(db,`Applications/${id}`)).then((snap)=>JSON.parse(JSON.stringify(snap.data())))
  }

export const getAllBlogsWithCategory=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>JSON.parse(JSON.stringify(d.data()))))
}

const searchCollections = async (searchTerm) => {
  const collections = [
    { coll: 'Products', url: "urunler", tag: "Ürün", sub: false },
    { coll: 'Blogs', url: "blog", tag: "Blog", sub: false },
    { coll: 'Brands', url: "temsilcilikler", tag: "Temsilcilik", sub: false },
    { coll: 'Sectors', url: "sektorler", tag: "Sektör", sub: false },
    { coll: 'Events', url: "etkinlikler", tag: "Etkinlik", sub: true },
    { coll: 'Applications', url: "uygulamalar", tag: "Uygulama", sub: false },
  ]; // Add your collections here

  const pages = [
    { title: "Etkinlikler", link: "/etkinlikler", tag: "Sayfa",hard:true },
    { title: "Posterler", link: "/etkinlikler/posterler", tag: "Sayfa",hard:true },
    { title: "Webinar", link: "/etkinlikler/webinar", tag: "Sayfa",hard:true },
    { title: "Kongre-Fuar", link: "/etkinlikler/kongre-fuar", tag: "Sayfa",hard:true },
    { title: "Hakkımızda", link: "/hakkimizda", tag: "Sayfa",hard:true },
    { title: "İnsan Kaynakları", link: "/insan-kaynaklari", tag: "Sayfa",hard:true },
    { title: "Satış", link: "/satis", tag: "Sayfa",hard:true },
    { title: "Satış Sonrası Destek", link: "/satis-sonrasi-destek", tag: "Sayfa",hard:true },
    { title: "Temsilcilikler", link: "/temsilcilikler", tag: "Sayfa",hard:true },
    { title: "Blog", link: "/blog", tag: "Sayfa",hard:true },
    { title: "Ürünler", link: "/urunler", tag: "Sayfa",hard:true },
    { title: "Sektörler", link: "/sektorler", tag: "Sayfa",hard:true },
    { title: "Uygulamalar", link: "/uygulamalar", tag: "Sayfa",hard:true },
    { title: "Sık Sorulan Sorular", link: "/sss", tag: "Sayfa",hard:true },
    { title: "İletişim", link: "/iletisim", tag: "Sayfa",hard:true },
  ];

  let results = [];
  const uppercased = String(searchTerm)?.[0].toUpperCase() + String(searchTerm).substring(1);

  // Search in collections
  for (const coll of collections) {
    const q = query(
      collection(db, coll.coll),
      where('title', '>=', '\uf8ff'+searchTerm),
      where('title', '<=', searchTerm + '\uf8ff' || uppercased || '\uf8ff' + uppercased),
    );

    const q1 = query(
      collection(db, coll.coll),
      where('title', '>=', uppercased),
      where('title', '<=', uppercased + '\uf8ff'),
    );

    const q2 = query(
      collection(db, coll.coll),
      where('content', '>=', searchTerm),
      where('content', '<=', searchTerm + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      results.push({
        ...doc.data(),
        link: coll.sub ? `/${coll.url}/${doc.data().event}/${doc.data().url}-${doc.id}` : `/${coll.url}/${doc.data().url}-${doc.id}`,
        tag: coll.tag
      });
    });

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      results.push({
        ...doc.data(),
        link: coll.sub ? `/${coll.url}/${doc.data().event}/${doc.data().url}-${doc.id}` : `/${coll.url}/${doc.data().url}-${doc.id}`,
        tag: coll.tag
      });
    });

    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      results.push({
        ...doc.data(),
        link: coll.sub ? `/${coll.url}/${doc.data().event}/${doc.data().url}-${doc.id}` : `/${coll.url}/${doc.data().url}-${doc.id}`,
        tag: coll.tag
      });
    });
  }

  // Search in pages
  pages.forEach(page => {
    if (page.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        title: page.title,
        link: page.link,
        tag: page.tag,
        hard:page.hard
      });
    }
  });

  return results;
};


export default searchCollections;
