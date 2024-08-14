"use client"

import { useSectors, useSectorsForHeader } from "@/lib/firebase/sector/read";
import Link from "next/link";
import { useState } from "react";

export default function SectorsListViewHeader(){

    const [selected,setSelected]=useState("")
    const { data, error, isLoading} = useSectorsForHeader();
    if(isLoading){
        return <h1></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Herhangi bir Sektör bulunamadı. &#129488;</h1>
    }

    const handleSelect=(link)=>{
        setSelected(link)
    }
    return(
        <section className="inner !flex-col !gap-0 !items-end relative lg:!mt-4">
            <p className="hidden lg:block absolute left-0 top-8  text-2xl text-[#505050]"><span className="font-semibold">Pars Analtik Kimya ve Endüstriyel Cihazlar</span><br></br><span>Buchi Labortechnik AG Firmasının TÜRKİYE</span><br></br>Resmi Satış ve Servis Tek Yetkili Distribütörüz<br></br><div>
                <img src={selected?.icon} className="h-10 object-contain mt-4"/>
                </div></p>
            <div className="flex items-center justify-end gap-0 relative w-full">
                <>

                {data?.slice(0,2).map((item,idx)=>{
                    return(
                        
                        <Link
                            key={idx}
                            onMouseEnter={()=>handleSelect(item)}
                            href={`/sektorler/${item?.url}-${item?.id}`}
                            className="w-full lg:w-1/4 border relative h-auto transition-all flex flex-col items-center justify-center"
                        >
                        <div className="flex flex-col items-center justify-center">
                        <img src={item?.images[0]||item?.images[1]} className="transition-all rectangleImg z-10 hover:scale-90" />
                        <div className="hidden absolute lg:flex flex-col gap-2 w-full p-4 bottom-0 items-start justify-end backdrop-blur-sm z-50 bg-black/10 ">
                        <p className="text-[white] hidden lg:flex lg:font-bold z-50 text-sm lg:text-2xl w-full lg:w-[90%] text-left lg:border-b border-white lg:pb-2">{item?.title}</p>
                        <p className="text-white hidden lg:flex text-sm z-20 lg:w-[90%] text-left">{item?.title} Sektörü</p>
                        </div>
                        </div>
                        </Link>
                    )
                })}

                </>
            </div>
            <div className="flex items-center justify-end gap-0 relative w-full">
                <>

                {data?.slice(2,5).map((item,idx)=>{
                    return(
                        
                        <Link
                        onMouseEnter={()=>handleSelect(item)}

                            key={idx}
                            href={`/sektorler/${item?.url}-${item?.id}`}
                            className="w-full lg:w-1/4 border relative h-auto transition-all flex flex-col items-center justify-center overflowing-box"
                        >
                        <div className="flex flex-col items-center justify-center">
                        <img src={item?.images[0]||item?.images[1]} className="transition-all rectangleImg z-10 hover:scale-90" />
                        <div className="hidden absolute lg:flex flex-col gap-2 w-full p-4 bottom-0 items-start justify-end backdrop-blur-sm z-50 bg-black/10 ">
                        <p className="text-white hidden lg:flex lg:font-bold z-50 text-sm lg:text-2xl w-full lg:w-[90%] text-left lg:border-b border-white lg:pb-2">{item?.title}</p>
                        <p className="text-white hidden lg:flex text-sm z-20 lg:w-[90%] text-left">{item?.title} Sektörü</p>
                        </div>
                        </div>
                        </Link>
                    )
                })}

                </>
            </div>
            <div className="flex items-center justify-end gap-0 relative w-full">
                <>

                {data?.slice(5,9).map((item,idx)=>{
                    return(
                        
                        <Link
                            onMouseEnter={()=>handleSelect(item)}
                            key={idx}
                            href={`/sektorler/${item?.url}-${item?.id}`}
                            className="w-full lg:w-1/4 border relative h-auto transition-all flex flex-col items-center justify-center overflowing-box"
                        >
                        <div className="flex flex-col items-center justify-center">

                        <img src={item?.images[0]||item?.images[1]} className="transition-all rectangleImg z-10 hover:scale-90" />
                        <div className="hidden absolute lg:flex flex-col gap-2 w-full p-4 bottom-0 items-start justify-end backdrop-blur-sm z-50 bg-black/10 ">
                        <p className="text-white hidden lg:flex lg:font-bold z-50 text-sm lg:text-2xl w-full lg:w-[90%] text-left lg:border-b border-white lg:pb-2">{item?.title}</p>
                        <p className="text-white hidden lg:flex text-sm z-20 lg:w-[90%] text-left">{item?.title} Sektörü</p>
                        </div>
                        </div>
                        </Link>
                    )
                })}

                </>
            </div>
            
        </section>
    )

}