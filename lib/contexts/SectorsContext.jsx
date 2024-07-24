"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { createContact } from "../firebase/contact/write";
import { getSector } from "../firebase/sector/read";

const SectorContext = createContext();

export default function SectorContextProvider ({children}){
    
    const [data,setData] = useState({})
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    const [isDone,setIsDone]=useState(false)

    const handleData=(key,value)=>{
        setData({
            ...data,
            [key]:value,
        })
    }

    const fetchData=async (id)=>{
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            const res = await getSector(id);
            if(res.exists()){
                setData(res.data())
                console.log(res.data())
            }
            else{
                throw new Error(`${id} id'li bir döküman bulunamadı`)
             }
        } catch (error) {
            setError(error?.message)
        }
    }

    return(
        <SectorContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                handleData,
                fetchData
            }}
        >
            {children}
        </SectorContext.Provider>
    )
}
export const useSectorContext=()=>useContext(SectorContext)
