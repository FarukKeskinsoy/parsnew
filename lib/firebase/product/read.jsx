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

const example=["6080443","7375850","4126196"]
export function useProductsBannered(rproductIds) {
  const { data, error } = useSWRSubscription(['Products', rproductIds], ([path, rproductIds], { next }) => {
    if (!rproductIds || rproductIds.length === 0) {
      next(null, []); // No product IDs to query
      return () => {};
    }

    const ref = collection(db, path);
    const q = query(
      ref,
      where("active", "==", true),
      where("id", "in", rproductIds),
      limit(3)
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
export function useVitrin() {
  const { data, error } = useSWRSubscription(['Vitrinler'], ([path], { next }) => {
    const ref = collection(db, path);
    const q = query(
      ref,
      where("selected", "==", true),
      limit(3)
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

export function useBannerProducts() {
  const { data, error } = useSWRSubscription(
    ['BannerProducts'],
    async (_, { next }) => {
      try {
        // Step 1: Fetch the selected banner
        const vitrinsQuery = query(collection(db, "Vitrinler"), where("selected", "==", true));
        const vitrinsSnapshot = await getDocs(vitrinsQuery);

        if (vitrinsSnapshot.empty) {
          next(null, []); // No selected banners found
          return () => {};
        }

        const selectedBannerDoc = vitrinsSnapshot.docs[0]; // Assuming only one document is selected
        const selectedBannerData = selectedBannerDoc.data();

        // Step 2: Extract rproduct array
        const rproductIds = selectedBannerData.rproduct || [];
        next(null, rproductIds);

        return () => {};
      } catch (error) {
        next(error?.message);
        return () => {};
      }
    }
  );

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}


// export function useBannerProducts() {
//   const { data, error } = useSWRSubscription(['Products'], ([path], { next }) => {
//     const ref=query(
//     collection(db,path),
//     //where("active","==","true"),
//     orderBy("index","asc"),
//     limit(3)
//   );
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
// export function useProductGroupsAll() {
//   const { data, error } = useSWRSubscription(['ProductGroups'], ([path], { next }) => {
//     const ref=query(
//     collection(db,path),
//     orderBy("index","asc"),
//   );
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

export function useProductGroupsAll(size) {
  const { data, error } = useSWRSubscription(['ProductGroups', size], ([path, size], { next }) => {
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