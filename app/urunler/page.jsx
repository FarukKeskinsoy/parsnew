import React from 'react'
import ProductsListView from '../components/ProductsListView'

const BlogsPage = () => {
  return (
    <main 
      className="w-full p-6 flex flex-col  bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8"
    >
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1500px] m-auto" >Ürünler</h1>
      <div className="inner">
        <ProductsListView route={"urunler"}/>
      </div>
    </main>
  )
}

export default BlogsPage
