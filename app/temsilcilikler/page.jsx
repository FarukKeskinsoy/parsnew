import React from 'react'
import BrandsListView from '../components/BrandsListViews'

const Page = () => {
  return (
    <main 
    className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >
      <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >Temsilcilikler</h1>
      <div className="inner">
        <BrandsListView route={"temsilcilikler"}/>
      </div>
    </main>
  )
}

export default Page
