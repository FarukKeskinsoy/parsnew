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
    {coll:'Products',url:"urunler",tag:"Ürün"},
    {coll:'Blogs',url:"blog",tag:"Blog"},
    {coll:'Brands',url:"temsilcilikler",tag:"Temsilcilikler"},
    {coll:'Sectors',url:"sektorler",tag:"Sektör"},

]; // Add your collections here
  let results = [];

  var uppercased=String(searchTerm)?.[0].toUpperCase()+String(searchTerm).substring(1)
  for (const coll of collections) {
    const q = query(
      collection(db, coll.coll),
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff'||uppercased||'\uf8ff'+uppercased),

    );
    const q1 = query(
      collection(db, coll.coll),
      where('title', '>=', uppercased),
      where('title', '<=', uppercased+'\uf8ff'),

    );

    const q2 = query(
      collection(db, coll.coll),
      where('content', '>=', searchTerm),
      where('content', '<=', searchTerm + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), link: `/${coll.url}/${doc.data().url}-${doc.id}`,tag:coll.tag });
    });

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      results.push({ ...doc.data(), link: `/${coll.url}/${doc.data().url}-${doc.id}`,tag:coll.tag });
    });
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      results.push({ ...doc.data(), link: `/${coll.url}/${doc.data().url}-${doc.id}`,tag:coll.tag });
    });
  }

  return results;
};

export default searchCollections;
