import useSWR from "swr";

const { getCountFromServer, collection } = require("firebase/firestore");
const { db } = require("./firebase");

const fetcher=path=>getCountFromServer(collection(db,path)).then(value=>value.data().count)

export default function useCollectionCount({path}){
    const {data, error, isLoading} =useSWR(path,fetcher);

    return {
        data,
        error,
        isLoading
    }
}