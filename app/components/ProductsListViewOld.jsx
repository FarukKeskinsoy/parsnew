"use client"

import { useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "./Page/LoadingPage";
import { useBrandsAsFilter } from "@/lib/firebase/brand/read";

export default function ProductsListView({route}){


    const [limit,setLimit]=useState(12)
    const [selected,setSelected]=useState([])
    const [filtered,setFiltered]=useState([])


    const { data, error, isLoading} = useProducts(limit);
    const { datab, errorb, isLoadingb} = useBrandsAsFilter();

    useEffect(() => {
        if (selected.length === 0) {
            setFiltered(data);
        } else {
            setFiltered(data?.filter(item => selected.includes(item.rbrand[0])));
        }
    }, [selected, data]);

    const handleBrandSelection = (brandId) => {
        setSelected(prevSelected => 
            prevSelected.includes(brandId) 
            ? prevSelected.filter(id => id !== brandId)
            : [...prevSelected, brandId]
        );
    };

    if(isLoading){
        return <LoadingPage />
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <LoadingPage />
    }

    const handleIncreaseLimit=()=>{
        setLimit(pre=>(pre+12))
    }
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div 
                className="relative flex flex-col lg:flex-row gap-8 lg:gap:16 flex-wrap !w-full"
                >
                {data?.map((item,idx)=>{
                    return(
                        <Link 
                            className="relative flex flex-col lg:border p-4 lg:p-4 items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-4 rounded w-full lg:w-[23%]"
                            key={idx} href={`/${route}/${item?.url}-${item?.id}`}
                        >
                            
                            <img src={item?.images[0]} className=" h-[250px] squareImg"/>
                            <div className="flex flex-col items-center justify-start gap-4 ">
                                <h1 className="text-gray-700 font-bold text-xl lg:text-2xl text-left w-full" >{item?.title}</h1>
                                <h2 className="text-gray-700 text-sm" >{item?.description?.substring(0,200)}..</h2>
                            </div>
                        </Link>

                    )
                })}
            </div>
            {data?.length>11&&<button
                className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-8"
                onClick={handleIncreaseLimit}
            >Daha Fazla</button>}

        </div>
    )

}