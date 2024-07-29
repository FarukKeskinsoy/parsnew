import Link from 'next/link'
import React from 'react'

const ClientComponent = ({id,docId,data}) => {
  return (
    <div className="p-4 lg:p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full m-auto">
        {data?.concat(data).map((g,gdx)=>{
        return(
            <Link href={`/urun-gruplari/${g?.url}-${g?.id}`}  key={gdx} 
            className="border relative transition-all flex p-4 flex-col items-center justify-start"
            >
                <img src={g?.images[0]} className='h-[300px] object-contain'/>
                <div className='flex flex-col gap-4'>
                  <h2 className='font-bold'>{g?.title}</h2>
                  <p className='text-sm'>{g?.preface}</p>
                </div>
              </Link>
        )
      })}
    </div>
  )
}

export default ClientComponent