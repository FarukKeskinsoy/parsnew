"use client"

import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
// export function useApplicationAll() {
//   const { data, error } = useSWRSubscription(['Applications'], ([path], { next }) => {
//     const ref=collection(db,path);
//     const unsub= onSnapshot(ref,(snaps)=>{
//         next(null,snaps.docs.map((v)=>v.data()))
//     },(error)=>{
//         next(error?.message)
//     })
//     return () => unsub()
//   })
 

//   return {
//     data,
//     error,
//     isLoading: data===undefined ?true:false,
//   }
// }


export function useApplicationAll(filters) {
  const { data, error } = useSWRSubscription(['Applications', filters], ([path, filters], { next }) => {
    let ref = collection(db, path);

    if (filters.rsector) {
      ref = query(ref, where("rsector", "array-contains", filters.rsector));
    } else {
      ref = query(ref, orderBy("index","asc"),limit(60));
    }

    const unsub = onSnapshot(ref, (snaps) => {
      const docs = snaps.docs.map((v) => v.data());
      next(null, docs.length ? docs : null); // Pass null if no documents found
    }, (error) => {
      next(error?.message);
    });

    return () => unsub();
  });

  return {
    data,
    error,
    isLoading: data === undefined, // Adjust loading state handling
  };
}

export const getOneApplication= async(id)=>{
  return await getDoc(doc(db,`Applications/${id}`)).then((snap)=>snap.data())
}