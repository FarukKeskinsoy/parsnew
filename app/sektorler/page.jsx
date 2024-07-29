import React from 'react'
import SectorsListView from '../components/SectorsListViews'
import OnePageContent from '../components/Page/OnePageContent'

const SectorsPage = () => {
  return (
    <main 
      className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >      <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px] m-auto" >Sektörler</h1>
      <div className="inner">
        <OnePageContent route={"HomePages/sektorler"} />
      </div>
      
      <SectorsListView/>
    </main>
  )
}

export default SectorsPage