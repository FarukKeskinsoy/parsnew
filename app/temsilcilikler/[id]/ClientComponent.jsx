import Link from 'next/link'
import React from 'react'

const ClientComponent = ({id,docId,data}) => {
  return (
    <div className='inner flex-col lg:flex-row !items-stretch gap-8 lg:gap-12'>
        {data?.map((g,gdx)=>{
        return(
            <Link href={`/urun-gruplari/${g?.url}-${g?.id}`}  key={gdx} className='flex flex-1 flex-col rounded p-4 lg:p-12 border border-gray-100 shadow-sm bg-white hover:shadow-lg transition-all hover:border-gray-400 gap-8 lg:max-w-[600px]'>
                <img src={g?.images[0]} className='h-[300px] object-contain'/>
                <div className='flex flex-col gap-4'>
                  <h2 className='font-bold'>{g?.title}</h2>
                  <p>{g?.preface}</p>
                </div>
              </Link>
        )
      })}
    </div>
  )
}

export default ClientComponent