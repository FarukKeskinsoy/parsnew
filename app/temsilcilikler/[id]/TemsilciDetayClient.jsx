// src/app/temsilcilikler/[id]/TemsilciDetayClient.js
"use client"
import { useEffect, useState } from "react";

function TemsilciDetayClient({ id, docId, data }) {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <section className='border-b'>
      <div className='max-w-[1300px] m-auto p-4 lg:p-0'>
        <div className="flex flex-col gap-4 lg:gap-12 py-4 lg:py-12">
          <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto">
            {data?.title || ''}
          </h1>
          <div className='flex flex-col lg:flex-row gap-4 lg:gap-16 items-start justify-end'>
            <div className='flex flex-col gap-4 lg:gap-14 flex-1'>
              <img src={data?.images[0] || '/default.jpg'} className="rectangleImgO" alt="Image" />
              <p>{data?.preface || ''}</p>
            </div>
            {isClient&&<div className='flex-[1.5]'>
              <p dangerouslySetInnerHTML={{ __html: data?.content || '<p></p>' }}></p>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
  
}

export default TemsilciDetayClient;
