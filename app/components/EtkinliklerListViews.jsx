"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EtkinliklerListViews({route,data,type}){
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    //const { data, error, isLoading} = useEvents();
    // if(isLoading){
    //     return <h1>Yükleniyor..</h1>
    // }
    // if(error){
    //     return <h1>{error}</h1>
    // }
    if(!data){
        return <h1>&#129488;</h1>
    }

    const typeTranslate={
        webinar:"Webinar",
        posterler:"Posterler",
        "kongre-fuar":"Kongre-Fuar"
    }
    return(
        <section className="flex flex-col bg-white w-full gap-4 lg:gap-16 py-4 lg:py-16" >
            <h2 className="inner text-gray-500 text-lg  lg:text-2xl pl-4 lg:pl-0">{type==="kongre-fuar"?"Kongre-Fuar":type?.[0]?.toUpperCase()+type?.substring(1)}</h2>

            <div className="inner gap-6 flex flex-wrap !justify-start !items-stretch relative  p-4 lg:p-0 ">
            
            <div className="flex flex-col gap-3 w-full flex-1 relative">
                <div className="w-full flex flex-col lg:flex-row gap-6 flex-1 justify-center items-center lg:items-start lg:justify-between relative flex-wrap">
                {data?.map((item, idx) => (
                   <div
                        key={idx}
                        className="flex flex-col gap-2 lg:w-[30%] !justify-center border p-4 rounded "
                        
                    >
                        <img src={item?.images[0]||"/default.jpg"} className="w-full max-h-[300px] object-contain m-auto" alt="--"/>
                        {isClient&&type!=="posterler"&&<p className="font-bold bg-[#E30613] p-2 max-w-max rounded text-white">{new Date(item?.skt?.seconds*1000).toLocaleDateString()}</p>
                        }<p className="text-left w-full">{item?.title}</p>
                        <div className="w-full flex justify-end">
                            <Link href={`/etkinlikler/${item?.event}/${item?.url}-${item?.id}`}
                                className="px-4 py-2 border rounded border-gray-700 bg-[#f5f5f5] text-gray-700" 
                            >
                                Detaylı Bilgi
                            </Link>
                        </div>

                    </div>
                    
                    
                ))}
                </div>

            </div>
            </div>
        </section>
    )

}