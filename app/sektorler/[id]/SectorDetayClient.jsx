// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client";
import RelatedCollDocs from '@/app/components/RelatedCollDocs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function SectorDetayClient({ id, docId, data }) {
  const [isClient, setIsClient] = useState(false)
    

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [tabs, setTabs] = useState('technical description');

const toggleTabs = (name) => {
    setTabs(name);
    document.getElementById(name)?.scrollIntoView({ behavior: 'smooth' });

};

  const anchors=[
    {label:data?.title,id:"technical description",component:<p id='technical description' className='text-wrap overflow-auto' dangerouslySetInnerHTML={{__html:data?.content}}></p>,condition:true,arg:isClient,className:"h-auto"},
    {label:"İlgili Ürünler",id:"related products",component:<RelatedCollDocs coll="Products" field={"rsector"} type={"a"} docId={docId}/>,className:"h-auto"},
    {label:"Uygulamalar",id:"applications",component:<RelatedCollDocs coll="Applications" field={"rsector"} type={"a"} docId={docId}/>,className:"h-auto",condition:true,arg:isClient},
    {label:"Bloglar",id:"related blogs",component:<RelatedCollDocs coll="Blogs" field={"rsector"} type={"a"} docId={docId}/>,className:"h-auto",condition:true,arg:isClient},
]

const selectedObject=anchors.find((t)=>t.id===tabs)
  return (
    <div className='w-full '>
        <div className='w-full' >
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] mb-5 whitespace-nowrap overflow-y-auto w-full flex gap-4 lg:8 items-center justify-between">
                        {anchors.map((a,adx)=>{
                            return(
                                <li key={adx} className="inline-block">
                                    <button
                                        onClick={() => toggleTabs(a.id)}
                                        className={`flex gap-2 p-4 border-b  border-[transparent] hover:border-[#8DD014] hover:text-[#8DD014] ${tabs === a.id ? '!border-[#8DD014] text-[#8DD014]' : ''}`}
                                    >
                                        {a.label}
                                    </button>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
        
        <div className='flex flex-col gap-4 lg:gap-16 lg:hidden'>
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
        <div className='hidden lg:block'>
        {
          
            selectedObject?.component
        }
        </div>
    </div>
  );
}

export default SectorDetayClient;

