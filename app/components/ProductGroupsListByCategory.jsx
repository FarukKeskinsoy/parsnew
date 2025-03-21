"use client"

import { useProductGroupsAll, useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "./Page/LoadingPage";
import { getRelatedProductGroups } from "@/lib/firebase/productGroups/read_server";
import { useProductGroupByCategories } from "@/lib/firebase/productGroups/read";
import BrandCardMini from "./BrandCardMini";

export default function ProductGroupsListByCategory({route,id}){

    // const [limit,setLimit]=useState(12)

    const { data, error, isLoading} = useProductGroupByCategories(id);

    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }

    // const handleIncreaseLimit=()=>{
    //     setLimit(pre=>(pre+12))
    // }
    return(
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data?.sort((a, b) => a.index - b.index).map((item,idx)=>{
                    return(
                        <Link 
                        className="relative border p-4 lg:p-8 flex flex-col items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-12 rounded"
                        key={idx} href={`/${route}/${item?.url}-${item?.id}`}
                        >

                            
                            <img src={item?.images[0]} className=" h-[250px]  w-[80%] object-contain rectangleImgO"/>
                            <div className="flex flex-col items-center justify-start gap-4 ">
                                <h1 className="text-gray-700 font-semibold text-xl text-left w-full" >{item?.title}</h1>
                                <h2 className="text-gray-700 text-sm" >{item?.preface?.substring(0,200)}..</h2>
                            </div>
                            <BrandCardMini id={item?.rbrand[0]} />
                        </Link>

                    )
                })}
            {/* {data?.length>11&&<button
                className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-8"
                onClick={handleIncreaseLimit}
            >Daha Fazla</button>} */}

        </div>
    )

}