"use client"

import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useOnePage(route) {
  const { data, error } = useSWRSubscription([route], ([path], { next }) => {
    const ref=doc(db,path);
    const unsub= onSnapshot(ref,(snaps)=>{
        next(null,snaps.data())
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

