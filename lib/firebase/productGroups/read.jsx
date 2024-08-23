"use client"

import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
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
export function useProductGroupCategoriById(categoryId) {
  const { data, error } = useSWRSubscription(['Categories/Add/ProductGroups', categoryId], ([path, categoryId], { next }) => {
    const docRef = doc(db, path, categoryId);

    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        next(null, docSnap.data());
      } else {
        next('No such document!');
      }
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
export function useBrandById(brandId) {
  const { data, error } = useSWRSubscription(['Brands', brandId], ([path, brandId], { next }) => {
    const docRef = doc(db, path, brandId);

    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        next(null, docSnap.data());
      } else {
        next('No such document!');
      }
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
export function useSectorById(sectorId) {
  const { data, error } = useSWRSubscription(['Sectors', sectorId], ([path, sectorId], { next }) => {
    const docRef = doc(db, path, sectorId);

    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        next(null, docSnap.data());
      } else {
        next('No such document!');
      }
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
export function useProductGroupByCategories(categoryId) {
  const { data, error } = useSWRSubscription(['ProductGroups', categoryId], ([path, categoryId], { next }) => {
    const ref = collection(db, path);
    const q = query(ref, where('category', '==', categoryId));

    const unsub = onSnapshot(q, (snaps) => {
      const documents = snaps.docs.map((v) => v.data());
      const count = snaps.size; // Get the count of documents
      next(null, { documents, count }); // Pass both data and count
    }, (error) => {
      next(error?.message);
    });

    return () => unsub();
  });

  return {
    data: data?.documents,
    count: data?.count,
    error,
    isLoading: data === undefined ? true : false,
  };
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
    const ref=query(collection(db,path),orderBy("index","asc"));
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
  console.log(filters)
  const { data, error } = useSWRSubscription(['Products', filters], ([path, filters], { next }) => {
    let ref = query(collection(db, path));

    // Apply filters if provided
    if (filters.rsector) {
      ref = query(ref, where("rsector", "array-contains", filters.rsector));
    }

    if (filters.rproductgroup) {
      ref = query(ref, where("rproductgroup", "==", filters.rproductgroup));
    }
    if (filters.rproductgroup&&filters.rsector) {
      ref = query(ref, where("rproductgroup", "==", filters.rproductgroup),where("rsector", "array-contains", filters.rsector));
    }
    if(!filters.rproductgroup&&!filters.rsector){
      ref = query(collection(db, path),orderBy("index","asc"))
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