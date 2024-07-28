"use client"

import { useProductGroupsForList } from "@/lib/firebase/productGroups/read";

export default function ProductGroupsListSelect({filterData,handleData,related}){

    const { data, error, isLoading} = useProductGroupsForList();
    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Ürün Grubu bulunamadı.</h1>
    }
    return(
        <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="rproductgroup"
            id="productgroup"
            onChange={(e)=>{
                handleData("rproductgroup",e.target.value)
            }}
            value={filterData?.rproductgroup}

        >
            <option value="" disabled hidden>Ürün Grubu Seçiniz</option>
            {data?.map((item,idx)=>{
                return(
                    <option key={idx} value={item?.id}>
                        {item?.title}
                    </option>
                )
            })}
        </select>
    )

}