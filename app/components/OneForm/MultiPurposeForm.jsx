import { iller } from '@/lib/data/sehirler';
import { getFormPreface } from '@/lib/firebase/form/read_server';
import { useProducts } from '@/lib/firebase/product/read';
import React from 'react'
import "./form.scss"
import Link from 'next/link';
import { Launch } from '@mui/icons-material';
import { useServiceTypes } from '@/lib/firebase/sector/read';
import { useFormContext } from '@/lib/contexts/FormContext';

export default function MultiPurposeForm  ({
    formData,
    isLoading,
    error,
    isDone,
    onSubmit,
    handleData,
    route,
    slug,
    title,
    isId,
    varsaTitle
})  {

    const {data}=useProducts()
    const {dataS}=useServiceTypes()
    const {multiform}=useFormContext()
    
   
  return (
            <form 
                className="w-full max-w-lg items-center justify-center"
                onSubmit={(e)=>{
                e.preventDefault();
                        onSubmit(route,title)
                    }}
                >
                <h1 className="font-bold  mb-3 lg:text-xl">{varsaTitle?"Servis ":!isId&&title+" "}Talep Formu</h1>
                <p className="mb-3 text-sm text-gray-600 ">{varsaTitle?"Servis ":!isId&&title+" "}Talebinizi işleme alabilmemiz için lütfen aşağıdaki alanları doldurunuz.</p>

                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                        <label htmlFor="userName" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >İsim/Soyisim<span className="text-red-500"
                        >*</span></label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="userName"
                            placeholder="isim soyisim" 
                            type="text"
                            onChange={(e)=>{
                                handleData("userName",e.target.value)
                            }}
                            value={multiform?.userName || ""} // Add fallback to prevent uncontrolled component warnings
                            required
                        />    
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="email" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >E-Posta<span className="text-red-500">*</span></label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            placeholder="e-posta" 
                            type="email"
                            onChange={(e)=>{
                                handleData("email",e.target.value)
                            }}
                            value={multiform?.email || ""}
                            required
                        />
                    </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                        <label htmlFor="phone" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Telefon<span className="text-red-500">*</span></label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="phone"
                            placeholder="telefon" 
                            type="tel"
                            onChange={(e)=>{
                                handleData("phone",e.target.value)
                            }}
                            value={multiform?.phone || ""}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="firmName" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Firma/Kurum Adı<span className="text-red-500">*</span></label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="firmName"
                            placeholder="firma/kurum adı" 
                            type="text"
                            onChange={(e)=>{
                                handleData("firmName",e.target.value)
                            }}
                            value={multiform?.firmName || ""}
                            required
                        />    
                    </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                        <label htmlFor="city" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Şehir<span className="text-red-500">*</span></label>
                         
                        
                        <select
                            
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="city"
                            onChange={(e)=>{
                                handleData("city",e.target.value)
                            }}
                            value={multiform?.city||""}
                            required
                        >
                                    <option value="" disabled hidden>lütfen şehir seçiniz</option>

                            {iller?.map((i,idx)=>{
                                return(
                                    <option key={idx} value={i} >{i}</option>
                                )
                            })}
                        </select>
                    </div>
            </div>



                  
            {slug==="urunler"&&
            <div className="flex flex-wrap -mx-3 mb-3">

                    <div 
                    className="w-full px-3"
                    >
                        <label htmlFor="cihaz" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Cihaz<span className="text-red-500">*</span></label>
                        
                        <select
                            
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="cihaz"
                            onChange={(e)=>{
                                handleData("relatedId",e.target.value)
                            }}
                            value={multiform?.relatedId || ""}
                            required
                            name='relatedId'
                            
                        >
                                    <option value="" disabled hidden>lütfen ürün seçiniz</option>

                            {data?.map((i,idx)=>{
                                return(
                                    <option key={idx} value={i.id} >{i.title}</option>
                                )
                            })}
                        </select>
                    </div>
            </div>

            }
            {slug==="servis"&&
            <div className="flex flex-wrap -mx-3 mb-3">

                    <div 
                    className="w-full px-3"
                    >
                        <label htmlFor="cihaz" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Servis<span className="text-red-500">*</span></label>
                        
                        <select
                            
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="cihaz"
                            onChange={(e)=>{
                                handleData("relatedId",e.target.value)
                            }}
                            value={multiform?.relatedId||""}
                            required
                            name='relatedId'
                        >
                                    <option value="" disabled hidden>lütfen servis seçiniz</option>

                            {dataS?.map((i,idx)=>{
                                return(
                                    <option key={idx} value={i.id} >{i.title}</option>
                                )
                            })}
                        </select>   
                    </div>
            </div>

            }
            <div className="flex flex-wrap -mx-3 mb-3">
                    <div 
                    className="w-full px-3"
                    >
                        <label htmlFor="message" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Mesajınız<span className="text-red-500">*</span></label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                            id="message"
                            rows={10}
                            placeholder="mesajınız"
                            type="text"
                            onChange={(e)=>{
                                handleData("message",e.target.value)
                            }}
                            value={multiform?.message || ""}
                            
                        />    
                    </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3 items-center gap-2 px-3">
                <input
                            id="kvkk"
                            type="checkbox"
                            onChange={(e)=>{
                                handleData("kvkk",e.target.checked)
                            }}
                            value={data?.kvkk}
                            required
                        />
                <label htmlFor="kvkk" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 "
                 >
                    <Link target="_blank" className='hover:text-blue-500 hover:decoration-inherit flex items-center gap-2 ' href={"/kvkk"}>Kvkk koşullarını onaylıyorum. <Launch/> </Link>
                </label>     
                
                </div>


                        
                        {error && <p className="text-red-500 text-sm" >{error}</p>}
                            {!isDone&&
                            <button 
                                disabled={isLoading || isDone}
                                type="submit"
                                className="bg-black rounded-full px-4 py-2 text-white">
                                {isLoading? "...":"Gönder"}
                            </button>}
                            {isDone && <h3 className="text-green-500">Form Başarıyla Gönderildi !</h3>}


                                        
                </form>
  )
}

