import React from 'react'
import ProductsListView from '../components/ProductsListView'

const BlogsPage = () => {
  return (
    <div>
      {/* <CountCard icon={<StickyNote/>} name={"Blogs"} path={'Products'} /> */}
      <ProductsListView route={"urunler"}/>
    </div>
  )
}

export default BlogsPage
