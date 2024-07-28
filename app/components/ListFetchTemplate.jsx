"use client"

import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";

export default function ListFetchTemplate(){

    const { data, error, isLoading} = useSectors();
    if(isLoading){
        return <h1 className="h-0"></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }
    return(
        <section>
            {data?.map((item,idx)=>{
                return(
                    <Link href={`/sektorler/${item?.url}-${item?.id}`}>
                    <div>
                        <h1>{item?.title}</h1>
                    </div>
                    </Link>
                )
            })}
        </section>
    )

}