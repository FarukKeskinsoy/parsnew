import React from 'react'
import ProductGroupsListView from '../components/ProductGroupsListView'

const ProductGroupsPage = () => {
  return (
    <main 
    className="w-full p-6 flex flex-col py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8 items-center"
  >
          <h1 className='w-full max-w-[1300px] p-0 text-left text-2xl'>Ürün Grupları</h1>

      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <div className="inner">
        <ProductGroupsListView route={"urun-gruplari"}/>
      </div>
    </main>
  )
}

export default ProductGroupsPage
