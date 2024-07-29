"use client"

import { useProductGroupsAll, useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "./Page/LoadingPage";

export default function ProductGroupsListView({route}){

    const [limit,setLimit]=useState(12)

    const { data, error, isLoading} = useProductGroupsAll(limit);

    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }

    const handleIncreaseLimit=()=>{
        setLimit(pre=>(pre+12))
    }
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div 
                className="inner relative flex flex-col lg:flex-row gap-8 lg:gap:16 flex-wrap !w-full"
                >
                {data?.map((item,idx)=>{
                    return(
                        <Link 
                            className="relative flex flex-col lg:border p-4 lg:p-4 items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-4 rounded w-full lg:w-[23%]"
                            key={idx} href={`/${route}/${item?.url}-${item?.id}`}
                        >
                            
                            <img src={item?.images[0]} className=" h-[250px]  w-[80%] object-contain"/>
                            <div className="flex flex-col items-center justify-start gap-4 ">
                                <h1 className="text-gray-700 font-semibold text-xl text-left w-full" >{item?.title}</h1>
                                <h2 className="text-gray-700 text-sm" >{item?.description?.substring(0,200)}..</h2>
                            </div>
                        </Link>

                    )
                })}
            </div>
            {data?.length>11&&<button
                className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-8"
                onClick={handleIncreaseLimit}
            >Daha Fazla</button>}

        </div>
    )

}