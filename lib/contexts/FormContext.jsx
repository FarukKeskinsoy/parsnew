"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { createEventRequestApi, createInfoRequestApi, createMultiRequestApi, createProductRequestApi, createServiceRequest, createServiceRequestApi } from "../firebase/contact/write";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const FormContext = createContext();

export default function FormContextProvider ({children}){
    
    const [data,setData] = useState({})
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    const [isDone,setIsDone]=useState(false)
    const [isDonePr,setIsDonePr]=useState(false)
    const [isDoneCo,setIsDoneCo]=useState(false)
    const [isDoneEv,setIsDoneEv]=useState(false)
    const [isDoneAp,setIsDoneAp]=useState(false)
    const [isDoneMu,setIsDoneMu]=useState(false)
    const [yazilar,setYazilar]=useState([])

    const handleData=(key,value)=>{
        setData({
            ...data,
            [key]:value,
        })
    }
    const handleDataKvkk=(key,value)=>{

        setData({
            ...data,
            [key]:value,
        })
    }

    const handleCreateServiceForm=async(page)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createServiceRequestApi(data,page)
            //await createServiceRequest(data,page)
            setIsDone(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleCreateProductForm=async(page,productId,)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createProductRequestApi(data,page,productId)
            
            setIsDonePr(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }
    const handleCreateInfoForm=async(page,productId,)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createInfoRequestApi(data,page,productId)
            //await createServiceRequest(data,page)
            setIsDoneCo(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }
    const handleCreateEventForm=async(page,docId)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createEventRequestApi(data,page,docId)
            //await createServiceRequest(data,page)
            setIsDoneEv(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }
    const handleCreateApplicationForm=async(page,docId)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createEventRequestApi(data,page,docId)
            //await createServiceRequest(data,page)
            setIsDoneAp(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }
    const handleCreateMultiPurposeForm=async(route,title)=>{
        setError(null);
        setIsLoading(true);
        try {
            await createMultiRequestApi(data,route,title)
            //await createServiceRequest(data,page)
            setIsDoneMu(true)
            setData({})
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }
    const getAllFormPrefaces=async()=>{
        const q= collection(db,"FormPages")
        return await getDocs(q).then(snaps=>{
            const list=snaps.docs.map(d=>({...d.data(),slug:d.id}))
            setYazilar(list)
        })
    }
    const handleSubmitForm = async (slug, page, productId) => {
        try {
            switch (slug.toLowerCase()) {
                case 'urunler': // Products
                    await handleCreateProductForm(page, productId);
                    break;
                case 'iletisim': // Contact
                    await handleCreateInfoForm(page, productId);
                    break;
                case 'servis': // Services
                    await handleCreateServiceForm(page);
                    break;
                default:
                    console.error('Invalid slug provided:', slug);
            }
        } catch (error) {
            console.error('Error executing form submission:', error);
        }
    };
    
    useEffect(()=>{
        getAllFormPrefaces()
        
    },[])

    return(
        <FormContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                handleCreateServiceForm,
                handleData,
                handleCreateProductForm,
                handleCreateInfoForm,
                isDonePr,
                isDoneCo,
                isDoneEv,
                handleCreateEventForm,
                handleCreateApplicationForm,
                isDoneAp,
                handleCreateMultiPurposeForm,
                isDoneMu,
                yazilar,
                handleSubmitForm,
                multiform:data,

            }}
        >
            {children}
        </FormContext.Provider>
    )
}
export const useFormContext=()=>useContext(FormContext)
