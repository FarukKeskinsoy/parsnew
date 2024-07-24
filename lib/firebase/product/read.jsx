"use client"

import { collection, doc, endAt, getDoc, getDocs, limit, onSnapshot, orderBy, query, startAt, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'


export function useProducts(size) {
  const { data, error } = useSWRSubscription(['Products', size], ([path, size], { next }) => {
    const ref = collection(db, path);
    const q = query(
      ref,
      where("active", "==", true),
      limit(size)
    );
    getDocs(q).then((snaps) => {
      next(null, snaps.docs.map((v) => v.data()));
    }).catch((error) => {
      next(error?.message);
    });

    // No need for onSnapshot since we're using getDocs
    return () => {};
  }, { refreshInterval: 0 });

  return {
    data,
    error,
    isLoading: data === undefined,
  }
}
export const getGroupCategory= async(id)=>{
  return await getDoc(doc(db,`Categories/Add/ProductGroups/${id}`))
}