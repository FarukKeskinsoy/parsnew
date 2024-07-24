"use client"

import { useBlogs } from "@/lib/firebase/blog/read";
import { getCategory } from "@/lib/firebase/category/read_server";
import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";

export default function SatisSonrasiDestekPage(){

    const { datassd, errorssd, isLoadingssd} = useOnePage("Pages/satis-sonrasi-destek");
    if(isLoadingssd){
        return <h1>Yükleniyor..</h1>
    }
    if(errorssd){
        return <h1>{error}</h1>
    }
    if(!datassd){
        return <h1>Sayfa bulunamadı.</h1>
    }
    return(
        <section className="p-10">
            <DynaStaPage data={datassd} />
        </section>
    )

}
