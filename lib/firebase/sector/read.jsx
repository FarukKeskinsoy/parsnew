"use client"

import { collection, doc, getDoc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useSectors() {
  const { data, error } = useSWRSubscription(['Sectors'], ([path], { next }) => {
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
export function useServiceTypes() {
  const { data, error } = useSWRSubscription(['ServisTypes'], ([path], { next }) => {
    const ref=collection(db,path);
    const unsub= onSnapshot(ref,(snaps)=>{
        next(null,snaps.docs.map((v)=>({...v.data(),id:v.id})))
    },(error)=>{
        next(error?.message)
    })
    return () => unsub()
  })
 

  return {
    dataS:data,
    errorS:error,
    isLoadingS: data===undefined ?true:false,
  }
}
export function useSectorsForHeader() {
  const { data, error } = useSWRSubscription(['Sectors'], ([path], { next }) => {
    const ref=query(collection(db,path),orderBy("index","asc"),limit(9));
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

export const getSector= async(id)=>{
  return await getDoc(doc(db,`Sectors/${id}`))
}