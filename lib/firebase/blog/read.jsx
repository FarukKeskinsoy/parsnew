"use client"

import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useBlogs() {
  const { data, error } = useSWRSubscription(['Blogs'], ([path], { next }) => {
    const ref=query(collection(db,path),
    where("active","==",true),
    orderBy("createdAt","desc"),
  );
    const unsub= onSnapshot(ref,(snaps)=>{
        next(null,snaps.docs.map((v)=>JSON.parse(JSON.stringify(v.data()))))
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

