"use client"

import React from 'react'
import ProductGroupsListByCategory from '@/app/components/ProductGroupsListByCategory'
import { useSearchParams } from 'next/navigation'
import CountCard from '@/app/components/Cards/CountCard'
import { StickyNote } from 'lucide-react'
import { useProductGroupCategoriById } from '@/lib/firebase/productGroups/read'

const ProductGroupsPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data, error, isLoading} = useProductGroupCategoriById(id);

  return (
    <main 
    className="w-full p-6 flex flex-col py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8 items-center"
  >
      <h1 className='w-full max-w-[1300px] p-0 text-left text-2xl'>{data?.title}</h1>
      <div className="inner">
      <ProductGroupsListByCategory id={id} route={"urun-gruplari"}/>
      </div>
    </main>
  )
}

export default ProductGroupsPage
