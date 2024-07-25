import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
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
export const getRelatedProductGroups=async(id)=>{
    try {
        const productGroupsRef = collection(db, "ProductGroups");
        const q = query(
          productGroupsRef,
          where("category", "==", id),
          //where("active", "==", true)
        );
    
        const querySnapshot = await getDocs(q);
        const productGroups = querySnapshot.docs.map((doc) => doc.data());
    
        return productGroups;
      } catch (error) {
        console.error("Error fetching product groups: ", error);
        throw new Error("Failed to fetch product groups");
      }}

      export const getRelatedProductGroupsandBrands = async (id) => {
        try {
          const productGroupsRef = collection(db, "ProductGroups");
          const q = query(
            productGroupsRef,
            where("category", "==", id),
            //where("active", "==", true)
          );
      
          const querySnapshot = await getDocs(q);
          const productGroups = querySnapshot.docs.map((doc) => doc.data());
      
          const productGroupsWithBrands = await Promise.all(
            productGroups.map(async (productGroup) => {
              const rbrandRefs = productGroup.rbrand.map((brandId) =>
                getDoc(doc(db, "Brands", brandId))
              );
              const rbrandSnapshots = await Promise.all(rbrandRefs);
              const rbrands = rbrandSnapshots.map((snapshot) => snapshot.data());
              
              return { ...productGroup, rbrands };
            })
          );
      
          return productGroupsWithBrands;
        } catch (error) {
          console.error("Error fetching product groups: ", error);
          throw new Error("Failed to fetch product groups");
        }
      };
export const getOneProductGroup= async(id)=>{
    return await getDoc(doc(db,`ProductGroups/${id}`)).then((snap)=>snap.data())
  }

export const getAllBlogsWithCategory=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>d.data()))
}