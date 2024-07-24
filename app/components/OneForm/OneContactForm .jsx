import { iller } from '@/lib/data/sehirler';
import React from 'react'

const OneContactForm = ({
    data,
    isLoading,
    error,
    isDone,
    onSubmit,
    handleData,
    route,
    slug
}) => {
  return (
            <form 
                className="flex flex-col gap-2 bg-blue-50 rounded-xl p-7"
                onSubmit={(e)=>{
                e.preventDefault();
                        onSubmit(route,slug)
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="userName" className="tex-sm text-gray-500">İsim/Soyisim<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            id="userName"
                            placeholder="isim soyisim" 
                            type="text"
                            onChange={(e)=>{
                                handleData("userName",e.target.value)
                            }}
                            value={data?.userName}
                            required
                        />    
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="tex-sm text-gray-500">E-Posta<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            id="email"
                            placeholder="e-posta" 
                            type="email"
                            onChange={(e)=>{
                                handleData("email",e.target.value)
                            }}
                            value={data?.email}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="tex-sm text-gray-500">Telefon<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            id="phone"
                            placeholder="telefon" 
                            type="tel"
                            onChange={(e)=>{
                                handleData("phone",e.target.value)
                            }}
                            value={data?.phone}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="firmName" className="tex-sm text-gray-500">Firma/Kurum Adı<span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            id="firmName"
                            placeholder="firma/kurum adı" 
                            type="text"
                            onChange={(e)=>{
                                handleData("firmName",e.target.value)
                            }}
                            value={data?.firmName}
                            required
                        />    
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="city" className="tex-sm text-gray-500">Şehir<span className="text-red-500">*</span></label>
                        
                        <select
                            
                            className="px-4 py-2 rounded-sm border bg-gray-50"
                            id="city"
                            onChange={(e)=>{
                                handleData("city",e.target.value)
                            }}
                            value={data?.city}
                            required
                        >
                            {iller?.map((i,idx)=>{
                                return(
                                    <option key={idx} value={i} >{i}</option>
                                )
                            })}
                        </select>   
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="tex-sm text-gray-500">Mesajınız<span className="text-red-500">*</span></label>
                        <textarea
                            className="px-4 py-2 rounded-sm border bg-gray-50 resize-none"
                            id="message"
                            rows={10}
                            placeholder="mesajınız"
                            type="text"
                            onChange={(e)=>{
                                handleData("message",e.target.value)
                            }}
                            value={data?.message}
                            
                        />    
                    </div>
                    {error && <p className="text-red-500 text-sm" >{error}</p>}
                    {!isDone&&<button 
                    disabled={isLoading || isDone}
                    type="submit"className="bg-blue-500 rounded-full px-4 py-2 text-white">
                        {isLoading? "...":"Gönder"}
                    </button>}
                    {isDone && <h3 className="text-green-500">Form Başarıyla Gönderildi !</h3>}
                    
                </form>
  )
}

export default OneContactForm