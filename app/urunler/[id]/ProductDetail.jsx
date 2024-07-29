"use client"

import RelatedCollDocs from '@/app/components/RelatedCollDocs'
import React, { useEffect, useState } from 'react'
import RelatedDocuments from './RelatedDocuments'
import RelatedVideos from './RelatedVideos'

const ProductDetail = ({data,docId}) => {
    const [isClient, setIsClient] = useState(false)
    

    useEffect(() => {
      setIsClient(true)
    }, [])

const anchors=[
    {label:"Teknik Özellik",id:"technical description",component:<p id='technical description' dangerouslySetInnerHTML={{__html:data?.content}}></p>,condition:true,arg:isClient,className:"h-auto"},
    {label:"Uygulamalar",id:"applications",component:<RelatedCollDocs coll="Applications" field={"rproduct"} type={"a"} docId={docId}/>,className:"h-auto",condition:true,arg:isClient},
    {label:"İlgili Ürünler",id:"related products",component:<RelatedCollDocs coll="Products" field={"rproduct"} type={"a"} docId={docId}/>,className:"h-auto"},
    {label:"Dökümanlar",id:"related documents",component:<RelatedDocuments item={data}/>,className:"h-auto"},
    {label:"S.S.S.",id:"faq",component:<RelatedCollDocs coll="FAQs" field={"rproduct"} type="a" docId={docId}/>,className:"h-auto",condition:true,arg:isClient},
    {label:"Video",id:"videos",component:<RelatedVideos item={data} />,className:"h-auto"},
]

const [tabs, setTabs] = useState('technical description');

const toggleTabs = (name) => {
    setTabs(name);
    document.getElementById(name)?.scrollIntoView({ behavior: 'smooth' });

};

  return (
    <div className='w-full '>
        <div className='w-full' >
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] mb-5 whitespace-nowrap overflow-y-auto w-full flex gap-4 lg:8 items-center justify-between">
                        {anchors.map((a,adx)=>{
                            return(
                                <li key={adx} className="inline-block">
                                    <button
                                        onClick={() => toggleTabs(a.id)}
                                        className={`flex gap-2 p-4 border-b  border-[transparent] hover:border-blue-500 hover:text-blue-500 ${tabs === a.id ? '!border-blue-500 text-blue-500' : ''}`}
                                    >
                                        {a.label}
                                    </button>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
        
        <div className='flex flex-col gap-4 lg:gap-16'>
        {
            docId&&anchors.map((ad,adx)=>{
                return(
                    <div key={adx} id={ad.id} className={ad.className}>
                        {adx!==0&&<h1 className='w-full border-b border-black pb-2 text-xl font-semibold'>{ad.label}</h1>}
                        {ad.condition?(ad.arg&&ad.component):ad.component}
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default ProductDetail