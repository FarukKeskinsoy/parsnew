"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { useOnePage } from "@/lib/firebase/page/read";
import Link from "next/link";
import DynaStaPage from "./DynaStaPage";
import LoadingPage from "./LoadingPage";

export default function HakkimizdaPage(){

    const { data, error, isLoading} = useOnePage("Pages/hakkimizda");
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }
    return(
        <section className="p-10">
            <DynaStaPage data={data} />
        </section>
    )

}
