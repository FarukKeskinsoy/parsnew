import React from 'react'
import ProductGroupsListView from '../components/ProductGroupsListView'

const ProductGroupsPage = () => {
  return (
    <main 
    className="w-full p-6 flex flex-col py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
  >
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <ProductGroupsListView route={"urun-gruplari"}/>
    </main>
  )
}

export default ProductGroupsPage
