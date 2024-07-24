"use client"

import Link from "next/link";

export default function EtkinliklerListViews({route,data}){

    //const { data, error, isLoading} = useEvents();
    // if(isLoading){
    //     return <h1>Yükleniyor..</h1>
    // }
    // if(error){
    //     return <h1>{error}</h1>
    // }
    if(!data){
        return <h1>Etkinlik bulunamadı.</h1>
    }
    return(
        <section>
            {data?.map((item,idx)=>{
                return(
                    <Link  key={idx} href={`/${route}/${item?.url}-${item?.id}`}>
                    <div>
                        <h1>{item?.id}/   {item?.title}</h1>
                    </div>
                    </Link>
                )
            })}
        </section>
    )

}