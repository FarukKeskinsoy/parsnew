"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getOneBrand } from "../firebase/brand/read_server";

const BrandContext = createContext();

export default function BrandContextProvider ({children}){
    
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
            const res = await getOneBrand(id);
            if(res.exists()){
                setData(res.data())
            }
            else{
                throw new Error(`${id} id'li bir döküman bulunamadı`)
             }
        } catch (error) {
            setError(error?.message)
        }
    }

    return(
        <BrandContext.Provider
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
        </BrandContext.Provider>
    )
}
export const useBrandContext=()=>useContext(BrandContext)
