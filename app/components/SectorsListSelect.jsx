"use client"

import { useSectors, useSectorsInApplications } from "@/lib/firebase/sector/read";

export default function SectorsListSelect({filterData,handleData,related}){

    const { data, error, isLoading} = useSectors();
    if(isLoading){
        return <h1>Yükleniyor..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sektörler bulunamadı.</h1>
    }
    return(
        <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="rsector"
            id="sector"
            onChange={(e)=>{
                handleData("rsector",e.target.value)
            }}
            value={filterData?.rsector}

        >
            <option value="" disabled hidden>Sektör Seçiniz</option>
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