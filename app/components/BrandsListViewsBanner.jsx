"use client"

import { useBrands } from "@/lib/firebase/brand/read";
import { useSectors } from "@/lib/firebase/sector/read";
import { ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function BrandsListViewBanner({route}){

    const { data, error, isLoading} = useBrands();
    if(isLoading){
        return <h1 className="!h-0"></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>&#129488;</h1>
    }
    return(
        <section className="bg-[#F8F9FF] flex flex-col gap-4 lg:gap-16 py-8 lg:py-16">
            <div className="flex">
                    <div className="inner text-gray-500 pl-4 lg:pl-0 !justify-start gap-4">
                        <h2 className="text-lg  lg:text-2xl uppercase  ">Temsilcilikler
                            </h2> 
                        <Link href={"/temsilcilikler"}
                            className="flex items-center pl-2 pt-3  pb-1 relative transition-all hover:px-4 hover:justify-between"
                        >
                            Tümünü Gör
                            <ArrowForwardIos/>
                        </Link>
                    </div>
                    
            </div>

            <div className="inner">
                <div className="flex flex-col gap-4 lg:gap-16 w-full">
                    {/* <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
                        <img src="/brandbanner3.png"  className="h-[500px] w-full object-contain flex-1" />
                        <div className="w-full flex flex-col flex-1 p-4 lg:p-16 lg:border h-max gap-4 lg:gap-16">
                            <p >Pars Analitik Kimya ve End. Cih. İth. İhr. Ltd. Şti. olarak; laboratuvar ve proses analitik cihaz ve sistemlerinin satışı, sarf ve yedek parça temini gibi hizmetlerin yanı sıra, eğitim, aplikasyon ve satış sonrası servis hizmetlerini de profesyonelce sunmaktayız. İlaç, gıda, kimya, çevre, tekstil, petrokimya gibi farklı sektörlerden Türkiye’nin en büyük sanayi şirketlerine hizmet vermekteyiz.</p>
                            <Link href={"/hakkimizda"} className="flex gap-4 transition-all cursor-pointer lg:hover:bg-white w-max lg:hover:shadow-lg rounded lg:p-4 lg:border hover:border-none">
                                Hakkımızda..
                                
                                    <ArrowForwardIos/>
                                
                                
                            </Link>
                        </div>
                    </div> */}
                    <div className="flex flex-wrap gap-4 lg:gap-16 items-center justify-between p-4 lg:p-0">
                    {data?.map((item,idx)=>{
                        return(
                            <Link  key={idx} href={`/${route}/${item?.url}-${item?.id}`}>
                                    <img src={item?.images[0]} className="h-4 w-32 lg:h-16 object-contain"/>
                            </Link>
                        )
                    })}
                    </div>
                </div>
            </div>
            

        </section>
    )

}