"use client"

import { useApplicationAll } from "@/lib/firebase/application/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";

export default function UygulamalarListView(){

    const { data, error, isLoading} = useApplicationAll();
    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sektörler bulunamadı.</h1>
    }
    return(
        <section>
            {data?.map((item,idx)=>{
                return(
                    <Link href={`/uygulamalar/${item?.url}-${item?.id}`}>
                    <div>
                        <h1>{item?.title}</h1>
                    </div>
                    </Link>
                )
            })}
        </section>
    )

}