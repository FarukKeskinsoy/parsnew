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
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Ürünler bulunamadı.</h1>
    }
    return(
        <section className="inner gap-6 flex flex-wrap">
            {data?.map((item,idx)=>{
                return(     
                    <CollapsibleCard item={item} key={idx} 
                    isExpanded={expandedCardId === item.id}
                    onExpand={(expand) => handleExpand(expand ? item.id : null)}
                    />
                )
            })}
        </section>
    )

}