"use client"

import { useBrands } from "@/lib/firebase/brand/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";
import LoadingPage from "./Page/LoadingPage";

export default function BrandsListBar({route}){

    const { data, error, isLoading} = useBrands();
    if(isLoading){
        return <LoadingPage />
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sektörler bulunamadı.</h1>
    }
    return(
        <div className="max-w-[1500px] m-auto flex lg:flex-row gap-4 lg:gap:16 flex-wrap py-4 lg:py-8">
            {data?.map((item,idx)=>{
                return(
                    <Link 
                        className="relative lg:border rounded-full w-16 lg:w-[10%] p-2 lg:p-4 flex items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-8"
                        key={idx} href={`/${route}/${item?.url}-${item?.id}`}>
                        
                        <img src={item?.images[0]} className="h-10 object-contain"/>
                    
                    </Link>
                )
            })}
        </div>
    )

}