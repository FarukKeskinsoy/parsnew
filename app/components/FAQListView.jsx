"use client"

import { useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "./Page/LoadingPage";
import { useFAQs } from "@/lib/firebase/faq/read";
import { useSearchParams } from "next/navigation";
import OneFAQPage from "./OneFAQPage";
import { ChevronRight } from "lucide-react";

export default function FAQListView({route}){

    const searchParams = useSearchParams()
    const id = searchParams.get('id')


    const [limit,setLimit]=useState(40)

    const { data, error, isLoading} = useFAQs(limit);

    if(isLoading){
        return <LoadingPage />
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <LoadingPage />
    }

    const handleIncreaseLimit=()=>{
        setLimit(pre=>(pre+40))
    }

    return(
        <Suspense fallback={<div>Loading...</div>}>

        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-stretch relative">
            <div 
                className="relative flex flex-col gap-4 lg:gap-8 !w-full flex-1 py-4 border-t-2 lg:border-t-0 lg:border-r-2 no-scrollbar mt-4 lg:mt-0"
                >
                {data?.map((item,idx)=>{
                    return(
                        <Link
                            className={"relative flex flex-col px-4 py-2 items-start transition-all rounded w-full hover:bg-slate-100 "+`${id===item?.id&&"bg-slate-100"}`}
                            key={idx} href={`/${route}?soru=${item?.url}&id=${item?.id}`}
                        >
                            
                            <div className="flex items-center justify-between gap-4 w-full ">
                                <h2 className="text-gray-700 font-semibold text-left w-full" >{item?.title}</h2>
                                <ChevronRight className="hidden lg:flex"/>
                            </div>
                        </Link>

                    )
                })}
                            {data?.length>11&&<button
                className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-8"
                onClick={handleIncreaseLimit}
            >Daha Fazla</button>}
            </div>


                {
                    id&&<OneFAQPage id={id}/>
                }

        </div>
        </Suspense>
    )

}