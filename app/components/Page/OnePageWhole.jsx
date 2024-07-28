"use client"

import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import DynaPage from "./DynaPage";

export default function OnePageWhole({route,noTitle}){

    const { data, error, isLoading} = useOnePage(route);
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <LoadingPage/>
    }
    return(
        <section className={`pageContainer`}>
            <DynaStaPage data={data} route={route} noTitle={noTitle}/>
        </section>
    )

}
