"use client"

import OneForm from "@/app/components/OneForm/OneForm";
import { useFormContext } from "@/lib/contexts/FormContext"
import { iller } from "@/lib/data/sehirler";
import { useSearchParams } from "next/navigation";
import OneContactForm from "../components/OneForm/OneContactForm ";
import OnecontactPage from "../components/Page/OneContactPage ";
import { Suspense } from "react";
import FooterPage from "../components/Page/FooterPage";
import AddressComponent from "../components/Page/AddressComponent";

export default function Page(){
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const {
        data,
        isLoading,
        error,
        handleCreateProductForm,
        handleCreateInfoForm,
        isDoneCo,
        handleData
    } = useFormContext()

    return(
        <Suspense fallback={<div>Bekliyor...</div>}>

        <main 
            className="w-full flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
        >
        <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >İletişim</h1>

            <div className="inner flex-col lg:flex-row gap-4 lg:gap-8 !items-start">
            <AddressComponent route={"Pages/iletisim"} />

            <OneContactForm
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    isDone={isDoneCo}
                    onSubmit={handleCreateInfoForm}
                    handleData={handleData}
                    route={"iletisim"}
                    slug={"iletisim"}
                />
            </div>

            <div className="inner gap-4 flex-col lg:flex-row lg:!items-end">
                <OnecontactPage route={"Pages/iletisim"}/>
                <img src="/iletisimgorsel.png" className="flex-1 h-[450px]  object-cover" alt="parsanalitik"/>
            </div>



        </main>
    </Suspense>
    )
}