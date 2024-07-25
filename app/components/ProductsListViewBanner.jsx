"use client"

import { useBannerProducts, useProducts } from "@/lib/firebase/product/read";
import Link from "next/link";

export default function ProductsListViewBanner({route}){


    const { data, error, isLoading} = useBannerProducts();

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
        <section className="flex flex-col gap-4 lg:gap-16 !bg-white py-4 lg:py-16">
            <h2 className="inner text-gray-500 text-lg  lg:text-2xl uppercase pl-4 lg:pl-0">Ürünler</h2>
            <div className="inner gap-4 flex-col lg:flex-row lg:gap-16">
                {data?.map((item,idx)=>{
                    return(
                        <Link  
                            className="flex-1 flex flex-col gap-4 p-4 lg:p-8 rounded border border-gray-100 shadow-sm bg-white hover:shadow-lg transition-all hover:border-gray-400"
                            key={idx} href={`/${route}/${item?.url}-${item?.id}`}
                        >
                            <img src={item?.images[0]}  />
                            <h1 className="font-bold text-lg lg:text-xl">{item?.title}</h1>
                            <p className="text-gray-700">{(item?.description).substring(0,80)}...</p>
                        </Link>

                    )
                })}
            </div>
            <div className="w-full flex items-center justify-center ">
                <Link 
                    className="bg-black !text-white rounded-full px-6 py-3"
                    href={"/urunler"}
                >Tüm Ürünler</Link>
            </div>
        </section>
    )

}