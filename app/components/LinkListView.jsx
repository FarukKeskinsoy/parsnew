"use client"

import { useEvents, useHRLinks } from "@/lib/firebase/etkinlik/read";
import { ArrowForwardIos, LinkedIn } from "@mui/icons-material";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function LinkListView({route}){

    const { data, error, isLoading} = useHRLinks();
    if(isLoading){
        return <h1 className="!h-0"></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data|| data?.length<1){
        return <h1>* Açık Pozisyon bulunmamaktadır</h1>
    }
    return(
        <>
        <section className="mb-4 lg:mb-8">
            <h2 className="font-bold mb-4 lg:mb-8 text-xl">Açık Pozisyonlar</h2>
            {data?.map((item,idx)=>{
                return(
                    <Link href={item?.linkedin} target="_blank" className="flex gap-4 lg:gap-8" key={idx} >
                        <h2 className="font-semi-bold">{item?.title}</h2>
                        <LinkedIn className="text-[#0077B5]"/>
                        <ArrowForwardIos/>
                    </Link>
                )
            })}
        </section>
        </>

    )

}