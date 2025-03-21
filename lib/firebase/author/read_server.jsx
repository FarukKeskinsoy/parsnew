import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getAuthor=async(id)=>{
    return await getDoc(doc(db, `Users/${id}`)).then((snap)=>snap.data())
}