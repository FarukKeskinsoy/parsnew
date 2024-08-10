"use client"

import { useFormContext } from "@/lib/contexts/FormContext";
import { Suspense } from "react";
import MultiPurposeForm from "../OneForm/MultiPurposeForm";

export default function ServisFormHolder(){
    const id = "servis"

    const {
        data,
        isLoading,
        error,
        handleCreateProductForm,
        isDonePr,
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
                    isDone={isDonePr}
                    onSubmit={handleCreateProductForm}
                    handleData={handleData}
                    route={"servis"}
                    slug={`${id}`}
                    title={id}
                    isId={false}
                    varsaTitle={true}
                />
            </div>
        </section>
    </main>
    </Suspense>
    )
}