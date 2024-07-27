import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';
import { db } from '../firebase';

export function useBrands() {
  const { data, error } = useSWRSubscription(
    ['Brands'],
    ([path], { next }) => {
      const ref = query(
        collection(db, path),
        orderBy('index', 'asc') // Only order by index
      );

      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          // Filter documents where 'active' is true
          const filteredData = snapshot.docs
            .map(doc => doc.data())
            .filter(doc => doc.active === true);
          
          next(null, filteredData);
        },
        (err) => {
          next(err?.message || 'Error fetching data');
        }
      );

      return () => unsub();
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
