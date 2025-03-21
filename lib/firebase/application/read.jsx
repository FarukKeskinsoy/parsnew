"use client"

import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
import { useRef } from 'react';
import useSWR from 'swr';
 
// export function useApplicationAll() {
//   const { data, error } = useSWRSubscription(['Applications'], ([path], { next }) => {
//     const ref=collection(db,path);
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


// export function useApplicationAll(filters) {
//   const { data, error } = useSWRSubscription(['Applications', filters], ([path, filters], { next }) => {
//     let ref = collection(db, path);

//     console.log(filters)

//     if (filters.rsector&&!filters.rproductgroup&&!filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector));
//     }else if (filters.rsector && filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector),where("rproductgroup","array-contains",filters.rproductgroup));
//     }else if (filters.rsector && filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector),where("rproductgroup","array-contains",filters.rproductgroup),where("rproduct","array-contains",filters.rproduct));
//     }else if (!filters.rsector && filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rproductgroup", "array-contains", filters.rproductgroup));

//     }else if (!filters.rsector && filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rproductgroup", "array-contains", filters.rproductgroup),where("rproduct","array-contains",filters.rproduct));
//     }else if (!filters.rsector && !filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rproduct", "array-contains", filters.rproduct));
//     }else if (filters.rsector && !filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector),where("rproduct", "array-contains", filters.rproduct));
//     } 
//     else {
//       ref = query(ref, orderBy("index","asc"),limit(filters.limit || 40));
//     }

//     const unsub = onSnapshot(ref, (snaps) => {

//       const docs =snaps.size>0? snaps.docs.map((v) => v.data()):[];
//       next(null, docs.length ? {docs:docs,count:snaps.size} : null,console.warn("fetched")); // Pass null if no documents found
//     }, (error) => {
//       next(error?.message);
//     });

//     if(error){
//       console.log(error)
//     }
//     return () => unsub();
//   });

//   return {
//     data:data?.docs||[],
//     count:data?.count||0,
//     error,
//     isLoading: data === undefined, // Adjust loading state handling
    
//   };
// }

// export function useApplicationAll(filters) {
//   const { data, error } = useSWRSubscription(['Applications', filters], ([path, filters], { next }) => {
//     let ref = collection(db, path);

//     console.log(filters);

//     // Applying filters to the Firestore query
//     if (filters.rsector && !filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector));
//     } else if (filters.rsector && filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector), where("rproductgroup", "array-contains", filters.rproductgroup));
//     } else if (filters.rsector && filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector), where("rproductgroup", "array-contains", filters.rproductgroup), where("rproduct", "array-contains", filters.rproduct));
//     } else if (!filters.rsector && filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rproductgroup", "array-contains", filters.rproductgroup));
//     } else if (!filters.rsector && filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rproductgroup", "array-contains", filters.rproductgroup), where("rproduct", "array-contains", filters.rproduct));
//     } else if (!filters.rsector && !filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rproduct", "array-contains", filters.rproduct));
//     } else if (filters.rsector && !filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector), where("rproduct", "array-contains", filters.rproduct));
//     } else {
//       ref = query(ref, orderBy("index", "asc"), limit(filters.limit || 40));
//     }

//     // Set up the Firestore snapshot listener
//     const unsub = onSnapshot(ref, (snaps) => {
//       const docs = snaps.size > 0 ? snaps.docs.map((v) => v.data()) : [];
//       next(null, docs.length ? { docs: docs, count: snaps.size } : null);
//     }, (error) => {
//       next(error?.message);
//     });

//     return () => unsub();
//   });

//   return {
//     data: data?.docs || [],
//     count: data?.count || 0,
//     error,
//     isLoading: !error && !data, // Adjust loading state handling
//   };
// }

// export function useApplicationAll(filters) {
//   const { data, error } = useSWRSubscription(['Applications', filters], ([path, filters], { next }) => {
//     let ref = collection(db, path);

//     console.log(filters);

//     // Applying filters to the Firestore query
//     if (filters.rsector && !filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rsector", "array-contains", filters.rsector));
//     } else if (filters.rsector && filters.rproductgroup && !filters.rproduct) {
//       ref = query(ref, where("rproductgroup", "array-contains", filters.rproductgroup));
//     } else if (!filters.rsector && !filters.rproductgroup && filters.rproduct) {
//       ref = query(ref, where("rproduct", "array-contains", filters.rproduct));
//     } else if(!filters.rsector && !filters.rproductgroup && !filters.rproduct){
//       ref = query(ref, orderBy("index", "asc"), limit(filters.limit || 40));
//     }

//     // Set up the Firestore snapshot listener
//     const unsub = onSnapshot(ref, (snaps) => {
//       const docs = snaps.size > 0 ? snaps.docs.map((v) => v.data()) : [];
//       next(null, docs.length ? { docs: docs, count: snaps.size } : null);
//     }, (error) => {
//       next(error?.message);
//     });

//     return () => unsub();
//   });

//   return {
//     data: data?.docs || [],
//     count: data?.count || 0,
//     error,
//     isLoading: !error && !data, // Adjust loading state handling
//   };
// }


export function useApplicationAll(filters) {
  const { data, error } = useSWR(
    ['Applications', filters],
    async ([path, filters]) => {
      let ref = collection(db, path);

      // Prepare the combinedValue for filtering
      const combinedValues = [];
      if (filters.rsector) combinedValues.push(filters.rsector);
      if (filters.rproductgroup) combinedValues.push(filters.rproductgroup);
      if (filters.rproduct) combinedValues.push(filters.rproduct);

      // If combinedValue exists, apply the filter
      if (combinedValues.length > 0) {
        ref = query(ref, where("combinedField", "array-contains-any", combinedValues));
      } else {
        // Fetch the first 40 documents if no filters are applied
        ref = query(ref, orderBy("index", "asc"), limit(filters.limit || 40));
      }

      // Fetch documents from Firestore
      const snapshot = await getDocs(ref);
      const docs = snapshot.size > 0 ? snapshot.docs.map(doc => doc.data()) : [];

      return { docs, count: snapshot.size };
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data?.docs || [],
    count: data?.count || 0,
    error,
    isLoading: !error && !data,
  };
}


export const getOneApplication= async(id)=>{
  return await getDoc(doc(db,`Applications/${id}`)).then((snap)=>snap.data())
}