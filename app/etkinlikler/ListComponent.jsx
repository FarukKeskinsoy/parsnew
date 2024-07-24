import Link from 'next/link'
import React from 'react'

const ListComponent = () => {
    const list=[
        {id:"01",label:"Webinarlar",route:"etkinlikler/webinar"},
        {id:"02",label:"Kongre ve Fuarlar",route:"etkinlikler/kongre-fuar"},
        {id:"03",label:"Posterler",route:"etkinlikler/posterler"},
    ]
  return (
    <div>
        {list.map((l,ldx)=>{
            return(
                <Link href={l.route} key={ldx}>
                    {l?.label}
                </Link>
            )
        })}

    </div>
  )
}

export default ListComponent