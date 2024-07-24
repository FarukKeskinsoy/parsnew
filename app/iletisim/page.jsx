"use client"

import OneForm from "@/app/components/OneForm/OneForm";
import { useFormContext } from "@/lib/contexts/FormContext"
import { iller } from "@/lib/data/sehirler";
import { useSearchParams } from "next/navigation";
import OneContactForm from "../components/OneForm/OneContactForm ";
import OnecontactPage from "../components/Page/OneContactPage ";

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
        <main className="w-full p-6 flex flex-col gap-3">

            <h1 className="font-bold">Cihaz Talep Formu</h1>
            <OnecontactPage route={"Pages/iletisim"}/>
            <section className="flex">
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
            </section>


        </main>
    )
}