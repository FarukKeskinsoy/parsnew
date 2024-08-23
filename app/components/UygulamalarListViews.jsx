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
    const [limit, setLimit] = useState(40); // Track the number of items to load

    const { data, error, isLoading,count } = useApplicationAll({ rsector: filterData.rsector,rproduct: filterData.rproduct,rproductgroup: filterData.rproductgroup, limit });
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
      }, [filterData.rproductgroup, filterData.rproduct,filterData.rsector, data]);
    
      const [filteredData, setFilteredData] = useState(data);
    
    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <h1>{error}</h1>
    }

    const handleIncreaseLimit=()=>{
      setLimit(pre=>(pre+40))
  }
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
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {filteredData&&filteredData.length>0?
            filteredData?.sort((a, b) => a.index - b.index).map((item,idx)=>{
                return(
                    <Link
                        key={idx}
                        href={`/uygulamalar/${item?.url}-${item?.id}`}
                        className="border relative transition-all flex flex-col items-center justify-start"
                        >
                    <div className="flex flex-col items-center justify-center w-full">
                    <img src={item?.images[1]||item?.images[0]||"/pdf_bgg.jpg"} className="h-[200px] rectangleImg" />
                    </div>
                    <div className="p-4 lg:p-8 w-full z-10">
                        <h2 className="font-semibold ">{item?.title}</h2>
                    </div>
                    </Link>
                )
            }):<h1>Herhangi bir uygulama bulunamadı. &#129488;</h1>}
            </div>
            {count>(limit-1)&&!filterData.rproduct&&!filterData.rsector&&!filterData.rproductgroup&&<button
                    className="border rounded px-4 py-2 lg:px-8 lg:py-4 my-5 w-max"
                    onClick={handleIncreaseLimit}
                >Daha Fazla</button>}
            
        </section>
    )

}