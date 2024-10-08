"use client"

import { useProductGroupsAll, useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "./Page/LoadingPage";
import BrandCardMini from "./BrandCardMini";
import { useBrandsAsFilter } from "@/lib/firebase/brand/read";

export default function ProductGroupsListView({route}){

    const [limit,setLimit]=useState(12)
    const [selected,setSelected]=useState([])
    const [filtered,setFiltered]=useState([])

    const { data, error, isLoading} = useProductGroupsAll(limit);
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
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }


    return(
        <div className="flex flex-col lg:flex-row gap-4 items-start !relative">
            <div className="left-box lg:shadow-md p-0 lg:p-4 !h-max rounded text-xs lg:text-sm flex lg:flex-col gap-2 w-full lg:w-max flex-wrap">
                    <div
                    className={`transition-all rounded border p-1 lg:p-2 text-[#505050] flex items-center w-max justify-center cursor-pointer hover:shadow border-gray-200 hover:border-gray-600 ${selected.length===0&&"text-black bg-slate-100 border-gray-600"}`}
                    onClick={() => setSelected([])}
                    >Hepsi</div>
                    {datab?.sort((a, b) => a.index - b.index).map((brand,bradindex)=>{
                        return(
                            <div
                            key={brand.id} 
                            onClick={() => handleBrandSelection(brand.id)}
                            className={`transition-all rounded border  text-[#505050] gap-2 flex items-center p-1 lg:p-2 w-max justify-center cursor-pointer hover:shadow border-gray-200 hover:border-gray-600 ${selected.includes(brand.id)&&"text-black bg-slate-100 border-gray-600"}`}

    
                            >
                                <img src={brand?.images[0]} alt="-"  className="h-3 object-contain hidden lg:flex"/>
                                <p className="">{brand?.title}</p>
                            </div>
                        )
                    })}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered?.sort((a, b) => a.index - b.index).map((item, idx) => (
                    <Link 
                        className="relative border p-4 lg:p-8 flex flex-col items-center hover:border-none hover:shadow-md transition-all gap-4 lg:gap-12 rounded"
                        key={idx} 
                        href={`/${route}/${item?.url}-${item?.id}`}
                    >
                        <img src={item?.images[0]} className=" h-[250px]  w-[80%] object-contain"/>
                        <div className="flex flex-col items-center justify-start gap-4 ">
                            <h1 className="text-gray-700 font-semibold text-xl text-left w-full">{item?.title}</h1>
                            <h2 className="text-gray-700 text-sm">{item?.preface?.substring(0,200)}..</h2>
                        </div>
                        <BrandCardMini id={item?.rbrand[0]} />
                    </Link>
                ))}
            
            {/* {data?.length>11&&<button
                className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-8"
                onClick={handleIncreaseLimit}
            >Daha Fazla</button>} */}

        </div>

        </div>

    )

}