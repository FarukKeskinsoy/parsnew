import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"




export const getFormPreface= async(id)=>{
    return await getDoc(doc(db,`FormPages/${id}`)).then((snap)=>snap.data())
}

export const getAllFormPrefaces=async(categoryId)=>{
    const q= query(collection(db,"Blogs"),where("category","==",categoryId))
    return await getDocs(q).then(snaps=>snaps.docs.map(d=>d.data()))
}