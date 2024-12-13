import { iller } from '@/lib/data/sehirler';
import { Launch } from '@mui/icons-material';
import Link from 'next/link';
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
                className="w-full items-center justify-center lg:border  lg:p-8 rounded flex-1 max-w-[750px]"
                onSubmit={(e)=>{
                e.preventDefault();
                        onSubmit(route,slug)
                    }}
                >
                {route==="insan-kaynaklari"&&<div className="formTitle mb-4 lg:mb-8">
                    <h2 className='font-bold'>Bize Ulaşın</h2>
                    <p className='text-sm text-gray-700'>İş Başvurularınızı Değerlendirebilmemiz İçin Lütfen Aşağıdaki Alanları Doldurunuz.</p>    
                </div>}
                <div className="flex flex-wrap -mx-3 mb-3">

                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                        <label htmlFor="userName" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >İsim/Soyisim<span className="text-red-500">*</span></label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
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
                            value={data?.email}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">

                <div className={`${route==="insan-kaynaklari"?"w-full md:w-1/2 px-3 mb-3 md:mb-0":"w-full px-3"}`}>
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
                            value={data?.phone}
                            required
                        />
                    </div>
                    

<div className="w-full mt-2 px-3 mb-3 md:mb-0">
                            <label htmlFor="city" 
                        className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-3"
                        >Şehir</label>
                            
                            <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="city"
                            placeholder="şehir" 
                            name='city'
                            type="text"
                            onChange={(e)=>{
                                handleData("city",e.target.value)
                            }}
                            value={data?.city}
                        />  
                        </div>
                     
                </div>
                
                {route!=="insan-kaynaklari"&&<div className="flex flex-wrap -mx-3 mb-3">

                <div className="w-full px-3">
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
                            value={data?.firmName}
                            required
                        />    
                    </div>
                </div>}
                {route!=="iletisim"&&route!=="insan-kaynaklari"&&
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
                </div> }
                <div className="flex flex-wrap -mx-3 mb-3">

                    <div className="w-full px-3">
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
                            value={data?.message}
                            
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
                    <Link target="_blank" className='hover:text-blue-500 hover:decoration-inherit flex items-end gap-2 ' href={"/kvkk"}>Kvkk koşullarını onaylıyorum. <Launch/> </Link>
                </label>     
                
                </div>
                    {error && <p className="text-red-500 text-sm" >{error}</p>}
                    {!isDone&&<button 
                    disabled={isLoading || isDone}
                    type="submit"
                    className="bg-black rounded-full px-4 py-2 text-white"
                    >
                        {isLoading? "...":"Gönder"}
                    </button>}
                    {isDone && <h3 className="text-green-500">Form Başarıyla Gönderildi !</h3>}
                    
                </form>
  )
}

export default OneContactForm