"use client"

import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
 
export function useProductGroupCategories() {
  const { data, error } = useSWRSubscription(['Categories/Add/ProductGroups'], ([path], { next }) => {
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
export function useSlider() {
  const { data, error } = useSWRSubscription(['Slider/mainSlider'], ([path], { next }) => {
    const ref = doc(db, path);
    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        next(null, snapshot.data());
      } else {
        next('Document does not exist');
      }
    }, (error) => {
      next(error?.message);
    });

    return () => unsub();
  });

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}

export function useProductGroupsForList() {
  const { data, error } = useSWRSubscription(['ProductGroups'], ([path], { next }) => {
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

export function useProductsForList(filters) {
  const { data, error } = useSWRSubscription(['Products', filters], ([path, filters], { next }) => {
    let ref = collection(db, path);

    // Apply filters if provided
    if (filters.rsector) {
      ref = query(ref, where("rsector", "array-contains", filters.rsector));
    }

    if (filters.rproductgroup) {
      ref = query(ref, where("rproductgroup", "==", filters.rproductgroup));
    }

    const unsub = onSnapshot(ref, (snaps) => {
      next(null, snaps.docs.map((v) => v.data()));
    }, (error) => {
      next(error?.message);
    });

    return () => unsub();
  });

  return {
    data,
    error,
    isLoading: data === undefined ? true : false,
  };
}