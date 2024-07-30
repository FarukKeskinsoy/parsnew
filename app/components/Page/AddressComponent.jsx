"use client"
import { useOnePage } from "@/lib/firebase/page/read";
import DynaStaPage from "./DynaStaPage";
import { Phone } from "lucide-react";
import { Email, EmailOutlined, LocationCityOutlined, PhoneOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function AddressComponent({route}){

    const { data, error, isLoading} = useOnePage(route);

    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        if(data){
            setIsClient(true)
        }
    }, [data])
    if(isLoading){
        return <h1 className="h-0"></h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    if(!data){
        return <h1>Sayfa bulunamadı.</h1>
    }
    return(
        <section className="flex flex-1 flex-col gap-2 lg:border p-4 lg:p-16">
            <div className="flex gap-2">
                <PhoneOutlined/>
                <div className="info">
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-gray-700">{data?.phone}</p>
                </div>
                
            </div>
            <div className="flex gap-2">
                <EmailOutlined/>
                <div className="info">
                    <h3 className="font-semibold">E-Posta</h3>
                    <p className="text-gray-700">{data?.email}</p>
                </div>
                
            </div>
            <div className="flex gap-2">
                <LocationCityOutlined/>
                <div className="info">
                    <h3 className="font-semibold">Adres</h3>
                    {isClient&&<p className='content' dangerouslySetInnerHTML={{__html:data?.content}}></p>}

                </div>
                
            </div>
        </section>
    )

}
