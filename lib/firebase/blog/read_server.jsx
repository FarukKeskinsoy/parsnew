import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"

export const getAllBlogs=async()=>{
    return await getDocs(collection(db,"Blogs")).then((snaps)=>snaps.docs.map((d=>d.data())))
}

export const getBlog= async(id)=>{
    return await getDoc(doc(db,`Blogs/${id}`)).then((snap)=>snap.data())
  }

export const getAllBlogsWithCategory=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>d.data()))
}