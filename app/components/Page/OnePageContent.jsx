"use client"

import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";
import LoadingPage from "./LoadingPage";
import SectorContent from "@/app/sektorler/SectorContent";

export default function OnePageContent({route}){

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
                <SectorContent content={data?.content} />
    )

}
