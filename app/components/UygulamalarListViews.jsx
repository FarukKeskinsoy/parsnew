"use client"

import { useApplicationAll } from "@/lib/firebase/application/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";
import LoadingPage from "./Page/LoadingPage";

export default function UygulamalarListView(){

    const { data, error, isLoading} = useApplicationAll();
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Herhangi bir uygulama bulunamadı. &#129488;</h1>
    }
    return(
        <section className="inner flex-wrap gap-8 lg:gap-0 lg:mt-8 !items-stretch">
            {data?.map((item,idx)=>{
                return(
                    <Link
                        key={idx}
                        href={`/uygulamalar/${item?.url}-${item?.id}`}
                        className="w-full lg:w-1/3 border relative h-auto transition-all flex flex-col items-center justify-center"
                    >
                    <div className="flex flex-col items-center justify-center">
                    <img src={item?.images[1]||item?.images[0]||"/pdf_bg.png"} className="h-[400px] object-cover" />
                    <p className="text-black text-3xl z-20 absolute bg-slate-50 bg-opacity-30 p-4 rounded w-[90%] text-center h-[60%]  flex flex-col items-center justify-center shadow-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">{item?.title}</p>
                    </div>
                    <div className="p-4 lg:p-8 w-full z-10">
                        <h1 className="font-semibold text-xl">{item?.title}</h1>
                    </div>
                    </Link>
                )
            })}
        </section>
    )

}