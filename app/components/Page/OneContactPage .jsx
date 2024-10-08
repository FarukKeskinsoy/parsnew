"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { useOnePage } from "@/lib/firebase/page/read";
import Link from "next/link";
import DynaStaPage from "./DynaStaPage";
import DynaStaIletisimPage from "./DynaStaIletisimPage";
import LoadingPage from "./LoadingPage";

export default function OnecontactPage({route}){

    const { data, error, isLoading} = useOnePage(route);
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
        <section >
            <DynaStaIletisimPage data={data} />
            { data?.link&&         
                <iframe
                    src={data?.link}
                    width="750" 
                    height="450" 
                    className="flex-1 w-full"
                    style={{border:"none"}} 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            }
        </section>
    )

}
