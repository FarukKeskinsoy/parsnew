"use client"

import { collection, doc, getDoc, limit, onSnapshot, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useEvents() {
  const { data, error } = useSWRSubscription(['Events'], ([path], { next }) => {
    const ref=query(collection(db,path),where("active","==",true));
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

export function useHRLinks() {
  const { data, error } = useSWRSubscription(['HRPositions'], ([path], { next }) => {
    const ref=query(collection(db,path),where("active","==",true));
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

export function useBannerEvents() {
  const allowedEvents = ['webinar', 'kongre-fuar'];

  const { data, error } = useSWRSubscription(['Events'], ([path], { next }) => {
    const ref=query(
      collection(db,path),
      where("active","==",true),
      where("event","in",allowedEvents),
      limit(4)
    );
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