"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getBrand } from "../firebase/brand/read";
import { getBlog } from "../firebase/blog/read_server";

const PageContext = createContext();

export default function PageContextProvider ({children}){
    
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
            const res = await getBlog(id);
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
        <PageContext.Provider
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
        </PageContext.Provider>
    )
}
export const usePageContext=()=>useContext(PageContext)
