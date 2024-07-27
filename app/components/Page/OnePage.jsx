"use client"

import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import DynaPage from "./DynaPage";

export default function OnePage({route}){

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
            <DynaPage data={data} route={route}/>
        </section>
    )

}
