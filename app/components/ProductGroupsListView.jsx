"use client"

import { useProductGroupsAll, useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductGroupsListView({route}){


    const { data, error, isLoading} = useProductGroupsAll();

    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Gruplar bulunamadı.</h1>
    }

    const handleIncreaseLimit=()=>{
        setLimit(pre=>(pre+12))
    }
    return(
        <section>
            {data?.map((item,idx)=>{
                return(
                    <Link  key={idx} href={`/${route}/${item?.url}-${item?.id}`}>
                    <div>
                        <h1>{item?.title}</h1>
                    </div>
                    </Link>
                )
            })}
            <button onClick={handleIncreaseLimit}>Daha Fazla</button>
        </section>
    )

}