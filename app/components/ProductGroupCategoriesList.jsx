"use client"

import { useProductGroupCategories } from "@/lib/firebase/productGroups/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";
import CollapsibleCard from "./CollapsibleCard";
import { useState } from "react";

export default function ProductGroupCategoriesListView(){
    const [expandedCardId, setExpandedCardId] = useState(null);

    const handleExpand = (cardId) => {
        setExpandedCardId(cardId);
    };
    const { data, error, isLoading} = useProductGroupCategories();
    if(isLoading){
        return <h1></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Ürünler bulunamadı.</h1>
    }
    const imgs=["/qc.png","/rd.png","/process.png"]

    return(
        <section className="px-4 lg:px-0 py-8 lg:py-16">
            <div className="inner gap-6 flex-col lg:flex-row lg:flex-wrap ">
                {data?.map((item,idx)=>{
                    return(     
                        <CollapsibleCard imgSrc={imgs[idx]} item={item} key={idx} 
                        isExpanded={expandedCardId === item.id}
                        onExpand={(expand) => handleExpand(expand ? item.id : null)}
                        />
                    )
                })}
            </div>
            
        </section>
    )

}