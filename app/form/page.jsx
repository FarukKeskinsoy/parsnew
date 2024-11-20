"use client"

import { useFormContext } from "@/lib/contexts/FormContext"
import { useSearchParams } from "next/navigation";
import MultiPurposeForm from "../components/OneForm/MultiPurposeForm";
import FormClient from "./FormClientComponent";
import { Suspense } from "react";

export default function Page(){
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const {
        data,
        isLoading,
        error,
        handleCreateMultiPurposeForm,
        isDoneMu,
        handleData,
        yazilar
    } = useFormContext()


    const translator={
        iletisim:"İletişim",
        servis:"Servis",
        urunler:"Cihaz",
    }


    return(
        <Suspense fallback={<div>Loading...</div>}>

        <main className="flex flex-col items-center justify-center py-5 relative bg-[trasparent]">


        <section className="relative py-6 flex items-center justify-center form-holder w-full h-full max-w-[900px]">
            
            <div className="relative flex flex-col md:gap-5 sm:gap-3 items-center justify-center form-section m-0 p-6 lg:p-12 bg-white rounded-lg z-10 border">
                <MultiPurposeForm
                    formData={data}
                    isLoading={isLoading}
                    error={error}
                    isDone={isDoneMu}
                    onSubmit={handleCreateMultiPurposeForm}
                    handleData={handleData}
                    route={"header"}
                    slug={`${id}`}
                    title={translator[id]}
                />
            </div>
            {/* <div className="absolute inset-0 -z-10 w-[100%] top-0 opacity-20" style={{
                backgroundImage: 'url("/service.png")',
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}></div>*/}
        </section>
        <FormClient slug={id} yazilar={yazilar} />
    </main>
    </Suspense>
    )
}