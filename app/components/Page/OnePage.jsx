"use client"

import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";
import LoadingPage from "./LoadingPage";

export default function OnePage({route}){

    const { data, error, isLoading} = useOnePage(route);
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
        <section className="pageContainer">
            <DynaStaPage data={data} />
        </section>
    )

}
