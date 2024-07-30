"use client"

import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
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

// export function useBannerEvents() {
//   const allowedEvents = ['webinar', 'kongre-fuar'];

//   const { data, error } = useSWRSubscription(['Events'], ([path], { next }) => {
//     const ref = query(
//       collection(db, path),
//       //where("active", "==", true),
//       where("event", "in", allowedEvents),
//       orderBy("createdAt", "desc"), // Sorting by createdAt timestamp in descending order

//       limit(4),
//     );

//     const unsub = onSnapshot(ref, (snapshot) => {
//       next(null, snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     }, (error) => {
//       next(error?.message);
//     });

//     return () => unsub();
//   });

//   console.log(data)
//   return {
//     data,
//     error,
//     isLoading: data === undefined,
//   };
// }

export function useBannerEvents() {
  const allowedEvents = ['webinar', 'kongre-fuar'];

  const { data, error } = useSWRSubscription(['Events'], ([path], { next }) => {
    const events = [];

    const handleSnapshot = (snapshot, type) => {
      const newEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      events.push(...newEvents);
      if (events.filter(event => allowedEvents.includes(event.event)).length >= 4) {
        next(null, events);
      }
    };

    const handleError = (error) => {
      next(error?.message);
    };

    const webinarQuery = query(
      collection(db, path),
      orderBy("createdAt", "desc"),
      where("event", "==", "webinar"),
      limit(2)
    );

    const kongreFuarQuery = query(
      collection(db, path),
      orderBy("createdAt", "desc"),
      where("event", "==", "kongre-fuar"),
      limit(2)
    );

    const unsubWebinar = onSnapshot(webinarQuery, (snapshot) => {
      handleSnapshot(snapshot, 'webinar');
    }, handleError);

    const unsubKongreFuar = onSnapshot(kongreFuarQuery, (snapshot) => {
      handleSnapshot(snapshot, 'kongre-fuar');
    }, handleError);

    return () => {
      unsubWebinar();
      unsubKongreFuar();
    };
  });


  return {
    data,
    error,
    isLoading: data === undefined,
  };
}