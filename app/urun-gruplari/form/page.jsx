"use client"

import OneForm from "@/app/components/OneForm/OneForm";
import { useFormContext } from "@/lib/contexts/FormContext"
import { iller } from "@/lib/data/sehirler";
import { useSearchParams } from "next/navigation";

export default function Page(){
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const {
        data,
        isLoading,
        error,
        handleCreateProductForm,
        isDonePr,
        handleData
    } = useFormContext()

    return(
        <main className="w-full p-6 flex flex-col gap-3">
            <h1 className="font-bold">Cihaz Talep Formu</h1>
            <section className="flex">
                <OneForm
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    isDone={isDonePr}
                    onSubmit={handleCreateProductForm}
                    handleData={handleData}
                    route={"urunler"}
                    slug={id}
                />
            </section>

        </main>
    )
}