import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"

export const getAllBlogs=async()=>{
    return await getDocs(collection(db,"Blogs")).then((snaps)=>snaps.docs.map((d=>d.data())))
}

export const getOneEvent= async(id)=>{
    return await getDoc(doc(db,`Events/${id}`)).then((snap)=>JSON.parse(JSON.stringify(snap.data())))
  }
export const getEventsBytype= async(type)=>{
    return await getDocs(query(collection(db,"Events"),where("event","==",type),where("active","==",true))).then((snaps)=>snaps.docs.map((d=>JSON.parse(JSON.stringify(d.data())))))
  }

export const getAllBlogsWithCategory=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>JSON.parse(JSON.stringify(d.data()))))
}