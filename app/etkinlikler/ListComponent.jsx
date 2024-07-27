import Link from 'next/link'
import React from 'react'

const ListComponent = () => {
    const list=[
        {id:"01",label:"Webinarlar",route:"etkinlikler/webinar",imgSrc:"/webinar_bg.png"},
        {id:"02",label:"Kongre ve Fuarlar",route:"etkinlikler/kongre-fuar",imgSrc:"/kongre_bg.png"},
        {id:"03",label:"Posterler",route:"etkinlikler/posterler",imgSrc:"/poster_bg.png"},
    ]
  return (
    <div className='inner'>
        {list.map((l,ldx)=>{
            return(
                <Link
                className='relative flex items-center justify-center border h-[400px] w-full'

                href={l.route} key={ldx}>
                    <img src={l.imgSrc} className='absolute w-full object-contain '  />
                    <h2 className='font-bold text-2xl'>{l?.label}</h2>
                </Link>
            )
        })}

    </div>
  )
}

export default ListComponent