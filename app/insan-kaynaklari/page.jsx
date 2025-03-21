"use client"

import React, { Suspense } from 'react'
import OnePage from '../components/Page/OnePage'
import OneContactForm from '../components/OneForm/OneContactForm '
import { useFormContext } from '@/lib/contexts/FormContext'
import LinkListView from '../components/LinkListView'
import OnePageWhole from '../components/Page/OnePageWhole'

const Page = () => {
  const {
    data,
    isLoading,
    error,
    handleCreateProductForm,
    handleCreateInfoForm,
    isDoneCo,
    handleData
} = useFormContext()

  return (
    <Suspense fallback={<div>Bekliyor...</div>}>
    <main
            className="w-full flex flex-col  bg-white px-4 lg:px-0 gap-4 lg:gap-8 pb-12"

    >
        <OnePageWhole route={"Pages/insan-kaynaklari"}/>
        <div className="inner">
          <LinkListView route={"insan-kaynaklari"}/>
        </div>
        <div className="inner">
        <OneContactForm
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    isDone={isDoneCo}
                    onSubmit={handleCreateInfoForm}
                    handleData={handleData}
                    route={"insan-kaynaklari"}
                    slug={"insan-kaynaklari"}
                />
        </div>
        
    </main>
    </Suspense>
  )
}

export default Page
