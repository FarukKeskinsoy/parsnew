"use client"

import useCollectionCount from "@/lib/firebase/count"

export default function CountCard({path, name, icon}){

    const {data, isLoading, error} = useCollectionCount({path:path});

    if(isLoading){
        return <h2>...</h2>
    }
    // if(error){
    //     return <p>{error}</p>
    // }
    return(
        <div>
            {icon}
            <h1>{name}</h1>
            <h2>{data}</h2>
        </div>
    )
}