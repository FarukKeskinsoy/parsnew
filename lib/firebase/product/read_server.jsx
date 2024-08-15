import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"

export const getRelatedgroups=async(id)=>{
    try {
        const productGroupsRef = collection(db, "ProductGroups");
        const q = query(
          productGroupsRef,
          where("rbrand", "array-contains", id),
          where("active", "==", true)
        );
    
        const querySnapshot = await getDocs(q);
        const productGroups = querySnapshot.docs.map((doc) => doc.data());
    
        return productGroups;
      } catch (error) {
        console.error("Error fetching product groups: ", error);
        throw new Error("Failed to fetch product groups");
      }}

export const getOneProduct= async(id)=>{
    return await getDoc(doc(db,`Products/${id}`)).then((snap)=>JSON.parse(JSON.stringify(snap.data())))
  }
export const getOneProductGroup= async(id)=>{
    return await getDoc(doc(db,`ProductGroups/${id}`)).then((snap)=>snap.data())
  }

export const getAllBlogsWithCategory=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>d.data()))
}
export const getProductsAccordingToOneGroup=async(groupId)=>{
    const q= query(collection(db,"Blogs"),where("rproductgroup","==",groupId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>JSON.parse(JSON.stringify(d.data()))))
}
export const getProductsAccordingToBrand=async(brands)=>{
    const q= query(collection(db,"Products"),
  //orderBy("index","asc"),
    where("rbrand","in",brands),
    //where("active","==",true)
  )
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>JSON.parse(JSON.stringify(d.data()))))
}

