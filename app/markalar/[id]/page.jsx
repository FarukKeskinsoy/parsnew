"use client"
import LoadingPage from '@/app/components/Page/LoadingPage'
import { useBrandContext } from '@/lib/contexts/BrandsContext'
import { useSectorContext } from '@/lib/contexts/SectorsContext'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const BrandDetay = () => {
  const router = useParams()
  const { id } = router
const {fetchData,data}=useBrandContext()
  // Handle the case where sectorId is not yet available
  if (!id) {
    return <LoadingPage/>
  }

  useEffect(()=>{
    if(id){
        const strArr=id?.split("-")
        const docId=id?.split("-")[strArr.length-1]
        if(docId){

            fetchData(docId)
        }
    }

  },[id])

  const strArr=id?.split("-")

  return (
    <div>{id?.split("-")[strArr.length-1]}
            <span>{data?.title}</span>
    </div>
  )
}

export default BrandDetay
