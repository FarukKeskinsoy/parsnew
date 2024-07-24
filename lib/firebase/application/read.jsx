"use client"

import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useApplicationAll() {
  const { data, error } = useSWRSubscription(['Applications'], ([path], { next }) => {
    const ref=collection(db,path);
    const unsub= onSnapshot(ref,(snaps)=>{
        next(null,snaps.docs.map((v)=>v.data()))
    },(error)=>{
        next(error?.message)
    })
    return () => unsub()
  })
 

  return {
    data,
    error,
    isLoading: data===undefined ?true:false,
  }
}

export const getOneApplication= async(id)=>{
  return await getDoc(doc(db,`Applications/${id}`)).then((snap)=>snap.data())
}