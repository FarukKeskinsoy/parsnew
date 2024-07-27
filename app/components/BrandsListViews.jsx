"use client"

import { useBrands } from "@/lib/firebase/brand/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";
import LoadingPage from "./Page/LoadingPage";

export default function BrandsListView({route}){

    const { data, error, isLoading} = useBrands();
    if(isLoading){
        return <LoadingPage />
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <LoadingPage />
    }
    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:gap:16 flex-wrap">
            {data?.map((item,idx)=>{
                return(
                    <Link 
                        className="relative lg:border flex-1 lg:min-w-[30%] p-4 lg:p-12 flex flex-col items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-12 rounded"
                        key={idx} href={`/${route}/${item?.url}-${item?.id}`}>
                        
                        <img src={item?.images[0]} className=" h-[40%] object-contain"/>
                        <div className="flex flex-col items-center justify-start">
                            <h1 className="text-gray-700" >{item?.preface}</h1>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

}