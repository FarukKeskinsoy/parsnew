"use client"

import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";

export default function SectorsListView(){

    const { data, error, isLoading} = useSectors();
    if(isLoading){
        return <h1></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Herhangi bir Sektör bulunamadı. &#129488;</h1>
    }
    return(
        <section className="inner flex-wrap gap-8 lg:gap-0 lg:mt-8">
            {data?.map((item,idx)=>{
                return(
                    <Link
                        key={idx}
                        href={`/sektorler/${item?.url}-${item?.id}`}
                        className="w-full lg:w-1/3 border relative h-auto transition-all flex flex-col items-center justify-center"
                    >
                    <div className="flex flex-col items-center justify-center">
                    <img src={item?.images[0]||item?.images[1]} className="rectangleImg" />
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