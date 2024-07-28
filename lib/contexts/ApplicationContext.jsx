"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { getOneApplication } from "../firebase/application/read";

const Application = createContext();

export default function ApplicationProvider ({children}){
    
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
            const res = await getOneApplication(id);
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
        <Application.Provider
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
        </Application.Provider>
    )
}
export const useApplication=()=>useContext(Application)
