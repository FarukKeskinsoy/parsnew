"use client"

import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../firebase'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
 
export function useFAQs(count) {
  const { data, error } = useSWRSubscription(['FAQs'], ([path], { next }) => {
    const ref=query(collection(db,path),orderBy("index","asc"),limit(count));
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

export const fetchFAQById = async (id) => {
  const docRef = doc(db, "FAQs", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Böyle bir doküman bulunamadı !");
  }
};

// const fetcher = (path,field,type, id) => {
//   return new Promise((resolve, reject) => {
//     const ref = collection(db, path);
//     const condition=type==="a"?'array-contains':"==";
//     const q = query(ref, where(field, condition, id));
    
//     const unsub = onSnapshot(q, (snapshot) => {
//       resolve(snapshot.docs.map((doc) => doc.data()));
//     }, (error) => {
//       reject(error);
//     });

//     // Ensure we unsubscribe when the promise is done
//     return () => unsub();
//   });
// };

// export function useRelatedDocs(coll,field,type,id) {
//   const { data, error } = useSWR([coll, id], (key, id) => fetcher(key,field,type,id), {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false
//   });

//   return {
//     data,
//     error,
//     isLoading: data === undefined,
//   };
// }

// const fetcher = (path, field, type, id) => {
//   return new Promise((resolve, reject) => {
//     const ref = collection(db, path);
//     const condition = type === "a" ? "array-contains" : "==";
//     const q = query(ref, where(field, condition, id));

//     const unsub = onSnapshot(
//       q,
//       (snapshot) => {
//         resolve(snapshot.docs.map((doc) => doc.data()));
//       },
//       (error) => {
//         reject(error);
//       }
//     );

//     // Return the unsubscribe function from the Promise constructor
//     return () => unsub();
//   });
// };

const fetcher = async (path, field, type, id) => {
  const ref = collection(db, path);
  const condition = type === "a" ? "array-contains" : "==";
  const q = query(ref, where(field, condition, id));

  return new Promise((resolve, reject) => {
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        resolve(snapshot.docs.map((doc) => doc.data()));
      },
      (error) => {
        reject(error);
      }
    );

    // Return the unsubscribe function
    return () => unsub();
  });
};
export function useRelatedDocs(coll, field, type, id) {
  const { data, error, mutate } = useSWR(
    [coll, field, type, id],
    ([coll, field, type, id]) => fetcher(coll, field, type, id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: (err) => {
        console.error("Error fetching data: ", err);
      },
    }
  );

  useEffect(() => {
    return () => {
      if (mutate) {
        mutate([], false); // Mutate cache with empty array to stop subscription
      }
    };
  }, [coll, field, type, id, mutate]);

  return {
    data,
    error,
    isLoading: data === undefined && !error,
  };
}
export const getSector= async(id)=>{
  return await getDoc(doc(db,`Sectors/${id}`))
}

// const useFirestoreData = (coll, field, type, id) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const ref = collection(db, coll);
//     const condition = type === "a" ? "array-contains" : "==";
//     const q = query(ref, where(field, condition, id));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         setData(snapshot.docs.map((doc) => doc.data()));
//         setIsLoading(false);
//       },
//       (error) => {
//         setError(error);
//         setIsLoading(false);
//       }
//     );

//     // Clean up subscription on unmount
//     return () => unsubscribe();
//   }, [coll, field, type, id]);

//   return { data, error, isLoading };
// };



//export default useFirestoreData;

const useFirestoreData = (coll, field, type, id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, coll);
        let allDocs = [];

        if (Array.isArray(id)) {
          // If 'id' is an array, fetch data for each string in the array
          for (const singleId of id) {
            const condition = type === "a" ? "array-contains" : "==";
            const q = query(ref, where("id", "==", singleId),where("active","==",true));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            allDocs = [...allDocs, ...docs];
          }
        } else {
          // If 'id' is a single string, perform a single query
          const condition = type === "a" ? "array-contains" : "==";
          const q = query(ref, where(field, condition, id),where("active","==",true));
          const querySnapshot = await getDocs(q);
          allDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setData(allDocs);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coll, field, type, id]);

  return { data, error, isLoading };
};

export default useFirestoreData;

export const checkDataExists = async (coll, field, type, docId) => {
  const ref = collection(db, coll);
  const condition = type === "a" ? "array-contains" : "==";
  const q = query(ref, where(field, condition, docId));

  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
