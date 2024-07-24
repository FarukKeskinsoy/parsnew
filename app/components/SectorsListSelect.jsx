"use client"

import { useSectors } from "@/lib/firebase/sector/read";

export default function SectorsListSelect(){

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
            className="px-4 py-2 rounded-full border bg-gray-50"
            name="sector"
            id="sector"
        >
            <option value="" >sektör seçiniz</option>
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