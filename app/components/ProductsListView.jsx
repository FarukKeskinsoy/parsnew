"use client"

import { useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsListView({route}){


    const [limit,setLimit]=useState(2)

    const { data, error, isLoading} = useProducts(limit);

    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sektörler bulunamadı.</h1>
    }

    const handleIncreaseLimit=()=>{
        setLimit(pre=>(pre+1))
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