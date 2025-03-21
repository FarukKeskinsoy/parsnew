import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getCategory=async(id)=>{
    return await getDoc(doc(db, `Categories/Add/Blogs/${id}`)).then((snap)=>snap.data())
}