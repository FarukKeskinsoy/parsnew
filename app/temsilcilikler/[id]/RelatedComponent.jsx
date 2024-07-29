"use client"
import Link from 'next/link'
import React from 'react'

const RelatedComponent = ({id,docId}) => {
  return (
    <div className="inner py-4 lg:py-8 px-4 lg:px-0">
        <h2 className='text-xl lg:text-3xl'>Ürün Grupları</h2>
        <Link 
        className=' bg-black !text-white px-4 py-2 lg:px-16 lg:py-6  rounded-full' 
        //href={`/temsilcilikler/${id}/urun-gruplari?id=${docId}`}>
        href={`/urun-gruplari`}>
            Tüm ürün grupları
        </Link>
    </div>
  )
}

export default RelatedComponent