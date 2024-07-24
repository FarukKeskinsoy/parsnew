"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { useOnePage } from "@/lib/firebase/page/read";
import Link from "next/link";
import DynaStaPage from "./DynaStaPage";

export default function OnePage({route}){

    const { data, error, isLoading} = useOnePage(route);
    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sayfa bulunamadı.</h1>
    }
    return(
        <section className="p-10 ">
            <DynaStaPage data={data} />
        </section>
    )

}
