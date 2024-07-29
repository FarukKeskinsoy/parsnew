"use client"

import { useApplicationAll } from "@/lib/firebase/application/read";
import { useSectors } from "@/lib/firebase/sector/read";
import Link from "next/link";
import LoadingPage from "./Page/LoadingPage";
import { iller } from "@/lib/data/sehirler";
import { useEffect, useState } from "react";
import SectorsListSelect from "./SectorsListSelect";
import ProductGroupsListSelect from "./ProductGroupsListSelect ";
import ProductsListSelect from "./ProductsListSelect";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function UygulamalarListView(){

    const [filterData,setFilterData]=useState({
        rsector:"",
        rproductgroup:"",
        rproduct:"",
    })
    const { data, error, isLoading } = useApplicationAll({ rsector: filterData.rsector });
    const handleData = (key, value) => {
        setFilterData({
          ...filterData,
          [key]: value,
        });
      };
    
      const filterClientSide = (data) => {
        let filteredData = data;
    
        if (filterData.rproductgroup) {
          filteredData = filteredData.filter(item => item.rproductgroup.includes(filterData.rproductgroup));
        }
    
        if (filterData.rproduct) {
          filteredData = filteredData.filter(item => item.rproduct.includes(filterData.rproduct));
        }
    
        return filteredData;
      };
    
      useEffect(() => {
        if (filterData.rproductgroup || filterData.rproduct) {
          setFilteredData(filterClientSide(data || []));
        } else {
          setFilteredData(data);
        }
      }, [filterData.rproductgroup, filterData.rproduct, data]);
    
      const [filteredData, setFilteredData] = useState(data);
    
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }
    // if(!data){
    //     return <h1>Herhangi bir uygulama bulunamadı. &#129488;</h1>
    // }


    return(
        <section className="inner flex-wrap gap-8 lg:gap-0 !items-stretch">
            <div className="w-full pb-12 flex flex-col lg:flex-row gap-4 lg:gap-12 items-center justify-center">
                        
                        <SectorsListSelect handleData={handleData} filterData={filterData} related={[]} />
                        <ProductGroupsListSelect handleData={handleData} filterData={filterData} related={[]} />
                        <ProductsListSelect handleData={handleData} filterData={filterData} related={{rsector:filterData?.rsector,rproductgroup:filterData?.rproductgroup}} />
                        {(filterData.rproduct||filterData.rsector||filterData.rproductgroup)&&<Button
                            className="text-xs items-center gap-2 !min-w-max"
                            style={{textTransform:"none"}}
                            variant="outlined"
                            size="small"
                            onClick={()=>setFilterData({
                                rsector:"",
                                rproductgroup:"",
                                rproduct:"",
                            })}
                        >
                            <Close/> <span>Temizle</span>
                        </Button>}
                        
            </div>
            {filteredData&&filteredData.length>0?
            filteredData?.map((item,idx)=>{
                return(
                    <Link
                        key={idx}
                        href={`/uygulamalar/${item?.url}-${item?.id}`}
                        className="w-full lg:w-1/4 border relative h-auto transition-all flex flex-col items-center justify-center"
                    >
                    <div className="flex flex-col items-center justify-center w-full">
                    <img src={item?.images[1]||item?.images[0]||"/pdf_bgg.jpg"} className="h-[400px] object-cover" />
                    <p className="text-black text-3xl z-20 absolute bg-slate-50 bg-opacity-30 p-4 rounded w-[90%] text-center h-[60%]  flex flex-col items-center justify-center shadow-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">{item?.title}</p>
                    </div>
                    <div className="p-4 lg:p-8 w-full z-10">
                        <h1 className="font-semibold text-xl">{item?.title}</h1>
                    </div>
                    </Link>
                )
            }):<h1>Herhangi bir uygulama bulunamadı. &#129488;</h1>}
        </section>
    )

}