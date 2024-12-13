"use client"

import { addDoc, collection, count, doc, endAt, getDoc, getDocs, increment, limit, onSnapshot, orderBy, query, startAt, updateDoc, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
import { useEffect, useState } from 'react';


export function useProducts(size) {
  const { data, error } = useSWRSubscription(['Products', size], ([path, size], { next }) => {
    const ref = collection(db, path);
    const q = query(
      ref,
      where("active", "==", true),
      orderBy("index", "asc"), // Add orderBy to ensure ordering by `index`
      limit(size)
    );
    
    getDocs(q).then((snaps) => {
      next(null, {data:snaps.docs.map((v) => v.data()),count:snaps.size});
    }).catch((error) => {
      next(error?.message);
    });

    // No need for onSnapshot since we're using getDocs
    return () => {};
  }, { refreshInterval: 0 });

  return {
    data:data?.data||[],
    count:data?.count||0,
    error,
    isLoading: data === undefined,
  }
}

// export function useProducts(initialSize = 21) {
//   const [size, setSize] = useState(initialSize);
//   const [allProducts, setAllProducts] = useState([]);

//   const { data, count, error, isLoading } = useSWRSubscription(
//     ['Products', size],
//     ([path, size], { next }) => {
//       const ref = collection(db, path);
//       const q = query(ref, where("active", "==", true), limit(size));

//       getDocs(q)
//         .then((snaps) => {
//           next(null, { data: snaps.docs.map((v) => v.data()), count: snaps.size });
//         })
//         .catch((error) => {
//           next(error?.message);
//         });

//       return () => {};
//     },
//     { refreshInterval: 0 }
//   );

//   useEffect(() => {
//     if (data) {
//       setAllProducts((prevProducts) => [...prevProducts, ...data?.data]);
//     }
//   }, [data]);

//   const loadMore = () => {
//     setSize(size + 21);
//   };

//   return {
//     products: allProducts,
//     count,
//     error,
//     isLoading,
//     loadMore,
//   };
// }

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
export function useProductsGroupsBannered(rproductIds) {
  const { data, error } = useSWRSubscription(['ProductGroups', rproductIds], ([path, rproductIds], { next }) => {
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
      //where("selected", "==", true),
      orderBy("index","asc"),
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
      //orderBy("index","asc"),
      where("active", "==", true),
      //limit(size)
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

export const enterData=async(collectionName,id)=>{
  const ref = doc(db, collectionName,id);
  await updateDoc(ref,{viewed:increment(1)})

}
export const addDataGeneral = async (
  col,
  field,
  ev,
  id,
  text
) => {
  const userDocPath = `Logs`
  const refUser = collection(db, userDocPath);

  try {
    await addDoc(refUser, {
      col: col,
      field: field,
      event: ev,
      id: id,
      who: "user",
      text: text,
      t: new Date(),
    });
    console.log("izlendi")
  } catch (error) {
    console.log(error);
  }
};

export const getGroupCategory= async(id)=>{
  return await getDoc(doc(db,`Categories/Add/ProductGroups/${id}`))
}